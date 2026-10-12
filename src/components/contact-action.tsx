import Link from "next/link";

type ContactActionProps = {
  label?: string;
  className?: string;
};

export function ContactAction({
  label = "Discuss Your Project",
  className = "",
}: ContactActionProps) {
  return (
    <Link
      href="/contact"
      className={`inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--accent-amber)]/35 bg-[linear-gradient(135deg,rgba(244,180,107,0.18),rgba(134,216,255,0.14))] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground)] uppercase shadow-[0_18px_40px_rgba(0,0,0,0.32)] transition hover:border-[color:var(--accent-cyan)]/45 hover:shadow-[0_20px_55px_rgba(27,83,128,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]${className ? ` ${className}` : ""}`}
    >
      {label}
    </Link>
  );
}
