"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";

const GROUPS = ["Advise", "Explore", "Experience", "Engage"] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
            TI
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-wide text-navy-950">
              TAZKIA INTELLIGENCE
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700">
              Intelligence Platform
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {GROUPS.map((group) => (
            <div key={group} className="group relative">
              <button
                className="rounded-md px-3 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                aria-haspopup="true"
              >
                {group}
              </button>
              <div className="invisible absolute right-0 top-full w-80 translate-y-1 rounded-xl border border-[var(--hairline)] bg-white p-2 opacity-0 shadow-xl shadow-navy-950/5 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {NAV_ITEMS.filter((i) => i.group === group).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald-50 ${
                      pathname.startsWith(item.href) ? "bg-emerald-50" : ""
                    }`}
                  >
                    <span className="block text-sm font-semibold text-navy-900">
                      {item.label}
                    </span>
                    <span className="block text-xs text-[var(--ink-muted)]">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/contact"
            className="ml-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Book a Workshop
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span
            className={`h-0.5 w-6 bg-navy-900 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-navy-900 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-navy-900 transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[var(--hairline)] bg-white px-6 py-4 lg:hidden"
          aria-label="Mobile"
        >
          {GROUPS.map((group) => (
            <div key={group} className="mb-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {group}
              </p>
              {NAV_ITEMS.filter((i) => i.group === group).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm font-medium text-navy-900 hover:bg-emerald-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
