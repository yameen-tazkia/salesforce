/**
 * Tazkia AI Navigator™ — content model.
 *
 * Every question is written as a senior consultant would ask it in a
 * discovery conversation: business-focused, with a "why we ask" and a
 * real-time insight for wherever the answer lands.
 */

export type StageId =
  | "welcome"
  | "profile"
  | "objectives"
  | "maturity"
  | "data"
  | "sales"
  | "service"
  | "slack"
  | "multilingual"
  | "agentforce"
  | "priorities"
  | "report";

export type Stage = {
  id: StageId;
  title: string;
  short: string;
  tagline: string;
  /** What the consultant says when opening this chapter. */
  intro: string;
};

export const STAGES: Stage[] = [
  {
    id: "welcome",
    title: "Welcome",
    short: "Welcome",
    tagline: "Your AI transformation journey starts here",
    intro: "",
  },
  {
    id: "profile",
    title: "Company Profile",
    short: "Profile",
    tagline: "Understanding your organisation",
    intro:
      "Before we talk about AI, let's understand your organisation — every recommendation in your report will be calibrated to your industry, scale and current platform landscape.",
  },
  {
    id: "objectives",
    title: "Business Objectives",
    short: "Objectives",
    tagline: "What success looks like for you",
    intro:
      "AI programmes fail when they start with technology. We start with the outcomes your board actually cares about.",
  },
  {
    id: "maturity",
    title: "Salesforce Maturity",
    short: "Salesforce",
    tagline: "How strong is your CRM foundation?",
    intro:
      "Agentforce and Einstein are only as good as the Salesforce foundation beneath them. Let's assess how your platform is really being used today.",
  },
  {
    id: "data",
    title: "Data & AI Readiness",
    short: "Data & AI",
    tagline: "Is your data ready to power AI?",
    intro:
      "Data readiness is the single strongest predictor of AI success we see across the Gulf. This chapter usually surfaces the most valuable findings.",
  },
  {
    id: "sales",
    title: "Sales AI Assessment",
    short: "Sales AI",
    tagline: "Where AI can accelerate revenue",
    intro:
      "Now let's look at your revenue engine — lead flow, pipeline and forecasting — and where intelligent automation would move the numbers.",
  },
  {
    id: "service",
    title: "Customer Service Assessment",
    short: "Service AI",
    tagline: "Where AI can transform customer experience",
    intro:
      "Service is where agentic AI is delivering the fastest measurable returns today. Let's see where your service operation stands.",
  },
  {
    id: "slack",
    title: "Slack & Workflow Assessment",
    short: "Slack",
    tagline: "How work flows through your organisation",
    intro:
      "Slack is becoming the conversational front door to Salesforce and to AI agents. Let's understand how your teams collaborate and where workflow intelligence fits.",
  },
  {
    id: "multilingual",
    title: "Multilingual AI",
    short: "Multilingual",
    tagline: "Serving customers in every language",
    intro:
      "For organisations across the Gulf and beyond, Arabic-first and multilingual AI is a competitive advantage — not an afterthought.",
  },
  {
    id: "agentforce",
    title: "Agentforce Opportunities",
    short: "Agentforce",
    tagline: "Which AI agents would create the most value?",
    intro:
      "Agentforce lets you deploy autonomous agents across sales, service and employee experience. Tell us where an always-on digital teammate would matter most — we'll score suitability against your readiness.",
  },
  {
    id: "priorities",
    title: "Business Priorities",
    short: "Priorities",
    tagline: "Prioritising your opportunity portfolio",
    intro:
      "Based on everything you've told us, we've mapped your AI opportunity portfolio by business impact and delivery effort. Select the initiatives that matter most to you — they will shape your roadmap.",
  },
  {
    id: "report",
    title: "Executive Report",
    short: "Report",
    tagline: "Your AI transformation blueprint",
    intro: "",
  },
];

/* ------------------------------------------------------------------ */
/* Profile options                                                     */
/* ------------------------------------------------------------------ */

export const INDUSTRIES = [
  "Banking & Islamic Finance",
  "Insurance & Takaful",
  "Government & Public Sector",
  "Healthcare",
  "Retail & E-commerce",
  "Real Estate & Property",
  "Telecommunications",
  "Travel, Tourism & Hospitality",
  "Energy & Utilities",
  "Education",
  "Logistics & Transportation",
  "Manufacturing",
  "Professional Services",
  "Other",
];

export const COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Egypt",
  "Jordan",
  "Malaysia",
  "Indonesia",
  "United Kingdom",
  "Other",
];

export type EmployeeBand = {
  id: string;
  label: string;
  /** midpoint used by the business-value model */
  midpoint: number;
};

export const EMPLOYEE_BANDS: EmployeeBand[] = [
  { id: "xs", label: "1 – 50", midpoint: 30 },
  { id: "s", label: "51 – 200", midpoint: 120 },
  { id: "m", label: "201 – 1,000", midpoint: 550 },
  { id: "l", label: "1,001 – 5,000", midpoint: 2600 },
  { id: "xl", label: "5,001 – 20,000", midpoint: 10000 },
  { id: "xxl", label: "20,000+", midpoint: 32000 },
];

export const REVENUE_BANDS = [
  "Under $10M",
  "$10M – $50M",
  "$50M – $250M",
  "$250M – $1B",
  "Over $1B",
  "Prefer not to say",
];

export const CRM_OPTIONS = [
  "Salesforce",
  "Microsoft Dynamics",
  "HubSpot",
  "Oracle / Siebel",
  "SAP",
  "Zoho",
  "Custom / in-house system",
  "Spreadsheets & email",
  "No CRM today",
];

export type CloudOption = { id: string; label: string };

export const CLOUD_OPTIONS: CloudOption[] = [
  { id: "sales-cloud", label: "Sales Cloud" },
  { id: "service-cloud", label: "Service Cloud" },
  { id: "marketing-cloud", label: "Marketing Cloud" },
  { id: "experience-cloud", label: "Experience Cloud" },
  { id: "data-cloud", label: "Data Cloud" },
  { id: "slack", label: "Slack" },
  { id: "agentforce", label: "Agentforce" },
  { id: "einstein", label: "Einstein AI" },
];

export const PARTNER_OPTIONS = [
  "Yes — we work with a Salesforce partner",
  "We had a partner for implementation only",
  "We manage everything with an internal team",
  "No partner and limited internal capability",
  "Not applicable — we're not on Salesforce yet",
];

/* ------------------------------------------------------------------ */
/* Business objectives                                                 */
/* ------------------------------------------------------------------ */

export type Objective = { id: string; label: string; blurb: string };

