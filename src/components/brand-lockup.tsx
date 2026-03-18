import Link from "next/link";

import { BrandLogoImage } from "@/components/brand-logo-image";
import { siteContent } from "@/lib/site-content";

type BrandLockupProps = {
  compact?: boolean;
};

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 rounded-full px-2 py-2 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      aria-label="Return to the Xemory Systems homepage"
    >
      <BrandLogoImage className={compact ? "h-10 w-10" : "h-12 w-12"} />
      <span className="flex flex-col">
        <span className="font-display text-[1.3rem] leading-none tracking-[0.18em] text-[var(--foreground)] uppercase">
          {siteContent.name}
        </span>
      </span>
    </Link>
  );
}
