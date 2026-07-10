import Link from "next/link";

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm shadow-navy-950/[0.03] ${className}`}
    >
      {children}
    </div>
  );
}

export function InteractiveCard({
  href,
  title,
  description,
  meta,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  meta?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm shadow-navy-950/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5"
    >
      {icon && (
        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          {icon}
        </span>
      )}
      {meta && (
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700">
          {meta}
        </p>
      )}
      <h3 className="text-base font-semibold text-navy-950 group-hover:text-emerald-700">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-secondary)]">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
        Explore
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
