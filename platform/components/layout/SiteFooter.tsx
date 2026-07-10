import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";

export default function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-container px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                TI
              </span>
              <span className="text-sm font-bold tracking-wide">
                TAZKIA INTELLIGENCE
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-200">
              Helping organisations across the Gulf and wider Muslim world adopt
              practical AI through Salesforce, Agentforce, Slack and intelligent
              automation.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold-400">
              UAE · Saudi Arabia · Qatar
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy-300">
              Platform
            </p>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-100 transition-colors hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-navy-300">
              Engage
            </p>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-100 transition-colors hover:text-emerald-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Tazkia Intelligence. All rights reserved.</p>
          <p>Practical AI. Delivered with trust.</p>
        </div>
      </div>
    </footer>
  );
}
