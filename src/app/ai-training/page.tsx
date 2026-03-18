import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "AI Training",
  description:
    "Management training, staff lectures, and practical workplace AI instruction from Xemory Systems.",
};

export default function AiTrainingPage() {
  return (
    <PageShell
      currentPath="/ai-training"
      eyebrow="AI Training"
      title="AI in the workplace is only useful when people know how to use it well."
      intro="The real bottleneck is rarely access. It is understanding. Xemory Systems helps management teams and full staffs learn how to use AI with judgment, clarity, and practical usefulness."
      highlights={["Management training", "Full staff lectures", "Integration-phase support"]}
      ctaTitle="Training should make the tools more useful, not more confusing."
      ctaBody="Xemory Systems can support a rollout with practical instruction that helps teams use AI confidently, responsibly, and in ways that actually improve the work."
    >
      <section data-flight-item className="flight-section">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="pointer-events-none absolute right-0 top-1/2 hidden h-72 w-96 -translate-y-1/2 xl:block">
            <div className="portal-beacon-line art-shimmer" style={{ left: "32%", top: "12%", height: "56%" }} />
            <div className="portal-beacon-line art-shimmer" style={{ left: "54%", top: "18%", height: "48%", animationDelay: "0.9s" }} />
            <div className="portal-beacon-line art-shimmer" style={{ left: "76%", top: "10%", height: "62%", animationDelay: "1.6s" }} />
            <div className="portal-beacon-orb art-breathe" style={{ left: "32%", top: "18%" }} />
            <div className="portal-beacon-orb art-breathe-delayed" style={{ left: "54%", top: "30%" }} />
            <div className="portal-beacon-orb art-breathe" style={{ left: "76%", top: "16%" }} />
            <div className="portal-scan art-shimmer-wide opacity-75" style={{ inset: "48% 4% auto 4%", height: "2.5rem" }} />
          </div>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="flight-label">The Gap</p>
              <h2 className="mt-4 max-w-sm font-display text-5xl leading-[0.94] text-[var(--foreground)]">
                Most teams do not need more hype. They need better understanding.
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                [
                  "The real problem",
                  "Many organizations now have access to AI tools, but staff often do not know how to use them effectively, safely, or consistently in the course of real work.",
                ],
                [
                  "The result",
                  "That creates hesitation, poor prompts, wasted time, uneven results, and a growing gap between the tool’s promise and the team’s actual day-to-day experience.",
                ],
                [
                  "Where Xemory fits",
                  "Xemory Systems closes that gap with practical instruction built around how people actually work, what management needs to understand, and how adoption should happen inside an organization.",
                ],
                [
                  "The standard",
                  "The goal is not novelty. The goal is confidence, useful habits, stronger output, and a workforce that understands when and how AI should be part of the workflow.",
                ],
              ].map(([title, body]) => (
                <article key={title}>
                  <p className="text-[0.96rem] font-medium tracking-[0.18em] text-[var(--muted)] uppercase">{title}</p>
                  <p className="mt-4 max-w-sm text-[1.16rem] leading-[1.75] text-[var(--muted-strong)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-flight-item className="flight-section pb-12">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="pointer-events-none absolute left-[58%] top-1/2 hidden h-80 w-80 -translate-y-1/2 xl:block">
            <div className="portal-ring-field art-spin-slow opacity-62">
              <div className="portal-ring" style={{ inset: "12%" }} />
              <div className="portal-ring portal-ring--warm" style={{ inset: "28%" }} />
            </div>
            <div className="portal-comet art-orbit-run" />
            <div className="portal-spark art-flicker" style={{ left: "24%", top: "22%" }} />
            <div className="portal-spark portal-spark--cool art-flicker-delayed" style={{ left: "72%", top: "36%" }} />
            <div className="portal-spark art-flicker-delayed" style={{ left: "62%", top: "76%" }} />
          </div>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <p className="flight-label">What We Offer</p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.95] text-[var(--foreground)]">
                Training for management, staff, and the integration phase itself.
              </h2>
            </div>
            <div className="grid gap-6 text-[1.18rem] leading-[1.76] text-[var(--muted-strong)]">
              <p>Management sessions focused on policy, expectations, opportunity, and responsible adoption.</p>
              <p>Full staff lectures that explain how AI can be used effectively in the workplace without confusion or intimidation.</p>
              <p>Hands-on instruction that shows teams how to prompt better, evaluate outputs, and use AI as a practical support tool rather than a novelty.</p>
              <p>Lecture and training support that can be folded directly into a broader implementation or integration phase.</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
