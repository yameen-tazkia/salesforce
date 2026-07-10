export type FrameworkPhase = {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  objectives: string[];
  activities: string[];
  deliverables: string[];
  outputs: string[];
  outcomes: string[];
};

export const FRAMEWORK_PHASES: FrameworkPhase[] = [
  {
    id: "discover",
    name: "Discover",
    tagline: "Understand the business before the technology",
    duration: "1–2 weeks",
    objectives: [
      "Understand strategic priorities, operating model and market context",
      "Identify where AI can create measurable business value",
      "Align executive sponsors on ambition and guardrails",
    ],
    activities: [
      "Executive discovery workshops with C-suite and line-of-business leaders",
      "Process walkthroughs across sales, service and operations",
      "Current-state review of Salesforce, Slack, data and integration estate",
      "Stakeholder interviews across departments and regions",
    ],
    deliverables: [
      "Discovery findings report",
      "AI opportunity long-list mapped to business goals",
      "Stakeholder and sponsorship map",
    ],
    outputs: [
      "Shared understanding of value pools and constraints",
      "Prioritised themes for assessment",
    ],
    outcomes: [
      "Executive alignment on where AI matters and why",
      "A transformation grounded in business value, not hype",
    ],
  },
  {
    id: "assess",
    name: "Assess",
    tagline: "Measure readiness across people, data and technology",
    duration: "2–3 weeks",
    objectives: [
      "Score readiness across technology, data, governance, people and process",
      "Quantify the gap between current state and AI ambition",
      "Surface risks early — data quality, compliance, adoption",
    ],
    activities: [
      "AI Readiness Assessment across six dimensions",
      "Data maturity and quality profiling",
      "Governance, security and regulatory review (including regional data residency)",
      "Skills and change-readiness survey",
    ],
    deliverables: [
      "AI Readiness scorecard with radar visualisation",
      "Gap analysis and remediation plan",
      "Risk and compliance register",
    ],
    outputs: [
      "Baseline readiness score by department",
      "Prioritised remediation backlog",
    ],
    outcomes: [
      "A realistic, evidence-based starting point",
      "Risks addressed before they become blockers",
    ],
  },
  {
    id: "design",
    name: "Design",
    tagline: "Architect the solution and the operating model",
    duration: "2–4 weeks",
    objectives: [
      "Design the target architecture across Salesforce, Agentforce and Slack",
      "Define agent roles, guardrails and escalation paths",
      "Build the business case with expected ROI",
    ],
    activities: [
      "Solution architecture and integration design",
      "Agentforce agent design — topics, actions, knowledge and guardrails",
      "Slack workflow design for approvals, alerts and reporting",
      "ROI modelling and benefits mapping",
    ],
    deliverables: [
      "Target-state architecture blueprint",
      "Agent design specifications",
      "Business case with ROI model and payback period",
    ],
    outputs: [
      "Approved architecture and roadmap",
      "Signed-off pilot scope",
    ],
    outcomes: [
      "A design the business trusts and IT can operate",
      "Investment decisions backed by quantified value",
    ],
  },
  {
    id: "pilot",
    name: "Pilot",
    tagline: "Prove value fast with a controlled launch",
    duration: "4–6 weeks",
    objectives: [
      "Deliver a working solution against one high-value use case",
      "Validate ROI assumptions with real users and real data",
      "Learn what adoption requires before scaling",
    ],
    activities: [
      "Agile build of the pilot scope in a sandboxed environment",
      "Agent testing, evaluation and guardrail tuning",
      "Pilot-user onboarding and feedback loops",
      "Weekly value tracking against the business case",
    ],
    deliverables: [
      "Working pilot in production or near-production",
      "Pilot evaluation report with measured results",
      "Go/no-go recommendation for scale",
    ],
    outputs: [
      "Validated use case with measured KPIs",
      "Refined backlog for implementation",
    ],
    outcomes: [
      "Proof of value in weeks, not quarters",
      "Confidence to invest at scale",
    ],
  },
  {
    id: "implement",
    name: "Implement",
    tagline: "Scale the solution across the enterprise",
    duration: "8–16 weeks",
    objectives: [
      "Roll out the validated solution across departments and regions",
      "Industrialise integrations, security and monitoring",
      "Establish release and quality management",
    ],
    activities: [
      "Phased implementation across business units",
      "Data migration, integration hardening and performance tuning",
      "Security review, penetration testing and compliance sign-off",
      "Hypercare support through each go-live",
    ],
    deliverables: [
      "Production solution across agreed scope",
      "Operations runbook and support model",
      "Training curriculum and admin enablement",
    ],
    outputs: [
      "Live AI capability across the enterprise",
      "Operational support model in place",
    ],
    outcomes: [
      "Enterprise-grade AI in production",
      "Predictable delivery with no surprises",
    ],
  },
  {
    id: "adopt",
    name: "Adopt",
    tagline: "Make AI part of how people work",
    duration: "Ongoing, first 90 days critical",
    objectives: [
      "Drive daily active usage across every role",
      "Build trust in agent behaviour and outputs",
      "Embed new ways of working into performance rhythms",
    ],
    activities: [
      "Role-based training and champion networks",
      "Adoption dashboards and usage analytics",
      "Executive communication cadence and success stories",
      "Feedback capture and rapid iteration",
    ],
    deliverables: [
      "Adoption dashboard and health scorecard",
      "Champion network across departments",
      "Change communication toolkit",
    ],
    outputs: [
      "Sustained usage above target thresholds",
      "Documented behavioural change",
    ],
    outcomes: [
      "AI that people actually use",
      "Value realised, not just deployed",
    ],
  },
  {
    id: "optimise",
    name: "Optimise",
    tagline: "Compound value through continuous improvement",
    duration: "Quarterly cycles",
    objectives: [
      "Improve agent quality, containment and satisfaction quarter on quarter",
      "Expand automation coverage to adjacent processes",
      "Keep the ROI model honest with measured actuals",
    ],
    activities: [
      "Agent analytics review — resolution, deflection, CSAT, escalations",
      "Prompt, topic and knowledge refinement",
      "Quarterly value reviews against the business case",
      "New use case intake and prioritisation",
    ],
    deliverables: [
      "Quarterly optimisation report",
      "Updated ROI actuals vs plan",
      "Refreshed use case roadmap",
    ],
    outputs: [
      "Rising containment and satisfaction scores",
      "Growing automation footprint",
    ],
    outcomes: [
      "Value that compounds instead of plateauing",
      "A living roadmap, not a finished project",
    ],
  },
  {
    id: "managed",
    name: "Managed AI Services",
    tagline: "Your long-term AI operations partner",
    duration: "Annual partnership",
    objectives: [
      "Operate, monitor and evolve the AI estate as a service",
      "Give leadership a single accountable partner for AI outcomes",
      "Stay ahead of platform innovation — Agentforce, Slack and the Salesforce roadmap",
    ],
    activities: [
      "24/7 monitoring of agents, integrations and data pipelines",
      "Managed releases, regression testing and platform upgrades",
      "Monthly service reviews with value reporting",
      "Innovation previews and quarterly roadmap advisories",
    ],
    deliverables: [
      "Service-level agreement with named team",
      "Monthly value and health reports",
      "Annual AI strategy refresh",
    ],
    outputs: [
      "Reliable, governed AI operations",
      "Continuous pipeline of improvements",
    ],
    outcomes: [
      "AI as a dependable business capability",
      "A partnership measured on outcomes, not tickets",
    ],
  },
];
