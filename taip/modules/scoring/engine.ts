import {
  SALESFORCE_PRODUCTS,
  SIGNAL_TYPE_LABELS,
  type ConfidenceBand,
  type PriorityLevel,
  type ProductEvidenceLevel,
  type SalesforceProduct,
  type SignalType,
} from "@/modules/core/taxonomy";
import type { Account, SalesforceSignal } from "@/modules/accounts/types";
import { clamp, isOverdue } from "@/lib/utils";
import {
  ACCOUNT_CRITERIA,
  CONCLUSIVE_SIGNAL_TYPES,
  CONFIDENCE_BANDS,
  OPPORTUNITY_DRIVERS,
  OVERALL_BLEND,
  PRIORITY_BANDS,
  PRODUCT_LEVELS,
  READINESS_WEIGHTS,
  REPEAT_SIGNAL_FACTOR,
  SIGNAL_WEIGHTS,
  STRENGTH_MULTIPLIER,
  type CriterionId,
} from "./weights";

// ---------------------------------------------------------------------------
// Salesforce confidence
// ---------------------------------------------------------------------------

export interface ConfidenceContribution {
  type: SignalType;
  label: string;
  count: number;
  points: number;
}

export interface SalesforceConfidence {
  score: number; // 0–100
  band: ConfidenceBand;
  contributions: ConfidenceContribution[];
  signalCount: number;
}

/**
 * Weighted evidence model: every indicator adds points scaled by strength,
 * with diminishing returns for repeats of the same indicator type. The
 * "Confirmed" band additionally requires at least one conclusive strong
 * signal (case study, partner announcement or public documentation) so a
 * pile of job adverts can never claim certainty.
 */
export function computeSalesforceConfidence(
  signals: SalesforceSignal[],
): SalesforceConfidence {
  const byType = new Map<SignalType, SalesforceSignal[]>();
  for (const s of signals) {
    const list = byType.get(s.type) ?? [];
    list.push(s);
    byType.set(s.type, list);
  }

  const contributions: ConfidenceContribution[] = [];
  let raw = 0;

  for (const [type, group] of byType) {
    // Strongest signal first so it takes the full weight.
    const ordered = [...group].sort(
      (a, b) => STRENGTH_MULTIPLIER[b.strength] - STRENGTH_MULTIPLIER[a.strength],
    );
    let points = 0;
    ordered.forEach((signal, index) => {
      const repeatFactor = index === 0 ? 1 : REPEAT_SIGNAL_FACTOR;
      points += SIGNAL_WEIGHTS[type] * STRENGTH_MULTIPLIER[signal.strength] * repeatFactor;
    });
    points = Math.round(points);
    raw += points;
    contributions.push({ type, label: SIGNAL_TYPE_LABELS[type], count: group.length, points });
  }

  contributions.sort((a, b) => b.points - a.points);
  const score = Math.round(clamp(raw, 0, 100));

  const hasConclusive = signals.some(
    (s) => CONCLUSIVE_SIGNAL_TYPES.includes(s.type) && s.strength === "strong",
  );

  let band: ConfidenceBand;
  if (score >= CONFIDENCE_BANDS.confirmed && hasConclusive) band = "Confirmed";
  else if (score >= CONFIDENCE_BANDS.highlyLikely) band = "Highly likely";
  else if (score >= CONFIDENCE_BANDS.possible) band = "Possible";
  else band = "Unknown";

  return { score, band, contributions, signalCount: signals.length };
}

// ---------------------------------------------------------------------------
// Product detection
// ---------------------------------------------------------------------------

export interface ProductEvidence {
  product: SalesforceProduct;
  score: number; // 0–100
  level: ProductEvidenceLevel;
  evidence: SalesforceSignal[];
}

export function computeProductEvidence(signals: SalesforceSignal[]): ProductEvidence[] {
  return SALESFORCE_PRODUCTS.map((product) => {
    const evidence = signals.filter((s) => s.products?.includes(product));
    let score = 0;
    const ordered = [...evidence].sort(
      (a, b) => STRENGTH_MULTIPLIER[b.strength] - STRENGTH_MULTIPLIER[a.strength],
    );
    ordered.forEach((signal, index) => {
      const repeatFactor = index === 0 ? 1 : 0.5;
      score += 30 * STRENGTH_MULTIPLIER[signal.strength] * repeatFactor;
    });
    score = Math.round(clamp(score, 0, 100));

    let level: ProductEvidenceLevel = "none";
    if (score >= PRODUCT_LEVELS.confirmed) level = "confirmed";
    else if (score >= PRODUCT_LEVELS.strong) level = "strong";
    else if (score >= PRODUCT_LEVELS.moderate) level = "moderate";
    else if (score >= PRODUCT_LEVELS.weak) level = "weak";

    return { product, score, level, evidence };
  });
}

