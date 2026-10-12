"use client";

import Image from "next/image";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { ContactAction } from "@/components/contact-action";
import { DepthSequence } from "@/components/depth-sequence";
import type { DepthSequenceScene } from "@/components/depth-sequence";
import { PortalArt } from "@/components/portal-art";
import { siteContent } from "@/lib/site-content";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

export function HomeExperience() {
  const scenes: readonly DepthSequenceScene[] = [
    {
      key: "hero",
      align: "top" as const,
      render: () => (
        <section className="depth-home-section depth-home-section--hero">
          <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-end">
            <div className="relative">
              <div className="pointer-events-none absolute -left-8 top-24 hidden h-44 w-44 lg:block">
                <div className="portal-spark art-flicker" style={{ left: "12%", top: "18%" }} />
                <div className="portal-spark portal-spark--cool art-flicker-delayed" style={{ left: "72%", top: "26%" }} />
                <div className="portal-spark art-flicker-delayed" style={{ left: "48%", top: "72%" }} />
                <div className="portal-scan art-shimmer-wide opacity-70" style={{ inset: "42% 0 42% 0" }} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--accent-cyan)]">
                Intelligent Systems. Refined Execution.
              </p>
              <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[0.92] text-[var(--foreground)] sm:text-7xl lg:text-[6rem]">
                Xemory Systems builds thoughtful digital work with depth, precision, and range.
              </h1>
              <div className="mt-8 flex flex-wrap gap-3 text-[0.95rem] text-[var(--muted-strong)] sm:text-[1rem]">
                {["Web platforms", "AI-related implementation", "Automation systems", "Custom technical delivery"].map(
                  (item) => (
                    <span key={item} className="flight-chip border-white/12 bg-white/4">
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(160deg,rgba(11,18,27,0.84),rgba(11,15,21,0.62))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-md sm:p-8">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-[12%] top-[14%] h-px bg-[linear-gradient(90deg,rgba(244,180,107,0),rgba(244,180,107,0.72),rgba(134,216,255,0.26),rgba(134,216,255,0))]" />
                <div className="absolute inset-x-[20%] top-[72%] h-px bg-[linear-gradient(90deg,rgba(134,216,255,0),rgba(134,216,255,0.52),rgba(244,180,107,0.16),rgba(244,180,107,0))]" />
                <div className="absolute right-[10%] top-[12%] h-64 w-64">
                  <div className="portal-orbit art-spin-slow opacity-75" />
                  <div className="portal-orbit portal-orbit--tilt art-spin-reverse opacity-60" />
                  <div className="portal-core art-breathe opacity-90" />
                  <div className="portal-comet art-orbit-run" />
                </div>
                <div className="portal-plane art-drift opacity-80" style={{ top: "24%", left: "6%", width: "38%" }} />
                <div
                  className="portal-plane portal-plane--cool art-drift-reverse opacity-70"
                  style={{ top: "58%", left: "18%", width: "32%" }}
                />
                <div className="portal-scan art-shimmer-wide opacity-75" style={{ inset: "auto 10% 18% 10%", top: "auto" }} />
              </div>

              <div className="relative z-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
                <Link
                  href="/ai-training"
                  className="group rounded-[1.6rem] border border-white/8 bg-black/18 p-5 backdrop-blur-sm transition hover:border-[var(--accent-cyan)]/30 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--accent-amber)]">
                    AI Training
                  </p>
                  <h2 className="mt-4 font-display text-[2rem] leading-none text-[var(--foreground)] sm:text-[2.2rem]">
                    Bring practical AI fluency into the workplace.
                  </h2>
                  <p className="mt-4 text-base leading-[1.8] text-[var(--muted-strong)] sm:text-lg">
                    Explore management training, full staff lectures, and integration-phase instruction designed to
                    help teams use AI with real confidence and judgment.
                  </p>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)] transition group-hover:text-[var(--foreground)]">
                    Open AI Training
                  </p>
                </Link>

                <div className="space-y-5 pl-0 lg:pl-8">
                  <p className="max-w-xl text-lg leading-[1.8] text-[var(--muted-strong)] sm:text-xl">
                    Based in {siteContent.location}, Xemory Systems takes on digital systems, AI-related
                    implementation, workflow automation, custom builds, and technical work that benefits from real
                    judgment.
                  </p>
                  <div className="grid gap-3 text-sm uppercase tracking-[0.24em] text-[var(--muted)] sm:grid-cols-2">
                    <p>Structured systems</p>
                    <p>Measured automation</p>
                    <p>Adaptive delivery</p>
                    <p>Real technical judgment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },
    {
      key: "destinations",
      align: "center" as const,
      render: (state) => {
        const reveal = state.enter;
        const recede = state.exit;

        return (
          <section className="depth-home-section depth-home-section--portals">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                Primary Destinations
              </p>
              <p className="text-base text-[var(--muted)]">Scroll forward to move deeper into the site.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 lg:auto-rows-fr">
              {siteContent.destinations.map((item, index) => {
                const side = index % 2 === 0 ? -1 : 1;
                const entryShift = mix(2.8 * side, 0, reveal);
                const exitShift = mix(0, 3.2 * side, recede);
                const rise = mix(2.4 + index * 0.35, 0, reveal);
                const fall = mix(0, -2.8 - index * 0.45, recede);
                const scale = mix(0.86, 1, reveal) * mix(1, 0.76, recede);
                const opacity = clamp(mix(0, 1, reveal) * mix(1, 0, recede), 0, 1);
                const blur = mix(10, 0, reveal) + recede * 2.4;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="portal-card portal-card--home group h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)]"
                    style={{
                      filter: `blur(${blur}px)`,
                      opacity,
                      transform: `translate3d(${entryShift + exitShift}rem, ${rise + fall}rem, 0) scale(${scale})`,
                    }}
                  >
                    <div className="portal-card__surface">
                      <div className="home-portal-copy">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-amber)]">
                            {item.eyebrow}
                          </p>
                          <h2 className="mt-3 font-display text-[2rem] leading-none text-[var(--foreground)] sm:text-[2.2rem]">
                            {item.title}
                          </h2>
                          <p className="home-portal-description mt-3 max-w-lg text-[1.02rem] leading-[1.7] text-[var(--muted-strong)] sm:text-[1.08rem]">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <PortalArt art={item.art} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      },
    },
    {
      key: "contact",
      align: "bottom" as const,
      stable: true,
      render: (state) => {
        const logoRevealProgress = clamp(state.enter + (1 - state.exit) * 0.24, 0, 1);

        return (
          <section className="depth-home-section depth-home-section--contact">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 overflow-visible" aria-hidden="true">
              <div
                className="absolute left-1/2 bottom-[-9rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,180,107,0.16),rgba(134,216,255,0.08)_42%,transparent_72%)] blur-3xl"
                style={{
                  opacity: 0.06 + logoRevealProgress * 0.34,
                  transform: `translateX(-50%) scale(${0.76 + logoRevealProgress * 0.5})`,
                }}
              />
              <div
                className="absolute left-1/2 bottom-[-10rem] h-[38rem] w-[38rem] -translate-x-1/2"
                style={{
                  opacity: 0.04 + logoRevealProgress * 0.52,
                  transform: `translateX(-50%) scale(${0.7 + logoRevealProgress * 0.58})`,
                }}
              >
                <Image
                  src="/logo-bg.png"
                  alt=""
                  fill
                  priority={false}
                  aria-hidden="true"
                  className="object-contain drop-shadow-[0_0_40px_rgba(244,180,107,0.22)]"
                />
              </div>
            </div>

            <div className="relative z-10 overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(11,18,27,0.9),rgba(12,14,19,0.84))] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:px-10 sm:py-12">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                    Contact
                  </p>
                  <h2 className="mt-4 max-w-3xl font-display text-5xl leading-none text-[var(--foreground)] sm:text-6xl">
                    Serious work deserves a direct path forward.
                  </h2>
                  <p className="mt-6 max-w-2xl text-xl leading-[1.8] text-[var(--muted-strong)]">
                    Whether the need is concrete or still taking shape, Xemory Systems is open to digital, automation,
                    AI-related, and custom technical work with a serious standard.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-5 lg:items-end">
                  <ContactAction label="Contact Xemory Systems" />
                  <p className="max-w-md text-base leading-[1.8] text-[var(--muted)] lg:text-right">
                    Prefer direct contact? Email {siteContent.contactEmail}. Based in {siteContent.location}.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      },
    },
  ];

  return (
    <main className="relative isolate min-h-screen overflow-x-clip pb-16">
      <a
        href="#home-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]"
      >
        Skip to content
      </a>

      <header className="relative z-20 px-3 pt-3 sm:px-5 sm:pt-5">
        <BrandLockup />
      </header>

      <section id="home-content" className="relative z-20 px-4 pt-10 sm:px-6 lg:px-8">
        <DepthSequence
          scenes={scenes}
          fallbackClassName="mx-auto flex max-w-6xl flex-col gap-12 pb-10"
          stageClassName="home-depth-stage"
          trackVh={136}
        />
      </section>
    </main>
  );
}
