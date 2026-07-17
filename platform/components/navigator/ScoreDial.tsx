"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Executive score dial — a 0–100 arc gauge in the brand's sequential
 * emerald, with an animated sweep on first view.
 */
export default function ScoreDial({
  value,
  label,
  sublabel,
  size = 220,
  dark = false,
}: {
  value: number; // 0..100
  label: string;
  sublabel?: string;
  size?: number;
  /** render for a dark (navy) surface */
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(0);

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

  useEffect(() => {
    if (!visible) return;
    let frame: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1400, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimated(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 18;
  const startAngle = -130; // gap centred at the bottom, sweep of 260°
  const sweep = 260;

  const polar = (angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as const;
  };

  const arcPath = (fromPct: number, toPct: number) => {
    const a0 = startAngle + (sweep * fromPct) / 100;
    const a1 = startAngle + (sweep * toPct) / 100;
    const [x0, y0] = polar(a0);
    const [x1, y1] = polar(a1);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size * 0.92}`}
        className="w-full max-w-[240px]"
        role="img"
        aria-label={`${label}: ${Math.round(value)} out of 100`}
      >
        <path
          d={arcPath(0, 100)}
          fill="none"
          stroke={dark ? "rgba(255,255,255,0.16)" : "var(--grid)"}
          strokeWidth={12}
          strokeLinecap="round"
        />
        {animated > 0.5 && (
          <path
            d={arcPath(0, animated)}
            fill="none"
            stroke={dark ? "#48b58c" : "var(--emerald)"}
            strokeWidth={12}
            strokeLinecap="round"
          />
        )}
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fill={dark ? "#ffffff" : "#0a0f24"}
          fontSize={size * 0.21}
          fontWeight={700}
        >
          {Math.round(animated)}
        </text>
        <text
          x={cx}
          y={cy + size * 0.14}
          textAnchor="middle"
          fill={dark ? "rgba(255,255,255,0.65)" : "#6d7691"}
          fontSize={size * 0.055}
          fontWeight={600}
        >
          / 100
        </text>
      </svg>
      <p
        className={`mt-1 text-sm font-semibold ${dark ? "text-white" : "text-navy-950"}`}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className={`mt-0.5 text-xs font-medium uppercase tracking-[0.14em] ${
            dark ? "text-gold-400" : "text-gold-700"
          }`}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}