// ---------------------------------------------------------------------------
// AI opportunity
// ---------------------------------------------------------------------------

export interface OpportunityDriver {
  label: string;
  points: number;
}

export interface AiOpportunity {
  score: number; // 0–100
  readinessComponent: number;
  drivers: OpportunityDriver[];
}

export function computeAiOpportunity(account: Account): AiOpportunity {
  const r = account.readiness;
  let readinessComponent = 0;
  for (const [dim, weight] of Object.entries(READINESS_WEIGHTS)) {
    readinessComponent += (r[dim as keyof typeof READINESS_WEIGHTS] ?? 0) * weight;
  }
  readinessComponent = Math.round(readinessComponent * 0.7); // readiness contributes up to 70pts

  const drivers: OpportunityDriver[] = [];
  const add = (label: string, points: number) => drivers.push({ label, points });

  if (account.aiInitiatives.length > 0)
    add("AI initiatives announced", OPPORTUNITY_DRIVERS.aiInitiativeAnnounced);
  if (account.digitalInitiatives.length > 0)
    add("Digital transformation programme", OPPORTUNITY_DRIVERS.digitalProgramme);
  if (account.attributes.executiveAiSponsorship)
    add("Executive AI sponsorship", OPPORTUNITY_DRIVERS.executiveAiSponsorship);
  if (account.attributes.largeServiceOperation)
    add("Large service operation", OPPORTUNITY_DRIVERS.largeServiceOperation);
  if (account.attributes.customerFacing)
    add("Customer-facing organisation", OPPORTUNITY_DRIVERS.customerFacing);
  if (account.growthRatePct >= 15) add("Rapid growth", OPPORTUNITY_DRIVERS.rapidGrowth);

  const driverPoints = drivers.reduce((sum, d) => sum + d.points, 0);
  const score = Math.round(clamp(readinessComponent + driverPoints, 0, 100));
  return { score, readinessComponent, drivers };
}

// ---------------------------------------------------------------------------
// Criteria + overall account score
// ---------------------------------------------------------------------------

export interface CriterionResult {
  id: CriterionId;
  label: string;
  met: boolean;
  points: number;
  maxPoints: number;
  evidence?: string;
}

export interface AccountScore {
  overall: number; // 0–100
  salesforce: SalesforceConfidence;
  aiOpportunity: AiOpportunity;
  firmographicFit: number; // 0–100
  engagement: number; // 0–100
  priority: PriorityLevel;
  nextAction: { label: string; rationale: string };
  criteria: CriterionResult[];
  products: ProductEvidence[];
}

const SF_TALENT_SIGNALS: SignalType[] = [
  "careers_page",
  "admin_role",
  "developer_role",
  "consultant_role",
];

function evaluateCriteria(
  account: Account,
  confidence: SalesforceConfidence,
  products: ProductEvidence[],
): CriterionResult[] {
  const serviceCloud = products.find((p) => p.product === "Service Cloud");
  const slack = products.find((p) => p.product === "Slack");
  const slackInStack = account.techStack.some((t) => t.name.toLowerCase() === "slack");
  const hiringCount = account.salesforceSignals.filter((s) =>
    SF_TALENT_SIGNALS.includes(s.type),
  ).length;

  const checks: Record<CriterionId, { met: boolean; evidence?: string }> = {
    uses_salesforce: {
      met: confidence.band === "Confirmed" || confidence.band === "Highly likely",
      evidence: `${confidence.band} · score ${confidence.score}`,
    },
    uses_service_cloud: {
      met: !!serviceCloud && ["confirmed", "strong"].includes(serviceCloud.level),
      evidence: serviceCloud ? `Evidence level: ${serviceCloud.level}` : undefined,
    },
    hiring_sf_talent: {
      met: hiringCount > 0,
      evidence: hiringCount > 0 ? `${hiringCount} hiring signal(s)` : undefined,
    },
    growing_rapidly: {
      met: account.growthRatePct >= 15,
      evidence: `${account.growthRatePct}% growth`,
    },
    ai_initiatives: {
      met: account.aiInitiatives.length > 0,
      evidence:
        account.aiInitiatives.length > 0
          ? account.aiInitiatives[0]!.title
          : undefined,
    },
    dx_programme: {
      met: account.digitalInitiatives.length > 0,
      evidence:
        account.digitalInitiatives.length > 0
          ? account.digitalInitiatives[0]!.title
          : undefined,
    },
    slack_usage: {
      met: (!!slack && slack.level !== "none") || slackInStack,
      evidence: slackInStack ? "Slack in verified tech stack" : undefined,
    },
    customer_facing: { met: account.attributes.customerFacing },
    large_service_op: { met: account.attributes.largeServiceOperation },
    enterprise_revenue: {
      met: account.revenueEstimateUSD >= 500,
      evidence: `Est. revenue ${account.revenueEstimateUSD >= 1000 ? `$${(account.revenueEstimateUSD / 1000).toFixed(1)}B` : `$${account.revenueEstimateUSD}M`}`,
    },
    regional_presence: {
      met: account.attributes.regionalPresence >= 2,
      evidence: `${account.attributes.regionalPresence} market(s)`,
    },
    exec_ai_sponsorship: { met: account.attributes.executiveAiSponsorship },
  };

  return ACCOUNT_CRITERIA.map((c) => {
    const check = checks[c.id];
    return {
      id: c.id,
      label: c.label,
      met: check.met,
      points: check.met ? c.points : 0,
      maxPoints: c.points,
      evidence: check.evidence,
    };
  });
}

