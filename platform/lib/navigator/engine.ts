/**
 * Tazkia AI Navigator™ — intelligence engine.
 *
 * Pure functions that turn assessment answers into scores, the priority
 * matrix, the transformation roadmap and the executive report.
 */

import {
  AGENTS,
  AgentDef,
  EMPLOYEE_BANDS,
  SCALE_QUESTIONS,
  ScaleQuestion,
  bandForPct,
  ScoreBand,
} from "@/lib/data/navigator";

/* ------------------------------------------------------------------ */
/* Answer state                                                        */
/* ------------------------------------------------------------------ */

export type ProfileAnswers = {
  company: string;
  industry: string;
  country: string;
  employees: string; // EmployeeBand id
  revenue: string;
  crm: string;
  clouds: string[];
  partner: string;
};

export type NavigatorAnswers = {
  profile: ProfileAnswers;
  objectives: string[];
  scales: Record<string, number>; // ScaleQuestion id -> 1..5
  international: boolean | null;
  languages: string[];
  agents: Record<string, number>; // agent id -> 1..5 interest
  focusInitiatives: string[]; // initiative ids the user starred
};

export const EMPTY_ANSWERS: NavigatorAnswers = {
  profile: {
    company: "",
    industry: "",
    country: "",
    employees: "",
    revenue: "",
    crm: "",
    clouds: [],
    partner: "",
  },
  objectives: [],
  scales: {},
  international: null,
  languages: [],
  agents: {},
  focusInitiatives: [],
};

/* ------------------------------------------------------------------ */
/* Scores                                                              */
/* ------------------------------------------------------------------ */

export type ScoreKey =
  | "maturity"
  | "data"
  | "sales"
  | "service"
  | "slack"
  | "multilingual";

const SCORE_STAGES: ScoreKey[] = [
  "maturity",
  "data",
  "sales",
  "service",
  "slack",
  "multilingual",
];

export function questionsFor(stage: ScoreKey): ScaleQuestion[] {
  return SCALE_QUESTIONS.filter((q) => q.stage === stage);
}

/** Average of answered questions in a stage, as a 0–100 percentage. */
export function stagePct(
  stage: ScoreKey,
  scales: Record<string, number>
): number {
  const qs = questionsFor(stage);
  const answered = qs
    .map((q) => scales[q.id])
    .filter((v): v is number => v !== undefined);
  if (!answered.length) return 0;
  const avg = answered.reduce((a, b) => a + b, 0) / answered.length;
  return Math.round(((avg - 1) / 4) * 100);
}

export type AgentSuitability = {
  agent: AgentDef;
  interest: number; // 1..5 (0 if unanswered)
  readinessPct: number; // 0..100 organisational readiness
  suitabilityPct: number; // blended
};

export function agentSuitability(answers: NavigatorAnswers): AgentSuitability[] {
  return AGENTS.map((agent) => {
    const interest = answers.agents[agent.id] ?? 0;
    const driverPcts = agent.readinessDrivers.map((d) =>
      stagePct(d, answers.scales)
    );
    const readinessPct = Math.round(
      driverPcts.reduce((a, b) => a + b, 0) / driverPcts.length
    );
    const interestPct = interest ? ((interest - 1) / 4) * 100 : 0;
    const suitabilityPct = Math.round(0.55 * readinessPct + 0.45 * interestPct);
    return { agent, interest, readinessPct, suitabilityPct };
  }).sort((a, b) => b.suitabilityPct - a.suitabilityPct);
}

export type Scores = {
  maturity: number;
  data: number;
  sales: number;
  service: number;
  slack: number;
  multilingual: number;
  agentforce: number;
  overall: number;
  band: ScoreBand;
};

export function computeScores(answers: NavigatorAnswers): Scores {
  const s: Record<ScoreKey, number> = {
    maturity: stagePct("maturity", answers.scales),
    data: stagePct("data", answers.scales),
    sales: stagePct("sales", answers.scales),
    service: stagePct("service", answers.scales),
    slack: stagePct("slack", answers.scales),
    multilingual: stagePct("multilingual", answers.scales),
  };
  const suits = agentSuitability(answers);
  const rated = suits.filter((x) => x.interest > 0);
  const agentforce = rated.length
    ? Math.round(
        rated.reduce((a, x) => a + x.suitabilityPct, 0) / rated.length
      )
    : Math.round(suits.reduce((a, x) => a + x.readinessPct, 0) / suits.length);

  const overall = Math.round(
    s.data * 0.24 +
      s.maturity * 0.2 +
      s.sales * 0.13 +
      s.service * 0.13 +
      s.slack * 0.11 +
      s.multilingual * 0.07 +
      agentforce * 0.12
  );

  return { ...s, agentforce, overall, band: bandForPct(overall) };
}

