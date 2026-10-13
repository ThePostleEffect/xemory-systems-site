"use client";
import { useEffect, useRef, useState } from "react";
import { reactBuddy, type DemoReaction } from "@/lib/demo-motion";

function Artwork({ buddy }: { buddy: "pip" | "sprout" }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    // Only the two reviewed, shipped local SVG files are accepted here.
    fetch(`/home/buddies/${buddy}.svg`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("Artwork unavailable"); return response.text(); })
      .then((text) => {
        if (controller.signal.aborted || !host.current) return;
        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        if (doc.querySelector("parsererror") || doc.documentElement.localName !== "svg") throw new Error("Invalid artwork");
        const svg = document.importNode(doc.documentElement, true);
        svg.removeAttribute("width"); svg.removeAttribute("height");
        svg.setAttribute("role", "img"); svg.setAttribute("aria-label", buddy === "pip" ? "Pip, a mint robot with a coral scarf" : "Sprout, a cheerful plant in a terracotta pot");
        svg.querySelectorAll("[data-expression]").forEach((node) => {
          (node as SVGElement).style.display = node.getAttribute("data-expression")?.split(" ").includes("content") ? "" : "none";
        });
        host.current.replaceChildren(svg);
      }).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => { controller.abort(); host.current?.getAnimations({ subtree: true }).forEach((animation) => animation.cancel()); };
  }, [buddy]);
  return <div className={`preview-buddy preview-${buddy}`} data-buddy-art={buddy} ref={host}>{failed ? <p>{buddy} artwork could not load. Please reload.</p> : null}</div>;
}

export function BuddyPreview({ reduced, onInteract }: { reduced: boolean; onInteract: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const [reaction, setReaction] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function react(action: DemoReaction) {
    onInteract(); setReaction(action);
    stage.current?.querySelectorAll<HTMLElement>("[data-buddy-art]").forEach((host) => reactBuddy(host, action, reduced));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setReaction(""), 2300);
  }
  return <div className="buddy-preview" ref={stage}>
    <div className="buddy-pair"><Artwork buddy="pip" /><Artwork buddy="sprout" /></div>
    <div className="creation-caption">
      <div><p>ANIMATED DESKTOP BUDDY</p><span>Scripted reactions. An editable starter.</span></div>
      <div className="reaction-buttons" aria-label="Try the buddy reactions">
        {(["Wave", "Happy hop", "Dance"] as DemoReaction[]).map((action) => <button key={action} type="button" aria-pressed={reaction === action} onClick={() => react(action)}>{action}</button>)}
      </div>
    </div>
    <span className="sr-only" role="status">{reaction ? reduced ? `${reaction} selected. Motion is reduced.` : `Pip and Sprout: ${reaction}.` : ""}</span>
  </div>;
}
