"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const links = [
  ["/", "Home"],
  ["/lab", "The Lab"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
export function CoreNavigation() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <div className={`core-navigation ${open ? "is-open" : ""}`} ref={ref}>
      <button
        ref={button}
        className="core-trigger"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="core-menu"
        onClick={() => setOpen(!open)}
      >
        <span className="core-object" />
        <span className="core-hint" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <nav
        id="core-menu"
        aria-label="Main navigation"
        inert={!open}
        className="core-menu"
      >
        {links.map(([href, label], i) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
