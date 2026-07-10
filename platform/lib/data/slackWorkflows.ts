export type WorkflowStep = {
  actor: "Trigger" | "Slack" | "Agent" | "Human" | "Salesforce";
  title: string;
  detail: string;
};

export type SlackWorkflow = {
  id: string;
  name: string;
  category: string;
  outcome: string;
  description: string;
  steps: WorkflowStep[];
};

export const SLACK_WORKFLOWS: SlackWorkflow[] = [
  {
    id: "sales-deal-desk",
    name: "Deal Desk Approvals",
    category: "Sales",
    outcome: "Approval cycles cut from days to hours",
    description:
      "Discount and non-standard term approvals move from email chains into a governed Slack workflow with full audit trail.",
    steps: [
      { actor: "Trigger", title: "Rep requests 18% discount", detail: "Opportunity in Sales Cloud crosses the discount threshold and triggers the workflow." },
      { actor: "Slack", title: "Approval card posted to #deal-desk", detail: "Deal size, margin impact, customer history and rep justification in one card." },
      { actor: "Agent", title: "AI adds context", detail: "Agentforce appends win-probability, comparable-deal pricing and policy check results." },
      { actor: "Human", title: "Sales director decides in-channel", detail: "Approve / counter / reject with one tap; comments captured." },
      { actor: "Salesforce", title: "Opportunity updated automatically", detail: "Decision, terms and audit trail written back to the record instantly." },
    ],
  },
  {
    id: "service-escalation",
    name: "Customer Escalations",
    category: "Service",
    outcome: "Escalations resolved 40% faster with zero lost handoffs",
    description:
      "High-severity cases open a dedicated swarm channel with the right experts, live case context and SLA timers.",
    steps: [
      { actor: "Trigger", title: "Case severity raised to P1", detail: "A premium customer's case breaches sentiment or SLA thresholds in Service Cloud." },
      { actor: "Slack", title: "Swarm channel auto-created", detail: "#esc-4471-alnoor opens with case summary, history and impacted revenue." },
      { actor: "Agent", title: "AI briefs the swarm", detail: "Root-cause hypotheses, similar past cases and suggested next actions posted." },
      { actor: "Human", title: "Experts swarm and resolve", detail: "Support, engineering and account team coordinate in one thread." },
      { actor: "Salesforce", title: "Resolution synced to the case", detail: "Timeline, decisions and fix documented back to Service Cloud automatically." },
    ],
  },
  {
    id: "approvals-finance",
    name: "Finance & Procurement Approvals",
    category: "Approvals",
    outcome: "Complete audit trail, no chasing signatures",
    description:
      "Purchase requests, contract sign-offs and budget exceptions route to the right approvers with policy checks built in.",
    steps: [
      { actor: "Trigger", title: "PO request over AED 50k submitted", detail: "Request enters from Salesforce or a Slack form with line items and vendor." },
      { actor: "Agent", title: "Policy pre-check", detail: "AI validates budget line, vendor status and duplicate-request risk before humans see it." },
      { actor: "Slack", title: "Routed by approval matrix", detail: "Finance manager, then CFO for >AED 250k — each step with context and deadline." },
      { actor: "Human", title: "Approvals in the flow of work", detail: "Approvers act from mobile in seconds; delegation rules cover absences." },
      { actor: "Salesforce", title: "ERP and records updated", detail: "Approved requests post to the ERP; the full trail is retained for audit." },
    ],
  },
  {
    id: "exec-reporting",
    name: "Executive Reporting Digest",
    category: "Executive Reporting",
    outcome: "Leadership decisions made on live data, not stale decks",
    description:
      "A daily digest of pipeline, service and revenue KPIs with AI commentary — and the ability to interrogate any number inline.",
    steps: [
      { actor: "Trigger", title: "07:00 daily schedule", detail: "The digest compiles overnight movements across regions and business units." },
      { actor: "Agent", title: "AI writes the narrative", detail: "Not just numbers: what moved, why, and what needs a decision today." },
      { actor: "Slack", title: "Digest posted to #exec-daily", detail: "KPI tiles with deltas, top risks and one-tap drill-downs." },
      { actor: "Human", title: "Leaders interrogate inline", detail: "'Why did Qatar service SLA dip?' answered in-thread with live data." },
      { actor: "Salesforce", title: "Actions tracked to owners", detail: "Decisions become tasks with owners and due dates in CRM." },
    ],
  },
  {
    id: "alerts",
    name: "Intelligent Alerts",
    category: "Alerts",
    outcome: "The right person knows within seconds, with context",
    description:
      "Signal-based alerts — churn risk, VIP activity, SLA breaches, system incidents — routed with context instead of noise.",
    steps: [
      { actor: "Trigger", title: "Churn-risk score crosses threshold", detail: "Data Cloud detects usage decline plus an unresolved complaint for a key account." },
      { actor: "Agent", title: "Alert enriched before sending", detail: "Account value, renewal date, root-cause signals and a recommended save play." },
      { actor: "Slack", title: "Routed to the account squad", detail: "Alert lands in #cs-key-accounts, tagging the owner — not a shared inbox." },
      { actor: "Human", title: "Save play launched", detail: "Owner accepts the play; outreach and offer approvals happen in-thread." },
      { actor: "Salesforce", title: "Outcome measured", detail: "Play effectiveness tracked, feeding the next model iteration." },
    ],
  },
  {
    id: "knowledge-search",
    name: "Knowledge Search",
    category: "Knowledge Search",
    outcome: "Answers in seconds from governed sources, not tribal memory",
    description:
      "Employees ask questions in natural language; AI answers with citations from policies, wikis and past conversations.",
    steps: [
      { actor: "Trigger", title: "Employee asks in Slack", detail: "'What's our data-residency commitment for KSA government clients?'" },
      { actor: "Agent", title: "Retrieval across governed sources", detail: "Policy library, contract clauses and past expert answers searched with permissions respected." },
      { actor: "Slack", title: "Cited answer in-thread", detail: "The commitment, its source document and version — plus the policy owner." },
      { actor: "Human", title: "Expert verifies edge cases", detail: "If confidence is low, the question routes to the named policy owner." },
      { actor: "Salesforce", title: "Knowledge gap logged", detail: "Unanswered questions become knowledge-base improvement tasks." },
    ],
  },
];
