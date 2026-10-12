export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Xemory Systems about a creation, collaboration, or an idea. Based in Bellingham, Washington.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  const enabled = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL,
  );
  return (
    <main id="main-content" tabIndex={-1} className="section-wrap">
      <PageIntro
        number="03"
        kicker="LET’S MAKE A CONNECTION"
        title="GOOD THINGS START WITH A CONVERSATION."
      />
      <section className="contact-layout">
        <div>
          <p className="lead">
            An idea. A question.
            <br />
            Something worth exploring.
          </p>
          <p className="muted">
            For product support, collaboration, or simply saying hello.
          </p>
          <a className="contact-email" href="mailto:contact@xemorysystems.com">
            contact@xemorysystems.com <span aria-hidden="true">↗</span>
          </a>
          <p className="eyebrow location">BELLINGHAM, WASHINGTON</p>
        </div>
        <div>
          {enabled ? (
            <ContactForm />
          ) : (
            <div className="contact-panel">
              <span className="tiny-core" />
              <h2>Let’s hear it.</h2>
              <p>
                Email is the direct way to reach Xemory. Include the product
                name if you need help with a creation.
              </p>
              <a className="action" href="mailto:contact@xemorysystems.com">
                WRITE TO XEMORY <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
