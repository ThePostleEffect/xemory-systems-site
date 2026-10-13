import Link from "next/link";
import type { Metadata } from "next";
import { HomeShowcase } from "@/components/home-showcase";
import Image from "next/image";
import { LabCard } from "@/components/lab-card";
import { labItems } from "@/lib/lab";
import "./creative-request/creative.css";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <HomeShowcase />
        <section className="homepage-teaser">
          <Image src="/home/website-preview.png" alt="A preview of the Lumen website starter" width={1280} height={720} sizes="(max-width: 800px) 92vw, 25vw" />
          <div><p className="eyebrow">XEMORY PRODUCTS</p><h2>Build Your First Website with Codex</h2><p>A beginner guide with a starter you can make your own.</p><Link className="text-link" href="/lab#creation-xkBrt">Explore the guide</Link></div>
          <p className="teaser-note">GUIDES.<br />EDITABLE STARTERS.<br />REAL CREATIONS.</p>
        </section>
        <section className="creative-home-callout section-wrap"><div><p className="eyebrow">CUSTOM CREATIVE WORK · FROM $35 USD</p><h2>Your vision. Built your way.</h2><p>Images, short videos, graphics, presentations and more. Choose only what you need.</p></div><Link className="action" href="/creative-request">CREATE WITH US ↗</Link></section>
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
