import Link from "next/link";
import { PageIntro } from "./page-intro";

export type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export function LegalLayout({
  title,
  summary,
  sections,
  related,
}: {
  title: string;
  summary: string;
  sections: LegalSection[];
  related: "terms" | "privacy";
}) {
  return (
    <main id="main-content" tabIndex={-1} className="section-wrap legal">
      <PageIntro
        number="XS"
        kicker="CLEAR INFORMATION. NO GUESSWORK."
        title={title}
      >
        <p>{summary}</p>
      </PageIntro>
      <div className="legal-meta">
        <span>LAST UPDATED OCTOBER 12, 2026</span>
        <Link href={`/${related}`}>
          {related === "privacy" ? "Privacy notice" : "Terms & purchases"} ↗
        </Link>
      </div>
      <div className="legal-layout">
        <nav
          className="legal-index"
          aria-label={`${title.replace(".", "")} contents`}
        >
          <p className="eyebrow">ON THIS PAGE</p>
          {sections.map((section, i) => (
            <a href={`#${section.id}`} key={section.id}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {section.title}
            </a>
          ))}
        </nav>
        <div className="prose legal-copy">
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
          <div className="legal-contact">
            <p>Questions about this page?</p>
            <a href="mailto:contact@xemorysystems.com">
              contact@xemorysystems.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