/* ------------------------------------------------------------------ */
/* Initiative portfolio (priority matrix)                              */
/* ------------------------------------------------------------------ */

export type Bucket =
  | "quick-win"
  | "strategic"
  | "medium"
  | "low";

export type Initiative = {
  id: string;
  name: string;
  detail: string;
  effort: number; // 1 (light) .. 5 (heavy)
  impact: number; // 1 .. 5, computed for this organisation
  bucket: Bucket;
  service: string; // Tazkia service that delivers it
};

export function bucketFor(impact: number, effort: number): Bucket {
  if (impact >= 3.4 && effort <= 2.8) return "quick-win";
  if (impact >= 3.4) return "strategic";
  if (impact >= 2.4) return "medium";
  return "low";
}

export const BUCKET_META: Record<
  Bucket,
  { label: string; blurb: string }
> = {
  "quick-win": {
    label: "Quick Wins",
    blurb: "High impact, fast to deliver — start here",
  },
  strategic: {
    label: "Strategic Initiatives",
    blurb: "High impact, larger effort — plan and phase",
  },
  medium: {
    label: "Medium Impact",
    blurb: "Worthwhile — sequence behind the priorities",
  },
  low: {
    label: "Low Priority",
    blurb: "Revisit as foundations mature",
  },
};

type InitiativeDef = {
  id: string;
  name: string;
  detail: string;
  effort: number;
  service: string;
  /** 1–5 impact given this organisation's answers */
  impact: (a: NavigatorAnswers, s: Scores) => number;
  relevant?: (a: NavigatorAnswers, s: Scores) => boolean;
};

const gap = (pct: number) => (100 - pct) / 100; // 0..1, bigger = weaker
const has = (a: NavigatorAnswers, obj: string) => a.objectives.includes(obj);
const scale = (a: NavigatorAnswers, id: string) => a.scales[id] ?? 3;

