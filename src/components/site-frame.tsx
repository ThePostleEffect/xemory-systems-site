import Link from "next/link";
import { CoreNavigation } from "./core-navigation";
import { Entrance } from "./entrance";
export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id="site-content">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <CoreNavigation />
          <Link className="wordmark" href="/" aria-label="Xemory Systems home">
            XEMORY<span>SYSTEMS</span>
          </Link>
          <nav className="header-links" aria-label="Explore Xemory"><Link href="/lab">The Lab</Link><Link href="/creative-request">Create with us</Link><Link href="/about">About</Link></nav>
          <span className="header-coordinate">
            BELLINGHAM, WA <span className="tiny-core" />
          </span>
        </header>
        {children}
        <footer className="site-footer">
          <Link className="footer-brand" href="/">
            XEMORY <span>SYSTEMS</span>
          </Link>
          <p>Imagine it. Create it. Make it real.</p>
          <div>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <span>© {new Date().getFullYear()} Xemory Systems</span>
          </div>
        </footer>
      </div>
      <Entrance />
    </>
  );
}
