import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "A cinematic view of the range of technical, digital, and custom project work Xemory Systems can take on.",
};

export default function CapabilitiesPage() {
  return (
    <PageShell
      currentPath="/capabilities"
      eyebrow="Capabilities"
      title="Adaptable where it helps. Focused where it counts."
      intro="Xemory Systems is designed for meaningful work across digital, automation, interface, and technical implementation categories without losing coherence."
      highlights={["Custom engagement shape", "Cross-functional execution", "Future-facing systems"]}
      ctaTitle="The strongest work often spans more than one category."
      ctaBody="That overlap is often where the most useful systems, websites, and operational improvements come from."
    >
      <section data-flight-item className="flight-section">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 lg:block">
            <div className="portal-ring-field art-spin-slow">
              <div className="portal-ring" style={{ inset: "8%" }} />
              <div className="portal-ring portal-ring--warm" style={{ inset: "24%" }} />
              <div className="portal-ring" style={{ inset: "38%" }} />
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="flight-label">Matrix</p>
              <h2 className="mt-4 max-w-sm font-display text-5xl leading-[0.94] text-[var(--foreground)]">
                Range held inside a clear frame.
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                ["01", "Build new digital experiences."],
                ["02", "Refine existing systems."],
                ["03", "Translate ambiguity into scope."],
                ["04", "Support cross-disciplinary delivery."],
              ].map(([count, item]) => (
                <article key={item}>
                  <p className="text-[1rem] font-medium tracking-[0.18em] text-[var(--muted)]">{count}</p>
                  <p className="mt-4 max-w-sm font-display text-[2.65rem] leading-tight text-[var(--foreground)]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-flight-item className="flight-section pb-12">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="pointer-events-none absolute left-[58%] top-1/2 hidden h-72 w-72 -translate-y-1/2 xl:block">
            <div className="portal-ring-field art-spin-slow opacity-70">
              <div className="portal-ring" style={{ inset: "8%" }} />
              <div className="portal-ring portal-ring--warm" style={{ inset: "24%" }} />
              <div className="portal-ring" style={{ inset: "38%" }} />
            </div>
            <div className="portal-spark art-flicker" style={{ left: "18%", top: "24%" }} />
            <div className="portal-spark portal-spark--cool art-flicker-delayed" style={{ left: "72%", top: "36%" }} />
            <div className="portal-spark art-flicker-delayed" style={{ left: "56%", top: "74%" }} />
          </div>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <p className="flight-label">Good Fit</p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.95] text-[var(--foreground)]">
                Work that needs range, not noise.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 text-[1.18rem] leading-[1.75] text-[var(--muted-strong)]">
              <p>New website or digital presence</p>
              <p>Internal workflow or tooling refinement</p>
              <p>AI-related operating support</p>
              <p>Technical direction before implementation</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
