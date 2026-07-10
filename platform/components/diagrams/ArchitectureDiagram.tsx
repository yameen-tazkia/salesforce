export type ArchLayer = {
  name: string;
  tone: "emerald" | "navy" | "teal" | "gold";
  nodes: string[];
};

const TONES = {
  emerald: {
    band: "bg-emerald-50 border-emerald-200",
    label: "text-emerald-800",
    node: "border-emerald-300 bg-white text-emerald-900",
  },
  navy: {
    band: "bg-navy-50 border-navy-200",
    label: "text-navy-800",
    node: "border-navy-300 bg-white text-navy-900",
  },
  teal: {
    band: "bg-teal-50 border-teal-200",
    label: "text-teal-900",
    node: "border-teal-300 bg-white text-teal-900",
  },
  gold: {
    band: "bg-gold-50 border-gold-200",
    label: "text-gold-800",
    node: "border-gold-300 bg-white text-gold-900",
  },
} as const;

/** Layered enterprise architecture diagram rendered from data. */
export default function ArchitectureDiagram({
  title,
  layers,
}: {
  title?: string;
  layers: ArchLayer[];
}) {
  return (
    <div className="rounded-xl border border-[var(--hairline)] bg-white p-5 shadow-sm shadow-navy-950/[0.03]">
      {title && (
        <p className="mb-4 text-sm font-semibold text-navy-950">{title}</p>
      )}
      <div className="space-y-2">
        {layers.map((layer, i) => {
          const t = TONES[layer.tone];
          return (
            <div key={layer.name}>
              <div className={`rounded-lg border ${t.band} p-3`}>
                <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${t.label}`}>
                  {layer.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.nodes.map((node) => (
                    <span
                      key={node}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium ${t.node}`}
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-0.5" aria-hidden>
                  <svg className="h-4 w-4 text-[var(--ink-muted)]" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
