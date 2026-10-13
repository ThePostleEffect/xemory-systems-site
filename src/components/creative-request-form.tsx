"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { categoryOptions, creativeTiers, uploadLimits, validateBrief, type CreativeBrief } from "@/lib/creative";
const empty: CreativeBrief = { tier: "", categories: [], idea: "", name: "", email: "", brand: "", usage: "", links: "", targetDate: "", consent: false };
type Attachment = { file: File; preview: string; id: string };
export function CreativeRequestForm() {
  const [brief, setBrief] = useState<CreativeBrief>(empty);
  const [files, setFiles] = useState<Attachment[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<"edit" | "review" | "done">("edit");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reference, setReference] = useState("");
  const [dragging, setDragging] = useState(false);
  const requestKey = useRef("");
  const website = useRef<HTMLInputElement>(null);
  const websiteValue = useRef("");
  const heading = useRef<HTMLHeadingElement>(null);
  const fileRef = useRef<Attachment[]>([]);
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  useEffect(() => { fileRef.current = files; }, [files]);
  useEffect(() => () => { fileRef.current.forEach(f => URL.revokeObjectURL(f.preview)); xhrRef.current?.abort(); }, []);
  useEffect(() => { if (stage !== "edit") heading.current?.focus(); }, [stage]);
  function update<K extends keyof CreativeBrief>(key: K, value: CreativeBrief[K]) {
    setBrief(prev => ({ ...prev, [key]: value })); requestKey.current = "";
    setErrors(prev => { const next = { ...prev }; delete next[key]; delete next.form; return next; });
  }
  function addFiles(incoming: File[]) {
    const accepted: Attachment[] = []; const messages: string[] = [];
    for (const file of incoming) {
      if (files.length + accepted.length >= uploadLimits.count) { messages.push("You can attach up to four images."); break; }
      if (!/\.(png|jpe?g|webp)$/i.test(file.name) || !["image/png", "image/jpeg", "image/webp"].includes(file.type)) { messages.push(`${file.name}: use PNG, JPEG or WebP.`); continue; }
      if (!file.size || file.size > uploadLimits.bytes) { messages.push(`${file.name}: use an image no larger than 4 MB.`); continue; }
      if (files.some(f => f.file.name === file.name && f.file.size === file.size) || accepted.some(f => f.file.name === file.name && f.file.size === file.size)) continue;
      accepted.push({ file, preview: URL.createObjectURL(file), id: crypto.randomUUID() });
    }
    setFiles(prev => [...prev, ...accepted]); requestKey.current = "";
    setErrors(prev => ({ ...prev, files: [...new Set(messages)].join(" ") }));
  }
  function removeFile(id: string) {
    const target = files.find(f => f.id === id); if (target) URL.revokeObjectURL(target.preview);
    setFiles(prev => prev.filter(f => f.id !== id)); requestKey.current = ""; setErrors(prev => ({ ...prev, files: "" }));
  }
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    websiteValue.current = website.current?.value || "";
    const validation = validateBrief(brief);
    setErrors(validation.errors);
    if (!validation.brief) { requestAnimationFrame(() => document.querySelector<HTMLElement>(".creative-form [aria-invalid=true]")?.focus()); return; }
    setBrief(validation.brief); setStage("review");
  }
  function send() {
    if (busy) return;
    requestKey.current ||= crypto.randomUUID();
    const body = new FormData();
    body.set("brief", JSON.stringify(brief)); body.set("requestKey", requestKey.current); body.set("website", websiteValue.current);
    files.forEach(f => body.append("files", f.file));
    setBusy(true); setProgress(0); setErrors({});
    const xhr = new XMLHttpRequest(); xhrRef.current = xhr;
    xhr.open("POST", "/api/creative-request"); xhr.setRequestHeader("X-Xemory-Request", "1"); xhr.timeout = 90_000;
    xhr.upload.onprogress = e => { if (e.lengthComputable) setProgress(Math.round(e.loaded / e.total * 100)); };
    const fail = (message: string) => { setBusy(false); setErrors({ form: message }); };
    xhr.onerror = () => fail("Connection lost. Your brief and files are still here. Try again; a retry will not create a duplicate request.");
    xhr.ontimeout = () => fail("The upload took too long. Please try again when your connection is ready.");
    xhr.onload = () => {
      try {
        const result = JSON.parse(xhr.responseText);
        if (xhr.status < 200 || xhr.status >= 300 || !result.ok || !result.reference) { fail(result.message || "Your request was not accepted. Please try again."); return; }
        setReference(result.reference); setBusy(false); setStage("done");
        files.forEach(f => URL.revokeObjectURL(f.preview)); setFiles([]);
      } catch { fail("The server could not accept the upload. Please try again or email us."); }
    };
    xhr.send(body);
  }
  const tier = creativeTiers.find(t => t.id === brief.tier);
  const error = (key: string) => errors[key] ? <span id={`error-${key}`} className="request-error">{errors[key]}</span> : null;
  if (stage === "done") return <section className="request-result" aria-labelledby="request-result-title"><span className="request-check" aria-hidden="true">✓</span><p className="eyebrow">SAVED TO XEMORY’S PRIVATE REQUEST INBOX</p><h2 ref={heading} tabIndex={-1} id="request-result-title">Your idea is in.</h2><p>Your reference is <strong>{reference}</strong>. Keep this number for any follow-up.</p><p>We’ll review your brief and use <strong>{brief.email}</strong> to discuss the deliverables, format and timing before production. No payment has been taken. This is your on-screen receipt; it does not confirm an email was sent.</p><a className="text-link" href={`mailto:contact@xemorysystems.com?subject=${encodeURIComponent(`Creative request ${reference}`)}`}>Contact us about this request ↗</a><div><button className="action action-outline" onClick={() => { setBrief(empty); requestKey.current = ""; setStage("edit"); }}>Start another request</button></div></section>;
  return <div className="creative-request-layout">
    <div>
      {stage === "edit" ? <form className="creative-form" onSubmit={review} noValidate>
        <fieldset className="request-block"><legend><span>01</span> CHOOSE YOUR TIER</legend><p className="request-help">Every service is available at every tier. Choose the finish that fits your project.</p>
          <div className="request-tiers">{creativeTiers.map((t, i) => <label key={t.id} className={`request-tier ${brief.tier === t.id ? "selected" : ""}`}><input type="radio" name="tier" value={t.id} checked={brief.tier === t.id} onChange={() => update("tier", t.id)} aria-invalid={!!errors.tier} aria-describedby={errors.tier ? "error-tier" : undefined} /><span className="eyebrow">TIER 0{i + 1}</span><strong>${t.price}<small> USD</small></strong><span className="tier-name">{t.name}</span><span className="tier-description">{t.description}</span></label>)}</div>{error("tier")}
          <p className="request-help">Comparable amounts of work, with increasing detail and finishing. Exact quantities, dimensions and formats are agreed around your brief.</p>
        </fieldset>
        <fieldset className="request-block"><legend><span>02</span> WHAT ARE WE CREATING?</legend><p className="request-help">Choose one type or a custom mix. Only images? Absolutely.</p><div className="request-categories">{categoryOptions.map(c => <label key={c.id} className={brief.categories.includes(c.id) ? "selected" : ""}><input type="checkbox" name="categories" checked={brief.categories.includes(c.id)} onChange={e => update("categories", e.target.checked ? [...brief.categories, c.id] : brief.categories.filter(id => id !== c.id))} aria-invalid={!!errors.categories} aria-describedby={errors.categories ? "error-categories" : undefined} />{c.name}</label>)}</div>{error("categories")}</fieldset>
        <fieldset className="request-block"><legend><span>03</span> TELL US WHAT YOU HAVE IN MIND</legend><label htmlFor="request-idea">Your creative brief <span className="required">Required</span></label><p className="request-help" id="brief-help">Share the idea, style, desired quantity, dimensions, must-haves and what to avoid. For a deck or tutorial, include the audience, purpose and source information.</p><textarea id="request-idea" value={brief.idea} onChange={e => update("idea", e.target.value)} rows={7} minLength={20} maxLength={6000} required aria-invalid={!!errors.idea} aria-describedby={`brief-help${errors.idea ? " error-idea" : ""}`} placeholder="I’m imagining…" />{error("idea")}
          <div className={`reference-drop ${dragging ? "dragging" : ""}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}><span className="upload-symbol" aria-hidden="true">↑</span><h3>Upload your logo & references</h3><p>{brief.categories.includes("graphics") ? "Bring your logo, photos and brand artwork into your custom graphics." : "Show us the style, imagery or brand you have in mind."}</p><label className="file-choose">Choose images<input type="file" accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp" multiple onChange={e => { addFiles(Array.from(e.target.files || [])); e.target.value = ""; }} aria-label="Choose logo and reference images" aria-describedby="upload-help" /></label><p id="upload-help" className="request-help">Or drop them here. Up to 4 PNG, JPEG or still WebP images, 4 MB each, up to 12 megapixels. Optional. Need to share SVG, PDF or more files? Add a reference link below.</p></div>{error("files")}
          {!!files.length && <ul className="reference-files">{files.map(f => <li key={f.id}>{/* Object URLs are local previews only; uploads are persisted on submission. */}<img src={f.preview} alt={`Preview of ${f.file.name}`} /><div><strong>{f.file.name}</strong><span>{(f.file.size / 1024 / 1024).toFixed(2)} MB · ready to attach</span></div><button type="button" onClick={() => removeFile(f.id)} aria-label={`Remove ${f.file.name}`}>Remove</button></li>)}</ul>}
        </fieldset>
        <fieldset className="request-block"><legend><span>04</span> LET’S MAKE IT HAPPEN</legend><div className="request-fields">
          {([['name', 'Your name', 'text', 150], ['email', 'Email', 'email', 254], ['brand', 'Brand / project (optional)', 'text', 150], ['usage', 'Where will it be used? (optional)', 'text', 500], ['targetDate', 'Target date (optional)', 'date', 10]] as const).map(([key, label, type, max]) => <label key={key}>{label}<input aria-label={label} type={type} value={brief[key]} onChange={e => update(key, e.target.value)} maxLength={max} autoComplete={key === 'name' ? 'name' : key === 'email' ? 'email' : undefined} required={key === 'name' || key === 'email'} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `error-${key}` : key === 'targetDate' ? 'target-help' : undefined} />{key === 'targetDate' && <span id="target-help" className="request-help">A preference, not a guaranteed delivery date.</span>}{error(key)}</label>)}
          <label className="full-width">Reference links / file notes (optional)<textarea value={brief.links} onChange={e => update('links', e.target.value)} maxLength={2000} rows={3} aria-invalid={!!errors.links} aria-describedby={errors.links ? 'error-links' : undefined} placeholder="Links to your brand, examples or source information…" />{error('links')}</label>
        </div></fieldset>
        <label className="honeypot" aria-hidden="true">Website<input ref={website} name="website" tabIndex={-1} autoComplete="off" /></label>
        <label className="request-consent"><input type="checkbox" checked={brief.consent} onChange={e => update('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'error-consent' : undefined} /><span>I have permission to provide and use the material I submit, and understand that Xemory will use my details and references to evaluate and produce this requested work.</span></label>{error('consent')}
        <p className="request-help">Your attachments are uploaded when you submit, stored privately, and processed into safe image copies with metadata removed. Keep your originals. <Link href="/privacy">Privacy notice</Link>.</p>
        <button className="action" type="submit">REVIEW YOUR REQUEST <span aria-hidden="true">↗</span></button>
      </form> : <section className="request-review"><p className="eyebrow">ONE LAST LOOK</p><h2 ref={heading} tabIndex={-1}>Your creative request.</h2><dl><dt>Tier</dt><dd>{tier?.name} · ${tier?.price} USD · one-time</dd><dt>What we’re creating</dt><dd>{brief.categories.map(id => categoryOptions.find(c => c.id === id)?.name).join(', ')}</dd><dt>Your brief</dt><dd className="preserve-lines">{brief.idea}</dd><dt>Contact</dt><dd>{brief.name}<br />{brief.email}</dd>{brief.brand && <><dt>Brand / project</dt><dd>{brief.brand}</dd></>}{brief.usage && <><dt>Where it will be used</dt><dd>{brief.usage}</dd></>}{brief.links && <><dt>Reference links / notes</dt><dd className="preserve-lines">{brief.links}</dd></>}{brief.targetDate && <><dt>Requested date</dt><dd>{brief.targetDate} · subject to confirmation</dd></>}<dt>Attachments</dt><dd>{files.length ? files.map(f => <div key={f.id}>{f.file.name} ({(f.file.size / 1024 / 1024).toFixed(2)} MB)</div>) : 'No attachments'}</dd></dl><p className="request-agreement">Submitting sends a request for review. We’ll confirm achievable deliverables, output specifications and timing with you before production and payment. Your selected tier price stays fixed for the agreed scope.</p><div className="request-buttons"><button className="action" disabled={busy} onClick={send}>{busy ? 'SENDING…' : 'SUBMIT CREATIVE REQUEST ↗'}</button><button className="action action-outline" disabled={busy} onClick={() => { requestKey.current = ''; setStage('edit'); }}>Edit request</button></div>{busy && <div className="upload-progress"><progress value={progress} max={100} aria-label="Request upload progress" /><p role="status">{progress < 100 ? `Uploading your request · ${progress}%` : 'Upload transferred. Checking images and saving your request…'}</p></div>}</section>}
      {errors.form && <p role="alert" className="request-error request-form-error">{errors.form}</p>}
    </div>
    <aside className="request-summary"><span className="eyebrow">YOUR REQUEST</span><h3>{tier ? tier.name : 'Built around you.'}</h3>{tier && <div className="summary-price">${tier.price}<span> USD / one-time</span></div>}<p>{brief.categories.length ? brief.categories.map(id => categoryOptions.find(c => c.id === id)?.name).join(' + ') : 'Choose the work you need. Leave out everything you don’t.'}</p><div className="summary-rule" /><ul><li>Every service, at every tier.</li><li>Deliverables agreed before production.</li><li>No payment collected with this request.</li><li>Personally fulfilled by Xemory.</li></ul><p className="request-help">Need a different starting point?</p><a className="text-link" href="mailto:contact@xemorysystems.com">Talk through your idea ↗</a></aside>
  </div>;
}
