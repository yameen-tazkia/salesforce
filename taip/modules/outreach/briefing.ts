import type { ScoredAccount } from "@/modules/accounts/service";
import type { Stakeholder } from "@/modules/accounts/types";
import { formatRevenue } from "@/lib/utils";
import { INDUSTRY_PLAYBOOKS } from "./playbooks";

/**
 * Outreach briefing generator.
 *
 * Deterministic, rule-based synthesis of the account record + industry
 * playbooks into a pre-outreach brief. Designed so an LLM-backed generator
 * can later replace `generateBriefing` behind the same contract.
 */

export interface OutreachBriefing {
  companySummary: string;
  recentInitiatives: { title: string; category: string; summary: string; announcedAt: string }[];
  likelyPainPoints: string[];
  agentforceOpportunities: string[];
  slackOpportunities: string[];
  discoveryWorkshopAgenda: { item: string; duration: string }[];
  pilotProgramme: { name: string; scope: string; duration: string; successMeasures: string[] };
  recommendedDecisionMakers: Stakeholder[];
  conversationStarters: string[];
  personalisationIdeas: string[];
}

export function generateBriefing({ account, score }: ScoredAccount): OutreachBriefing {
  const playbook = INDUSTRY_PLAYBOOKS[account.industry];
  const confidence = score.salesforce.band;

  const stackLine =
    confidence === "Confirmed" || confidence === "Highly likely"
      ? `Evidence indicates an existing Salesforce footprint (${confidence.toLowerCase()}, score ${score.salesforce.score}/100).`
      : confidence === "Possible"
        ? "Salesforce usage is unverified — indicators exist but are inconclusive."
        : "No meaningful Salesforce evidence found to date; treat as platform-open.";

  const companySummary =
    `${account.name} is a ${account.city}-based ${account.industry.toLowerCase()} organisation ` +
    `(${account.ownership.toLowerCase()}, ~${account.employees.toLocaleString()} employees, ` +
    `est. revenue ${formatRevenue(account.revenueEstimateUSD)}, growing ~${account.growthRatePct}% p.a.). ` +
    `${account.description} ${stackLine} ` +
    `AI opportunity is scored ${score.aiOpportunity.score}/100 and the account is rated ${score.priority}.`;

  const recentInitiatives = [...account.aiInitiatives, ...account.digitalInitiatives]
    .sort((a, b) => new Date(b.announcedAt).getTime() - new Date(a.announcedAt).getTime())
    .map((i) => ({
      title: i.title,
      category: i.category,
      summary: i.summary,
      announcedAt: i.announcedAt,
    }));

  // Account-specific pain points first, then playbook staples.
  const likelyPainPoints: string[] = [];
  if (account.readiness.crmMaturity < 40)
    likelyPainPoints.push("Low CRM maturity — fragmented customer data and manual processes");
  if (account.readiness.dataMaturity < 45)
    likelyPainPoints.push("Data foundations likely insufficient for reliable AI grounding");
  if (account.growthRatePct >= 15)
    likelyPainPoints.push("Rapid growth outpacing current service and sales capacity");
  likelyPainPoints.push(...playbook.painPoints.slice(0, 4 - Math.min(likelyPainPoints.length, 2)));

  const workshopFocus =
    confidence === "Confirmed"
      ? "extending the existing Salesforce estate into agentic AI"
      : "assessing platform and AI readiness";

  const discoveryWorkshopAgenda = [
    { item: "Business ambitions and transformation targets", duration: "30 min" },
    { item: `Current-state review: ${workshopFocus}`, duration: "45 min" },
    { item: "Customer journey walkthrough — top 3 service/sales moments", duration: "45 min" },
    { item: "Agentforce art-of-the-possible (industry demos)", duration: "30 min" },
    { item: "Data readiness and integration landscape", duration: "30 min" },
    { item: "Pilot shortlisting and success criteria", duration: "30 min" },
    { item: "Roadmap, governance and next steps", duration: "15 min" },
  ];

  const pilot = playbook.pilotIdeas[0]!;
  const pilotProgramme = {
    name: `${account.name} — Agentforce Pilot`,
    scope: pilot,
    duration: "6–8 weeks (2 weeks design, 4 weeks build, 2 weeks measured live run)",
    successMeasures: [
      "Containment / deflection rate vs. baseline",
      "Response and resolution time",
      "CSAT on AI-handled interactions",
      "Escalation quality (context passed to humans)",
      "Cost per interaction",
    ],
  };

  const recommendedDecisionMakers = [...account.stakeholders].sort((a, b) => {
    const rank = { P1: 0, P2: 1, P3: 2 } as const;
    return rank[a.relationshipPriority] - rank[b.relationshipPriority];
  });

  const conversationStarters: string[] = [];
  if (account.aiInitiatives[0]) {
    conversationStarters.push(
      `Their "${account.aiInitiatives[0].title}" announcement — ask what's proven hardest between ambition and production.`,
    );
  }
  if (account.news[0]) {
    conversationStarters.push(
      `Recent news: "${account.news[0].title}" — connect it to service/sales capacity implications.`,
    );
  }
  const sfHiring = account.salesforceSignals.filter((s) =>
    ["admin_role", "developer_role", "consultant_role", "careers_page"].includes(s.type),
  );
  if (sfHiring.length > 0) {
    conversationStarters.push(
      `They are hiring Salesforce talent (${sfHiring.length} signal${sfHiring.length > 1 ? "s" : ""}) — discuss build-vs-partner for the next phase.`,
    );
  }
  conversationStarters.push(
    `Regional angle: multilingual (Arabic-first) AI quality as a differentiator in ${account.country}.`,
  );

  const personalisationIdeas: string[] = [];
  if (account.readiness.multilingualOpportunity >= 70)
    personalisationIdeas.push(
      "Lead with Arabic/English agent quality — include a bilingual demo scenario from their industry.",
    );
  if (account.consultingPartners.length > 0)
    personalisationIdeas.push(
      `They already work with ${account.consultingPartners.join(", ")} — position Tazkia as the AI-native specialist layer, not a replacement.`,
    );
  if (score.products.some((p) => p.product === "Slack" && p.level !== "none"))
    personalisationIdeas.push(
      "Slack is in evidence — show agents surfacing account intelligence directly in their existing channels.",
    );
  personalisationIdeas.push(
    `Reference a ${account.industry.toLowerCase()} proof point with quantified outcomes in the first message.`,
    "Keep the first ask small: a 45-minute working session, not a sales meeting.",
  );

  return {
    companySummary,
    recentInitiatives,
    likelyPainPoints,
    agentforceOpportunities: playbook.agentforceOpportunities,
    slackOpportunities: playbook.slackOpportunities,
    discoveryWorkshopAgenda,
    pilotProgramme,
    recommendedDecisionMakers,
    conversationStarters,
    personalisationIdeas,
  };
}