export const OBJECTIVES: Objective[] = [
  {
    id: "increase-sales",
    label: "Increase sales",
    blurb: "Grow pipeline, win rates and average deal size",
  },
  {
    id: "improve-service",
    label: "Improve customer service",
    blurb: "Faster resolution, better experiences, lower cost to serve",
  },
  {
    id: "reduce-costs",
    label: "Reduce operating costs",
    blurb: "Automate manual work and simplify operations",
  },
  {
    id: "productivity",
    label: "Improve employee productivity",
    blurb: "Give every employee an AI assistant and remove busywork",
  },
  {
    id: "modernise-cx",
    label: "Modernise customer experience",
    blurb: "Digital-first, personalised, always-on journeys",
  },
  {
    id: "reporting",
    label: "Improve reporting & insight",
    blurb: "Trusted, real-time visibility for executives",
  },
  {
    id: "scale-international",
    label: "Scale internationally",
    blurb: "Enter new markets without multiplying headcount",
  },
  {
    id: "multilingual",
    label: "Support multilingual customers",
    blurb: "Serve customers in Arabic, English and beyond",
  },
  {
    id: "other",
    label: "Something else",
    blurb: "A priority we haven't listed",
  },
];

/* ------------------------------------------------------------------ */
/* Scale questions                                                     */
/* ------------------------------------------------------------------ */

export type ScaleQuestion = {
  id: string;
  stage: Extract<
    StageId,
    "maturity" | "data" | "sales" | "service" | "slack" | "multilingual"
  >;
  /** short capability label used on heatmaps and scorecards */
  short: string;
  text: string;
  why: string;
  /** level descriptors 1 → 5 */
  levels: [string, string, string, string, string];
  insights: { low: string; mid: string; high: string };
};

