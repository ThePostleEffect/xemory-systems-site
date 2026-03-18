"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export type DepthSceneState = {
  local: number;
  enter: number;
  exit: number;
  visibility: number;
  scale: number;
  opacity: number;
  blur: number;
  lift: number;
  drift: number;
  isActive: boolean;
};

export type DepthSequenceScene = {
  key: string;
  align?: "top" | "center" | "bottom";
  stable?: boolean;
  render: (state: DepthSceneState) => ReactNode;
};

type DepthSequenceProps = {
  scenes: readonly DepthSequenceScene[];
  fallbackClassName?: string;
  stageClassName?: string;
  trackVh?: number;
};

function getDepthSceneState(local: number, stable = false): DepthSceneState {
  // Keep a clearer "reading hold" in the center before the next scene starts surfacing.
  const enterStart = stable ? -0.48 : -0.42;
  const enterEnd = stable ? -0.04 : -0.02;
  const enter = easeOutCubic(clamp((local - enterStart) / (enterEnd - enterStart), 0, 1));
  const exitStart = stable ? 1.48 : 0.52;
  const exitEnd = stable ? 2 : 1.02;
  const exit = easeInOutCubic(clamp((local - exitStart) / (exitEnd - exitStart), 0, 1));
  const visibility = clamp(enter * (1 - exit), 0, 1);
  const scale = local < exitStart ? mix(0.66, 1, enter) : mix(1, stable ? 0.96 : 0.72, exit);
  const opacity = local < exitStart ? mix(0, 1, enter) : mix(1, stable ? 0.94 : 0, exit);
  const blur = local < exitStart ? mix(18, 0, enter) : mix(0, stable ? 0.6 : 9, exit);
  const lift = local < exitStart ? mix(6.5, 0, enter) : mix(0, stable ? -0.35 : -4.8, exit);
  const drift = local < exitStart ? mix(1.6, 0, enter) : mix(0, stable ? 0.15 : -1.2, exit);

  return {
    local,
    enter,
    exit,
    visibility,
    scale,
    opacity,
    blur,
    lift,
    drift,
    isActive: visibility > 0.56,
  };
}

export function DepthSequence({
  scenes,
  fallbackClassName,
  stageClassName,
  trackVh = 120,
}: DepthSequenceProps) {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactStage, setCompactStage] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(mediaQuery.matches);

    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);

    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateCompactStage = () => setCompactStage(mediaQuery.matches);

    updateCompactStage();
    mediaQuery.addEventListener("change", updateCompactStage);

    return () => mediaQuery.removeEventListener("change", updateCompactStage);
  }, []);

  const stageEnabled = !reducedMotion && !compactStage && scenes.length > 1;

  useEffect(() => {
    if (!stageEnabled) {
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      if (!sequenceRef.current) {
        return;
      }

      const rect = sequenceRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const next = total <= 0 ? 0 : clamp(-rect.top / total, 0, 1);

      setProgress(next);
    };

    const onScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [stageEnabled]);

  const track = useMemo(
    () => (scenes.length > 1 ? progress * (scenes.length - 1) : 0),
    [progress, scenes.length],
  );

  if (!stageEnabled) {
    return (
      <div className={fallbackClassName}>
        {scenes.map((scene) => scene.render(getDepthSceneState(0, scene.stable)))}
      </div>
    );
  }

  return (
    <div
      ref={sequenceRef}
      className="depth-sequence"
      style={{ height: `${Math.max(scenes.length * trackVh, 200)}vh` }}
    >
      <div className={`depth-stage ${stageClassName ?? ""}`}>
        <div className="depth-stage__chamber depth-stage__chamber--outer" aria-hidden="true" />
        <div className="depth-stage__chamber depth-stage__chamber--inner" aria-hidden="true" />
        <div className="depth-stage__glow" aria-hidden="true" />
        <div className="depth-stage__mist" aria-hidden="true" />

        {scenes.map((scene, index) => {
          const state = getDepthSceneState(track - index, scene.stable);

          return (
            <div
              key={scene.key}
              className={`depth-scene depth-scene--${scene.align ?? "center"}`}
              style={{
                opacity: state.opacity,
                filter: `blur(${state.blur}px)`,
                transform: `translate3d(${state.drift}rem, ${state.lift}rem, 0) scale(${state.scale})`,
                pointerEvents: state.visibility > 0.6 ? "auto" : "none",
                zIndex: Math.round(state.visibility * 100) + (scenes.length - index),
              }}
            >
              <div className="depth-scene__inner">{scene.render(state)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
