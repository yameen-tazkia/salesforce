import type {
  Account,
  ReadinessProfile,
  SalesforceSignal,
  Stakeholder,
} from "@/modules/accounts/types";

/**
 * Seed builder utilities.
 *
 * NOTE: The seed dataset is a fictional demonstration corpus. Companies,
 * people, and evidence items are invented to exercise the platform's data
 * model — they do not describe real organisations.
 */

let signalSeq = 0;
export function signal(
  s: Omit<SalesforceSignal, "id">,
): SalesforceSignal {
  signalSeq += 1;
  return { id: `sig_${signalSeq.toString(36).padStart(3, "0")}`, ...s };
}

let stakeholderSeq = 0;
export function person(s: Omit<Stakeholder, "id">): Stakeholder {
  stakeholderSeq += 1;
  return { id: `stk_${stakeholderSeq.toString(36).padStart(3, "0")}`, ...s };
}

export function readiness(
  overrides: Partial<ReadinessProfile> = {},
): ReadinessProfile {
  return {
    crmMaturity: 40,
    dataMaturity: 40,
    serviceMaturity: 45,
    salesMaturity: 45,
    aiReadiness: 35,
    slackReadiness: 25,
    multilingualOpportunity: 60,
    digitalTransformationMaturity: 45,
    ...overrides,
  };
}

type AccountSeed = Omit<
  Account,
  | "digitalInitiatives"
  | "aiInitiatives"
  | "news"
  | "hiringTrends"
  | "techStack"
  | "consultingPartners"
  | "salesforceSignals"
  | "stakeholders"
  | "tags"
  | "notes"
  | "subIndustry"
  | "founded"
  | "ownerId"
  | "ownerName"
  | "nextFollowUpAt"
  | "createdAt"
> &
  Partial<
    Pick<
      Account,
      | "digitalInitiatives"
      | "aiInitiatives"
      | "news"
      | "hiringTrends"
      | "techStack"
      | "consultingPartners"
      | "salesforceSignals"
      | "stakeholders"
      | "tags"
      | "notes"
      | "subIndustry"
      | "founded"
      | "ownerId"
      | "ownerName"
      | "nextFollowUpAt"
      | "createdAt"
    >
  >;

export function account(seed: AccountSeed): Account {
  return {
    subIndustry: undefined,
    founded: undefined,
    digitalInitiatives: [],
    aiInitiatives: [],
    news: [],
    hiringTrends: [],
    techStack: [],
    consultingPartners: [],
    salesforceSignals: [],
    stakeholders: [],
    tags: [],
    notes: [],
    ownerId: undefined,
    ownerName: undefined,
    nextFollowUpAt: undefined,
    createdAt: "2026-01-05",
    ...seed,
  };
}