function recommendNextAction(
  account: Account,
  confidence: SalesforceConfidence,
  ai: AiOpportunity,
): { label: string; rationale: string } {
  if (isOverdue(account.nextFollowUpAt)) {
    return {
      label: "Follow up now — action overdue",
      rationale: "A scheduled follow-up date has passed. Re-engage before the account goes cold.",
    };
  }
  if (confidence.band === "Confirmed" && ai.score >= 65) {
    return {
      label: "Propose an Agentforce Discovery Workshop",
      rationale:
        "Salesforce footprint is confirmed and AI opportunity is high — lead with an agentic AI value workshop anchored on their existing clouds.",
    };
  }
  if (confidence.band === "Confirmed") {
    return {
      label: "Map expansion whitespace on the existing org",
      rationale:
        "Salesforce is confirmed but AI opportunity signals are still developing. Assess adoption depth and identify the first AI-ready process.",
    };
  }
  if (confidence.band === "Highly likely") {
    return {
      label: "Validate the Salesforce footprint with stakeholders",
      rationale:
        "Evidence is strong but not conclusive. Confirm the platform landscape through a stakeholder conversation before shaping the proposition.",
    };
  }
  if (confidence.band === "Possible" && ai.score >= 60) {
    return {
      label: "Lead with an AI Readiness Assessment",
      rationale:
        "CRM platform is unverified but transformation appetite is clear — open with a platform-neutral AI readiness conversation.",
    };
  }
  if (confidence.band === "Possible") {
    return {
      label: "Deepen research on the CRM landscape",
      rationale:
        "Some indicators exist but the picture is incomplete. Gather job-market, partner and documentation evidence before outreach.",
    };
  }
  return {
    label: "Monitor and nurture",
    rationale:
      "Too little evidence to prioritise today. Track hiring and announcement signals; revisit next quarter.",
  };
}

export function computeAccountScore(account: Account): AccountScore {
  const salesforce = computeSalesforceConfidence(account.salesforceSignals);
  const products = computeProductEvidence(account.salesforceSignals);
  const aiOpportunity = computeAiOpportunity(account);
  const criteria = evaluateCriteria(account, salesforce, products);

  const criteriaMax = criteria.reduce((s, c) => s + c.maxPoints, 0);
  const criteriaEarned = criteria.reduce((s, c) => s + c.points, 0);
  const firmographicFit = Math.round((criteriaEarned / criteriaMax) * 100);

  // Engagement: research recency, pipeline momentum, hiring energy.
  const researchedDays = Math.floor(
    (Date.now() - new Date(account.lastResearchedAt).getTime()) / 86_400_000,
  );
  const recency = clamp(100 - researchedDays * 2, 0, 100); // stale after ~50 days
  const stageIndex: Record<Account["pipelineStage"], number> = {
    identified: 20,
    researching: 40,
    qualified: 60,
    outreach_planned: 75,
    engaged: 90,
    opportunity: 100,
    on_hold: 10,
  };
  const hiringEnergy = clamp(
    account.hiringTrends.reduce((s, h) => s + (h.trend === "rising" ? 20 : h.trend === "steady" ? 8 : 0), 0),
    0,
    100,
  );
  const engagement = Math.round(
    recency * 0.4 + stageIndex[account.pipelineStage] * 0.4 + hiringEnergy * 0.2,
  );

  const overall = Math.round(
    clamp(
      salesforce.score * OVERALL_BLEND.salesforceConfidence +
        aiOpportunity.score * OVERALL_BLEND.aiOpportunity +
        firmographicFit * OVERALL_BLEND.firmographicFit +
        engagement * OVERALL_BLEND.engagement,
      0,
      100,
    ),
  );

  let priority: PriorityLevel;
  if (overall >= PRIORITY_BANDS.p1) priority = "P1 Strategic";
  else if (overall >= PRIORITY_BANDS.p2) priority = "P2 High";
  else if (overall >= PRIORITY_BANDS.p3) priority = "P3 Medium";
  else priority = "P4 Nurture";

  return {
    overall,
    salesforce,
    aiOpportunity,
    firmographicFit,
    engagement,
    priority,
    nextAction: recommendNextAction(account, salesforce, aiOpportunity),
    criteria,
    products,
  };
}
