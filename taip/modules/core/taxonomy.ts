/**
 * Core taxonomy for the Tazkia Account Intelligence Platform.
 * Single source of truth for regions, industries and shared enums —
 * consumed by the scoring engine, filters, API contracts and UI.
 */

export const PRIMARY_COUNTRIES = [
  "UAE",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Bahrain",
  "Kuwait",
] as const;

export const FUTURE_COUNTRIES = ["Malaysia", "Indonesia"] as const;

export const COUNTRIES = [...PRIMARY_COUNTRIES, ...FUTURE_COUNTRIES] as const;
export type Country = (typeof COUNTRIES)[number];

export function isFutureMarket(country: Country): boolean {
  return (FUTURE_COUNTRIES as readonly string[]).includes(country);
}

export const INDUSTRIES = [
  "Real Estate",
  "Luxury Retail",
  "Hospitality",
  "Government",
  "Banking",
  "Financial Services",
  "Logistics",
  "Healthcare",
  "Telecommunications",
  "Aviation",
  "Construction",
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const SALESFORCE_PRODUCTS = [
  "Sales Cloud",
  "Service Cloud",
  "Experience Cloud",
  "Marketing Cloud",
  "Data Cloud",
  "Slack",
  "Agentforce",
  "Einstein AI",
  "CPQ",
  "Field Service",
  "Commerce Cloud",
  "Tableau",
  "MuleSoft",
] as const;
export type SalesforceProduct = (typeof SALESFORCE_PRODUCTS)[number];

/** Evidence categories that feed the Salesforce confidence score. */
export const SIGNAL_TYPES = [
  "careers_page",
  "admin_role",
  "developer_role",
  "consultant_role",
  "trailblazer",
  "case_study",
  "partner_announcement",
  "appexchange",
  "implementation_partner",
  "product_reference",
  "crm_migration",
  "public_documentation",
  "tech_profiling",
] as const;
export type SignalType = (typeof SIGNAL_TYPES)[number];

export const SIGNAL_TYPE_LABELS: Record<SignalType, string> = {
  careers_page: "Salesforce careers listing",
  admin_role: "Salesforce Administrator role",
  developer_role: "Salesforce Developer role",
  consultant_role: "Salesforce Consultant role",
  trailblazer: "Trailblazer community reference",
  case_study: "Published case study",
  partner_announcement: "Partner announcement",
  appexchange: "AppExchange reference",
  implementation_partner: "Implementation partner engagement",
  product_reference: "Salesforce product reference",
  crm_migration: "CRM migration announcement",
  public_documentation: "Public documentation",
  tech_profiling: "Technology profiling service",
};

export type SignalStrength = "weak" | "moderate" | "strong";

export type ConfidenceBand = "Confirmed" | "Highly likely" | "Possible" | "Unknown";

export type ProductEvidenceLevel = "confirmed" | "strong" | "moderate" | "weak" | "none";

export const PIPELINE_STAGES = [
  "identified",
  "researching",
  "qualified",
  "outreach_planned",
  "engaged",
  "opportunity",
  "on_hold",
] as const;
export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export const PIPELINE_STAGE_LABELS: Record<PipelineStage, string> = {
  identified: "Identified",
  researching: "Researching",
  qualified: "Qualified",
  outreach_planned: "Outreach planned",
  engaged: "Engaged",
  opportunity: "Opportunity",
  on_hold: "On hold",
};

export type PriorityLevel = "P1 Strategic" | "P2 High" | "P3 Medium" | "P4 Nurture";

export const STAKEHOLDER_PERSONAS = [
  "Chief Information Officer",
  "Chief Technology Officer",
  "Chief Digital Officer",
  "Chief Transformation Officer",
  "Head of CRM",
  "CRM Manager",
  "Salesforce Manager",
  "Head of Customer Experience",
  "Director of Customer Service",
  "Head of Sales Operations",
  "Digital Transformation Director",
  "AI Director",
  "Innovation Director",
  "Enterprise Architect",
  "Transformation Lead",
  "Product Owner",
  "Platform Owner",
] as const;
export type StakeholderPersona = (typeof STAKEHOLDER_PERSONAS)[number];

export type BuyingInfluence =
  | "Economic Buyer"
  | "Champion"
  | "Technical Evaluator"
  | "Influencer"
  | "Gatekeeper";

export type RelationshipPriority = "P1" | "P2" | "P3";
