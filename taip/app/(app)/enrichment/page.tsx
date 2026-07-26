import type { Metadata } from "next";
import { Badge, Card, SectionTitle } from "@/components/ui/primitives";
import { listProviders } from "@/modules/enrichment/providers";
import DomainSearchPanel from "./DomainSearchPanel";

export const metadata: Metadata = { title: "Enrichment" };
export const dynamic = "force-dynamic";

const STATUS_TONES = { connected: "emerald", available: "gold", disabled: "slate" } as const;

export default function EnrichmentPage() {
  const providers = listProviders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-navy-950">Contact Enrichment</h1>
        <p className="mt-0.5 text-sm text-[var(--ink-muted)]">
          Approved providers only — authorised APIs and user-supplied exports. TAIP never
          bypasses authentication or scrapes restricted sources.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {providers.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-navy-950">{p.name}</p>
                <p className="text-[11px] uppercase tracking-wide text-[var(--ink-muted)]">
                  {p.kind === "api" ? "API integration" : "Data import"}
                </p>
              </div>
              <Badge tone={STATUS_TONES[p.status]} className="capitalize">
                {p.status}
              </Badge>
            </div>
            <ul className="mt-3 space-y-1">
              {p.capabilities.map((c) => (
                <li key={c} className="flex gap-2 text-xs text-[var(--ink-secondary)]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-navy-50 p-2.5 text-[11px] leading-relaxed text-[var(--ink-secondary)]">
              {p.complianceNote}
            </p>
            {p.configHint && (
              <p className="mt-2 text-[11px] font-medium text-gold-800">{p.configHint}</p>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle
          title="Domain search"
          hint="Look up publicly indexed professional contacts for a company domain via a connected provider"
        />
        <DomainSearchPanel
          hunterConnected={providers.some((p) => p.id === "hunter" && p.status === "connected")}
        />
      </Card>
    </div>
  );
}
