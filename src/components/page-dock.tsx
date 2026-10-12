import Link from "next/link";

type PageDockProps = {
  currentPath: string;
};

const dockItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/ai-training", label: "AI Training" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function PageDock({ currentPath }: PageDockProps) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3"
    >
      <div className="flex max-w-full items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-[color:var(--panel-strong)] px-3 py-2 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {dockItems.map((item) => {
          const isCurrent = currentPath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
                isCurrent
                  ? "bg-white/12 text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:bg-white/6 hover:text-[var(--foreground)]"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
