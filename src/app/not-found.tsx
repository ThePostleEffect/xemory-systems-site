import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="section-wrap legal">
      <p className="eyebrow">404 / OUTSIDE THE LAB</p>
      <h1>
        NOT HERE.
        <br />
        STILL CURIOUS?
      </h1>
      <p>That page may have moved. There’s more to explore in the Lab.</p>
      <Link className="action" href="/lab">
        BACK TO THE LAB ↗
      </Link>
    </main>
  );
}
