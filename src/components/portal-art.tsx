import type { Destination } from "@/lib/site-content";

type PortalArtProps = {
  art: Destination["art"];
};

export function PortalArt({ art }: PortalArtProps) {
  if (art === "planes") {
    return (
      <div className="portal-art">
        <div className="portal-glow bg-[radial-gradient(circle_at_25%_20%,rgba(244,180,107,0.45),transparent_42%),radial-gradient(circle_at_78%_72%,rgba(134,216,255,0.22),transparent_38%)]" />
        <div className="portal-plane art-drift" style={{ top: "20%", left: "8%", width: "68%" }} />
        <div
          className="portal-plane portal-plane--cool art-drift-reverse"
          style={{ top: "44%", left: "26%", width: "62%" }}
        />
        <div className="portal-plane art-drift" style={{ top: "66%", left: "16%", width: "58%" }} />
        <div className="portal-spark art-flicker" style={{ top: "18%", left: "70%" }} />
        <div className="portal-spark portal-spark--cool art-flicker-delayed" style={{ top: "58%", left: "74%" }} />
      </div>
    );
  }

  if (art === "rings") {
    return (
      <div className="portal-art">
        <div className="portal-glow bg-[radial-gradient(circle_at_50%_50%,rgba(134,216,255,0.24),transparent_52%)]" />
        <div className="portal-ring-field art-spin-slow">
          <div className="portal-ring" style={{ inset: "14%" }} />
          <div className="portal-ring portal-ring--warm" style={{ inset: "24%" }} />
          <div className="portal-ring" style={{ inset: "34%" }} />
        </div>
        <div className="portal-ring-field portal-ring-field--reverse art-spin-reverse">
          <div className="portal-ring portal-ring--warm" style={{ inset: "18%" }} />
        </div>
        <div className="portal-scan art-shimmer-wide" />
      </div>
    );
  }

  if (art === "orbit") {
    return (
      <div className="portal-art">
        <div className="portal-glow bg-[radial-gradient(circle_at_50%_50%,rgba(244,180,107,0.22),transparent_46%),radial-gradient(circle_at_58%_52%,rgba(134,216,255,0.18),transparent_30%)]" />
        <div className="portal-orbit art-spin-slow" />
        <div className="portal-orbit portal-orbit--tilt art-spin-reverse" />
        <div className="portal-core art-breathe" />
        <div className="portal-comet art-orbit-run" />
      </div>
    );
  }

  return (
    <div className="portal-art">
      <div className="portal-glow bg-[radial-gradient(circle_at_50%_58%,rgba(244,180,107,0.35),transparent_42%),radial-gradient(circle_at_68%_28%,rgba(134,216,255,0.22),transparent_26%)]" />
      <div className="portal-beacon-base art-breathe-delayed" />
      <div className="portal-beacon-line art-shimmer" />
      <div className="portal-beacon-orb art-breathe" />
      <div className="portal-beacon-wave art-expand" />
    </div>
  );
}
