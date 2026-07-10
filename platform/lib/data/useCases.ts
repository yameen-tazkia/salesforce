export type UseCase = {
  id: string;
  title: string;
  industry: string;
  department: string;
  technology: string[];
  objective: string;
  problem: string;
  solution: string;
  effort: "Low" | "Medium" | "High";
  effortWeeks: string;
  value: string;
  roi: string;
};

export const DEPARTMENTS = [
  "Sales",
  "Service",
  "Marketing",
  "Operations",
  "Finance",
  "HR",
  "IT",
  "Executive",
] as const;

export const TECHNOLOGIES = [
  "Agentforce",
  "Sales Cloud",
  "Service Cloud",
  "Marketing Cloud",
  "Data Cloud",
  "Slack",
  "MuleSoft",
  "Tableau",
] as const;

export const OBJECTIVES = [
  "Reduce cost to serve",
  "Grow revenue",
  "Improve customer experience",
  "Increase productivity",
  "Strengthen governance",
] as const;

export const USE_CASES: UseCase[] = [
  {
    id: "uc-01",
    title: "24/7 Multilingual Lead Qualification",
    industry: "Real Estate",
    department: "Sales",
    technology: ["Agentforce", "Sales Cloud"],
    objective: "Grow revenue",
    problem:
      "Launch campaigns generate thousands of enquiries overnight; sales teams respond hours later and hot leads go cold.",
    solution:
      "An Agentforce agent qualifies every enquiry in Arabic or English within seconds, scores intent, books viewings and routes hot leads to brokers with a full brief.",
    effort: "Medium",
    effortWeeks: "4–6 weeks",
    value: "2–3× faster response, +15–25% qualified-lead conversion",
    roi: "Payback in under 6 months on launch-cycle revenue alone",
  },
  {
    id: "uc-02",
    title: "Shipment Status Deflection (WISMO)",
    industry: "Logistics",
    department: "Service",
    technology: ["Agentforce", "Service Cloud", "MuleSoft"],
    objective: "Reduce cost to serve",
    problem:
      "60–70% of inbound contacts ask \"where is my shipment?\", tying up skilled service staff in lookups.",
    solution:
      "A status agent connected to the TMS answers WISMO queries on portal, email and WhatsApp, and proactively notifies customers of exceptions with revised ETAs.",
    effort: "Medium",
    effortWeeks: "4–8 weeks",
    value: "60–80% WISMO deflection, service capacity redeployed",
    roi: "Typical 3–5× first-year ROI on service cost",
  },
  {
    id: "uc-03",
    title: "Retail Banking Query Containment",
    industry: "Financial Services",
    department: "Service",
    technology: ["Agentforce", "Service Cloud", "Data Cloud"],
    objective: "Reduce cost to serve",
    problem:
      "Contact centres are dominated by balance, card and payment queries that need no human judgement.",
    solution:
      "A governed banking agent authenticates customers, answers account queries, actions card freezes and hands sensitive cases to advisors with full context.",
    effort: "High",
    effortWeeks: "8–12 weeks",
    value: "50–70% containment of routine contacts",
    roi: "Multi-million cost avoidance for mid-size banks",
  },
  {
    id: "uc-04",
    title: "Client Advisor Briefing Assistant",
    industry: "Luxury Retail",
    department: "Sales",
    technology: ["Agentforce", "Data Cloud"],
    objective: "Grow revenue",
    problem:
      "Advisors spend hours preparing for VIP appointments, and preparation quality varies by advisor.",
    solution:
      "An assistant compiles purchase history, preferences, sizes, service items and suggested pieces into a brief before every appointment.",
    effort: "Low",
    effortWeeks: "2–4 weeks",
    value: "Hours saved weekly per advisor, +20–30% repeat purchase",
    roi: "Pays for itself with a handful of incremental VIP sales",
  },
  {
    id: "uc-05",
    title: "Citizen Service Agent (Arabic-first)",
    industry: "Government",
    department: "Service",
    technology: ["Agentforce", "Service Cloud"],
    objective: "Improve customer experience",
    problem:
      "Citizens wait in queues and call centres for questions about permits, fees and application status.",
    solution:
      "A multilingual citizen agent answers service questions, checks application status and books appointments across web and mobile channels.",
    effort: "Medium",
    effortWeeks: "6–10 weeks",
    value: "70%+ digital containment, happiness-index uplift",
    roi: "Cost per interaction drops by an order of magnitude",
  },
  {
    id: "uc-06",
    title: "Proactive Flight Disruption Recovery",
    industry: "Aviation",
    department: "Operations",
    technology: ["Agentforce", "Service Cloud", "MuleSoft"],
    objective: "Improve customer experience",
    problem:
      "Disruption events flood contact centres; passengers scramble while agents work through queues.",
    solution:
      "A disruption agent identifies affected passengers, offers rebooking options proactively and completes changes before passengers reach the airport.",
    effort: "High",
    effortWeeks: "10–14 weeks",
    value: "Rebooking in minutes, call spikes flattened",
    roi: "Protects premium revenue and compensation exposure",
  },
  {
    id: "uc-07",
    title: "Guest Concierge Agent",
    industry: "Hospitality",
    department: "Service",
    technology: ["Agentforce", "Service Cloud"],
    objective: "Improve customer experience",
    problem:
      "Guest requests via phone, WhatsApp and in-app queue behind front-desk workload at peak times.",
    solution:
      "A concierge agent handles amenity requests, restaurant bookings and local recommendations instantly, escalating physical tasks to staff via Slack.",
    effort: "Medium",
    effortWeeks: "4–6 weeks",
    value: "50%+ of requests automated, faster in-stay resolution",
    roi: "Higher guest satisfaction with flat staffing at peak",
  },
  {
    id: "uc-08",
    title: "Billing & Plan Enquiry Agent",
    industry: "Telecom",
    department: "Service",
    technology: ["Agentforce", "Service Cloud", "Data Cloud"],
    objective: "Reduce cost to serve",
    problem:
      "Millions of monthly contacts about bills, data balances and plan changes overwhelm service channels.",
    solution:
      "An agent explains charges, processes plan changes and manages add-ons with full BSS integration and human handoff for disputes.",
    effort: "High",
    effortWeeks: "10–16 weeks",
    value: "50–70% containment across top contact drivers",
    roi: "One of the largest cost-to-serve levers in telco",
  },
  {
    id: "uc-09",
    title: "Technical Support Agent on Product Docs",
    industry: "Software Development",
    department: "Service",
    technology: ["Agentforce", "Service Cloud"],
    objective: "Reduce cost to serve",
    problem:
      "Support tickets repeat the same how-to questions already answered in documentation nobody reads.",
    solution:
      "A support agent grounded in docs, release notes and resolved cases answers technical questions with citations and files clean escalations.",
    effort: "Low",
    effortWeeks: "2–4 weeks",
    value: "40–60% ticket deflection at first contact",
    roi: "Support scales sub-linearly with customer growth",
  },
  {
    id: "uc-10",
    title: "Patient Scheduling Agent",
    industry: "Healthcare",
    department: "Operations",
    technology: ["Agentforce", "Service Cloud"],
    objective: "Improve customer experience",
    problem:
      "Patients wait on hold to book, change or confirm appointments; no-shows waste clinical capacity.",
    solution:
      "A scheduling agent books across facilities, sends intelligent reminders and makes rescheduling one message away.",
    effort: "Medium",
    effortWeeks: "6–8 weeks",
    value: "30–50% fewer no-shows, hold times eliminated",
    roi: "Recovered clinical capacity worth multiples of cost",
  },
  {
    id: "uc-11",
    title: "Deal Desk Approvals in Slack",
    industry: "Cross-industry",
    department: "Sales",
    technology: ["Slack", "Sales Cloud"],
    objective: "Increase productivity",
    problem:
      "Discount and contract approvals crawl through email chains, stalling deals at quarter end.",
    solution:
      "Slack workflows route approval requests with deal context, capture decisions with an audit trail and update Salesforce automatically.",
    effort: "Low",
    effortWeeks: "1–2 weeks",
    value: "Approval cycle time cut from days to hours",
    roi: "Immediate — measured in recovered selling days",
  },
  {
    id: "uc-12",
    title: "Executive Daily Intelligence Digest",
    industry: "Cross-industry",
    department: "Executive",
    technology: ["Slack", "Tableau", "Agentforce"],
    objective: "Increase productivity",
    problem:
      "Leaders piece together performance from decks and dashboards that are stale by the time they're read.",
    solution:
      "A morning Slack digest summarises pipeline, service and revenue KPIs with AI commentary on movements, and answers follow-up questions inline.",
    effort: "Low",
    effortWeeks: "1–3 weeks",
    value: "Decisions made on live data, meeting prep eliminated",
    roi: "Leadership hours reclaimed every single week",
  },
  {
    id: "uc-13",
    title: "Collections & Payment Reminder Agent",
    industry: "Real Estate",
    department: "Finance",
    technology: ["Agentforce", "Service Cloud"],
    objective: "Grow revenue",
    problem:
      "Payment-plan follow-ups are manual, inconsistent and uncomfortable for staff.",
    solution:
      "An agent sends personalised reminders, negotiates within approved parameters, takes payment promises and escalates genuine hardship cases.",
    effort: "Medium",
    effortWeeks: "4–6 weeks",
    value: "Days-sales-outstanding reduced, consistent follow-up",
    roi: "Cash-flow improvement visible within one quarter",
  },
  {
    id: "uc-14",
    title: "RM Meeting Preparation Copilot",
    industry: "Financial Services",
    department: "Sales",
    technology: ["Agentforce", "Data Cloud"],
    objective: "Grow revenue",
    problem:
      "Relationship managers spend 30–40% of their week assembling client reviews from siloed systems.",
    solution:
      "A copilot compiles portfolio positions, service history, life events and next-best-actions into a compliant briefing pack on demand.",
    effort: "Medium",
    effortWeeks: "6–8 weeks",
    value: "A day per week returned to client-facing time",
    roi: "More reviews, deeper wallet share per RM",
  },
  {
    id: "uc-15",
    title: "HR Employee Helpdesk Agent",
    industry: "Cross-industry",
    department: "HR",
    technology: ["Agentforce", "Slack"],
    objective: "Increase productivity",
    problem:
      "HR teams answer the same policy, leave and letter-request questions hundreds of times a month.",
    solution:
      "An employee agent in Slack answers policy questions from approved sources, generates standard letters and files cases for exceptions.",
    effort: "Low",
    effortWeeks: "2–3 weeks",
    value: "70%+ of routine HR queries self-served",
    roi: "HR capacity shifted to talent, not tickets",
  },
  {
    id: "uc-16",
    title: "Instant Freight Quoting Agent",
    industry: "Logistics",
    department: "Sales",
    technology: ["Agentforce", "Sales Cloud", "MuleSoft"],
    objective: "Grow revenue",
    problem:
      "Standard-lane quotes take days as pricing teams juggle rate cards and margins by email.",
    solution:
      "A quoting agent prices standard lanes instantly from rate-card and margin rules, generates the quote document and books the win into the pipeline.",
    effort: "Medium",
    effortWeeks: "6–8 weeks",
    value: "Quotes in minutes; win rates up on speed alone",
    roi: "Revenue capture from being first to respond",
  },
  {
    id: "uc-17",
    title: "Churn-Risk Retention Plays",
    industry: "Telecom",
    department: "Marketing",
    technology: ["Data Cloud", "Marketing Cloud", "Agentforce"],
    objective: "Grow revenue",
    problem:
      "Churn is discovered at cancellation, when the save conversation is already lost.",
    solution:
      "Data Cloud scores churn risk from usage and interaction signals; agents and journeys trigger personalised save offers weeks earlier.",
    effort: "High",
    effortWeeks: "8–12 weeks",
    value: "Measurable churn reduction in targeted segments",
    roi: "Each retained point of churn is worth millions",
  },
  {
    id: "uc-18",
    title: "Knowledge Assistant for Frontline Teams",
    industry: "Cross-industry",
    department: "Operations",
    technology: ["Agentforce", "Slack"],
    objective: "Increase productivity",
    problem:
      "Policies and procedures live in PDFs; frontline staff interrupt supervisors or guess.",
    solution:
      "A knowledge assistant in Slack answers policy and procedure questions with citations to the governed source of truth.",
    effort: "Low",
    effortWeeks: "2–3 weeks",
    value: "Faster, more consistent frontline decisions",
    roi: "Fewer errors and escalations from day one",
  },
  {
    id: "uc-19",
    title: "MICE & Events Proposal Agent",
    industry: "Hospitality",
    department: "Sales",
    technology: ["Agentforce", "Sales Cloud"],
    objective: "Grow revenue",
    problem:
      "Event RFPs take days to answer, and the first credible proposal usually wins.",
    solution:
      "A proposal agent checks space and date availability, drafts priced proposals from templates and routes exceptions for approval in Slack.",
    effort: "Medium",
    effortWeeks: "4–6 weeks",
    value: "Proposal turnaround from days to hours",
    roi: "Higher MICE win rate at identical cost base",
  },
  {
    id: "uc-20",
    title: "Trial-to-Paid Conversion Agent",
    industry: "Software Development",
    department: "Marketing",
    technology: ["Agentforce", "Data Cloud", "Sales Cloud"],
    objective: "Grow revenue",
    problem:
      "High-intent trial users churn silently because nobody reaches them while interest peaks.",
    solution:
      "An agent watches product-usage signals, engages qualified trials with tailored guidance and books sales calls for enterprise-fit accounts.",
    effort: "Medium",
    effortWeeks: "4–6 weeks",
    value: "Trial conversion uplift on the highest-intent cohort",
    roi: "Directly attributable pipeline within one quarter",
  },
  {
    id: "uc-21",
    title: "Insurance Pre-Approval Status Agent",
    industry: "Healthcare",
    department: "Service",
    technology: ["Agentforce", "Service Cloud", "MuleSoft"],
    objective: "Improve customer experience",
    problem:
      "Patients and coordinators chase insurance approvals by phone across payers.",
    solution:
      "An agent tracks pre-approval status across payer integrations and updates patients proactively at each stage.",
    effort: "Medium",
    effortWeeks: "6–8 weeks",
    value: "Coordinator hours saved; anxiety-free waiting",
    roi: "Faster procedure scheduling lifts utilisation",
  },
  {
    id: "uc-22",
    title: "IT Service Desk Automation",
    industry: "Cross-industry",
    department: "IT",
    technology: ["Agentforce", "Slack"],
    objective: "Reduce cost to serve",
    problem:
      "Password resets, access requests and how-to tickets consume the service desk.",
    solution:
      "An IT agent in Slack resolves common requests end to end — resets, access workflows, software questions — with approvals where policy requires.",
    effort: "Low",
    effortWeeks: "2–4 weeks",
    value: "40–60% of L1 tickets automated",
    roi: "Service-desk capacity redirected to projects",
  },
  {
    id: "uc-23",
    title: "Compliance Audit Trail & Governance Reporting",
    industry: "Financial Services",
    department: "Finance",
    technology: ["Data Cloud", "Tableau", "Slack"],
    objective: "Strengthen governance",
    problem:
      "Evidencing AI decisions and approvals for regulators is manual and error-prone.",
    solution:
      "Every agent action, approval and escalation is logged to a governed audit store with Tableau dashboards and Slack alerting on policy exceptions.",
    effort: "Medium",
    effortWeeks: "4–6 weeks",
    value: "Audit preparation reduced from weeks to hours",
    roi: "Regulatory confidence that unlocks further AI scope",
  },
  {
    id: "uc-24",
    title: "Owner Handover & Snagging Agent",
    industry: "Real Estate",
    department: "Service",
    technology: ["Agentforce", "Service Cloud"],
    objective: "Improve customer experience",
    problem:
      "Handover season buries developer service teams in booking requests and snag follow-ups.",
    solution:
      "An owner-services agent books handover slots, logs snags with photos, tracks contractor SLAs and keeps owners updated automatically.",
    effort: "Medium",
    effortWeeks: "4–6 weeks",
    value: "Handover throughput up, complaint volume down",
    roi: "Brand protection at the moment of truth",
  },
];
