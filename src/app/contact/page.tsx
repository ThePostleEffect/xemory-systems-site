import type { Metadata } from "next";

import { ContactIntakeForm } from "@/components/contact-intake-form";
import { PageShell } from "@/components/page-shell";
import { siteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Xemory Systems in Bellingham, Washington to start a conversation about digital, automation, AI-related, and custom technical work.",
};

export default function ContactPage() {
  return (
    <PageShell
      currentPath="/contact"
      eyebrow="Contact"
      title="A serious contact system for serious project conversations."
      intro="Reach out with a defined need, an early idea, or a technically difficult problem. Xemory Systems is open to practical conversations that can turn into strong work."
      highlights={[siteContent.contactEmail, siteContent.contactPhone, "Bellingham, Washington"]}
      showCta={false}
      ctaTitle="Built for clearer first contact."
      ctaBody="The contact experience is designed to feel calm, direct, and credible for serious inquiries."
    >
      <section data-flight-item data-no-flight-transform className="flight-section">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="relative max-w-xl">
              <p className="flight-label">Project Intake</p>
              <div className="pointer-events-none absolute right-0 top-[-1rem] hidden h-64 w-64 lg:block">
                <div className="portal-beacon-line art-shimmer" style={{ left: "50%", top: "8%", height: "64%" }} />
                <div className="portal-beacon-orb art-breathe" style={{ left: "50%", top: "10%" }} />
                <div className="portal-beacon-wave art-expand" style={{ left: "50%", top: "44%" }} />
                <div className="portal-beacon-wave art-expand" style={{ left: "50%", top: "44%", animationDelay: "1.8s" }} />
              </div>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] text-[var(--foreground)]">
                Contact Xemory Systems
              </h2>
              <p className="mt-5 max-w-2xl text-[1.2rem] leading-[1.78] text-[var(--muted-strong)] sm:text-[1.34rem]">
                Tell us a little about your project, organization, or goals, and we&apos;ll get back to you as soon as
                possible.
              </p>
              <div className="mt-8 grid gap-4 text-[1rem] leading-[1.72] text-[var(--muted)] sm:grid-cols-2">
                <p>Structured intake helps serious inquiries start with more clarity.</p>
                <p>Stable layout and clear fields keep the experience calm on desktop and mobile.</p>
                <p>Direct business line: {siteContent.contactPhone}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(11,18,27,0.88),rgba(8,12,18,0.72))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-md sm:p-8">
              <div className="pointer-events-none absolute inset-0">
                <div className="portal-scan art-shimmer-wide opacity-60" style={{ inset: "14% 8% auto 8%", height: "2.5rem" }} />
                <div className="absolute right-8 top-8 h-40 w-40 opacity-60">
                  <div className="portal-ring-field art-spin-slow">
                    <div className="portal-ring" style={{ inset: "10%" }} />
                    <div className="portal-ring portal-ring--warm" style={{ inset: "28%" }} />
                  </div>
                </div>
              </div>
              <div className="relative z-10">
                <ContactIntakeForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-flight-item className="flight-section pb-12">
        <div data-flight-body className="flight-body relative">
          <div className="flight-rule" />
          <p className="flight-label">Bellingham</p>
          <div className="pointer-events-none absolute right-0 top-8 hidden h-80 w-80 xl:block">
            <div className="portal-beacon-line art-shimmer" style={{ left: "50%", top: "4%", height: "72%" }} />
            <div className="portal-beacon-orb art-breathe" style={{ left: "50%", top: "10%" }} />
            <div className="portal-beacon-wave art-expand" style={{ left: "50%", top: "42%" }} />
            <div className="portal-beacon-wave art-expand" style={{ left: "50%", top: "42%", animationDelay: "1.8s" }} />
          </div>
          <div className="mt-5 max-w-4xl space-y-6 text-[1.2rem] leading-[1.82] text-[var(--muted-strong)] sm:text-[1.34rem]">
            <p>
              Bellingham, Washington has played a meaningful role in shaping the vision behind Xemory Systems. Over
              the past decade, this city has been the place where growth, hard work, and self-discovery became
              something real. It provided the environment needed to develop not only skills and direction, but the
              deeper understanding required to build something of lasting value.
            </p>
            <p>
              That is a large part of why giving back matters. Xemory Systems is not only about building modern
              digital solutions, but about contributing to the community, helping peers and colleagues move in the
              right direction, and making sure the benefits of these technologies are felt locally as well as beyond.
            </p>
            <p className="font-medium text-[var(--foreground)]">
              I am proud to be part of the Bellingham tech community.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
