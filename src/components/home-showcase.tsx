"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BuddyPreview } from "./buddy-preview";
const slides = [
  { title: ["WE BUILD", "WHAT WE", "WISH EXISTED."], eyebrow: "INDEPENDENT IDEAS. REAL CREATIONS.", description: "Useful, experimental technology.\nBuilt to put more capability in your hands.", name: "Animated Desktop Buddy", label: "Explore the Lab", href: "/lab", image: "" },
  { title: ["YOUR IDEA.", "YOUR WEBSITE.", "MADE REAL."], eyebrow: "FROM A BLANK PAGE TO SOMETHING YOURS.", description: "Build your first website with Codex.\nA beginner guide, an editable starter, and 12 prompts.", name: "Build Your First Website with Codex", label: "Explore the guide", href: "/lab#creation-xkBrt", image: "website-preview.png" },
  { title: ["LESS NOISE.", "MORE ROOM", "TO THINK."], eyebrow: "MAKE SPACE FOR WHAT MATTERS.", description: "Give your priorities, tasks, notes and links\none simple home with the Personal Command Center.", name: "Personal Command Center", label: "Explore the dashboard", href: "/lab#creation-hMA4m", image: "command-preview.jpg" },
];

export function HomeShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);
  const [turn, setTurn] = useState(0);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    const entrance = (event: Event) => setReady(!(event as CustomEvent<{ open: boolean }>).detail.open);
    motion(); visibility();
    let entered = Boolean(location.hash);
    try { entered ||= sessionStorage.getItem("xemory-entered") === "1"; } catch {}
    setReady(entered);
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("xemory:entrance", entrance);
    return () => { media.removeEventListener("change", motion); document.removeEventListener("visibilitychange", visibility); document.removeEventListener("xemory:entrance", entrance); };
  }, []);
  const running = ready && !paused && !reduced && !hidden;
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => { setActive((index) => (index + 1) % slides.length); setTurn((n) => n + 1); }, 6000);
    return () => clearTimeout(timer);
  }, [active, running, turn]);
  function choose(index: number) { setActive((index + slides.length) % slides.length); setPaused(true); setTurn((n) => n + 1); }
  return <section className="home-showcase" aria-label="Xemory creations" aria-roledescription="carousel" onFocusCapture={(event) => {
    if (!(event.target as HTMLElement).closest("[data-autoplay-toggle]")) setPaused(true);
  }}>
    <h1 className="sr-only">Xemory Systems — Independent ideas. Real creations.</h1>
    <div className="showcase-window">
      {slides.map((slide, index) => <article key={slide.name} className={`showcase-slide ${active === index ? "is-current" : ""}`} aria-label={`${index + 1} of ${slides.length}: ${slide.name}`} aria-roledescription="slide" aria-hidden={active !== index} inert={active !== index}>
        <div className="showcase-copy">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h2>{slide.title.map((line, i) => <span key={line} className={i === 2 ? "silver-line" : ""}>{line}</span>)}</h2>
          <p className="showcase-description">{slide.description}</p>
          <div className="showcase-actions"><Link className="action" href={slide.href}>{slide.label}</Link>{index === 0 && <a className="action action-outline" href="#buddy-preview" onClick={() => setPaused(true)}>Try a buddy</a>}</div>
        </div>
        <div className="showcase-art" id={index === 0 ? "buddy-preview" : undefined}>
          {index === 0 ? <BuddyPreview reduced={reduced} onInteract={() => setPaused(true)} /> : <>
            <div className="product-screen"><Image src={`/home/${slide.image}`} alt={index === 1 ? "Actual Lumen website starter included with the guide; fictional studio content" : "Personal Command Center showing sample priorities and notes"} width={1280} height={720} sizes="(max-width: 800px) 92vw, 54vw" /></div>
            <div className="creation-caption"><div><p>{slide.name.toUpperCase()}</p><span>{index === 1 ? "Beginner guide + editable website starter." : "Your everyday space. Saved in your browser."}</span></div></div>
          </>}
        </div>
      </article>)}
      <div className="showcase-sweep" key={turn} aria-hidden="true" />
    </div>
    <div className="showcase-controls">
      <span className="slide-count">0{active + 1} / 0{slides.length}</span>
      <div className="slide-selectors" aria-label="Choose a creation">{slides.map((slide, index) => <button type="button" key={slide.name} className={index === active ? "is-selected" : ""} aria-label={`Show ${slide.name}`} aria-current={index === active ? "true" : undefined} onClick={() => choose(index)} />)}</div>
      <div className="slide-transport"><button type="button" aria-label="Previous creation" onClick={() => choose(active - 1)}>Prev</button><button type="button" data-autoplay-toggle disabled={reduced} aria-label={reduced ? "Automatic rotation disabled for reduced motion" : paused ? "Play automatic rotation" : "Pause automatic rotation"} onClick={() => { setPaused(!paused); setTurn((n) => n + 1); }}>{reduced ? "Manual" : paused ? "Play" : "Pause"}</button><button type="button" aria-label="Next creation" onClick={() => choose(active + 1)}>Next</button></div>
      <span className="rotation-note">{reduced ? "Reduced motion · choose a creation" : paused ? "Paused · explore at your pace" : "A new creation every 6 seconds"}</span>
    </div>
    <span className="sr-only" aria-live={running ? "off" : "polite"}>{slides[active].name}</span>
  </section>;
}
