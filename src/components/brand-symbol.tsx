import Image from "next/image";
import { brand } from "@/lib/brand";
// CSS windows the supplied artwork without altering its geometry or colors.
export function BrandSymbol({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-symbol ${className}`} aria-hidden="true">
      <Image
        src={brand.logo}
        alt=""
        width={1280}
        height={1280}
        priority
        sizes="(max-width: 600px) 900px, 1280px"
      />
    </span>
  );
}