const INITIATIVE_DEFS: InitiativeDef[] = [
  {
    id: "service-agent-pilot",
    name: "Agentforce Service Agent pilot",
    detail:
      "Deploy an AI agent to resolve routine customer cases on your top channel, with supervised escalation.",
    effort: 2.6,
    service: "Service AI Pilot",
    impact: (a, s) =>
      2.6 +
      1.4 * gap(s.service) +
      (has(a, "improve-service") || has(a, "modernise-cx") ? 0.9 : 0) +
      (scale(a, "svc-self-service") <= 2 ? 0.4 : 0),
  },
  {
    id: "sdr-agent-pilot",
    name: "AI lead qualification (SDR Agent)",
    detail:
      "Instant, 24/7 engagement and qualification of inbound leads, routed to sellers with full context.",
    effort: 2.4,
    service: "Sales AI Pilot",
    impact: (a, s) =>
      2.5 +
      (has(a, "increase-sales") ? 1.1 : 0) +
      1.2 * (scale(a, "sales-lead-qual") <= 2 ? 1 : gap(s.sales)),
  },
  {
    id: "data-foundation",
    name: "Data quality & unification sprint",
    detail:
      "Deduplicate, standardise and unify customer data across systems — the foundation every AI use case stands on.",
    effort: 3.2,
    service: "Salesforce Optimisation",
    impact: (a, s) => 2.4 + 2.6 * gap(s.data),
  },
  {
    id: "knowledge-sprint",
    name: "Knowledge harvesting sprint",
    detail:
      "Capture and structure your top customer and employee questions into AI-ready knowledge articles.",
    effort: 2.2,
    service: "AI Readiness Assessment",
    impact: (a, s) =>
      2.2 +
      1.6 * ((6 - scale(a, "data-knowledge")) / 5) +
      1.2 * ((6 - scale(a, "svc-knowledge")) / 5),
    relevant: (a) =>
      scale(a, "data-knowledge") <= 3 || scale(a, "svc-knowledge") <= 3,
  },
  {
    id: "einstein-forecasting",
    name: "AI forecasting & pipeline insight",
    detail:
      "Einstein forecasting and deal insights to lift forecast accuracy and focus sellers on winnable deals.",
    effort: 2.0,
    service: "Sales AI Pilot",
    impact: (a, s) =>
      2.0 +
      (has(a, "increase-sales") || has(a, "reporting") ? 0.8 : 0) +
      1.4 * ((6 - scale(a, "sales-forecast")) / 5),
    relevant: (a) => a.profile.crm === "Salesforce",
  },
  {
    id: "slack-notifications",
    name: "Salesforce alerts & approvals in Slack",
    detail:
      "Actionable deal, case and approval notifications delivered where teams already work.",
    effort: 1.4,
    service: "Slack Workflow Pilot",
    impact: (a, s) =>
      1.8 +
      (has(a, "productivity") || has(a, "reduce-costs") ? 0.8 : 0) +
      1.1 * ((6 - scale(a, "slack-approvals")) / 5) +
      (scale(a, "slack-adoption") >= 3 ? 0.6 : -0.6),
  },
  {
    id: "exec-briefing",
    name: "Executive AI briefing channel",
    detail:
      "A daily AI-generated business summary and conversational Q&A for the leadership team, in Slack.",
    effort: 1.6,
    service: "Executive AI Strategy Session",
    impact: (a, s) =>
      1.9 +
      (has(a, "reporting") ? 1.0 : 0) +
      1.0 * ((6 - scale(a, "slack-exec")) / 5) +
      0.6 * ((6 - scale(a, "sales-exec-reporting")) / 5),
  },
  {
    id: "multilingual-service",
    name: "Multilingual AI service (Arabic-first)",
    detail:
      "AI translation and native-language agents so every customer is served in their language, every hour.",
    effort: 2.8,
    service: "Service AI Pilot",
    impact: (a, s) =>
      1.6 +
      (has(a, "multilingual") ? 1.3 : 0) +
      (has(a, "scale-international") ? 0.8 : 0) +
      (a.international ? 0.7 : 0) +
      (a.languages.length >= 2 ? 0.5 : 0),
    relevant: (a) =>
      a.international === true ||
      has(a, "multilingual") ||
      has(a, "scale-international"),
  },
  {
    id: "employee-assistant",
    name: "Employee AI assistant rollout",
    detail:
      "An AI assistant for every employee — drafting, summarising and answering from company knowledge.",
    effort: 3.0,
    service: "Managed AI Services",
    impact: (a, s) =>
      2.1 +
      (has(a, "productivity") ? 1.2 : 0) +
      (has(a, "reduce-costs") ? 0.6 : 0) +
      0.8 * ((a.agents["employee-assistant"] ?? 3) - 3) * 0.5,
  },
  {
    id: "crm-adoption",
    name: "CRM adoption & hygiene programme",
    detail:
      "Re-establish Salesforce as the single source of truth — simplified screens, coaching and adoption metrics.",
    effort: 2.4,
    service: "Salesforce Optimisation",
    impact: (a, s) => 1.8 + 2.8 * gap(s.maturity),
    relevant: (a, s) => s.maturity < 70,
  },
  {
    id: "ai-governance",
    name: "AI policy & governance framework",
    detail:
      "A pragmatic AI usage policy, approval path and trust framework aligned to Gulf regulatory expectations.",
    effort: 1.8,
    service: "Executive AI Strategy Session",
    impact: (a, s) =>
      1.7 +
      1.6 * ((6 - scale(a, "data-ai-policy")) / 5) +
      0.8 * ((6 - scale(a, "data-governance")) / 5),
    relevant: (a) => scale(a, "data-ai-policy") <= 3,
  },
  {
    id: "self-service-portal",
    name: "AI-powered self-service portal",
    detail:
      "An Experience Cloud portal with an embedded Agentforce agent completing requests end-to-end.",
    effort: 3.6,
    service: "Service AI Pilot",
    impact: (a, s) =>
      1.9 +
      (has(a, "modernise-cx") ? 1.0 : 0) +
      (has(a, "reduce-costs") ? 0.6 : 0) +
      1.0 * ((6 - scale(a, "svc-self-service")) / 5),
  },
  {
    id: "sales-coach",
    name: "AI sales coaching",
    detail:
      "Agentforce sales coach for practice, objection handling and deal guidance — a coach for every rep.",
    effort: 2.2,
    service: "Sales AI Pilot",
    impact: (a, s) =>
      1.7 +
      (has(a, "increase-sales") ? 0.7 : 0) +
      1.0 * ((6 - scale(a, "sales-coaching")) / 5) +
      0.5 * ((a.agents["sales-agent"] ?? 3) - 3) * 0.5,
  },
  {
    id: "hr-agent",
    name: "Internal HR & knowledge agent",
    detail:
      "An internal agent answering HR, policy and procedure questions instantly in Slack.",
    effort: 2.0,
    service: "Slack Workflow Pilot",
    impact: (a, s) =>
      1.6 +
      (has(a, "productivity") ? 0.9 : 0) +
      0.7 * (((a.agents["hr-agent"] ?? 0) + (a.agents["knowledge-agent"] ?? 0)) / 2 - 2.5) * 0.5 +
      0.5 * ((6 - scale(a, "slack-ai")) / 5),
  },
];

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

