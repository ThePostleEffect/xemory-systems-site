import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "A cinematic view of Xemory Systems, its standards, and its base in Bellingham, Washington.",
};

export default function AboutPage() {
  return (
    <PageShell
      currentPath="/about"
      eyebrow="About"
      title="Future-facing, but disciplined about what quality actually means."
      intro="Xemory Systems is based in Bellingham, Washington and built around the idea that advanced technical work should still feel calm, clear, and human on the surface."
      highlights={["Bellingham, Washington", "Intentional execution", "Elegant systems"]}
      ctaTitle="The standard is substance with finish."
      ctaBody="A result should not just function. It should also feel credible, accessible, and structurally sound."
    >
      <section data-flight-item className="flight-section">
        <div data-flight-body className="flight-body relative text-center">
          <div className="flight-rule mx-auto" />
          <p className="flight-label">Perspective</p>
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="portal-orbit art-spin-slow" />
            <div className="portal-orbit portal-orbit--tilt art-spin-reverse" />
            <div className="portal-core art-breathe" />
          </div>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-5xl leading-[0.94] text-[var(--foreground)]">
            Technology should clarify the work, not perform around it.
          </h2>
        </div>
      </section>

      <section data-flight-item className="flight-section pb-12">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <aside className="relative hidden min-h-[34rem] xl:block">
              <div className="absolute inset-x-0 top-0 rounded-[2rem] border border-white/8 bg-[linear-gradient(160deg,rgba(10,15,22,0.8),rgba(8,11,17,0.52))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  Design ethic
                </p>
                <div className="relative mt-8 h-72 overflow-hidden rounded-[1.7rem] border border-white/8 bg-black/20">
                  <div className="portal-orbit art-spin-slow opacity-70" />
                  <div className="portal-orbit portal-orbit--tilt art-spin-reverse opacity-58" />
                  <div className="portal-core art-breathe opacity-90" />
                  <div className="portal-comet art-orbit-run" />
                  <div className="portal-spark art-flicker" style={{ left: "20%", top: "28%" }} />
                  <div className="portal-spark portal-spark--cool art-flicker-delayed" style={{ left: "74%", top: "62%" }} />
                </div>
                <div className="mt-8 space-y-3">
                  <p className="font-display text-[2.4rem] leading-none text-[var(--foreground)]">Intentional.</p>
                  <p className="font-display text-[2.4rem] leading-none text-[var(--foreground)]">Useful.</p>
                  <p className="font-display text-[2.4rem] leading-none text-[var(--foreground)]">Understandable.</p>
                </div>
                <p className="mt-6 max-w-sm text-base leading-[1.8] text-[var(--muted)]">
                  The standard is not novelty. It is clarity, usefulness, and a finish that feels earned.
                </p>
              </div>
            </aside>

            <div className="max-w-3xl space-y-8 text-[1.22rem] leading-[1.82] text-[var(--muted-strong)] sm:text-[1.34rem]">
              <p>
                <strong className="font-semibold text-[var(--foreground)]">
                  Xemory Systems was built from a simple idea: technology should remove friction, not create more of
                  it.
                </strong>{" "}
                What began as a software-focused effort grew into something broader: a company dedicated to building
                smarter digital systems, improving workflows, and helping businesses make practical use of modern tools
                without the confusion, waste, or unnecessary complexity that often comes with them.
              </p>
              <p>
                Based in {siteContent.location}, Xemory Systems was created with a forward-looking mindset and a very
                real understanding of the problems people and businesses face every day. Too many organizations are
                slowed down by repetitive tasks, disconnected systems, wasted time, and outdated ways of operating.
              </p>
              <p>
                As technology has evolved, so has our direction. Xemory Systems has expanded beyond traditional
                software thinking into a more adaptive approach that includes automation, AI-related implementation,
                digital systems design, technical problem-solving, and custom project support.
              </p>
              <p className="font-medium text-[var(--accent-amber)]">
                We believe good technology should feel intentional. It should be useful. It should be understandable.
                And it should make life and work better, not more complicated.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
