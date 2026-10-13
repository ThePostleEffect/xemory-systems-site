import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, readdir, stat, statfs, rename, rm, open } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { type CreativeBrief, creativeTiers, uploadLimits } from "./creative";
sharp.cache({ memory: 16, files: 0, items: 20 });
sharp.concurrency(1);

export class RequestError extends Error { constructor(message: string, public status = 400) { super(message); } }
export function dataDirectory() {
  const configured = process.env.CREATIVE_DATA_DIR;
  if (process.env.NODE_ENV === "production" && !configured) throw new RequestError("Online requests are temporarily unavailable. Please email contact@xemorysystems.com.", 503);
  const root = path.resolve(configured || path.join(process.cwd(), ".local-data", "creative-requests"));
  for (const publicRoot of [path.join(process.cwd(), "public"), path.join(process.cwd(), ".next")]) {
    const rel = path.relative(publicRoot, root);
    if (!rel || (!rel.startsWith("..") && !path.isAbsolute(rel))) throw new Error("Creative storage must be private.");
  }
  return root;
}
const hash = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const safeName = (name: string) => name.replace(/[^a-zA-Z0-9._ -]/g, "_").replace(/^\.+/, "").slice(0, 100) || "reference";
async function normalizeImage(file: File) {
  if (!file.size || file.size > uploadLimits.bytes) throw new RequestError("Each reference must be between 1 byte and 4 MB.", 413);
  const input = Buffer.from(await file.arrayBuffer());
  const png = input.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpg = input[0] === 255 && input[1] === 216 && input[2] === 255;
  const webp = input.toString("ascii", 0, 4) === "RIFF" && input.toString("ascii", 8, 12) === "WEBP";
  const format = png ? "png" : jpg ? "jpeg" : webp ? "webp" : "";
  if (!format || file.type !== `image/${format}` || !(format === "jpeg" ? /\.jpe?g$/i : new RegExp(`\\.${format}$`, "i")).test(file.name)) throw new RequestError("Use a genuine PNG, JPEG or WebP image with a matching extension.");
  try {
    const decoder = sharp(input, { limitInputPixels: uploadLimits.pixels, failOn: "warning", sequentialRead: true });
    const meta = await decoder.metadata();
    if (meta.format !== format || (meta.pages || 1) !== 1) throw new Error("Unsupported image");
    // Decode/re-encode rather than storing original payloads or metadata. No SVG/PDF execution.
    const { data, info } = await decoder.rotate().webp({ quality: 95 }).toBuffer({ resolveWithObject: true });
    if (data.length > uploadLimits.bytes) throw new RequestError("This image is too large after processing. Please upload a smaller reference.", 413);
    return { data, originalName: safeName(file.name), bytes: data.length, width: info.width, height: info.height, sourceHash: hash(input) };
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError("An image could not be read. Use a still PNG, JPEG or WebP up to 12 megapixels.");
  }
}
type SavedFile = { originalName: string; storedName: string; bytes: number; width: number; height: number };
type SavedRequest = { schema: 1; reference: string; receivedAt: string; status: "received"; paymentStatus: "not_requested"; fingerprint: string; brief: CreativeBrief; priceUsd: number; files: SavedFile[] };
export async function saveCreativeRequest(brief: CreativeBrief, files: File[], key: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)) throw new RequestError("Please reload the page and try again.");
  if (files.length > uploadLimits.count) throw new RequestError("Attach no more than four images.");
  const root = dataDirectory();
  await mkdir(root, { recursive: true, mode: 0o700 });
  // A cross-process lock bounds decoding/storage on the small single-Droplet deployment.
  const lockPath = path.join(root, ".submission.lock");
  const lock = await open(lockPath, "wx", 0o600).catch(() => { throw new RequestError("Another request is being saved. Please try again in a moment.", 503); });
  let staging = "";
  try {
    const normalized = [];
    for (const file of files) normalized.push(await normalizeImage(file));
    const fingerprint = hash(JSON.stringify({ brief, files: normalized.map(f => [f.originalName, f.sourceHash]) }));
    const directory = path.join(root, hash(key));
    let previous: SavedRequest | undefined;
    try { previous = JSON.parse(await readFile(path.join(directory, "request.json"), "utf8")); } catch (e) { if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e; }
    if (previous) {
      if (previous.fingerprint !== fingerprint) throw new RequestError("This request has changed. Return to your brief and submit it again.", 409);
      return { reference: previous.reference, duplicate: true };
    }
    const records: SavedRequest[] = [];
    let used = 0;
    for (const entry of await readdir(root, { withFileTypes: true })) {
      if (!entry.isDirectory() || !/^[a-f0-9]{64}$/.test(entry.name)) continue;
      const recordFile = path.join(root, entry.name, "request.json");
      const record = JSON.parse(await readFile(recordFile, "utf8")) as SavedRequest;
      records.push(record);
      used += (await stat(recordFile)).size + record.files.reduce((n, f) => n + f.bytes, 0);
    }
    const hourAgo = Date.now() - 3600_000;
    if (records.filter(r => r.brief.email === brief.email && Date.parse(r.receivedAt) > hourAgo).length >= 3) throw new RequestError("You have sent several requests recently. Please try again in an hour or email us.", 429);
    const quotaMb = Number(process.env.CREATIVE_STORAGE_LIMIT_MB || 256);
    if (!Number.isFinite(quotaMb) || quotaMb < 1) throw new Error("Invalid storage quota");
    const incoming = normalized.reduce((n, f) => n + f.bytes, 0) + 32_768;
    const disk = await statfs(root);
    if (records.length >= 500 || used + incoming > quotaMb * 1024 * 1024 || disk.bavail * disk.bsize < incoming + 128 * 1024 * 1024) throw new RequestError("Online requests are temporarily full. Please email us your brief.", 503);
    const reference = `XR-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`;
    staging = path.join(root, `.pending-${randomUUID()}`);
    await mkdir(staging, { mode: 0o700 });
    const attachments: SavedFile[] = [];
    for (const [i, file] of normalized.entries()) {
      const storedName = `reference-${i + 1}.webp`;
      await writeFile(path.join(staging, storedName), file.data, { mode: 0o600, flag: "wx" });
      attachments.push({ originalName: file.originalName, storedName, bytes: file.bytes, width: file.width, height: file.height });
    }
    const record: SavedRequest = { schema: 1, reference, receivedAt: new Date().toISOString(), status: "received", paymentStatus: "not_requested", fingerprint, brief, priceUsd: creativeTiers.find(t => t.id === brief.tier)!.price, files: attachments };
    await writeFile(path.join(staging, "request.json"), JSON.stringify(record, null, 2), { mode: 0o600, flag: "wx" });
    await rename(staging, directory); staging = "";
    return { reference, duplicate: false };
  } finally {
    if (staging) await rm(staging, { recursive: true, force: true });
    await lock.close(); await rm(lockPath, { force: true });
  }
}
