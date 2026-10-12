"use client";

import type { ReactNode } from "react";
import { Children } from "react";
import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import { DepthSequence } from "@/components/depth-sequence";
import { PageDock } from "@/components/page-dock";
import { siteContent } from "@/lib/site-content";

type PageShellProps = {
  currentPath: string;
  eyebrow: string;
  title: string;
  intro: string;
  highlights: readonly string[];
  children: ReactNode;
  showCta?: boolean;
  ctaTitle?: string;
  ctaBody?: string;
};

export function PageShell({
  currentPath,
  eyebrow,
  title,
  intro,
  highlights,
  children,
  showCta = true,
  ctaTitle = "If the work matters, the details matter too.",
  ctaBody = "Xemory Systems takes on practical technical work with a high standard for clarity, execution, and finish.",
}: PageShellProps) {
  const childScenes = Children.toArray(children);
  const scenes = [
    {
      key: "hero",
      align: "top" as const,
      render: () => (
        <section className="flight-section flight-section--hero">
          <div className="flight-body">
            <div className="flight-rule" />
            <p className="flight-eyebrow">{eyebrow}</p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.9] text-[var(--foreground)] sm:text-6xl lg:text-[5.4rem]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.35rem] leading-[1.72] text-[var(--muted-strong)] sm:text-[1.55rem]">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-[1.02rem] text-[var(--muted-strong)] sm:text-[1.08rem]">
              {highlights.map((highlight) => (
                <span key={highlight} className="flight-chip">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    ...childScenes.map((child, index) => ({
      key: `child-${index}`,
      render: () => child,
    })),
    ...(showCta
      ? [
          {
            key: "cta",
            align: "bottom" as const,
            stable: true,
            render: () => (
              <section className="flight-section">
                <div className="flight-body">
                  <div className="flight-rule" />
                  <p className="flight-eyebrow text-[var(--accent-amber)]">Contact</p>
                  <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[0.94] text-[var(--foreground)] sm:text-5xl">
                    {ctaTitle}
                  </h2>
                  <p className="mt-5 max-w-2xl text-[1.2rem] leading-[1.7] text-[var(--muted-strong)] sm:text-[1.32rem]">
                    {ctaBody}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--accent-amber)]/35 bg-[linear-gradient(135deg,rgba(244,180,107,0.18),rgba(134,216,255,0.14))] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground)] uppercase shadow-[0_18px_40px_rgba(0,0,0,0.32)] transition hover:border-[color:var(--accent-cyan)]/45 hover:shadow-[0_20px_55px_rgba(27,83,128,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    >
                      Go To Contact
                    </Link>
                    <p className="text-[1.02rem] leading-8 text-[var(--muted)]">
                      Contact details live on the contact page. Based in {siteContent.location}.
                    </p>
                  </div>
                </div>
              </section>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="relative isolate min-h-screen overflow-x-clip pb-40">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]"
      >
        Skip to content
      </a>

      <header className="fixed left-3 top-3 z-40 sm:left-5 sm:top-5">
        <BrandLockup compact />
      </header>

      <main id="main-content" className="relative z-20 px-4 pt-28 sm:px-6 lg:px-8">
        <DepthSequence scenes={scenes} fallbackClassName="flight-sequence mx-auto max-w-6xl" />
      </main>

      <PageDock currentPath={currentPath} />
    </div>
  );
}
