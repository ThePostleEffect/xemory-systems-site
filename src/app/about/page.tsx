import Link from "next/link";
import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { BrandSymbol } from "@/components/brand-symbol";
export const metadata: Metadata = {
  title: "About",
  description:
    "Why Xemory exists: technology should expand what ordinary people are capable of doing.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <main id="main-content" tabIndex={-1} className="section-wrap">
      <PageIntro
        number="02"
        kicker="THE IDEA BEHIND XEMORY"
        title="MORE CAPABILITY. IN YOUR HANDS."
      />
      <section className="about-layout">
        <div className="about-object">
          <BrandSymbol />
        </div>
        <div className="prose">
          <p className="lead">
            Technology should expand what ordinary people can do.
          </p>
          <p>
            That idea is the reason Xemory Systems exists. We’re a small
            experimental technology and product company based in Bellingham,
            Washington.
          </p>
          <p>
            We work with software, AI, digital design and emerging technology to
            turn ideas into useful things. Sometimes that means a practical
            tool. Sometimes it means a playful experiment worth exploring.
          </p>
          <p>
            We build, test, improve, and share what we learn. We’re clear about
            what’s ready to use and what is still a prototype.
          </p>
          <p>
            Large changes often begin with one useful improvement. We’re here to
            make those improvements real.
          </p>
          <Link className="action" href="/lab">
            SEE WHAT WE BUILD <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <div className="principles">
        <div>
          <span>01</span>
          <h2>Stay curious.</h2>
          <p>Follow the idea far enough to discover what it could become.</p>
        </div>
        <div>
          <span>02</span>
          <h2>Make it useful.</h2>
          <p>Give people something they can understand, use and build upon.</p>
        </div>
        <div>
          <span>03</span>
          <h2>Keep improving.</h2>
          <p>Test what works. Be honest about what needs another pass.</p>
        </div>
      </div>
    </main>
  );
}
