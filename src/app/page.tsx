import Link from "next/link";
import type { Metadata } from "next";
import { Entrance } from "@/components/entrance";
import { BrandSymbol } from "@/components/brand-symbol";
import { LabCard } from "@/components/lab-card";
import { labItems } from "@/lib/lab";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <Entrance />
      <main id="main-content" tabIndex={-1}>
        <section className="home-hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-core" /> INDEPENDENT IDEAS. REAL CREATIONS.
            </p>
            <h1>
              WE BUILD
              <br />
              WHAT WE
              <br />
              <span>WISH EXISTED.</span>
            </h1>
            <p className="hero-description">
              Useful, experimental technology.
              <br />
              Built to put more capability in your hands.
            </p>
            <Link className="action" href="/lab">
              EXPLORE THE LAB <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-art">
            <BrandSymbol />
            <div className="object-caption">
              <span>XS / THE CORE</span>
              <span>EVERYTHING STARTS WITH AN IDEA.</span>
            </div>
          </div>
          <div className="hero-bottom">
            <span>SOFTWARE / TOOLS / EXPERIMENTS</span>
            <a href="#creations">
              SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section className="philosophy-strip">
          <p>
            IMAGINE IT.
            <br />
            <span>CREATE IT.</span>
            <br />
            MAKE IT REAL.
          </p>
          <div>
            <span className="eyebrow">THE XEMORY WAY</span>
            <h2>
              A useful idea deserves
              <br />a life outside your head.
            </h2>
            <p>
              We turn curiosity into things you can use. Software, digital
              tools, creative experiments, and a growing collection of ways to
              make something your own.
            </p>
            <Link className="text-link" href="/about">
              Meet Xemory <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="featured section-wrap" id="creations">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / SELECTED CREATIONS</p>
              <h2>
                OUT OF THE LAB.
                <br />
                <span>INTO YOUR HANDS.</span>
              </h2>
            </div>
            <Link className="text-link" href="/lab">
              All creations <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="lab-grid">
            {labItems
              .filter((i) => i.featured)
              .map((i) => (
                <LabCard item={i} key={i.id} />
              ))}
          </div>
          <p className="catalog-note">
            Digital downloads. Purchases and file delivery are handled by
            Payhip.
          </p>
        </section>
        <section className="closing section-wrap">
          <span className="eyebrow">THE NEXT IDEA STARTS SOMEWHERE.</span>
          <h2>
            WHAT ARE
            <br />
            <span>YOU IMAGINING?</span>
          </h2>
          <Link className="action" href="/contact">
            START A CONVERSATION <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
    </>
  );
}
