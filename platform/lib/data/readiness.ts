export type ReadinessDimension = {
  id: string;
  name: string;
  short: string;
  questions: { id: string; text: string }[];
};

/** Every question is answered on a 1–5 scale. */
export const ANSWER_SCALE = [
  { value: 1, label: "Not started" },
  { value: 2, label: "Early" },
  { value: 3, label: "Developing" },
  { value: 4, label: "Established" },
  { value: 5, label: "Leading" },
];

export const READINESS_DIMENSIONS: ReadinessDimension[] = [
  {
    id: "technology",
    name: "Technology Readiness",
    short: "Technology",
    questions: [
      {
        id: "tech-1",
        text: "Our core customer platforms (CRM, service, marketing) are modern, integrated and well-adopted.",
      },
      {
        id: "tech-2",
        text: "We have secure, documented APIs and integration patterns connecting our key systems.",
      },
      {
        id: "tech-3",
        text: "We can provision and test new AI capabilities in a sandboxed environment quickly.",
      },
    ],
  },
  {
    id: "data",
    name: "Data Maturity",
    short: "Data",
    questions: [
      {
        id: "data-1",
        text: "Customer data is unified, deduplicated and trusted across departments.",
      },
      {
        id: "data-2",
        text: "Our knowledge (policies, procedures, product info) is documented, current and centrally managed.",
      },
      {
        id: "data-3",
        text: "We measure data quality and have clear ownership for fixing issues.",
      },
    ],
  },
  {
    id: "governance",
    name: "Governance & Trust",
    short: "Governance",
    questions: [
      {
        id: "gov-1",
        text: "We have clear policies for responsible AI use, including data privacy and residency.",
      },
      {
        id: "gov-2",
        text: "There is a defined approval path for deploying AI that touches customers.",
      },
      {
        id: "gov-3",
        text: "We can audit and explain automated decisions when regulators or customers ask.",
      },
    ],
  },
  {
    id: "people",
    name: "People & Skills",
    short: "People",
    questions: [
      {
        id: "ppl-1",
        text: "Leadership actively sponsors AI adoption with time and budget, not just words.",
      },
      {
        id: "ppl-2",
        text: "Our teams have (or are building) the skills to work alongside AI agents.",
      },
      {
        id: "ppl-3",
        text: "Employees see AI as an opportunity rather than a threat to their roles.",
      },
    ],
  },
  {
    id: "process",
    name: "Process Discipline",
    short: "Processes",
    questions: [
      {
        id: "proc-1",
        text: "Our key customer-facing processes are documented and consistently followed.",
      },
      {
        id: "proc-2",
        text: "We measure process performance (handle time, cycle time, conversion) today.",
      },
      {
        id: "proc-3",
        text: "We have a working method for piloting and scaling process change.",
      },
    ],
  },
  {
    id: "department",
    name: "Department Readiness",
    short: "Departments",
    questions: [
      {
        id: "dept-1",
        text: "Sales, service and operations leaders have identified where AI could help their teams.",
      },
      {
        id: "dept-2",
        text: "Departments share data and collaborate on customer journeys rather than working in silos.",
      },
      {
        id: "dept-3",
        text: "At least one department has a named owner ready to champion an AI pilot.",
      },
    ],
  },
];

export type ReadinessBand = {
  min: number;
  name: string;
  narrative: string;
  recommendations: string[];
  roadmap: { horizon: string; focus: string }[];
};

export const READINESS_BANDS: ReadinessBand[] = [
  {
    min: 0,
    name: "Foundational",
    narrative:
      "Your organisation is at the start of its AI journey. The priority is building the platform, data and governance foundations that make AI safe and valuable — while capturing one or two visible quick wins to build belief.",
    recommendations: [
      "Consolidate customer data onto a governed platform before scaling AI",
      "Stand up a lightweight AI governance forum with clear decision rights",
      "Choose one contained, high-visibility pilot (e.g. an internal knowledge assistant)",
      "Invest in leadership alignment through an executive discovery workshop",
    ],
    roadmap: [
      { horizon: "0–3 months", focus: "Discovery workshop, data foundation plan, governance basics" },
      { horizon: "3–6 months", focus: "First internal pilot with measured results" },
      { horizon: "6–12 months", focus: "Customer-facing agent for one journey, adoption programme" },
    ],
  },
  {
    min: 2.5,
    name: "Emerging",
    narrative:
      "You have real foundations to build on. The gap is usually consistency — pockets of strength next to pockets of risk. Focus investment on the weakest dimension while piloting AI where readiness is already high.",
    recommendations: [
      "Target your lowest-scoring dimension with a 90-day remediation plan",
      "Launch a customer-facing pilot in your strongest department",
      "Formalise AI guardrails: escalation paths, tone, and audit logging",
      "Build an adoption scorecard so usage is measured from day one",
    ],
    roadmap: [
      { horizon: "0–3 months", focus: "Readiness gap remediation + pilot launch in strongest area" },
      { horizon: "3–6 months", focus: "Scale pilot, add Slack workflows for approvals and alerts" },
      { horizon: "6–12 months", focus: "Multi-department rollout with quarterly value reviews" },
    ],
  },
  {
    min: 3.5,
    name: "Established",
    narrative:
      "Your organisation is ready for meaningful AI at scale. The opportunity now is ambition: moving from assistive tools to autonomous agents owning entire journeys, with the governance to match.",
    recommendations: [
      "Move from single use cases to a managed portfolio with an AI value office",
      "Deploy autonomous agents on your highest-volume customer journeys",
      "Unify data with Data Cloud to power personalisation and prediction",
      "Negotiate enterprise agreements aligned to a multi-year roadmap",
    ],
    roadmap: [
      { horizon: "0–3 months", focus: "Portfolio prioritisation, first autonomous journey live" },
      { horizon: "3–6 months", focus: "Cross-channel expansion, predictive use cases" },
      { horizon: "6–12 months", focus: "AI embedded in operating rhythm, managed services model" },
    ],
  },
  {
    min: 4.3,
    name: "Leading",
    narrative:
      "You operate at a level most organisations aspire to. The frontier for you is compounding advantage: proprietary data products, agent-to-agent orchestration and AI woven into strategy itself.",
    recommendations: [
      "Orchestrate multi-agent workflows across departments and partners",
      "Productise your data and AI capabilities as market differentiators",
      "Set public AI trust commitments to lead your industry",
      "Mentor your ecosystem — suppliers and partners — up the maturity curve",
    ],
    roadmap: [
      { horizon: "0–3 months", focus: "Multi-agent orchestration on flagship journeys" },
      { horizon: "3–6 months", focus: "Data product launches, partner enablement" },
      { horizon: "6–12 months", focus: "Industry leadership programme and innovation lab" },
    ],
  },
];

export function bandForScore(score: number): ReadinessBand {
  return (
    [...READINESS_BANDS].sort((a, b) => b.min - a.min).find((b) => score >= b.min) ??
    READINESS_BANDS[0]
  );
}
