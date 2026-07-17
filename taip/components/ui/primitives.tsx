import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ConfidenceBand, PriorityLevel, ProductEvidenceLevel } from "@/modules/core/taxonomy";

/** Shared design-system primitives. */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--hairline)] bg-white p-5 shadow-sm shadow-navy-950/[0.03]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy-950">{title}</h2>
        {hint && <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

type BadgeTone = "emerald" | "teal" | "gold" | "slate" | "navy" | "red";

const BADGE_TONES: Record<BadgeTone, string> = {
  emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
  teal: "bg-teal-50 text-teal-800 border-teal-200",
  gold: "bg-gold-50 text-gold-800 border-gold-200",
  slate: "bg-navy-50 text-navy-700 border-navy-200",
  navy: "bg-navy-950 text-white border-navy-950",
  red: "bg-red-50 text-red-800 border-red-200",
};

export function Badge({
  tone = "slate",
  children,
  className,
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        BADGE_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export const CONFIDENCE_TONES: Record<ConfidenceBand, BadgeTone> = {
  Confirmed: "emerald",
  "Highly likely": "teal",
  Possible: "gold",
  Unknown: "slate",
};

export function ConfidenceBadge({ band }: { band: ConfidenceBand }) {
  return <Badge tone={CONFIDENCE_TONES[band]}>{band}</Badge>;
}

export const PRIORITY_TONES: Record<PriorityLevel, BadgeTone> = {
  "P1 Strategic": "navy",
  "P2 High": "emerald",
  "P3 Medium": "gold",
  "P4 Nurture": "slate",
};

export function PriorityBadge({ priority }: { priority: PriorityLevel }) {
  return <Badge tone={PRIORITY_TONES[priority]}>{priority}</Badge>;
}

export const PRODUCT_LEVEL_TONES: Record<ProductEvidenceLevel, BadgeTone> = {
  confirmed: "emerald",
  strong: "teal",
  moderate: "gold",
  weak: "slate",
  none: "slate",
};

/**
 * Compact horizontal meter (0–100). Neutral single-hue magnitude encoding;
 * the value label carries the number so colour is never the only channel.
 */
export function Meter({
  value,
  label,
  color = "var(--series-1)",
}: {
  value: number;
  label?: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-full min-w-16 rounded-r bg-navy-50" role="presentation">
        <div
          className="h-full rounded-r transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-xs font-semibold tabular-nums text-[var(--ink-secondary)]">
        {label ?? value}
      </span>
    </div>
  );
}

/** Circular score gauge for headline scores. */
export function ScoreRing({
  value,
  size = 64,
  stroke = 6,
  color = "var(--series-1)",
  sublabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--grid)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped / 100)}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold tabular-nums text-navy-950" style={{ fontSize: size / 3.4 }}>
          {Math.round(clamped)}
        </span>
        {sublabel && (
          <span className="text-[9px] font-medium uppercase tracking-wide text-[var(--ink-muted)]">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

/** KPI stat tile: hero number + label (+ optional link). */
export function StatCard({
  label,
  value,
  hint,
  href,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  href?: string;
  accent?: boolean;
}) {
  const body = (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        accent
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-[var(--hairline)] bg-white",
        href && "hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-900/5",
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold tabular-nums text-navy-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-[var(--ink-secondary)]">{hint}</p>}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--hairline)] bg-white/60 px-6 py-10 text-center">
      <p className="text-sm font-semibold text-[var(--ink-secondary)]">{title}</p>
      {hint && <p className="mt-1 text-xs text-[var(--ink-muted)]">{hint}</p>}
    </div>
  );
}

export function CompanyMark({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  const sizes = { sm: "h-8 w-8 text-xs", md: "h-10 w-10 text-sm", lg: "h-14 w-14 text-lg" };
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg bg-navy-950 font-bold text-white",
        sizes[size],
      )}
      aria-hidden
    >
      {initials}
    </span>
  );
}