export const SCALE_QUESTIONS: ScaleQuestion[] = [
  /* ------------------------- Salesforce Maturity ------------------ */
  {
    id: "mat-crm-adoption",
    stage: "maturity",
    short: "CRM adoption",
    text: "How embedded is your CRM in the daily rhythm of the business?",
    why: "AI recommendations are only trusted when the underlying CRM is the single source of truth your teams actually live in.",
    levels: [
      "We barely use a CRM — work lives in spreadsheets and inboxes",
      "A CRM exists but usage is patchy and inconsistent",
      "Core teams use it daily, though data entry is uneven",
      "It's the system of record for customer-facing teams",
      "It's the operating system of the business — nothing happens outside it",
    ],
    insights: {
      low: "This is the first thing we'd fix. Before any AI investment, a focused CRM adoption programme typically pays for itself within a quarter — and it's a prerequisite for everything that follows.",
      mid: "You have a workable base. Tightening adoption in parallel with an AI pilot is a proven pattern — the pilot itself often becomes the reason people finally embrace the CRM.",
      high: "Excellent — strong adoption means AI recommendations will land on trusted data and be acted on. You can move to AI use cases faster than most organisations we assess.",
    },
  },
  {
    id: "mat-automation",
    stage: "maturity",
    short: "Automation",
    text: "How much of your routine process work is automated today?",
    why: "Existing automation maturity tells us how quickly your teams can absorb agentic AI, which is automation's next step.",
    levels: [
      "Almost everything is manual",
      "A few basic workflows or email alerts",
      "Key processes automated with Flow or similar tools",
      "Broad automation with documented, owned processes",
      "Sophisticated orchestration across systems, continuously improved",
    ],
    insights: {
      low: "Manual operations are actually a large opportunity: organisations starting here typically recover 15–25% of team capacity in the first automation wave, before AI even enters the picture.",
      mid: "Good foundations. The jump from workflow automation to AI agents is much smaller than the jump from manual to automated — you're past the hard part.",
      high: "You're ready for agentic AI. Agentforce essentially gives your existing automation judgement — the ability to handle the exceptions your flows currently escalate to humans.",
    },
  },
  {
    id: "mat-user-adoption",
    stage: "maturity",
    short: "User adoption",
    text: "When you roll out a new capability, how reliably do teams actually adopt it?",
    why: "Deployment is easy; adoption is where AI value is won or lost. We calibrate your roadmap pace to this answer.",
    levels: [
      "New tools are usually ignored or resisted",
      "Adoption happens slowly, with heavy chasing",
      "Adoption is decent when leadership pushes",
      "We have a structured enablement and adoption approach",
      "Teams pull for new capability — adoption is a strength",
    ],
    insights: {
      low: "We'd pair any pilot with a structured adoption programme. In our experience deployments with one achieve roughly three times the sustained usage of identical deployments without.",
      mid: "Typical for the region. Building champions inside each team before go-live is the highest-leverage adoption tactic we know — we'd design that into your pilot.",
      high: "A genuine competitive advantage. Organisations with strong adoption muscles compound AI value quarter after quarter while competitors stall at pilot stage.",
    },
  },
  {
    id: "mat-reporting",
    stage: "maturity",
    short: "Reporting",
    text: "How would your executives rate the reporting they get from Salesforce today?",
    why: "Reporting maturity tells us whether leadership decisions are already data-driven — the cultural soil AI grows in.",
    levels: [
      "Reporting is manual — exports, spreadsheets and slide decks",
      "Basic reports exist but executives don't trust them",
      "Standard dashboards used in some management routines",
      "Trusted dashboards drive most management conversations",
      "Real-time, self-service analytics at every level",
    ],
    insights: {
      low: "Executives flying blind is usually a data problem wearing a reporting costume. Fixing the pipeline that feeds reporting is the same work that makes AI possible — one investment, two payoffs.",
      mid: "Solid. Einstein-generated insights and AI-summarised dashboards would be a natural, low-risk way to introduce AI to your leadership team.",
      high: "Strong analytics culture. Conversational analytics — executives asking questions in natural language in Slack — is a high-visibility quick win from here.",
    },
  },
  {
    id: "mat-sales-process",
    stage: "maturity",
    short: "Sales process",
    text: "How consistently is your sales process followed across the team?",
    why: "AI coaching and deal scoring assume a defined process to coach against. Process consistency sets your Sales AI ceiling.",
    levels: [
      "Every rep sells their own way",
      "A process exists on paper but isn't followed",
      "Followed for large deals, informal elsewhere",
      "A consistent, stage-gated process across the team",
      "A measured, continuously optimised revenue process",
    ],
    insights: {
      low: "Before AI, we'd codify a lightweight sales process in Salesforce. It doesn't need to be heavy — five clear stages with exit criteria are enough for AI scoring to become meaningful.",
      mid: "Workable. AI deal insights actually reinforce process discipline — reps follow the process because that's what feeds their recommendations.",
      high: "With a disciplined process, Einstein opportunity scoring and Agentforce sales coaching can be deployed with high confidence in the outputs.",
    },
  },
  {
    id: "mat-service-process",
    stage: "maturity",
    short: "Service process",
    text: "How structured is your customer service operation?",
    why: "Case lifecycle discipline determines how safely an AI agent can participate in customer conversations.",
    levels: [
      "Service is reactive — requests arrive everywhere, tracked nowhere",
      "Cases are logged but handled inconsistently",
      "Defined queues and SLAs, applied unevenly",
      "Structured operation with owned SLAs and QA",
      "An optimised service organisation measured on outcomes",
    ],
    insights: {
      low: "Centralising service requests into managed queues is step one — and it's fast. Most organisations see measurable CSAT improvement within 60 days of just this.",
      mid: "You have the skeleton. Tightening SLA discipline while piloting AI case summarisation is a proven combination — agents feel the benefit personally, so adoption follows.",
      high: "A structured service operation is the ideal launchpad for a Service Agent — it can safely resolve routine cases while your defined escalation paths protect the complex ones.",
    },
  },
  {
    id: "mat-integrations",
    stage: "maturity",
    short: "Integrations",
    text: "How well is Salesforce connected to the rest of your systems?",
    why: "Agents are only as capable as the systems they can reach. Integration depth defines what your AI will be able to actually do.",
    levels: [
      "Salesforce is an island — swivel-chair between systems",
      "One or two point integrations, often fragile",
      "Key systems connected, some batch or manual syncs",
      "Robust API-based integration across core platforms",
      "An integration architecture with governance and monitoring",
    ],
    insights: {
      low: "Disconnected systems force AI to guess. We'd prioritise connecting your two or three most important systems — usually ERP and the communication layer — before agent deployment.",
      mid: "Good enough to start. Your first agents should be scoped to the well-integrated systems, expanding as the integration fabric matures.",
      high: "Strong integration means Agentforce agents can take real actions — issue refunds, update orders, book appointments — rather than just answering questions. That's where ROI multiplies.",
    },
  },
  {
    id: "mat-admin",
    stage: "maturity",
    short: "Admin capability",
    text: "What does your Salesforce admin and development capability look like?",
    why: "Internal capability determines the right operating model — build, co-deliver or managed service.",
    levels: [
      "No dedicated admin — it's someone's side job",
      "One admin keeping the lights on",
      "A small team handling admin and simple builds",
      "An established platform team with dev capability",
      "A centre of excellence with architects and release discipline",
    ],
    insights: {
      low: "Nothing wrong with being lean — but AI platforms need care. A managed service model would let you adopt AI without hiring a platform team first.",
      mid: "A co-delivery model works well here: our specialists deliver the AI capability while upskilling your team to run it — capability transfer is built into the engagement.",
      high: "With this bench you should own the platform roadmap. Our best role would be AI architecture, governance and acceleration rather than day-to-day delivery.",
    },
  },

  /* ------------------------- Data & AI Readiness ------------------ */
  {
    id: "data-quality",
    stage: "data",
    short: "Data quality",
    text: "How much do your teams trust the customer data in your systems?",
    why: "Every AI output inherits the quality of the data beneath it. This single answer moves your readiness score more than any other.",
    levels: [
      "Data is widely known to be wrong or stale",
      "Significant gaps and errors, low trust",
      "Usable for operations, questioned for decisions",
      "Reliable, with known and managed exceptions",
      "Actively measured, owned and trusted everywhere",
    ],
    insights: {
      low: "Here's the good news: data remediation is the highest-ROI work in any AI programme, and it's very tractable. A focused 6–8 week data quality sprint changes what's possible.",
      mid: "Common — and workable. We'd scope your first AI use cases around your cleanest data domains while a parallel stream lifts the rest.",
      high: "Trusted data is the rarest asset we find in assessments. You can deploy customer-facing AI with far less remediation runway than most.",
    },
  },
  {
    id: "data-duplicates",
    stage: "data",
    short: "Duplicates",
    text: "How under control are duplicate customer records?",
    why: "Duplicates fragment customer history — an AI agent seeing half a customer gives half-right answers.",
    levels: [
      "Duplicates everywhere — nobody trusts a single view",
      "Known problem, no systematic handling",
      "Periodic cleanups, duplicates creep back",
      "Matching rules and dedupe processes in place",
      "A governed golden record for every customer",
    ],
    insights: {
      low: "A unified customer view is exactly what Data Cloud was built for — identity resolution across systems without a multi-year MDM programme. This would be an early roadmap item.",
      mid: "You're ahead of most. Moving from periodic cleanup to always-on identity resolution is the step that makes personalised AI safe to deploy.",
      high: "A golden record puts you in the top tier of data readiness — AI personalisation and agentic service can build directly on it.",
    },
  },
  {
    id: "data-knowledge",
    stage: "data",
    short: "Knowledge base",
    text: "How well documented is your organisational knowledge — policies, products, procedures?",
    why: "Generative AI answers from your knowledge. A thin knowledge base is the most common reason AI agents underperform.",
    levels: [
      "Knowledge lives in people's heads",
      "Scattered documents of unknown freshness",
      "A knowledge base exists but coverage is patchy",
      "Curated, current knowledge covering most topics",
      "A governed knowledge operation with owners and review cycles",
    ],
    insights: {
      low: "Every AI agent you deploy will be limited by this. We typically run a knowledge harvesting sprint — interviewing your experts and structuring the output — as pilot preparation.",
      mid: "A focused effort on your top 50 customer questions usually covers 80% of agent conversations. Perfect coverage isn't the bar — coverage of what customers actually ask is.",
      high: "A strong knowledge base is rocket fuel for Agentforce — your agents will answer accurately from day one, and a Knowledge Agent could serve employees as well as customers.",
    },
  },
  {
    id: "data-governance",
    stage: "data",
    short: "Governance",
    text: "How mature is your data governance — ownership, definitions, stewardship?",
    why: "Governance is what lets you scale AI beyond one pilot without losing control. Regulators across the Gulf increasingly expect it.",
    levels: [
      "No formal governance",
      "Informal — a few people who care",
      "Policies exist, enforcement is patchy",
      "Defined owners, definitions and stewardship",
      "Governance embedded in how the business runs",
    ],
    insights: {
      low: "Start small: name an owner for customer data and agree ten shared definitions. Lightweight governance beats a governance committee that never ships.",
      mid: "Reasonable base. We'd formalise governance around your AI use cases specifically — data feeding an AI agent gets ownership and quality rules first.",
      high: "Strong governance is what regulators reward. In regulated Gulf industries this maturity often unlocks AI scope your competitors can't get approved.",
    },
  },
  {
    id: "data-security",
    stage: "data",
    short: "Security",
    text: "How confident are you in your data security and access controls?",
    why: "AI amplifies access — an agent can surface anything it can see. Security posture defines safe deployment boundaries.",
    levels: [
      "Significant known gaps",
      "Basic controls, limited review",
      "Sound controls in core systems, less beyond",
      "Strong access management, audits and classification",
      "Security-first posture with continuous assurance",
    ],
    insights: {
      low: "Before deploying AI we'd run a focused access review — AI doesn't create the exposure, but it can surface data that over-broad permissions left reachable.",
      mid: "Solid enough for internal AI use cases. Customer-facing agents warrant a scoped security review of the specific data they can touch — days of work, not months.",
      high: "Strong security posture means the Einstein Trust Layer's controls — data masking, zero retention, audit trails — will slot into an already-disciplined environment.",
    },
  },
  {
    id: "data-ai-policy",
    stage: "data",
    short: "AI policy",
    text: "Do you have policies governing how AI may be used in your organisation?",
    why: "An AI policy isn't bureaucracy — it's the document that lets your teams say yes quickly and safely.",
    levels: [
      "No policy — nobody has addressed it",
      "Being discussed, nothing written",
      "A draft or interim guideline exists",
      "An approved policy covering key uses",
      "A living AI governance framework with review board",
    ],
    insights: {
      low: "Most organisations we meet are here. A pragmatic one-page AI usage policy takes a week to draft and removes the ambiguity that stalls every pilot approval.",
      mid: "Momentum is there. We'd help you finalise it against the UAE and Saudi national AI guidance so it survives regulator and board scrutiny.",
      high: "Mature AI governance is a genuine accelerator — approvals that take competitors months will take you weeks.",
    },
  },
  {
    id: "data-sponsorship",
    stage: "data",
    short: "Sponsorship",
    text: "How strong is executive sponsorship for AI in your organisation?",
    why: "In every successful transformation we've delivered, a named executive owned the outcome. Sponsorship predicts follow-through.",
    levels: [
      "No executive interest yet",
      "Curiosity, but no ownership",
      "A sponsor exists without budget or mandate",
      "A committed sponsor with budget",
      "CEO-level priority with board visibility",
    ],
    insights: {
      low: "Then the first deliverable isn't a pilot — it's the business case. An Executive AI Strategy Session is designed to turn curiosity into sponsorship with numbers attached.",
      mid: "A sponsor without mandate needs early proof. We'd design a fast, visible quick win in their area to convert support into budget.",
      high: "Executive commitment is the scarcest resource in AI transformation — with it secured, an ambitious roadmap is realistic rather than aspirational.",
    },
  },
  {
    id: "data-training",
    stage: "data",
    short: "AI skills",
    text: "How prepared are your people to work with AI tools?",
    why: "AI literacy determines how fast value compounds after go-live — and how much change management your roadmap needs.",
    levels: [
      "Little awareness or exposure",
      "A few enthusiasts experimenting personally",
      "Pockets of skill, no structured programme",
      "Structured AI training under way",
      "Broad AI fluency with role-based enablement",
    ],
    insights: {
      low: "Plan for enablement from day one. A half-day 'AI for your role' programme alongside the pilot consistently doubles early adoption.",
      mid: "Your enthusiasts are an asset — we'd formalise them into an AI champions network, the single most effective adoption structure we deploy.",
      high: "An AI-fluent workforce means you can decentralise — teams identify their own use cases and the pipeline of opportunities fills itself.",
    },
  },

  /* ------------------------- Sales AI ----------------------------- */
  {
    id: "sales-lead-qual",
    stage: "sales",
    short: "Lead qualification",
    text: "How are inbound leads qualified and routed today?",
    why: "Lead handling is usually the fastest sales AI win — response time and qualification quality move revenue within a quarter.",
    levels: [
      "Manually, whenever someone gets to them",
      "Basic rules, slow follow-up",
      "Consistent triage within a business day",
      "Scored and routed within hours",
      "Instant, intelligent qualification and routing",
    ],
    insights: {
      low: "Research is consistent: contacting a lead within five minutes multiplies conversion several-fold versus a day later. An SDR Agent that engages instantly, 24/7, is a proven first Agentforce use case.",
      mid: "Good discipline. Einstein lead scoring layered onto your routing would focus your sellers on the leads most likely to convert — typically a 10–20% conversion lift.",
      high: "Your lead engine is strong — the frontier for you is conversational qualification: an agent that doesn't just route but holds the first conversation in any language, any hour.",
    },
  },
  {
    id: "sales-forecast",
    stage: "sales",
    short: "Forecasting",
    text: "How much do you trust your sales forecast?",
    why: "Forecast accuracy is the executive-visible symptom of pipeline health — and one of Einstein's most mature capabilities.",
    levels: [
      "We don't really forecast",
      "A spreadsheet ritual nobody believes",
      "Directionally right, often surprised",
      "Reliable within an acceptable margin",
      "Accurate, AI-assisted rolling forecasts",
    ],
    insights: {
      low: "Forecasting is downstream of pipeline hygiene. Fix stage discipline first (weeks, not months) and AI forecasting becomes accurate almost immediately after.",
      mid: "Einstein forecasting typically cuts forecast error meaningfully within two quarters — and it shows leadership a concrete AI win they see every Monday morning.",
      high: "With trusted forecasts, the next layer is prescriptive: AI that tells you which specific deals to intervene in to protect the quarter.",
    },
  },
  {
    id: "sales-pipeline",
    stage: "sales",
    short: "Pipeline visibility",
    text: "How clear is your view of the sales pipeline right now?",
    why: "Pipeline visibility is where CRM discipline, reporting and sales process meet — it tells us how ready the revenue engine is for AI.",
    levels: [
      "We'd have to ask each rep individually",
      "A pipeline report exists but it's stale",
      "Visible, though accuracy varies by team",
      "Live, reviewed pipeline across the org",
      "Real-time pipeline analytics with drill-down",
    ],
    insights: {
      low: "Pipeline visibility is a configuration and habit problem, not a technology problem — a focused Salesforce optimisation sprint usually solves it in 4–6 weeks.",
      mid: "From here, AI-generated pipeline insights — deals stalling, coverage gaps, at-risk renewals — turn your pipeline review from inspection into coaching.",
      high: "Excellent. You're ready for AI that acts on the pipeline: automated nudges, next-best-action for every open deal, and agent-prepared deal reviews.",
    },
  },
  {
    id: "sales-opportunity",
    stage: "sales",
    short: "Opportunity mgmt",
    text: "How disciplined is opportunity management — stages, close dates, next steps?",
    why: "Opportunity hygiene feeds every sales AI model. Garbage stages in, garbage recommendations out.",
    levels: [
      "Opportunities are created at contract stage, if at all",
      "Records exist but fields are guesswork",
      "Mostly current for active deals",
      "Well maintained with enforced criteria",
      "Immaculate — updated as a reflex after every interaction",
    ],
    insights: {
      low: "Here's a modern fix: rather than forcing reps to type, AI note-capture (calls summarised straight into Salesforce) fixes hygiene as a by-product. Adoption follows because it saves reps time.",
      mid: "Good base. Einstein conversation insights would enrich your opportunities automatically — reducing the data-entry burden your reps currently carry.",
      high: "With this discipline, opportunity scoring and win-probability models will be genuinely predictive for you, not decorative.",
    },
  },
  {
    id: "sales-coaching",
    stage: "sales",
    short: "Sales coaching",
    text: "How does sales coaching happen in your organisation?",
    why: "AI sales coaching scales your best manager to every rep — but it lands best where a coaching culture already exists.",
    levels: [
      "It doesn't, beyond annual reviews",
      "Ad hoc, when a deal goes wrong",
      "Regular 1:1s, quality varies by manager",
      "Structured coaching rhythm with deal reviews",
      "Data-driven coaching culture with call analysis",
    ],
    insights: {
      low: "An Agentforce sales coach — practice pitches, objection handling, deal advice on demand — gives every rep a coach without adding management load. It's one of the most-loved AI features we deploy.",
      mid: "AI call summaries and talk-pattern insights would give your managers consistent raw material — lifting your weakest coaching relationships to the level of your best.",
      high: "You'd get compounding returns from AI coaching — your culture will actually use the insights, where most organisations let them expire in a dashboard.",
    },
  },
  {
    id: "sales-exec-reporting",
    stage: "sales",
    short: "Revenue insight",
    text: "How well served are executives with revenue insight and analytics?",
    why: "Executive-grade revenue insight is a high-visibility AI win — it builds the sponsorship that funds everything else.",
    levels: [
      "Quarterly decks assembled by hand",
      "Static monthly reporting",
      "Standard dashboards, limited insight",
      "Rich self-service revenue analytics",
      "AI-narrated insight delivered proactively",
    ],
    insights: {
      low: "An executive revenue dashboard is a two-week build that changes the leadership conversation — and it's the natural stage for introducing AI-generated insight.",
      mid: "The step-change from here is narrative: AI that explains *why* the numbers moved and what to do, not just what they are.",
      high: "Consider an Executive Agent — leadership asking 'how is Q3 tracking in Saudi?' in Slack and getting a sourced, current answer in seconds.",
    },
  },
  {
    id: "sales-nba",
    stage: "sales",
    short: "Next Best Action",
    text: "Do your sellers get guidance on the next best action for each customer?",
    why: "Next-best-action is where sales AI becomes prescriptive — the difference between a reporting tool and a revenue co-pilot.",
    levels: [
      "No — sellers rely on instinct",
      "Managers suggest actions in reviews",
      "Playbooks exist for key scenarios",
      "Rule-based prompts in the CRM",
      "AI-driven recommendations in the flow of work",
    ],
    insights: {
      low: "Codifying your top sellers' instincts into playbooks — then automating the prompts — consistently lifts mid-performer productivity, where most revenue upside hides.",
      mid: "Your playbooks are the training data. Converting them into in-CRM guided actions is a short project with visible payoff.",
      high: "You're at the leading edge — the next step is agentic execution, where the AI doesn't just recommend the follow-up but drafts and schedules it.",
    },
  },
  {
    id: "sales-ai-adoption",
    stage: "sales",
    short: "Sales AI usage",
    text: "Is your sales team using any AI assistance today?",
    why: "Current AI exposure tells us whether your first sales AI deployment is an introduction or an upgrade.",
    levels: [
      "None at all",
      "Individuals using ChatGPT informally",
      "Some AI features enabled, lightly used",
      "AI assistance embedded in daily selling",
      "AI woven through the entire revenue process",
    ],
    insights: {
      low: "A clean slate is fine — starting with one high-value use case, done well, beats scattering AI features nobody asked for.",
      mid: "Informal AI use is demand signalling. Channel it into sanctioned, Salesforce-grounded tools before shadow AI becomes a data governance problem.",
      high: "With AI already in the workflow, your opportunity is consolidation — replacing point tools with agents grounded in your actual customer data.",
    },
  },

  /* ------------------------- Customer Service --------------------- */
  {
    id: "svc-case-mgmt",
    stage: "service",
    short: "Case management",
    text: "How does customer service case management work today?",
    why: "The case object is the backbone of service AI — everything an agent does hangs off a well-managed case.",
    levels: [
      "No formal cases — requests live in inboxes",
      "Cases logged inconsistently across channels",
      "Centralised cases with basic categorisation",
      "Well-structured cases with SLAs and ownership",
      "An optimised case lifecycle, measured end to end",
    ],
    insights: {
      low: "Unified case management is the foundation everything else needs — and organisations moving from inbox-service to Service Cloud typically see resolution times drop by a third from structure alone.",
      mid: "With centralised cases, AI case classification and summarisation are immediately deployable — they're the workhorses of service AI.",
      high: "Your case discipline means a Service Agent could resolve routine cases end-to-end from day one, with clean escalation into your existing structure.",
    },
  },
  {
    id: "svc-knowledge",
    stage: "service",
    short: "Knowledge articles",
    text: "How strong is the knowledge available to your service team?",
    why: "Service AI answers from knowledge articles. Their coverage and freshness set the accuracy ceiling of any agent.",
    levels: [
      "There isn't a service knowledge base",
      "Outdated articles nobody maintains",
      "Decent coverage of common issues",
      "Current, curated articles with owners",
      "A knowledge-centred service operation (KCS)",
    ],
    insights: {
      low: "Your agents' answers currently live in your best people's heads. A knowledge sprint — capturing the top 50 issues in article form — is the essential pre-work for any service AI.",
      mid: "Good base. AI can now help maintain it: drafting article updates from resolved cases so knowledge stays fresh without heroics.",
      high: "Knowledge-centred service is exactly what Agentforce feeds on — you could deploy a customer-facing answer agent with unusually high confidence.",
    },
  },
  {
    id: "svc-chatbot",
    stage: "service",
    short: "Chat & bots",
    text: "What's your experience with chatbots or virtual agents so far?",
    why: "Prior bot experience — good or bad — shapes stakeholder expectations and tells us where the scar tissue is.",
    levels: [
      "Never deployed one",
      "Tried one; customers hated it",
      "A basic FAQ bot handles simple queries",
      "A capable bot resolving real issues",
      "AI-powered virtual agents across channels",
    ],
    insights: {
      low: "You're in a strong position, oddly — you'll skip the rule-based bot generation entirely and start with generative agents, which converse rather than match keywords.",
      mid: "If a past bot disappointed, that was almost certainly a scripted decision-tree bot. Agentforce agents reason over your actual knowledge and data — a different technology generation. A supervised pilot rebuilds trust fast.",
      high: "Upgrading your existing bot to Agentforce typically doubles containment — the generative layer handles the long tail your current flows can't match.",
    },
  },
  {
    id: "svc-portal",
    stage: "service",
    short: "Customer portals",
    text: "Can customers help themselves through a portal or digital channel?",
    why: "Self-service infrastructure is where AI deflection compounds — every portal visit is a conversation an agent could complete.",
    levels: [
      "No — phone and email only",
      "A basic contact form or FAQ page",
      "A portal for some requests",
      "A capable portal customers actually use",
      "A rich digital experience across web and mobile",
    ],
    insights: {
      low: "An Experience Cloud portal with an embedded AI agent is a leapfrog move — you'd skip the static-portal generation and go straight to conversational self-service.",
      mid: "Embedding an AI agent into your existing portal is the fastest deflection win available to you — same traffic, dramatically higher resolution rate.",
      high: "Strong digital channels plus AI agents is the pattern behind the region's best service experiences — you have the hard part built.",
    },
  },
  {
    id: "svc-routing",
    stage: "service",
    short: "Case routing",
    text: "How do cases find their way to the right person?",
    why: "Routing quality determines how much human expertise is wasted on misdirected work — a favourite target for AI.",
    levels: [
      "Whoever picks it up handles it",
      "Manual triage by a coordinator",
      "Queue-based routing by category",
      "Skills-based routing with load balancing",
      "Intelligent routing on intent, sentiment and skill",
    ],
    insights: {
      low: "Manual triage is expensive expertise doing sorting work. AI classification and routing is often the single best service quick win — invisible to customers, transformative for throughput.",
      mid: "Queue routing works until complexity grows. AI intent detection routes on what the customer actually means — cutting the transfer rate that frustrates customers most.",
      high: "Sophisticated routing means an AI agent slots in cleanly as the 'first responder' tier, resolving what it can and routing the rest better than any triage team.",
    },
  },
  {
    id: "svc-escalation",
    stage: "service",
    short: "Escalations",
    text: "How well managed are escalations and complex cases?",
    why: "Escalation paths are the safety net under any customer-facing AI — we design agent boundaries around them.",
    levels: [
      "Escalations are chaotic and political",
      "Ad hoc — depends who's available",
      "A defined path, inconsistently followed",
      "Clear tiers with SLAs and ownership",
      "Proactive escalation prevention with early-warning signals",
    ],
    insights: {
      low: "Before an AI agent talks to customers, the human safety net must be dependable. Escalation design would be part of the pilot's foundation work — it's days of design, not months.",
      mid: "Workable. AI sentiment detection can strengthen it — flagging conversations trending toward escalation before they get there.",
      high: "Mature escalation paths let you set generous agent autonomy with confidence — the net is strong, so the agent can do more.",
    },
  },
  {
    id: "svc-response",
    stage: "service",
    short: "Response times",
    text: "How would customers describe your response and resolution times?",
    why: "Response time is the service metric AI moves fastest — instant first response is an agent's native ability.",
    levels: [
      "Slow — a known point of complaints",
      "Inconsistent — great days and bad days",
      "Acceptable, within published SLAs",
      "Fast, and measured continuously",
      "Industry-leading, including out of hours",
    ],
    insights: {
      low: "This is where AI delivers its most visible win: an agent answers in seconds, around the clock, in any language. Customers feel the change in week one.",
      mid: "AI evens out your peaks — the bad days usually come from volume spikes, which is precisely when an infinitely-scalable agent earns its keep.",
      high: "You compete on speed already. AI protects that advantage at scale — including the overnight and weekend hours your competitors go dark.",
    },
  },
  {
    id: "svc-self-service",
    stage: "service",
    short: "Self-service",
    text: "What share of customer issues resolve without a human agent today?",
    why: "Current deflection sets the baseline for the AI business case — the gap between here and 40–60% is your cost opportunity.",
    levels: [
      "Effectively zero",
      "Under 10% — FAQs catch a little",
      "10–25% through portal and bot",
      "25–45% with a capable digital channel",
      "Over 45% — self-service is the norm",
    ],
    insights: {
      low: "Every percentage point of deflection is measurable money. Organisations deploying Agentforce service agents commonly reach 30–50% autonomous resolution on routine contact types — from near zero.",
      mid: "You've proven customers will self-serve when it works. Generative agents typically lift deflection by 15–25 points over rule-based tools on the same traffic.",
      high: "With self-service culture established, your frontier is complexity — agents that complete multi-step journeys like claims, returns or bookings end to end.",
    },
  },

  /* ------------------------- Slack & Workflow --------------------- */
  {
    id: "slack-adoption",
    stage: "slack",
    short: "Slack adoption",
    text: "How does your organisation use Slack (or similar) today?",
    why: "Slack is where AI meets employees in the flow of work — adoption depth tells us how ready that channel is.",
    levels: [
      "We don't use Slack or any chat platform",
      "Email rules; chat is informal and unofficial",
      "Slack (or similar) used by some teams",
      "Slack is our primary internal channel",
      "Slack is our digital HQ — work happens in it",
    ],
    insights: {
      low: "No problem — but note that AI assistants embedded in chat see dramatically higher usage than portal-based ones. A Slack rollout scoped to one or two teams could accompany your AI programme.",
      mid: "Partial adoption is the moment to add value, not just presence — Salesforce notifications and AI answers inside Slack give the undecided teams a reason to move.",
      high: "A digital-HQ culture is the perfect host for AI. Agentforce in Slack means every employee has an assistant where they already work — zero new tools to adopt.",
    },
  },
  {
    id: "slack-notifications",
    stage: "slack",
    short: "Notifications",
    text: "Do business systems notify people where they work — deals, cases, approvals?",
    why: "Smart notifications are the simplest form of workflow intelligence and the natural first Slack–Salesforce connection.",
    levels: [
      "No — people check systems manually",
      "Email alerts, mostly ignored",
      "Some system notifications reach chat",
      "Rich, targeted notifications in channels",
      "Intelligent, actionable alerts with in-context buttons",
    ],
    insights: {
      low: "Deal-won alerts, case-escalation pings, approval requests — routed into Slack channels, these are a one-week build that makes systems feel alive. An ideal first workflow win.",
      mid: "The upgrade is actionability — notifications with buttons, so people approve, comment or claim work without leaving the conversation.",
      high: "You've built the nervous system. AI can now prioritise it — summarising what matters and suppressing noise, so signal survives scale.",
    },
  },
  {
    id: "slack-approvals",
    stage: "slack",
    short: "Approvals",
    text: "How do approvals — discounts, purchases, time off — flow through the business?",
    why: "Approvals are the classic hidden time-tax. They're also the easiest workflow to automate convincingly.",
    levels: [
      "Chased in person or by email",
      "Email chains with attachments",
      "Some system approvals, much still manual",
      "Digital approval flows for major processes",
      "One-click approvals in the flow of work, fully audited",
    ],
    insights: {
      low: "Approval cycle time silently throttles everything — deals wait, hires wait. Slack-based approval flows typically cut approval time from days to hours, with a full audit trail.",
      mid: "You've digitised some — unifying the rest into Slack gives executives one place to approve everything, which is why these flows actually get used.",
      high: "With approvals flowing digitally, AI can pre-process them — summarising the request, flagging anomalies, and auto-approving within policy thresholds.",
    },
  },
  {
    id: "slack-exec",
    stage: "slack",
    short: "Exec visibility",
    text: "Could an executive get a business update from their phone right now?",
    why: "Executive access to live insight is a small capability with outsized influence on AI sponsorship.",
    levels: [
      "No — they'd have to call someone",
      "Only by opening several systems",
      "Dashboards exist but aren't mobile-friendly",
      "Mobile dashboards executives actually check",
      "Executives ask questions in chat and get live answers",
    ],
    insights: {
      low: "A daily automated business summary in a leadership Slack channel is a one-sprint build that executives feel personally — the best sponsorship-builder we know.",
      mid: "The next step is conversational: 'how did we do yesterday?' answered in Slack with live Salesforce data. Executives never forget the first time it works.",
      high: "Executive-grade conversational insight is a flagship capability — an Executive Agent could extend it to briefing packs, anomaly alerts and meeting prep.",
    },
  },
  {
    id: "slack-workflow",
    stage: "slack",
    short: "Workflow Builder",
    text: "Do teams automate their own processes with no-code tools like Workflow Builder?",
    why: "Team-built automation reveals a self-serve culture — the difference between AI you deploy and AI that spreads.",
    levels: [
      "Nobody automates anything themselves",
      "IT builds everything, when capacity allows",
      "A few power users experiment",
      "Teams routinely build their own workflows",
      "Citizen automation is cultural, with governance",
    ],
    insights: {
      low: "Centralised-only automation becomes a bottleneck. Enabling two or three power users per department with Workflow Builder multiplies your automation capacity for free.",
      mid: "Your power users are seeds — a light enablement programme (training plus a governance guardrail) turns experimentation into a movement.",
      high: "Citizen automation culture means AI agents will be adopted and extended by teams themselves — your AI programme will scale sideways without central effort.",
    },
  },
  {
    id: "slack-crossfunc",
    stage: "slack",
    short: "Collaboration",
    text: "How smoothly do sales, service and operations collaborate on shared customers?",
    why: "Cross-functional friction is where customers feel organisational seams — and where shared channels plus AI dissolve them.",
    levels: [
      "Departments are silos; handoffs drop things",
      "Collaboration happens via email chains",
      "Regular syncs bridge the gaps",
      "Shared channels around customers or deals",
      "Seamless cross-functional swarming as the norm",
    ],
    insights: {
      low: "Customer-centric channels — one channel per major account or incident, with Salesforce context piped in — are the single best cure for handoff drops we've deployed.",
      mid: "Meetings bridge silos but don't scale. Persistent shared channels with live CRM context replace the sync meeting with continuous awareness.",
      high: "Swarming culture plus AI is powerful: agents that assemble account history, open cases and deal status the moment a swarm channel spins up.",
    },
  },
  {
    id: "slack-sfdc",
    stage: "slack",
    short: "Salesforce link",
    text: "Is Slack connected to Salesforce today?",
    why: "The Slack–Salesforce connection is the rail that AI-in-the-flow-of-work runs on.",
    levels: [
      "Not connected at all",
      "People paste links and screenshots",
      "Basic integration — record previews, some alerts",
      "Sales/Service Elevate or custom integration in use",
      "Deep integration — records worked from within Slack",
    ],
    insights: {
      low: "This connection is high-leverage and fast — standard integration takes days and immediately makes both platforms more valuable.",
      mid: "You have the plumbing. Sales Elevate or deeper record-level integration would let teams update Salesforce without leaving the conversation — the point where data hygiene improves by itself.",
      high: "Deep integration means Agentforce agents in Slack can act on Salesforce — update records, create cases, advance deals — making chat a true working surface.",
    },
  },
  {
    id: "slack-ai",
    stage: "slack",
    short: "AI in Slack",
    text: "Are you using any AI capabilities inside Slack today?",
    why: "Slack AI usage shows how close your employees already are to an agent-assisted workday.",
    levels: [
      "None",
      "Curious, but nothing enabled",
      "Slack AI features (search, summaries) in use",
      "AI apps or assistants active in workflows",
      "Agents participate in channels as teammates",
    ],
    insights: {
      low: "Slack AI's channel recaps and answers are the gentlest possible introduction to workplace AI — no workflow change, immediate value. A natural first step.",
      mid: "Summaries save minutes; agents save hours. The step up is task-performing AI — an agent in-channel that fetches data, drafts responses and files the follow-up.",
      high: "You're already living the agent-assisted pattern — our focus would be connecting those agents to Salesforce data and actions so they graduate from helpful to indispensable.",
    },
  },

  /* ------------------------- Multilingual ------------------------- */
  {
    id: "ml-regional",
    stage: "multilingual",
    short: "Regional support",
    text: "How do you support customers across different regions and time zones?",
    why: "Regional coverage gaps are where multilingual AI delivers immediate, visible value — service that never sleeps in any market.",
    levels: [
      "One team, one time zone, one language",
      "Ad hoc coverage when someone's available",
      "Extended hours for key markets",
      "Regional teams for major markets",
      "Follow-the-sun coverage across all markets",
    ],
    insights: {
      low: "AI agents are the economical path to always-on coverage — they hold the fort in every language and time zone, with humans handling what genuinely needs them in business hours.",
      mid: "AI can fill your coverage gaps precisely — taking the languages and hours your teams don't staff, rather than duplicating what they already do well.",
      high: "With regional operations established, AI standardises quality across them — the same accurate answer in Riyadh, Kuala Lumpur and London.",
    },
  },
  {
    id: "ml-localisation",
    stage: "multilingual",
    short: "Localisation",
    text: "Is your knowledge and content localised for each market you serve?",
    why: "AI can only answer in Arabic what your knowledge expresses in — or can be faithfully translated into — Arabic.",
    levels: [
      "Everything is in one language",
      "A few key documents translated, mostly stale",
      "Customer-facing content localised for main markets",
      "Structured localisation across content and knowledge",
      "Full localisation with in-market review and ownership",
    ],
    insights: {
      low: "Modern LLMs make knowledge localisation dramatically cheaper — AI-drafted translations with human review cuts localisation cost by well over half. This unlocks every market you serve.",
      mid: "Your customer-facing head start matters. Extending localisation to service knowledge is what lets AI agents answer accurately in each market's language.",
      high: "Localisation discipline this strong is rare — multilingual AI agents can launch across your markets simultaneously rather than market by market.",
    },
  },
  {
    id: "ml-translation",
    stage: "multilingual",
    short: "AI translation",
    text: "How do you handle translation between your customers' languages and your teams'?",
    why: "Real-time AI translation removes language as a staffing constraint — often the difference between entering a market and not.",
    levels: [
      "We simply can't serve languages we don't speak",
      "Manual translation tools, case by case",
      "Bilingual staff bridge the main gaps",
      "Systematic translation for key channels",
      "Real-time AI translation woven into service",
    ],
    insights: {
      low: "Here's the unlock: with AI translation in the service flow, an English-speaking team can serve Arabic-speaking customers credibly today — and vice versa. Language stops being a hiring problem.",
      mid: "Your bilingual staff are a scarce resource doing routing work. AI translation handles the routine traffic; they handle the conversations where cultural nuance wins or loses the customer.",
      high: "Translation-in-the-flow is the mature pattern — the next step is generation: AI agents composing native-quality responses directly in the customer's language.",
    },
  },
];

