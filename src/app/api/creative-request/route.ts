import { NextResponse } from "next/server";
import { validateBrief, uploadLimits } from "@/lib/creative";
import { RequestError, saveCreativeRequest } from "@/lib/creative-store";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
let receiving = false;
const recent = new Map<string, number[]>();
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" && process.env.CREATIVE_REQUESTS_ENABLED !== "true") return reply({ ok: false, message: "Online requests are not available yet. Please email contact@xemorysystems.com." }, 503);
  const expectedOrigin = process.env.CREATIVE_PUBLIC_ORIGIN || (process.env.NODE_ENV === "production" ? "https://www.xemorysystems.com" : `${new URL(request.url).protocol}//${request.headers.get("host")}`);
  if (request.headers.get("origin") !== expectedOrigin || request.headers.get("x-xemory-request") !== "1") return reply({ ok: false, message: "Please submit through the Xemory request form." }, 403);
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data; boundary=")) return reply({ ok: false, message: "Please use the request form." }, 415);
  if (receiving) return reply({ ok: false, message: "Another upload is being received. Please try again in a moment." }, 503);
  const ip = request.headers.get("x-real-ip") || "local";
  const now = Date.now();
  for (const [key, times] of recent) if (times.every(t => now - t > 600_000)) recent.delete(key);
  const attempts = (recent.get(ip) || []).filter(t => now - t < 600_000);
  if (attempts.length >= 8 || recent.size >= 5000) return reply({ ok: false, message: "Please wait a few minutes before submitting again." }, 429);
  recent.set(ip, [...attempts, now]);
  receiving = true;
  try {
    if (Number(request.headers.get("content-length")) > uploadLimits.requestBytes) throw new RequestError("Your attachments are too large. Use up to four images, 4 MB each.", 413);
    const reader = request.body?.getReader();
    if (!reader) throw new RequestError("Your request was empty.");
    const chunks: Uint8Array[] = []; let length = 0;
    const timeout = setTimeout(() => { void reader.cancel(); }, 60_000);
    try {
      while (true) {
        const { value, done } = await reader.read(); if (done) break;
        length += value.length;
        if (length > uploadLimits.requestBytes) { await reader.cancel(); throw new RequestError("The upload exceeds the 17 MB request limit.", 413); }
        chunks.push(value);
      }
    } finally { clearTimeout(timeout); }
    const payload = await new Response(Buffer.concat(chunks), { headers: { "Content-Type": request.headers.get("content-type")! } }).formData().catch(() => { throw new RequestError("The upload was interrupted or could not be read. Please try again."); });
    if (payload.get("website")) throw new RequestError("Unable to accept this request.");
    const raw = payload.get("brief");
    if (typeof raw !== "string" || raw.length > 14000) throw new RequestError("Please complete a valid brief.");
    const { brief, errors } = validateBrief(JSON.parse(raw));
    if (!brief) return reply({ ok: false, errors, message: "Please check the highlighted fields." }, 400);
    const files = payload.getAll("files");
    if (files.some(f => typeof f === "string")) throw new RequestError("Invalid reference attachment.");
    const saved = await saveCreativeRequest(brief, files as File[], String(payload.get("requestKey") || ""));
    // Acceptance means durably stored; it does not claim email delivery or payment.
    return reply({ ok: true, reference: saved.reference, duplicate: saved.duplicate }, saved.duplicate ? 200 : 201);
  } catch (e) {
    if (e instanceof RequestError) return reply({ ok: false, message: e.message }, e.status);
    if (e instanceof SyntaxError) return reply({ ok: false, message: "The brief could not be read. Please try again." }, 400);
    console.error("Creative request storage failed", e instanceof Error ? e.name : "unknown");
    return reply({ ok: false, message: "We could not save your request. Your form is still here; please try again or email us." }, 503);
  } finally { receiving = false; }
}
