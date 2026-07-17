import { hunterAdapter } from "./hunter";
import type { EnrichmentAdapter, EnrichmentProviderInfo } from "./types";

/**
 * Provider registry. Adding a provider = implementing EnrichmentAdapter
 * and registering it here; the API and UI pick it up automatically.
 */

const declaredOnly = (info: EnrichmentProviderInfo): EnrichmentAdapter => ({
  info: () => info,
});

const ADAPTERS: EnrichmentAdapter[] = [
  hunterAdapter,
  declaredOnly({
    id: "linkedin-sales-navigator",
    name: "LinkedIn Sales Navigator",
    kind: "import",
    status: "available",
    capabilities: ["Lead list import (CSV export)", "Stakeholder mapping input"],
    complianceNote:
      "User-supplied exports only, made by a licensed seat holder within LinkedIn's terms. TAIP never scrapes LinkedIn.",
    configHint: "Import CSV exports from a licensed Sales Navigator seat.",
  }),
  declaredOnly({
    id: "zoominfo",
    name: "ZoomInfo",
    kind: "api",
    status: "available",
    capabilities: ["Contact enrichment", "Org charts", "Intent signals"],
    complianceNote: "Official ZoomInfo API under your organisation's licence.",
    configHint: "Set ZOOMINFO_API_KEY to enable (adapter stub — implement on subscription).",
  }),
  declaredOnly({
    id: "apollo",
    name: "Apollo",
    kind: "api",
    status: "available",
    capabilities: ["Contact search", "Email finder", "Sequences metadata"],
    complianceNote: "Official Apollo API under your organisation's licence.",
    configHint: "Set APOLLO_API_KEY to enable (adapter stub — implement on subscription).",
  }),
  declaredOnly({
    id: "clay",
    name: "Clay",
    kind: "api",
    status: "available",
    capabilities: ["Waterfall enrichment", "Custom research agents"],
    complianceNote: "Official Clay API/webhooks under your organisation's licence.",
    configHint: "Set CLAY_WEBHOOK_URL to enable (adapter stub — implement on subscription).",
  }),
  declaredOnly({
    id: "csv-import",
    name: "CSV import",
    kind: "import",
    status: "connected",
    capabilities: ["Stakeholder list ingest", "Account list ingest"],
    complianceNote: "Manual ingest of data your team is licensed to hold.",
  }),
];

export function listProviders(): EnrichmentProviderInfo[] {
  return ADAPTERS.map((a) => a.info());
}

export function getAdapter(id: string): EnrichmentAdapter | undefined {
  return ADAPTERS.find((a) => a.info().id === id);
}
