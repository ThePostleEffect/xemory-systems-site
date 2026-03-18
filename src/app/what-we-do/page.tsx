import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "A cinematic overview of the digital systems, automation, AI-related implementation, and custom technical work Xemory Systems delivers.",
};

export default function WhatWeDoPage() {
  return (
    <PageShell
      currentPath="/what-we-do"
      eyebrow="What We Do"
      title="Digital work that feels composed, not assembled."
      intro="Xemory Systems takes on websites, automation, AI-related implementation, and custom technical delivery where clarity and finish both matter."
      highlights={["Digital systems", "AI-related delivery", "Workflow automation"]}
      ctaTitle="Defined build, technical ambiguity, or operational drag."
      ctaBody="Any of those can be a strong starting point when the goal is a better system and a better result."
    >
      <section data-flight-item className="flight-section">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="pointer-events-none absolute right-0 top-6 hidden h-40 w-96 lg:block">
            <div className="portal-plane art-drift" style={{ top: "12%", left: "18%", width: "72%" }} />
            <div className="portal-plane portal-plane--cool art-drift-reverse" style={{ top: "44%", left: "30%", width: "58%" }} />
            <div className="portal-plane art-drift" style={{ top: "74%", left: "12%", width: "52%" }} />
          </div>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="flight-label">Structure</p>
              <h2 className="mt-4 max-w-sm font-display text-5xl leading-[0.94] text-[var(--foreground)]">
                Systems built with deliberate shape.
              </h2>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                ["Digital Systems", "Websites, tools, and operating systems shaped to feel cleaner and more credible."],
                ["AI-Related Implementation", "Applied where it creates leverage, structure, or better decision support."],
                ["Automation", "Workflow improvements that reduce repetitive drag without introducing fragility."],
              ].map(([title, body], index) => (
                <article key={title}>
                  <p className="text-[1rem] font-medium tracking-[0.16em] text-[var(--muted)]">{`0${index + 1}`}</p>
                  <h3 className="mt-4 font-display text-[2.65rem] leading-none text-[var(--foreground)]">{title}</h3>
                  <p className="mt-4 max-w-sm text-[1.18rem] leading-[1.75] text-[var(--muted-strong)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-flight-item className="flight-section pb-12">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-56 w-96 -translate-y-1/2 xl:block">
            <div className="portal-plane art-drift-reverse opacity-80" style={{ top: "18%", left: "12%", width: "66%" }} />
            <div className="portal-plane portal-plane--cool art-drift opacity-70" style={{ top: "42%", left: "30%", width: "52%" }} />
            <div className="portal-plane art-drift-reverse opacity-65" style={{ top: "68%", left: "18%", width: "60%" }} />
            <div className="portal-scan art-shimmer-wide opacity-70" />
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="flight-label">Working Rhythm</p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.94] text-[var(--foreground)]">
                Scope the need. Clarify the shape. Build the right thing.
              </h2>
            </div>
            <div className="space-y-6 text-[1.12rem] leading-[1.72] text-[var(--muted-strong)] sm:text-[1.2rem]">
              <p>Custom builds where generic software does not fit.</p>
              <p>Technical problem-solving when the path is still unclear.</p>
              <p>Flexible support when the work spans design, systems, and delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
