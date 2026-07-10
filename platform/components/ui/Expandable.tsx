"use client";

import { useId, useState } from "react";

export default function Expandable({
  title,
  subtitle,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--hairline)] bg-white shadow-sm shadow-navy-950/[0.03]">
      <button
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-emerald-50/50"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="flex items-center gap-3">
          {badge && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              {badge}
            </span>
          )}
          <span>
            <span className="block text-base font-semibold text-navy-950">
              {title}
            </span>
            {subtitle && (
              <span className="block text-sm text-[var(--ink-secondary)]">
                {subtitle}
              </span>
            )}
          </span>
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-emerald-700 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div id={id} className="animate-fade-in border-t border-[var(--hairline)] px-6 py-5">
          {children}
        </div>
      )}
    </div>
  );
}
