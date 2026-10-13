"use client";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { VaultPoster } from "./vault-poster";
import type { VaultScene } from "@/lib/vault-scene";

export function Entrance() {
  const pathname = usePathname();
  // Render the entrance in the HTML response, before hydration or WebGL startup.
  const [show, setShow] = useState(true);
  const [armed, setArmed] = useState(false);
  const [opening, setOpening] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [preview, setPreview] = useState(false);
  const [basic, setBasic] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const scene = useRef<VaultScene | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openingRef = useRef(false);
  const finish = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    scene.current?.dispose(); scene.current = null;
    delete document.documentElement.dataset.xemoryEntrance;
    setShow(false);
    try { sessionStorage.setItem("xemory-entered", "1"); } catch {}
    requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
  }, []);

  useLayoutEffect(() => {
    if (pathname !== "/") { setShow(false); return; }
    let seen = false;
    try { seen = sessionStorage.getItem("xemory-entered") === "1"; } catch {}
    const params = new URLSearchParams(location.search);
    const review = params.get("entrance") === "preview";
    const reviewReduced = review && params.get("motion") === "reduced";
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(motion.matches || reviewReduced); if ((motion.matches || reviewReduced) && openingRef.current) finish(); };
    // Browser-only preferences are synchronized after hydration.
    setPreview(review); setReduced(motion.matches || reviewReduced); setBasic(review && params.get("render") === "basic");
    const timedOut = document.documentElement.dataset.xemoryEntrance === "expired";
    const shouldShow = !timedOut && (review || (!seen && !location.hash));
    openingRef.current = false; setArmed(false); setOpening(false); setShow(shouldShow);
    if (!shouldShow) delete document.documentElement.dataset.xemoryEntrance;
    motion.addEventListener("change", update);
    return () => { motion.removeEventListener("change", update); if (timer.current) clearTimeout(timer.current); };
  }, [finish, pathname]);

  useLayoutEffect(() => {
    if (!show || pathname !== "/") return;
    let cancelled = false;
    const content = document.getElementById("site-content");
    const previousOverflow = document.body.style.overflow;
    if (content) content.inert = true;
    document.documentElement.dataset.xemoryEntrance = "closed";
    document.dispatchEvent(new CustomEvent("xemory:entrance", { detail: { open: true } }));
    document.body.style.overflow = "hidden";
    enterRef.current?.focus();
    setReady(false);
    if (!reduced && !basic && host.current) {
      import("@/lib/vault-scene").then(({ createVaultScene }) => {
        if (cancelled || openingRef.current || !host.current) return;
        scene.current = createVaultScene(host.current, finish, () => {
          setReady(false); scene.current?.dispose(); scene.current = null;
          if (openingRef.current) finish();
        });
        setReady(true);
      }).catch(() => { /* The HTML/CSS entrance remains fully usable without WebGL. */ });
    }
    return () => {
      cancelled = true; scene.current?.dispose(); scene.current = null;
      if (content) content.inert = false;
      delete document.documentElement.dataset.xemoryEntrance;
      document.dispatchEvent(new CustomEvent("xemory:entrance", { detail: { open: false } }));
      document.body.style.overflow = previousOverflow;
    };
  }, [show, reduced, basic, finish, pathname]);

  function enter() {
    if (openingRef.current) return;
    openingRef.current = true; setArmed(true);
    skipRef.current?.focus();
    // Keep the green acknowledgement visible before any door or page movement.
    timer.current = setTimeout(() => {
      setOpening(true);
      document.documentElement.dataset.xemoryEntrance = "opening";
      if (reduced) timer.current = setTimeout(finish, 180);
      else if (scene.current && ready) {
        scene.current.open();
        timer.current = setTimeout(finish, 6000);
      } else timer.current = setTimeout(finish, 1800);
    }, reduced ? 350 : 650);
  }
  function replay() {
    openingRef.current = false; setArmed(false); setOpening(false); setReady(false); setShow(true);
  }
  if (pathname !== "/") return null;
  if (!show) return preview ? <button className="vault-replay" onClick={replay}>↻ Replay entrance</button> : null;
  return (
    <section className={`vault-entrance${ready ? " is-3d" : ""}${armed ? " is-armed" : ""}${opening ? " is-opening" : ""}${reduced ? " is-reduced" : ""}`} role="dialog" aria-modal="true" aria-labelledby="vault-title"
      onKeyDown={event => {
        if (event.key === "Escape") { event.preventDefault(); finish(); }
        if (event.key === "Tab") {
          event.preventDefault();
          if (armed || document.activeElement === enterRef.current) skipRef.current?.focus(); else enterRef.current?.focus();
        }
      }}>
      <div className="vault-fallback" aria-hidden="true"><div className="vault-fallback-left" /><div className="vault-fallback-right" /><VaultPoster /></div>
      <div className="vault-canvas" ref={host} aria-hidden="true" />
      <div className="vault-atmosphere" aria-hidden="true" />
      <header className="vault-masthead">
        <span className="vault-kicker">IMAGINE. CREATE. MAKE REAL.</span>
        <h1 id="vault-title">XEMORY<span>SYSTEMS</span></h1>
        <span className="vault-location">BELLINGHAM, WASHINGTON</span>
      </header>
      <div className="vault-invitation">
        <p>Every idea opens a door.</p>
        <button ref={enterRef} onClick={enter} disabled={armed} className="vault-enter"><span className="vault-button-light" aria-hidden="true" /><span className="vault-button-label">{armed ? "ACCESS GRANTED" : "ENTER XEMORY"}</span><span className="vault-button-icon" aria-hidden="true">{armed ? "✓" : "↗"}</span></button>
        <span className="vault-subline">THERE’S SOMETHING ON THE OTHER SIDE.</span>
      </div>
      <div className="vault-footer"><span>INDEPENDENT IDEAS. REAL CREATIONS.</span><span>01 / THE ENTRANCE</span></div>
      <button ref={skipRef} className="vault-skip" onClick={finish}>Skip intro <span aria-hidden="true">↗</span></button>
      <p className="sr-only" role="status">{armed ? "Access granted. Opening the vault. You can skip the animation at any time." : "Welcome to Xemory Systems."}</p>
    </section>
  );
}
