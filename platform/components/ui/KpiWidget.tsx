"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);
  return value;
}

export default function KpiWidget({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  caption,
  tone = "emerald",
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  caption?: string;
  tone?: "emerald" | "navy" | "gold" | "teal";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const animated = useCountUp(value, 1200, visible);
  const display = animated.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const accent = {
    emerald: "border-t-emerald-600",
    navy: "border-t-navy-800",
    gold: "border-t-gold-600",
    teal: "border-t-teal-600",
  }[tone];

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-[var(--hairline)] border-t-2 ${accent} bg-white p-5 shadow-sm shadow-navy-950/[0.03]`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-navy-950">
        {prefix}
        {display}
        {suffix}
      </p>
      {caption && (
        <p className="mt-1 text-xs text-[var(--ink-secondary)]">{caption}</p>
      )}
    </div>
  );
}
