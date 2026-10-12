import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { LabCatalog } from "@/components/lab-catalog";
export const metadata: Metadata = {
  title: "The Lab",
  description:
    "Explore Xemory creations: useful software, editable tools, build guides and experiments. Digital downloads from $1.99.",
  alternates: { canonical: "/lab" },
};
export default function Lab() {
  return (
    <main id="main-content" tabIndex={-1} className="section-wrap">
      <PageIntro
        number="01"
        kicker="A WORKSHOP OF POSSIBILITIES"
        title="THE LAB."
      >
        <p>Small tools. Unusual ideas. Things you can make your own.</p>
        <p className="muted">Open a drawer. See what we’ve been building.</p>
      </PageIntro>
      <LabCatalog />
      <p className="catalog-guarantee">
        14-day money-back guarantee.{" "}
        <Link href="/terms#refunds">See refund details ↗</Link>
      </p>
      <p className="catalog-note">
        Prices in USD. Digital files only. “Get it” opens Payhip checkout;
        applicable taxes are shown there. Expand each creation for its contents
        and requirements.
      </p>
      <section className="lab-end">
        <span className="tiny-core" />
        <p>
          Curiosity doesn’t stand still.
          <br />
          <span className="muted">Neither does the Lab.</span>
        </p>
      </section>
    </main>
  );
}
