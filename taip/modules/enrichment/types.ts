/**
 * Contact & company enrichment integration layer.
 *
 * Compliance stance (non-negotiable): TAIP only ingests data from
 * authorised APIs or user-supplied exports. It never bypasses
 * authentication, never scrapes restricted sources, and records the
 * provenance of every enriched field.
 */

export type ProviderKind = "api" | "import";

export type ProviderStatus = "connected" | "available" | "disabled";

export interface EnrichmentProviderInfo {
  id: string;
  name: string;
  kind: ProviderKind;
  status: ProviderStatus;
  capabilities: string[];
  complianceNote: string;
  configHint?: string;
}

export interface EnrichedContact {
  firstName?: string;
  lastName?: string;
  fullName: string;
  title?: string;
  department?: string;
  email?: string;
  emailConfidence?: number;
  linkedinUrl?: string;
  source: string;
}

export interface DomainEnrichmentResult {
  provider: string;
  domain: string;
  organisation?: string;
  contacts: EnrichedContact[];
}

/** Adapter contract every provider implements. */
export interface EnrichmentAdapter {
  info(): EnrichmentProviderInfo;
  /** Search publicly registered contacts for a company domain. */
  domainSearch?(domain: string): Promise<DomainEnrichmentResult>;
}