/** Multilingual language options */
export const LANGUAGE_OPTIONS = [
  "Arabic",
  "English",
  "French",
  "Malay",
  "Bahasa Indonesia",
  "Urdu",
  "Hindi",
  "Turkish",
  "Other",
];

/* ------------------------------------------------------------------ */
/* Agentforce agents                                                   */
/* ------------------------------------------------------------------ */

export type AgentDef = {
  id: string;
  name: string;
  emoji: string;
  question: string;
  blurb: string;
  /** stage scores that determine organisational readiness for this agent */
  readinessDrivers: ("maturity" | "data" | "sales" | "service" | "slack")[];
};

export const AGENTS: AgentDef[] = [
  {
    id: "sales-agent",
    name: "Sales Agent",
    emoji: "📈",
    question:
      "An AI teammate that qualifies leads instantly, nurtures prospects and books meetings — around the clock, in any language.",
    blurb: "Autonomous lead engagement and qualification",
    readinessDrivers: ["sales", "data", "maturity"],
  },
  {
    id: "service-agent",
    name: "Service Agent",
    emoji: "🎧",
    question:
      "An AI agent that resolves routine customer cases end-to-end on your website, WhatsApp and portal — escalating gracefully when needed.",
    blurb: "Autonomous case resolution across channels",
    readinessDrivers: ["service", "data", "maturity"],
  },
  {
    id: "executive-agent",
    name: "Executive Agent",
    emoji: "📊",
    question:
      "A briefing agent for your leadership — ask any business question in Slack and get a sourced, live answer with the numbers behind it.",
    blurb: "Conversational business intelligence for leaders",
    readinessDrivers: ["data", "slack", "maturity"],
  },
  {
    id: "knowledge-agent",
    name: "Knowledge Agent",
    emoji: "📚",
    question:
      "An internal expert that answers policy, product and procedure questions instantly — so your people stop hunting through documents.",
    blurb: "Instant answers from organisational knowledge",
    readinessDrivers: ["data", "slack"],
  },
  {
    id: "marketing-agent",
    name: "Marketing Agent",
    emoji: "🎯",
    question:
      "An AI marketer that drafts campaigns, personalises journeys and optimises send-times across segments and languages.",
    blurb: "Campaign creation and journey optimisation",
    readinessDrivers: ["data", "maturity"],
  },
  {
    id: "hr-agent",
    name: "Internal HR Agent",
    emoji: "🤝",
    question:
      "An HR assistant that handles leave questions, policy lookups and onboarding tasks — freeing your HR team for the human work.",
    blurb: "Employee HR self-service, automated",
    readinessDrivers: ["data", "slack"],
  },
  {
    id: "employee-assistant",
    name: "Employee Assistant",
    emoji: "✨",
    question:
      "A personal AI assistant for every employee — summarising, drafting, finding and doing, inside the tools they already use.",
    blurb: "An AI copilot for every employee",
    readinessDrivers: ["slack", "data", "maturity"],
  },
];

