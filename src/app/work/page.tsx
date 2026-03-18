import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { featuredWork, supportingWork } from "@/lib/work-content";

export const metadata: Metadata = {
  title: "Representative Work",
  description:
    "Representative independent work from Xemory Systems, including experimental systems, product builds, operational tools, and creative production.",
};

const signalLanes = [
  "Frame-by-frame behavioral records from short controlled sessions",
  "Emotion classification with confidence scoring",
  "Valence, arousal, head pose, smile, mouth, and eye metrics",
  "Stimulus-synced timestamps for structured replay and analysis",
] as const;

const beaconLanes = [
  "Outer shell with diffused lighting and camera windows",
  "Multi-camera capture layer with far-field audio",
  "Mini-PC class compute core with local storage and networking",
  "Base ring for power, service access, airflow, and speaker hardware",
] as const;

const rangeLanes = [
  "Digital systems and custom web surfaces",
  "Workflow automation and operational tooling",
  "Experimental AI and knowledge-system implementation",
  "Cross-disciplinary delivery that spans design, software, and systems thinking",
] as const;

export default function WorkPage() {
  const [beaconProject, ...otherProjects] = supportingWork;

  return (
    <PageShell
      currentPath="/work"
      eyebrow="Representative Work"
      title="Work that shows how Xemory thinks, builds, and explores."
      intro="Xemory Systems is a newly launched company, but the underlying work is not hypothetical. These independent projects and research efforts reflect the standards, range, and technical judgment behind the business."
      highlights={["Independent builds", "Experimental systems", "Cross-disciplinary range"]}
      ctaTitle="If the examples resonate, the next step is a real conversation."
      ctaBody="Representative work should make the standard visible. If the fit feels right, continue to the next layer and start a serious conversation."
    >
      <section className="flight-section">
        <div className="flight-body relative">
          <div className="flight-rule" />
          <p className="flight-label">Featured Project</p>
          <div className="mt-7 grid gap-6 xl:grid-cols-[1.14fr_0.86fr] xl:items-stretch">
            <article className="depth-window depth-window--wide">
              <div className="pointer-events-none absolute inset-0 opacity-75">
                <div className="portal-ring-field opacity-48">
                  <div className="portal-ring" style={{ inset: "14%" }} />
                  <div className="portal-ring portal-ring--warm" style={{ inset: "26%" }} />
                </div>
                <div className="portal-orbit art-spin-slow opacity-26" />
                <div className="portal-orbit portal-orbit--tilt art-spin-reverse opacity-34" />
                <div className="portal-comet art-orbit-run" />
              </div>
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold tracking-[0.2em] uppercase">
                  <span className="depth-window__tag">{featuredWork.category}</span>
                  <span className="depth-window__tag depth-window__tag--accent">{featuredWork.status}</span>
                </div>
                <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[0.94] text-[var(--foreground)] sm:text-[3.55rem]">
                  {featuredWork.title}
                </h2>
                <p className="mt-5 max-w-3xl text-[1.08rem] leading-[1.78] text-[var(--muted-strong)] sm:text-[1.16rem]">
                  {featuredWork.summary}
                </p>
                <p className="mt-4 max-w-3xl text-[1rem] leading-[1.76] text-[var(--muted)] sm:text-[1.06rem]">
                  {featuredWork.detail}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-[0.94rem] text-[var(--muted-strong)]">
                  {featuredWork.systems.map((system) => (
                    <span key={system} className="flight-chip">
                      {system}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <article className="depth-window depth-window--tower">
              <p className="depth-window__eyebrow">Signal Density</p>
              <div className="mt-5 space-y-4">
                {featuredWork.proofPoints.map((point) => (
                  <div key={point} className="depth-window__metric">
                    <p className="text-[0.98rem] leading-[1.64] text-[var(--muted-strong)]">{point}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="flight-section">
        <div className="flight-body relative">
          <div className="flight-rule" />
          <p className="flight-label">Captured Structure</p>
          <div className="mt-7 grid gap-6 xl:grid-cols-[0.86fr_1.14fr] xl:items-stretch">
            <article className="depth-window depth-window--arched">
              <p className="depth-window__eyebrow">Sample Output</p>
              <p className="mt-4 max-w-lg text-[1rem] leading-[1.72] text-[var(--muted-strong)]">
                Even short sessions produced dense, time-synced records with enough structure to support serious
                downstream analysis.
              </p>
              <pre className="mt-5 overflow-x-auto rounded-[1.4rem] border border-white/8 bg-black/40 p-4 text-[0.84rem] leading-[1.66] text-[var(--accent-cyan)] sm:text-[0.9rem]">
                <code>{featuredWork.sample.join("\n")}</code>
              </pre>
            </article>

            <div className="grid gap-6">
              <article className="depth-window depth-window--soft">
                <p className="depth-window__eyebrow">Signals Captured</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {signalLanes.map((lane) => (
                    <div key={lane} className="depth-window__metric">
                      <p className="text-[0.98rem] leading-[1.66] text-[var(--muted-strong)]">{lane}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="depth-window depth-window--capsule">
                <p className="depth-window__eyebrow">Why It Matters</p>
                <p className="mt-4 max-w-3xl text-[1.02rem] leading-[1.74] text-[var(--muted-strong)]">
                  This is not presented as a finished public product. It is evidence of technical depth, research
                  discipline, and serious exploration around identity, behavior, memory, and continuity-oriented
                  systems.
                </p>
                <p className="mt-3 max-w-3xl text-[0.98rem] leading-[1.72] text-[var(--muted)]">
                  The testing described here was consent-based and structured for study use. The presentation is meant
                  to show capability without overstating current product maturity.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="flight-section">
        <div className="flight-body relative">
          <div className="flight-rule" />
          <p className="flight-label">Embodied System Design</p>
          <div className="mt-7 grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-stretch">
            <article className="depth-window depth-window--tower">
              <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold tracking-[0.2em] uppercase">
                <span className="depth-window__tag">{beaconProject.category}</span>
                <span className="depth-window__tag depth-window__tag--accent">{beaconProject.status}</span>
              </div>
              <h2 className="mt-5 font-display text-4xl leading-[0.95] text-[var(--foreground)] sm:text-[3rem]">
                {beaconProject.title}
              </h2>
              <p className="mt-4 text-[1.02rem] leading-[1.74] text-[var(--muted-strong)]">{beaconProject.summary}</p>
              <p className="mt-4 text-[0.98rem] leading-[1.72] text-[var(--muted)]">{beaconProject.detail}</p>
            </article>

            <div className="grid gap-6">
              <article className="depth-window depth-window--wide">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="portal-scan art-shimmer-wide opacity-60" style={{ inset: "26% 10% auto 10%", height: "2.25rem" }} />
                  <div className="portal-spark art-flicker" style={{ left: "18%", top: "24%" }} />
                  <div className="portal-spark portal-spark--cool art-flicker-delayed" style={{ left: "74%", top: "68%" }} />
                </div>
                <div className="relative z-10">
                  <p className="depth-window__eyebrow">System Architecture</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {beaconLanes.map((lane) => (
                      <div key={lane} className="depth-window__metric">
                        <p className="text-[0.98rem] leading-[1.66] text-[var(--muted-strong)]">{lane}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className="depth-window depth-window--soft">
                <p className="depth-window__eyebrow">Heirloom Intent</p>
                <p className="mt-4 text-[1.02rem] leading-[1.74] text-[var(--muted-strong)]">
                  The Beacon is not only about housing compute. It is a concept for a family-kept object: something
                  symbolic, calm, and physically worthy of legacy rather than disposable hardware.
                </p>
                <p className="mt-3 text-[0.98rem] leading-[1.72] text-[var(--muted)]">
                  Current imagery should be understood as design studies and mockups, ranging from minimal spherical
                  forms to more sculptural and ceremonial directions that could eventually serve different emotional or
                  cultural settings.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="flight-section">
        <div className="flight-body relative">
          <div className="flight-rule" />
          <p className="flight-label">Supporting Projects</p>
          <div className="mt-7 grid gap-6 xl:grid-cols-[0.76fr_0.9fr_0.76fr] xl:items-stretch">
            {otherProjects.map((project, index) => (
              <article
                key={project.slug}
                className={`depth-window ${
                  index === 0 ? "depth-window--tower" : index === 1 ? "depth-window--soft" : "depth-window--arched"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  {index === 0 ? (
                    <>
                      <div className="portal-plane art-drift" style={{ left: "12%", right: "18%", top: "26%" }} />
                      <div className="portal-plane portal-plane--cool art-drift-reverse" style={{ left: "18%", right: "12%", top: "58%" }} />
                    </>
                  ) : index === 1 ? (
                    <>
                      <div className="portal-ring-field opacity-30">
                        <div className="portal-ring" style={{ inset: "18%" }} />
                        <div className="portal-ring portal-ring--warm" style={{ inset: "34%" }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="portal-orbit art-spin-slow opacity-40" style={{ inset: "16%" }} />
                      <div className="portal-orbit portal-orbit--tilt art-spin-reverse opacity-34" style={{ inset: "24%" }} />
                    </>
                  )}
                </div>

                <div className="relative z-10">
                  <p className="text-[0.72rem] font-semibold tracking-[0.2em] text-[var(--accent-amber)] uppercase">
                    {project.category}
                  </p>
                  <h3 className="mt-4 font-display text-4xl leading-[0.96] text-[var(--foreground)]">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-[0.78rem] font-semibold tracking-[0.2em] text-[var(--accent-cyan)] uppercase">
                    {project.status}
                  </p>
                  <p className="mt-4 text-[1rem] leading-[1.72] text-[var(--muted-strong)]">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-3 text-[0.92rem] text-[var(--muted-strong)]">
                    {project.proofPoints.map((point) => (
                      <span key={point} className="flight-chip">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flight-section">
        <div className="flight-body relative">
          <div className="flight-rule" />
          <p className="flight-label">Operational Range</p>
          <div className="mt-7 grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-stretch">
            <article className="depth-window depth-window--soft">
              <p className="depth-window__eyebrow">Capabilities In Practice</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {rangeLanes.map((lane) => (
                  <div key={lane} className="depth-window__metric">
                    <p className="text-[0.98rem] leading-[1.66] text-[var(--muted-strong)]">{lane}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="depth-window depth-window--wide">
              <div className="pointer-events-none absolute inset-0 opacity-72">
                <div className="portal-scan art-shimmer-wide opacity-70" style={{ inset: "46% 8% auto 8%", height: "2.4rem" }} />
                <div className="absolute right-10 top-8 h-40 w-40">
                  <div className="portal-orbit art-spin-slow opacity-44" />
                  <div className="portal-orbit portal-orbit--tilt art-spin-reverse opacity-32" />
                  <div className="portal-core art-breathe opacity-70" />
                </div>
              </div>
              <div className="relative z-10">
                <p className="depth-window__eyebrow">AI Training</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.96] text-[var(--foreground)]">
                  Training can be part of the delivery, not an afterthought.
                </h2>
                <p className="mt-4 max-w-2xl text-[1.04rem] leading-[1.74] text-[var(--muted-strong)]">
                  Xemory supports management teams and full staffs with practical instruction around AI use, adoption,
                  and integration. The goal is not novelty. It is clarity, confidence, and real workplace usefulness.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-[0.94rem] text-[var(--muted-strong)]">
                  {["Management sessions", "Staff lectures", "Integration-phase support"].map((item) => (
                    <span key={item} className="flight-chip">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href="/ai-training"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--accent-amber)]/35 bg-[linear-gradient(135deg,rgba(244,180,107,0.16),rgba(134,216,255,0.12))] px-5 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground)] uppercase shadow-[0_16px_42px_rgba(0,0,0,0.28)] transition hover:border-[color:var(--accent-cyan)]/45 hover:shadow-[0_20px_55px_rgba(27,83,128,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    Open AI Training
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
