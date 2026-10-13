import { readFile } from "node:fs/promises";
import path from "node:path";
import { adminAllowed } from "@/lib/creative-admin";
import { dataDirectory } from "@/lib/creative-store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, context: { params: Promise<{ request: string; file: string }> }) {
  if (!await adminAllowed()) return new Response("Not found", { status: 404 });
  const params = await context.params;
  if (!/^[a-f0-9]{64}$/.test(params.request) || !/^reference-[1-4]\.webp$/.test(params.file)) return new Response("Not found", { status: 404 });
  try {
    const directory = path.join(dataDirectory(), params.request);
    const record = JSON.parse(await readFile(path.join(directory, "request.json"), "utf8"));
    if (!record.files.some((f: { storedName: string }) => f.storedName === params.file)) return new Response("Not found", { status: 404 });
    return new Response(await readFile(path.join(directory, params.file)), { headers: { "Content-Type": "image/webp", "Content-Disposition": `attachment; filename="${params.file}"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; sandbox" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
