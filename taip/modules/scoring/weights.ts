import type { SignalStrength, SignalType } from "@/modules/core/taxonomy";

/**
 * Scoring configuration. Kept as data (not code) so weights can be tuned
 * centrally, surfaced in the admin console, and eventually persisted per
 * workspace without touching the engine.
 */

/** Base points each indicator type contributes at "moderate" strength. */
export const SIGNAL_WEIGHTS: Record<SignalType, number> = {
  careers_page: 14,
  admin_role: 16,
  developer_role: 14,
  consultant_role: 12,
  trailblazer: 10,
  case_study: 30,
  partner_announcement: 26,
  appexchange: 12,
  implementation_partner: 20,
  product_reference: 12,
  crm_migration: 18,
  public_documentation: 22,
  tech_profiling: 10,
};

/**
 * Signal types considered conclusive on their own: at strong strength they
 * can move an account into the "Confirmed" band.
 */
export const CONCLUSIVE_SIGNAL_TYPES: SignalType[] = [
  "case_study",
  "partner_announcement",
  "public_documentation",
];

export const STRENGTH_MULTIPLIER: Record<SignalStrength, number> = {
  weak: 0.5,
  moderate: 1,
  strong: 1.5,
};

/**
 * Diminishing returns: repeat signals of the same type add progressively
 * less, so ten job adverts never outweigh one published case study.
 */
export const REPEAT_SIGNAL_FACTOR = 0.35;

/** Confidence band thresholds (score out of 100). */
export const CONFIDENCE_BANDS = {
  confirmed: 75, // also requires a conclusive strong signal
  highlyLikely: 55,
  possible: 25,
} as const;

/** Product evidence level thresholds (score out of 100). */
export const PRODUCT_LEVELS = {
  confirmed: 60,
  strong: 40,
  moderate: 22,
  weak: 1,
} as const;

/**
 * Weights for the AI Opportunity score.
 * Readiness dimensions contribute a weighted blend; opportunity drivers
 * add points on top for demand-side evidence.
 */
export const READINESS_WEIGHTS = {
  crmMaturity: 0.1,
  dataMaturity: 0.15,
  serviceMaturity: 0.1,
  salesMaturity: 0.05,
  aiReadiness: 0.2,
  slackReadiness: 0.05,
  multilingualOpportunity: 0.15,
  digitalTransformationMaturity: 0.2,
} as const;

export const OPPORTUNITY_DRIVERS = {
  aiInitiativeAnnounced: 12,
  digitalProgramme: 8,
  executiveAiSponsorship: 10,
  largeServiceOperation: 8,
  customerFacing: 5,
  rapidGrowth: 5, // growth rate >= 15%
} as const;

/** Blend for the Overall Account Score. */
export const OVERALL_BLEND = {
  salesforceConfidence: 0.3,
  aiOpportunity: 0.35,
  firmographicFit: 0.2,
  engagement: 0.15,
} as const;

/** Priority thresholds on the overall score. */
export const PRIORITY_BANDS = {
  p1: 75,
  p2: 60,
  p3: 42,
} as const;

/**
 * The named scoring criteria surfaced to consultants. Each maps to a
 * check in the engine; points feed the firmographic/engagement components.
 */
export const ACCOUNT_CRITERIA = [
  { id: "uses_salesforce", label: "Uses Salesforce", points: 15 },
  { id: "uses_service_cloud", label: "Uses Service Cloud", points: 10 },
  { id: "hiring_sf_talent", label: "Hiring Salesforce talent", points: 10 },
  { id: "growing_rapidly", label: "Growing rapidly", points: 8 },
  { id: "ai_initiatives", label: "AI initiatives announced", points: 10 },
  { id: "dx_programme", label: "Digital transformation programme", points: 8 },
  { id: "slack_usage", label: "Slack usage", points: 6 },
  { id: "customer_facing", label: "Customer-facing organisation", points: 6 },
  { id: "large_service_op", label: "Large service operation", points: 8 },
  { id: "enterprise_revenue", label: "Enterprise revenue", points: 7 },
  { id: "regional_presence", label: "Regional presence", points: 5 },
  { id: "exec_ai_sponsorship", label: "Executive AI sponsorship", points: 7 },
] as const;

export type CriterionId = (typeof ACCOUNT_CRITERIA)[number]["id"];
