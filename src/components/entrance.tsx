"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BrandSymbol } from "./brand-symbol";
import { brand } from "@/lib/brand";
export function Entrance() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const enterRef = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Read browser-only session storage after hydration; the server renders usable content.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("xemory-entered") === "1";
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronize browser session state after hydration
    if (!seen && !window.location.hash) setShow(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!show) return;
    const content = document.getElementById("site-content");
    if (content) content.inert = true;
    document.dispatchEvent(new CustomEvent("xemory:entrance", { detail: { open: true } }));
    document.body.style.overflow = "hidden";
    enterRef.current?.focus();
    return () => {
      if (content) content.inert = false;
      document.dispatchEvent(new CustomEvent("xemory:entrance", { detail: { open: false } }));
      document.body.style.overflow = "";
    };
  }, [show]);
  function finish() {
    if (timer.current) clearTimeout(timer.current);
    setShow(false);
    try {
      sessionStorage.setItem("xemory-entered", "1");
    } catch {}
    requestAnimationFrame(() =>
      document.getElementById("main-content")?.focus({ preventScroll: true }),
    );
  }
  function enter() {
    if (leaving) return;
    setLeaving(true);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (
      brand.entranceVideo &&
      !reduced &&
      video.current &&
      video.current.readyState >= 3
    ) {
      setPlaying(true);
      video.current.play().catch(finish);
      timer.current = setTimeout(finish, 6000);
    } else timer.current = setTimeout(finish, reduced ? 0 : 650);
  }
  if (!show) return null;
  return createPortal(
    <section
      className={`entrance ${leaving ? "is-leaving" : ""} ${playing ? "is-playing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Enter Xemory"
      onKeyDown={(event) => {
        if (event.key === "Escape") enter();
        if (event.key === "Tab") {
          event.preventDefault();
          enterRef.current?.focus();
        }
      }}
    >
      <div className="entrance-object">
        <BrandSymbol />
        <span className="entrance-light" />
      </div>
      <button
        ref={enterRef}
        onClick={enter}
        className="enter-action"
        aria-label="Enter Xemory"
      >
        ENTER XEMORY <span aria-hidden="true">↗</span>
      </button>
      <p className="entrance-caption">AN IDEA IS ONLY THE BEGINNING.</p>
      {brand.entranceVideo && (
        <video
          ref={video}
          className="entrance-film"
          src={brand.entranceVideo}
          muted
          playsInline
          preload="metadata"
          onEnded={finish}
          onError={finish}
        />
      )}
      <span className="entrance-corner" aria-hidden="true">
        IMAGINE / CREATE / MAKE REAL
      </span>
    </section>,
    document.getElementById("entrance-root")!,
  );
}
