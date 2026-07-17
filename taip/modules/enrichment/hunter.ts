import type {
  DomainEnrichmentResult,
  EnrichmentAdapter,
  EnrichmentProviderInfo,
} from "./types";

/**
 * Hunter.io adapter — uses the official, authorised REST API.
 * Enabled by setting HUNTER_API_KEY in the environment; otherwise the
 * provider is listed as "available" and calls are rejected cleanly.
 */

const API_BASE = "https://api.hunter.io/v2";

function apiKey(): string | undefined {
  return process.env.HUNTER_API_KEY;
}

export const hunterAdapter: EnrichmentAdapter = {
  info(): EnrichmentProviderInfo {
    return {
      id: "hunter",
      name: "Hunter.io",
      kind: "api",
      status: apiKey() ? "connected" : "available",
      capabilities: ["Domain search", "Email finder", "Email verification"],
      complianceNote:
        "Official Hunter.io API with your organisation's key. Only returns publicly indexed professional contact data.",
      configHint: apiKey() ? undefined : "Set HUNTER_API_KEY to enable.",
    };
  },

  async domainSearch(domain: string): Promise<DomainEnrichmentResult> {
    const key = apiKey();
    if (!key) {
      throw new Error("Hunter.io is not configured. Set HUNTER_API_KEY to enable enrichment.");
    }
    const url = `${API_BASE}/domain-search?domain=${encodeURIComponent(domain)}&api_key=${key}&limit=10`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Hunter.io request failed (${res.status}).`);
    }
    const json = (await res.json()) as {
      data?: {
        organization?: string;
        emails?: Array<{
          first_name?: string;
          last_name?: string;
          value?: string;
          confidence?: number;
          position?: string;
          department?: string;
          linkedin?: string;
        }>;
      };
    };
    const emails = json.data?.emails ?? [];
    return {
      provider: "hunter",
      domain,
      organisation: json.data?.organization,
      contacts: emails.map((e) => ({
        firstName: e.first_name,
        lastName: e.last_name,
        fullName: [e.first_name, e.last_name].filter(Boolean).join(" ") || (e.value ?? "Unknown"),
        title: e.position,
        department: e.department,
        email: e.value,
        emailConfidence: e.confidence,
        linkedinUrl: e.linkedin,
        source: "Hunter.io API",
      })),
    };
  },
};
