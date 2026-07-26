import type {
  BuyingInfluence,
  Country,
  Industry,
  PipelineStage,
  RelationshipPriority,
  SalesforceProduct,
  SignalStrength,
  SignalType,
  StakeholderPersona,
} from "@/modules/core/taxonomy";

/** A single piece of evidence contributing to Salesforce confidence. */
export interface SalesforceSignal {
  id: string;
  type: SignalType;
  title: string;
  detail: string;
  /** Where the evidence came from — always an authorised/public source. */
  source: string;
  sourceUrl?: string;
  observedAt: string; // ISO date
  strength: SignalStrength;
  /** Salesforce products this signal evidences, if any. */
  products?: SalesforceProduct[];
}

export interface Initiative {
  title: string;
  category: "Digital Transformation" | "AI";
  summary: string;
  announcedAt: string; // ISO date
}

export interface NewsItem {
  title: string;
  source: string;
  publishedAt: string; // ISO date
  summary: string;
  url?: string;
}

export interface HiringTrend {
  function: string;
  openRoles: number;
  trend: "rising" | "steady" | "falling";
  note?: string;
}

export interface TechStackItem {
  name: string;
  category:
    | "CRM"
    | "Marketing"
    | "Analytics"
    | "Integration"
    | "Collaboration"
    | "ERP"
    | "Cloud"
    | "Data"
    | "Other";
  source: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  persona: StakeholderPersona;
  department: string;
  location: string;
  /** Public LinkedIn profile URL where available — never scraped. */
  linkedinUrl?: string;
  relationshipPriority: RelationshipPriority;
  buyingInfluence: BuyingInfluence;
  outreachAngle: string;
  email?: string;
  enrichmentSource?: string;
}

export interface Note {
  id: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string; // ISO datetime
}

/**
 * Analyst estimates (0–100) of organisational maturity, captured during
 * research. These feed the AI Opportunity score.
 */
export interface ReadinessProfile {
  crmMaturity: number;
  dataMaturity: number;
  serviceMaturity: number;
  salesMaturity: number;
  aiReadiness: number;
  slackReadiness: number;
  multilingualOpportunity: number;
  digitalTransformationMaturity: number;
}

/** Structural attributes used by the scoring engine's fit criteria. */
export interface AccountAttributes {
  customerFacing: boolean;
  largeServiceOperation: boolean;
  executiveAiSponsorship: boolean;
  /** Number of countries with an operating presence. */
  regionalPresence: number;
}

export interface Account {
  id: string;
  name: string;
  country: Country;
  city: string;
  industry: Industry;
  subIndustry?: string;
  website: string;
  description: string;
  ownership: "Private" | "Public" | "Government" | "Semi-Government" | "Family Group";
  founded?: number;
  employees: number;
  /** Revenue estimate in USD millions. */
  revenueEstimateUSD: number;
  growthRatePct: number;
  attributes: AccountAttributes;
  digitalInitiatives: Initiative[];
  aiInitiatives: Initiative[];
  news: NewsItem[];
  hiringTrends: HiringTrend[];
  techStack: TechStackItem[];
  consultingPartners: string[];
  salesforceSignals: SalesforceSignal[];
  readiness: ReadinessProfile;
  stakeholders: Stakeholder[];
  pipelineStage: PipelineStage;
  ownerId?: string;
  ownerName?: string;
  tags: string[];
  notes: Note[];
  lastResearchedAt: string; // ISO date
  nextFollowUpAt?: string; // ISO date
  createdAt: string; // ISO date
}
