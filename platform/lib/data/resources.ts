export type Resource = {
  id: string;
  type: "Article" | "Guide" | "Framework" | "Whitepaper" | "Template";
  title: string;
  description: string;
  readTime?: string;
  format: string;
  tags: string[];
};

export const RESOURCES: Resource[] = [
  {
    id: "res-01",
    type: "Framework",
    title: "The Tazkia AI Transformation Framework",
    description:
      "Our eight-phase methodology from Discover to Managed AI Services — objectives, activities and deliverables for each phase.",
    format: "PDF · 18 pages",
    tags: ["Methodology", "Executive"],
  },
  {
    id: "res-02",
    type: "Whitepaper",
    title: "Practical AI for the Gulf Enterprise",
    description:
      "Why the region's AI opportunity is different: national strategies, data residency, Arabic-first experiences and where to start.",
    readTime: "25 min",
    format: "PDF · 32 pages",
    tags: ["Strategy", "Regional"],
  },
  {
    id: "res-03",
    type: "Guide",
    title: "Agentforce Buyer's Guide",
    description:
      "What Agentforce actually does, how agents are designed and governed, and the questions to ask before your first deployment.",
    readTime: "15 min",
    format: "PDF · 20 pages",
    tags: ["Agentforce", "Evaluation"],
  },
  {
    id: "res-04",
    type: "Template",
    title: "AI Discovery Workshop Kit",
    description:
      "Agenda, exercises and scoring sheets to run a one-day AI opportunity discovery workshop with your leadership team.",
    format: "PPTX + XLSX",
    tags: ["Workshop", "Discovery"],
  },
  {
    id: "res-05",
    type: "Guide",
    title: "AI Governance Starter Kit for Regulated Industries",
    description:
      "Guardrails, audit patterns and approval workflows for deploying customer-facing AI under regulatory scrutiny.",
    readTime: "20 min",
    format: "PDF · 24 pages",
    tags: ["Governance", "Financial Services"],
  },
  {
    id: "res-06",
    type: "Article",
    title: "Why AI Pilots Fail (and the 6-Week Pattern That Works)",
    description:
      "The recurring anti-patterns we see in stalled pilots, and the scoping discipline that gets to measurable value fast.",
    readTime: "8 min",
    format: "Article",
    tags: ["Delivery", "Pilot"],
  },
  {
    id: "res-07",
    type: "Article",
    title: "Slack as the Command Centre for AI Operations",
    description:
      "How approvals, escalations and executive reporting move into the flow of work — with real workflow patterns.",
    readTime: "10 min",
    format: "Article",
    tags: ["Slack", "Operations"],
  },
  {
    id: "res-08",
    type: "Template",
    title: "Agentforce ROI Model",
    description:
      "The spreadsheet behind our ROI calculator: assumptions, formulas and sensitivity analysis ready for your numbers.",
    format: "XLSX",
    tags: ["ROI", "Business Case"],
  },
  {
    id: "res-09",
    type: "Whitepaper",
    title: "Data Readiness for Agentic AI",
    description:
      "What 'good enough' data looks like for agents: knowledge management, unification and the fixes that matter first.",
    readTime: "18 min",
    format: "PDF · 26 pages",
    tags: ["Data", "Architecture"],
  },
  {
    id: "res-10",
    type: "Template",
    title: "AI Use Case Prioritisation Canvas",
    description:
      "A one-page canvas to score use cases on impact, effort, risk and readiness — the same matrix used in this platform.",
    format: "PDF + FigJam",
    tags: ["Workshop", "Prioritisation"],
  },
  {
    id: "res-11",
    type: "Article",
    title: "Designing Arabic-First AI Experiences",
    description:
      "Dialect handling, tone, and evaluation practices for conversational AI that feels native to the region.",
    readTime: "9 min",
    format: "Article",
    tags: ["Experience", "Regional"],
  },
  {
    id: "res-12",
    type: "Guide",
    title: "The 90-Day Adoption Playbook",
    description:
      "Champion networks, adoption dashboards and communication rhythms that turn a deployment into a habit.",
    readTime: "14 min",
    format: "PDF · 16 pages",
    tags: ["Adoption", "Change"],
  },
];
