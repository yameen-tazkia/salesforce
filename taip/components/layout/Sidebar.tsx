"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  {
    section: "Intelligence",
    items: [
      { href: "/", label: "Dashboard", icon: "M3 13h4v8H3zM10 7h4v14h-4zM17 3h4v18h-4z" },
      { href: "/accounts", label: "Accounts", icon: "M3 21V5a2 2 0 012-2h6v18M11 21h8a2 2 0 002-2V9a2 2 0 00-2-2h-8M6 8h2M6 12h2M6 16h2M15 11h2M15 15h2" },
      { href: "/workspace", label: "My Workspace", icon: "M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM3 10h18M9 4v6" },
    ],
  },
  {
    section: "Data",
    items: [
      { href: "/enrichment", label: "Enrichment", icon: "M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" },
      { href: "/admin", label: "Admin", icon: "M12 8a4 4 0 100 8 4 4 0 000-8zM19 12h2M3 12h2M12 3v2M12 19v2M17.7 6.3l1.4-1.4M4.9 19.1l1.4-1.4M17.7 17.7l1.4 1.4M4.9 4.9l1.4 1.4", adminOnly: true },
    ],
  },
];

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();

  return (
    <aside className="print-hidden fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-navy-950 text-white">
      <Link href="/" className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-extrabold">
          T
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold tracking-wide">TAIP</span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-navy-300">
            Account Intelligence
          </span>
        </span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((group) => (
          <div key={group.section} className="mb-5">
            <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-navy-400">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items
                .filter((item) => !("adminOnly" in item && item.adminOnly) || role === "admin")
                .map((item) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                          active
                            ? "bg-white/10 text-white"
                            : "text-navy-200 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        <svg
                          className={cn("h-4 w-4 shrink-0", active ? "text-emerald-400" : "text-navy-400")}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-[10px] leading-relaxed text-navy-400">
          Internal use only · Demo dataset
          <br />© Tazkia Intelligence
        </p>
      </div>
    </aside>
  );
}
