import type { RoadmapPhase } from "@/lib/navigator/engine";

/** Vertical roadmap timeline in the platform's house style. */
export default function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <ol className="space-y-0">
      {phases.map((phase, i) => (
        <li key={phase.period} className="relative flex gap-5 pb-8 last:pb-0">
          {i < phases.length - 1 && (
            <span
              className="absolute left-[15px] top-8 h-full w-0.5 bg-emerald-100"
              aria-hidden
            />
          )}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-emerald-600 bg-white text-xs font-bold text-emerald-700">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
              {phase.period}
            </p>
            <p className="mt-0.5 text-sm font-bold text-navy-950">{phase.title}</p>
            <ul className="mt-1.5 space-y-1">
              {phase.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2 text-sm leading-relaxed text-[var(--ink-secondary)]"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
