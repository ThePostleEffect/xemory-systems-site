import { timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { dataDirectory } from "./creative-store";
import type { CreativeBrief } from "./creative";
export async function adminAllowed() {
  const h = await headers();
  // The production token is supplied only by the authenticated Nginx location.
  // All other Nginx locations must strip this incoming header. Never send it to a browser.
  const expected = process.env.CREATIVE_ADMIN_PROXY_TOKEN;
  const supplied = h.get("x-xemory-admin") || "";
  if (expected && expected.length >= 32 && Buffer.byteLength(supplied) === Buffer.byteLength(expected)) return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
  return process.env.NODE_ENV === "development" && /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(h.get("host") || "");
}
export type AdminRequest = { directory: string; reference: string; receivedAt: string; status: string; paymentStatus: string; brief: CreativeBrief; priceUsd: number; files: { originalName: string; storedName: string; bytes: number; width: number; height: number }[] };
export async function readRequests(): Promise<AdminRequest[]> {
  const root = dataDirectory();
  const entries = await readdir(root, { withFileTypes: true }).catch((e: NodeJS.ErrnoException) => { if (e.code === "ENOENT") return []; throw e; });
  const result: AdminRequest[] = [];
  for (const entry of entries) if (entry.isDirectory() && /^[a-f0-9]{64}$/.test(entry.name)) result.push({ ...JSON.parse(await readFile(path.join(root, entry.name, "request.json"), "utf8")), directory: entry.name });
  return result.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}