export const AGENT_RATING_LABELS = [
  "Not relevant",
  "Somewhat useful",
  "Valuable",
  "Very valuable",
  "Transformational",
];

/* ------------------------------------------------------------------ */
/* Score bands                                                         */
/* ------------------------------------------------------------------ */

export type ScoreBand = {
  min: number; // percentage 0–100
  name: string;
  headline: string;
  narrative: string;
};

export const SCORE_BANDS: ScoreBand[] = [
  {
    min: 0,
    name: "Exploring",
    headline: "at the start of the AI journey — with everything to gain",
    narrative:
      "Your organisation is early in its AI journey, which means the largest gains are still ahead of you. The priority is foundation: a trustworthy CRM core, a first pass at data quality, and one carefully-chosen quick win to build belief. Organisations that start here and follow a disciplined 90-day plan routinely surprise themselves.",
  },
  {
    min: 35,
    name: "Emerging",
    headline: "building real foundations for AI",
    narrative:
      "You have genuine foundations in place — the task now is to focus. Rather than broad AI experimentation, we recommend concentrating investment on one revenue or service journey, fixing the data that feeds it, and deploying AI there first. Depth beats breadth at this stage.",
  },
  {
    min: 55,
    name: "Advancing",
    headline: "ready for production AI in targeted areas",
    narrative:
      "Your organisation is ready for production AI deployment in well-chosen areas. Your foundations will support customer-facing agents with appropriate guardrails, and the data work remaining can proceed in parallel rather than as a prerequisite. The competitive window for your industry is open now.",
  },
  {
    min: 75,
    name: "Leading",
    headline: "positioned to lead your industry in applied AI",
    narrative:
      "You are in the top tier of AI readiness we assess in the region. The opportunity is scale and ambition: a portfolio of agents across sales, service and employee experience, governed centrally, compounding value quarter over quarter. Your constraint is prioritisation, not capability.",
  },
];

export function bandForPct(pct: number): ScoreBand {
  return (
    [...SCORE_BANDS].sort((a, b) => b.min - a.min).find((b) => pct >= b.min) ??
    SCORE_BANDS[0]
  );
}