export function buildInitiatives(
  answers: NavigatorAnswers,
  scores: Scores
): Initiative[] {
  return INITIATIVE_DEFS.filter(
    (d) => !d.relevant || d.relevant(answers, scores)
  )
    .map((d) => {
      const impact = clamp(
        Math.round(d.impact(answers, scores) * 10) / 10,
        1,
        5
      );
      return {
        id: d.id,
        name: d.name,
        detail: d.detail,
        effort: d.effort,
        impact,
        bucket: bucketFor(impact, d.effort),
        service: d.service,
      };
    })
    .sort((a, b) => b.impact - a.impact);
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */

export type RoadmapPhase = {
  period: string;
  title: string;
  items: string[];
};

export type ValueEstimate = {
  roiMultiple: number;
  paybackMonths: number;
  hoursPerWeek: number;
  fteEquivalent: number;
  revenueUpliftPct: number;
  csatPoints: number;
  deflectionPct: number;
};

export type ServiceRecommendation = {
  name: string;
  reason: string;
  flagship?: boolean;
};

export type Report = {
  scores: Scores;
  agents: AgentSuitability[];
  initiatives: Initiative[];
  summary: string;
  opportunities: string[];
  risks: string[];
  quickWins: Initiative[];
  roadmap90: RoadmapPhase[];
  roadmap12: RoadmapPhase[];
  pilot: { name: string; detail: string };
  salesforceImprovements: string[];
  slackImprovements: string[];
  agentUseCases: string[];
  workshops: string[];
  services: ServiceRecommendation[];
  value: ValueEstimate;
};

function weakestQuestions(
  answers: NavigatorAnswers,
  stage: ScoreKey,
  n: number
): ScaleQuestion[] {
  return questionsFor(stage)
    .filter((q) => (answers.scales[q.id] ?? 3) <= 3)
    .sort((a, b) => (answers.scales[a.id] ?? 3) - (answers.scales[b.id] ?? 3))
    .slice(0, n);
}

export function buildReport(answers: NavigatorAnswers): Report {
  const scores = computeScores(answers);
  const agents = agentSuitability(answers);
  const initiatives = buildInitiatives(answers, scores);
  const company = answers.profile.company.trim() || "Your organisation";
  const industry = answers.profile.industry || "your industry";

  /* Executive summary ------------------------------------------------ */
  const dims: { key: ScoreKey | "agentforce"; label: string; pct: number }[] = [
    { key: "maturity", label: "Salesforce maturity", pct: scores.maturity },
    { key: "data", label: "data & AI readiness", pct: scores.data },
    { key: "sales", label: "sales AI readiness", pct: scores.sales },
    { key: "service", label: "service AI readiness", pct: scores.service },
    { key: "slack", label: "collaboration & workflow", pct: scores.slack },
  ];
  const strongest = [...dims].sort((a, b) => b.pct - a.pct)[0];
  const weakest = [...dims].sort((a, b) => a.pct - b.pct)[0];
  const topAgent = agents[0];

  const summary = `${company} is ${scores.band.headline}, with an overall AI readiness score of ${scores.overall}/100 (${scores.band.name}). Your strongest dimension is ${strongest.label} (${strongest.pct}/100); your greatest opportunity lies in ${weakest.label} (${weakest.pct}/100). ${scores.band.narrative} Within ${industry}, the highest-suitability Agentforce deployment for you is the ${topAgent.agent.name} (${topAgent.suitabilityPct}/100 suitability), and the priority portfolio below sequences ${initiatives.filter((i) => i.bucket === "quick-win").length} quick wins ahead of the larger strategic moves.`;

  /* Opportunities ----------------------------------------------------- */
  const opportunities: string[] = [];
  if (scores.service < 65 || answers.objectives.includes("improve-service"))
    opportunities.push(
      "Autonomous service: an Agentforce Service Agent resolving routine cases 24/7 — the fastest measurable AI return in the region today."
    );
  if (answers.objectives.includes("increase-sales") || scores.sales < 60)
    opportunities.push(
      "Revenue acceleration: instant AI lead qualification and Einstein pipeline insight to lift conversion and forecast confidence."
    );
  if ((answers.scales["slack-adoption"] ?? 0) >= 3)
    opportunities.push(
      "AI in the flow of work: Slack is already adopted — embedding agents and Salesforce workflows there gives every employee AI with zero new tools."
    );
  else
    opportunities.push(
      "Workflow intelligence: notifications, approvals and AI assistance in a collaborative layer would remove hidden time-taxes across the business."
    );
  if (
    answers.international ||
    answers.objectives.includes("multilingual") ||
    answers.objectives.includes("scale-international")
  )
    opportunities.push(
      "Multilingual advantage: Arabic-first AI service lets you cover every market and time zone without multiplying regional headcount."
    );
  if (scores.data >= 60)
    opportunities.push(
      "Data head start: your data readiness is above regional norms — customer-facing AI can deploy with less remediation runway than competitors need."
    );
  if (answers.objectives.includes("productivity"))
    opportunities.push(
      "Employee productivity: an AI assistant for every employee, grounded in your knowledge — typically recovering hours per person per week."
    );

  /* Risks -------------------------------------------------------------- */
  const risks: string[] = [];
  if ((answers.scales["data-quality"] ?? 3) <= 2)
    risks.push(
      "Data quality is the critical-path risk: AI deployed on untrusted data erodes confidence quickly. Sequence the data sprint first."
    );
  if ((answers.scales["data-ai-policy"] ?? 3) <= 2)
    risks.push(
      "No AI policy means every approval is improvised — pilots stall and shadow AI spreads. A one-page policy is a one-week fix."
    );
  if ((answers.scales["data-sponsorship"] ?? 3) <= 2)
    risks.push(
      "Weak executive sponsorship is the most common cause of stalled AI programmes we see. Secure a named sponsor before scaling investment."
    );
  if ((answers.scales["mat-user-adoption"] ?? 3) <= 2)
    risks.push(
      "Historic adoption struggles mean every deployment needs a structured enablement plan — technology alone will not land."
    );
  if ((answers.scales["data-knowledge"] ?? 3) <= 2)
    risks.push(
      "A thin knowledge base will cap agent accuracy. Run the knowledge sprint before any customer-facing agent goes live."
    );
  if ((answers.scales["data-security"] ?? 3) <= 2)
    risks.push(
      "Access-control gaps become AI exposure: an agent can surface anything it can see. A scoped security review belongs in phase one."
    );
  if (risks.length === 0)
    risks.push(
      "No blocking risks identified — the principal risk is pace: moving too slowly while the competitive window in your industry is open."
    );
  if (
    answers.profile.crm !== "Salesforce" &&
    answers.profile.crm !== ""
  )
    risks.push(
      `Your current CRM (${answers.profile.crm}) limits access to Agentforce-native capability — the roadmap includes a platform decision point.`
    );

  /* Quick wins --------------------------------------------------------- */
  const quickWins = initiatives.filter((i) => i.bucket === "quick-win").slice(0, 4);

  /* Roadmaps ----------------------------------------------------------- */
  const early = scores.overall < 45;
  const pickNames = (bucket: Bucket, n: number) =>
    initiatives.filter((i) => i.bucket === bucket).slice(0, n).map((i) => i.name);

  const roadmap90: RoadmapPhase[] = [
    {
      period: "Days 1–30",
      title: "Foundation & alignment",
      items: [
        "Discovery workshop: confirm priorities, success metrics and sponsors",
        early
          ? "Data & CRM baseline: quality audit and adoption reset plan"
          : "Data readiness validation on the pilot's data domain",
        (answers.scales["data-ai-policy"] ?? 3) <= 3
          ? "Draft and approve a pragmatic AI usage policy"
          : "Confirm AI governance guardrails for the pilot scope",
      ],
    },
    {
      period: "Days 31–60",
      title: "Build the first win",
      items: [
        quickWins[0]
          ? `Deliver: ${quickWins[0].name}`
          : "Deliver the first scoped AI quick win",
        (answers.scales["data-knowledge"] ?? 3) <= 3
          ? "Knowledge sprint: top-50 questions captured as AI-ready articles"
          : "Ground the pilot agent in your existing knowledge base",
        "Champion network and role-based enablement launched",
      ],
    },
    {
      period: "Days 61–90",
      title: "Prove and plan scale",
      items: [
        "Pilot live with weekly value measurement against baseline",
        quickWins[1] ? `Second quick win: ${quickWins[1].name}` : "Second quick win initiated",
        "Executive readout: measured results and the 12-month investment case",
      ],
    },
  ];

  const roadmap12: RoadmapPhase[] = [
    {
      period: "Quarter 1",
      title: "Foundations & first value",
      items: [
        "Execute the 90-day plan above",
        ...pickNames("quick-win", 2),
      ],
    },
    {
      period: "Quarter 2",
      title: "Production deployment",
      items: [
        `Scale the pilot to production (${agents[0].agent.name})`,
        ...pickNames("strategic", 1),
        "Data Cloud / unification workstream under way",
      ],
    },
    {
      period: "Quarter 3",
      title: "Portfolio expansion",
      items: [
        agents[1]
          ? `Second agent deployment: ${agents[1].agent.name}`
          : "Second agent deployment",
        ...pickNames("medium", 2),
      ],
    },
    {
      period: "Quarter 4",
      title: "Scale & compound",
      items: [
        "AI governance board and value tracking across the portfolio",
        "Multilingual expansion across served markets",
        "Year-two roadmap grounded in measured ROI",
      ],
    },
  ];

  /* Pilot programme ---------------------------------------------------- */
  const pilotInit = quickWins[0] ?? initiatives[0];
  const pilot = {
    name: pilotInit ? pilotInit.name : `${agents[0].agent.name} pilot`,
    detail: pilotInit
      ? `${pilotInit.detail} Recommended as a 6-week supervised pilot with a defined baseline, weekly value measurement, and a go/no-go gate for production scale. Delivered through our ${pilotInit.service} engagement.`
      : "A 6-week supervised Agentforce pilot with defined baseline and weekly value measurement.",
  };

  /* Improvement lists --------------------------------------------------- */
  const salesforceImprovements = [
    ...weakestQuestions(answers, "maturity", 3),
    ...weakestQuestions(answers, "data", 2),
  ].map((q) => `${q.short}: ${q.insights.low.split(". ")[0]}.`.replace("..", "."));
  if (!salesforceImprovements.length)
    salesforceImprovements.push(
      "Your Salesforce foundation is strong — focus optimisation on preparing objects, knowledge and permissions for agent actions."
    );

  const slackImprovements = weakestQuestions(answers, "slack", 4).map(
    (q) => `${q.short}: ${q.insights.low.split(". ")[0]}.`.replace("..", ".")
  );
  if (!slackImprovements.length)
    slackImprovements.push(
      "Slack maturity is high — the frontier is agents as teammates: Agentforce participating directly in channels with Salesforce actions."
    );

  const agentUseCases = agents
    .slice(0, 4)
    .map(
      (s) =>
        `${s.agent.name} — ${s.agent.blurb} (suitability ${s.suitabilityPct}/100)`
    );

  /* Workshops ----------------------------------------------------------- */
  const workshops: string[] = ["AI Discovery Workshop (half-day, executive team)"];
  if ((answers.scales["data-sponsorship"] ?? 3) <= 3)
    workshops.push("Executive AI Strategy Session — build the sponsored business case");
  if (scores.data < 60)
    workshops.push("Data & AI Readiness Workshop — remediation plan for your data estate");
  if ((answers.scales["slack-adoption"] ?? 0) >= 3)
    workshops.push("Slack Workflow Design Studio — map your top five workflow automations");
  workshops.push("Agentforce Use Case Lab — scope and score your first agents hands-on");

  /* Services ------------------------------------------------------------ */
  const services: ServiceRecommendation[] = [
    {
      name: "Discovery Workshop",
      reason:
        "The structured starting point: priorities, success metrics and a sponsored plan — whatever you decide next.",
      flagship: true,
    },
  ];
  if (scores.overall < 50)
    services.push({
      name: "AI Readiness Assessment",
      reason:
        "A deep-dive validation of this self-assessment across data, platform and governance, with a remediation plan.",
    });
  if (scores.data < 55)
    services.push({
      name: "Salesforce Optimisation",
      reason:
        "Data quality, adoption and platform hygiene — the groundwork your scores show will unlock everything else.",
    });
  if (
    answers.objectives.includes("increase-sales") ||
    scores.sales >= 45
  )
    services.push({
      name: "Sales AI Pilot",
      reason: `A 6-week revenue AI pilot — ${
        (answers.scales["sales-lead-qual"] ?? 3) <= 3
          ? "starting with instant AI lead qualification"
          : "starting with pipeline and forecasting intelligence"
      }.`,
    });
  if (
    answers.objectives.includes("improve-service") ||
    answers.objectives.includes("modernise-cx") ||
    scores.service >= 45
  )
    services.push({
      name: "Service AI Pilot",
      reason:
        "A supervised Agentforce Service Agent on your highest-volume channel, measured weekly against baseline.",
    });
  if ((answers.scales["slack-adoption"] ?? 0) >= 2)
    services.push({
      name: "Slack Workflow Pilot",
      reason:
        "Approvals, notifications and an AI assistant delivered inside Slack — visible value in weeks.",
    });
  if ((answers.scales["data-sponsorship"] ?? 3) <= 3)
    services.push({
      name: "Executive AI Strategy Session",
      reason:
        "Convert executive curiosity into a sponsored, budgeted AI mandate with numbers attached.",
    });
  if (scores.overall >= 60)
    services.push({
      name: "Managed AI Services",
      reason:
        "Your readiness supports a portfolio approach — we run, govern and continuously improve your agents as a service.",
    });

  /* Value model ---------------------------------------------------------- */
  const band = EMPLOYEE_BANDS.find((b) => b.id === answers.profile.employees);
  const employees = band?.midpoint ?? 300;
  const readiness = scores.overall / 100;

  // Conservative consulting heuristics, deliberately rounded.
  const affected = employees * 0.32; // customer-facing + knowledge workers
  const hoursPerWeek = Math.round(affected * (1.2 + 2.4 * readiness));
  const fteEquivalent = Math.round((hoursPerWeek / 40) * 10) / 10;
  const revenueUpliftPct =
    answers.objectives.includes("increase-sales")
      ? Math.round((3 + 5 * ((100 - scores.sales) / 100)) * 10) / 10
      : Math.round((1.5 + 2.5 * ((100 - scores.sales) / 100)) * 10) / 10;
  const csatPoints = Math.round(6 + 12 * ((100 - scores.service) / 100));
  const deflectionPct = Math.round(
    18 + 30 * ((100 - (answers.scales["svc-self-service"] ?? 3) * 20) / 100)
  );
  const roiMultiple = Math.round((2.2 + 2.6 * readiness) * 10) / 10;
  const paybackMonths = Math.round(14 - 7 * readiness);

  return {
    scores,
    agents,
    initiatives,
    summary,
    opportunities: opportunities.slice(0, 5),
    risks: risks.slice(0, 5),
    quickWins,
    roadmap90,
    roadmap12,
    pilot,
    salesforceImprovements: salesforceImprovements.slice(0, 5),
    slackImprovements: slackImprovements.slice(0, 4),
    agentUseCases,
    workshops: workshops.slice(0, 4),
    services: services.slice(0, 6),
    value: {
      roiMultiple,
      paybackMonths,
      hoursPerWeek,
      fteEquivalent,
      revenueUpliftPct,
      csatPoints,
      deflectionPct,
    },
  };
}
