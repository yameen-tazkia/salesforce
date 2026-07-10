export type Industry = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  challenges: string[];
  salesforce: string[];
  agentforce: string[];
  slack: string[];
  roadmap: { phase: string; horizon: string; focus: string }[];
  outcomes: { metric: string; detail: string }[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    headline: "From lead to keys — an intelligent property journey",
    summary:
      "Gulf real estate moves fast: mega-projects, off-plan launches and international buyers across time zones. AI keeps every lead warm, every broker informed and every handover on schedule.",
    challenges: [
      "Lead volumes spike at launches and overwhelm sales teams",
      "Brokers and developers work from disconnected spreadsheets",
      "International buyers expect responses across languages and time zones",
      "Post-sale handover and snagging processes damage brand experience",
      "Little visibility of pipeline health across projects",
    ],
    salesforce: [
      "Sales Cloud as a single pipeline across projects, brokers and channels",
      "Marketing Cloud journeys for launch campaigns and nurture",
      "Service Cloud for handover, snagging and community management",
      "Experience Cloud broker and owner portals",
    ],
    agentforce: [
      "24/7 multilingual lead qualification agent for portal and WhatsApp enquiries",
      "Sales agent that books viewings and prepares broker briefing packs",
      "Owner-services agent handling handover bookings and snagging updates",
      "Collections agent for payment plan reminders and escalations",
    ],
    slack: [
      "Launch war-room channels with live sales leaderboards",
      "Deal-desk approvals for discounts and payment plan exceptions",
      "Instant alerts when high-value leads engage",
      "Executive daily digest of sales velocity by project",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–3 months", focus: "Unified pipeline, lead capture and data quality" },
      { phase: "Automation", horizon: "3–6 months", focus: "Lead qualification agent and launch journeys" },
      { phase: "Intelligence", horizon: "6–12 months", focus: "Owner services agent, forecasting and Slack war-rooms" },
    ],
    outcomes: [
      { metric: "60–80% of enquiries handled by agents", detail: "Around-the-clock qualification without headcount growth" },
      { metric: "2–3× faster lead response", detail: "Response in seconds during launch peaks" },
      { metric: "+15–25% conversion on qualified leads", detail: "Brokers focus on buyers who are ready" },
    ],
  },
  {
    slug: "aviation",
    name: "Aviation",
    headline: "Intelligent service at every altitude",
    summary:
      "Gulf carriers set the global benchmark for premium travel. AI protects that standard at scale — through disruption, loyalty and every passenger touchpoint.",
    challenges: [
      "Disruption events create overwhelming spikes in service contacts",
      "Premium passengers expect personal, proactive service",
      "Loyalty programmes hold rich data that goes unused",
      "Complex partner and codeshare servicing scenarios",
      "Frontline teams juggle numerous disconnected systems",
    ],
    salesforce: [
      "Service Cloud as the single passenger-service platform",
      "Loyalty Management integrated with the passenger profile",
      "Marketing Cloud for personalised offers by route and tier",
      "Data Cloud unifying booking, loyalty and service history",
    ],
    agentforce: [
      "Disruption agent that proactively rebooks and notifies affected passengers",
      "Service agent resolving baggage, refunds and schedule queries",
      "Loyalty agent handling tier queries, upgrades and redemption",
      "Crew and ground-ops knowledge assistant for policy answers",
    ],
    slack: [
      "Disruption command-centre channels with live status",
      "VIP passenger alerts to station managers",
      "Approval flows for goodwill compensation",
      "Daily operational readiness digest for leadership",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–3 months", focus: "Unified passenger profile and service console" },
      { phase: "Automation", horizon: "3–6 months", focus: "Service agent for top contact drivers" },
      { phase: "Intelligence", horizon: "6–12 months", focus: "Proactive disruption handling and loyalty personalisation" },
    ],
    outcomes: [
      { metric: "40–60% contact deflection", detail: "Routine queries resolved without an agent" },
      { metric: "Minutes, not hours, to rebook", detail: "Proactive disruption recovery at scale" },
      { metric: "+10 NPS on service journeys", detail: "Premium experience protected under pressure" },
    ],
  },
  {
    slug: "luxury-retail",
    name: "Luxury Retail",
    headline: "Clienteling elevated by intelligence",
    summary:
      "Luxury in the Gulf is personal. AI gives every client advisor perfect memory and perfect timing — without ever feeling automated.",
    challenges: [
      "Client relationships live in advisors' personal phones",
      "No single view of the client across boutiques and online",
      "VIP clients expect recognition at every touchpoint",
      "Seasonal peaks (Ramadan, DSF, holiday season) strain teams",
      "High advisor turnover loses relationship history",
    ],
    salesforce: [
      "Clienteling on Sales/Service Cloud with unified client profiles",
      "Marketing Cloud for private launches and personal invitations",
      "Commerce Cloud integrated with boutique inventory",
      "Data Cloud joining transactions, preferences and service history",
    ],
    agentforce: [
      "Advisor assistant that prepares client briefs before appointments",
      "Concierge agent for reservations, repairs and aftercare",
      "Personal-shopper agent for online VIP journeys",
      "Stock-enquiry agent across boutiques in real time",
    ],
    slack: [
      "VIP arrival alerts to boutique teams",
      "Cross-boutique stock request workflows",
      "New collection briefings with Q&A knowledge search",
      "Client escalation channels with SLA tracking",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–3 months", focus: "Single client view and clienteling rollout" },
      { phase: "Automation", horizon: "3–6 months", focus: "Advisor assistant and concierge agent" },
      { phase: "Intelligence", horizon: "6–12 months", focus: "Predictive clienteling and lifetime-value growth" },
    ],
    outcomes: [
      { metric: "+20–30% repeat purchase rate", detail: "Advisors act on the right signal at the right moment" },
      { metric: "100% relationship continuity", detail: "Client history survives advisor changes" },
      { metric: "Hours back per advisor per week", detail: "Preparation and admin automated" },
    ],
  },
  {
    slug: "financial-services",
    name: "Banking & Financial Services",
    headline: "Trusted AI for regulated finance",
    summary:
      "Banks and insurers in the region balance digital ambition with strict regulation. We deliver AI with governance built in — Shariah-aware, compliant and auditable.",
    challenges: [
      "Regulatory and data-residency obligations constrain AI adoption",
      "Onboarding and KYC journeys are slow and manual",
      "Contact centres drown in routine balance and card queries",
      "Relationship managers lack a unified client view",
      "Islamic finance products need precise, compliant explanations",
    ],
    salesforce: [
      "Financial Services Cloud for unified client and household views",
      "OmniStudio for guided onboarding and KYC journeys",
      "Service Cloud with compliant case management",
      "Data Cloud with regional residency architecture",
    ],
    agentforce: [
      "Retail banking agent for balances, cards and payments queries",
      "Onboarding agent guiding document collection and KYC status",
      "RM assistant preparing client reviews and next-best-actions",
      "Islamic finance knowledge agent with governed, approved answers",
    ],
    slack: [
      "Credit and exception approval workflows with full audit trail",
      "Fraud alert triage channels",
      "Branch performance digests for regional leadership",
      "Compliance query knowledge search",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–4 months", focus: "FSC rollout, governance model and data residency" },
      { phase: "Automation", horizon: "4–8 months", focus: "Service agent for top contact drivers, onboarding flows" },
      { phase: "Intelligence", horizon: "8–14 months", focus: "RM copilots and proactive client engagement" },
    ],
    outcomes: [
      { metric: "50–70% of routine queries contained", detail: "Contact centre capacity redirected to complex needs" },
      { metric: "Onboarding in days, not weeks", detail: "Guided journeys with automated checks" },
      { metric: "Full auditability", detail: "Every agent action logged and explainable" },
    ],
  },
  {
    slug: "government",
    name: "Government",
    headline: "AI for citizen-first government services",
    summary:
      "Gulf governments lead the world in digital ambition. We help entities deliver proactive, multilingual citizen services aligned with national AI strategies.",
    challenges: [
      "Citizens expect private-sector experiences from public services",
      "Service requests span departments with manual handoffs",
      "Arabic-first, multilingual service is non-negotiable",
      "National AI strategies demand measurable adoption",
      "Data sovereignty and security requirements are strict",
    ],
    salesforce: [
      "Public Sector Solutions for licences, permits and benefits",
      "Service Cloud as the omni-channel citizen service platform",
      "Experience Cloud citizen portals with guided services",
      "Data Cloud for a single citizen view across departments",
    ],
    agentforce: [
      "Citizen service agent answering service questions in Arabic and English",
      "Application-status agent with proactive updates",
      "Internal policy knowledge assistant for government employees",
      "Appointment and inspection scheduling agent",
    ],
    slack: [
      "Inter-department case escalation workflows",
      "Executive dashboards for service-level performance",
      "Incident command channels for service disruptions",
      "Policy knowledge search for frontline staff",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–4 months", focus: "Citizen 360 and omni-channel service desk" },
      { phase: "Automation", horizon: "4–9 months", focus: "Citizen agent for top services, status automation" },
      { phase: "Intelligence", horizon: "9–18 months", focus: "Proactive services and cross-entity journeys" },
    ],
    outcomes: [
      { metric: "70%+ digital containment", detail: "Citizens self-serve in their language of choice" },
      { metric: "Same-day resolution for routine services", detail: "Handoffs automated across departments" },
      { metric: "Happiness-index improvement", detail: "Measured against national service KPIs" },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    headline: "Anticipatory service, powered by AI",
    summary:
      "The region's hotels define world-class hospitality. AI extends that warmth to every digital touchpoint — before arrival, in-stay and long after checkout.",
    challenges: [
      "Guest preferences scattered across PMS, POS and spreadsheets",
      "Peak seasons stretch service teams thin",
      "Group, MICE and events sales cycles are slow and manual",
      "Loyalty engagement drops between stays",
      "Multilingual guest communication at scale",
    ],
    salesforce: [
      "Service Cloud guest-care hub across properties",
      "Sales Cloud for corporate, group and MICE pipelines",
      "Marketing Cloud for pre-arrival and win-back journeys",
      "Data Cloud unified guest profile across brands",
    ],
    agentforce: [
      "Guest concierge agent for requests, amenities and local recommendations",
      "Reservation-change agent across channels",
      "MICE proposal agent drafting event quotes",
      "In-stay issue resolution agent with instant escalation",
    ],
    slack: [
      "Duty-manager escalation channels with SLA timers",
      "VIP arrival briefings each morning",
      "Event-ops coordination workflows",
      "Daily revenue and occupancy digest",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–3 months", focus: "Unified guest profile and service hub" },
      { phase: "Automation", horizon: "3–6 months", focus: "Concierge agent and pre-arrival journeys" },
      { phase: "Intelligence", horizon: "6–12 months", focus: "Anticipatory service and MICE acceleration" },
    ],
    outcomes: [
      { metric: "50%+ of guest requests automated", detail: "Instant response in the guest's language" },
      { metric: "Faster MICE quote turnaround", detail: "Days reduced to hours" },
      { metric: "+ RevPAR through personalisation", detail: "Right offer, right guest, right moment" },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    headline: "Visibility and velocity across the supply chain",
    summary:
      "The Gulf is the world's logistics crossroads. AI turns shipment noise into proactive service and every exception into a managed event.",
    challenges: [
      "\"Where is my shipment?\" dominates service volume",
      "Exceptions handled reactively through phone and email",
      "Quoting for complex freight is slow",
      "Fragmented systems across freight, customs and last-mile",
      "Customer visibility is a competitive differentiator",
    ],
    salesforce: [
      "Service Cloud as the customer service backbone",
      "Sales Cloud for freight and contract logistics pipeline",
      "Experience Cloud customer track-and-trace portal",
      "Data Cloud joining TMS, WMS and telematics data",
    ],
    agentforce: [
      "Shipment-status agent across email, portal and WhatsApp",
      "Exception agent that proactively notifies and re-plans",
      "Quoting agent for standard lanes with instant pricing",
      "Customs-documentation assistant for common queries",
    ],
    slack: [
      "Exception war-room channels by corridor",
      "Escalation workflows with operations SLAs",
      "Daily on-time-performance digest",
      "Capacity alerts to commercial teams",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–3 months", focus: "Service backbone and shipment data integration" },
      { phase: "Automation", horizon: "3–6 months", focus: "Status agent and proactive exception alerts" },
      { phase: "Intelligence", horizon: "6–12 months", focus: "Instant quoting and predictive ETAs" },
    ],
    outcomes: [
      { metric: "60–80% WISMO deflection", detail: "Status queries answered instantly, any channel" },
      { metric: "Exceptions resolved before customers notice", detail: "Proactive notifications with new ETAs" },
      { metric: "Quotes in minutes", detail: "Standard-lane pricing automated end to end" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Patient experience with clinical-grade trust",
    summary:
      "Providers and payers across the region are digitising fast. We deliver AI that respects clinical governance while transforming access, scheduling and patient support.",
    challenges: [
      "Appointment no-shows and long booking wait times",
      "Call centres overloaded with scheduling and results queries",
      "Fragmented patient records across facilities",
      "Insurance approval friction frustrates patients and staff",
      "Strict health-data privacy and residency requirements",
    ],
    salesforce: [
      "Health Cloud patient 360 across facilities",
      "Service Cloud patient-access centre",
      "Marketing Cloud for care-programme journeys",
      "Data Cloud with health-grade privacy controls",
    ],
    agentforce: [
      "Scheduling agent for bookings, changes and reminders",
      "Patient-access agent for common queries and directions",
      "Insurance pre-approval status agent",
      "Care-programme companion for chronic-condition follow-ups",
    ],
    slack: [
      "Bed-management and discharge coordination channels",
      "Referral approval workflows",
      "Daily patient-access performance digest",
      "Clinical-policy knowledge search for staff",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–4 months", focus: "Patient 360 and access-centre consolidation" },
      { phase: "Automation", horizon: "4–8 months", focus: "Scheduling agent and reminder journeys" },
      { phase: "Intelligence", horizon: "8–14 months", focus: "Care companions and proactive outreach" },
    ],
    outcomes: [
      { metric: "30–50% fewer no-shows", detail: "Intelligent reminders and easy rescheduling" },
      { metric: "Booking wait times cut to minutes", detail: "24/7 scheduling without hold queues" },
      { metric: "Privacy by design", detail: "Residency and consent enforced end to end" },
    ],
  },
  {
    slug: "telecom",
    name: "Telecom",
    headline: "From call centre to intelligent experience hub",
    summary:
      "Regional telcos serve tens of millions of subscribers. AI absorbs routine volume, personalises retention and turns B2B sales into a precision operation.",
    challenges: [
      "Massive contact volumes for billing, plans and coverage",
      "Churn pressure in saturated consumer markets",
      "B2B/enterprise sales cycles lack pipeline discipline",
      "Legacy BSS/OSS complexity slows every journey",
      "Retail stores disconnected from digital channels",
    ],
    salesforce: [
      "Service Cloud + Communications Cloud for consumer service",
      "Sales Cloud for enterprise and SME pipeline",
      "Marketing Cloud for lifecycle and retention campaigns",
      "Data Cloud unifying usage, billing and interaction history",
    ],
    agentforce: [
      "Billing and plan agent resolving the top contact drivers",
      "Retention agent with personalised save offers",
      "Enterprise sales assistant preparing account plans",
      "Network-status agent for outage and coverage queries",
    ],
    slack: [
      "Outage command channels with customer-impact feeds",
      "Enterprise deal-desk approvals",
      "Churn-risk alerts to retention squads",
      "Executive daily KPI digest",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–4 months", focus: "Unified subscriber view and service consolidation" },
      { phase: "Automation", horizon: "4–8 months", focus: "Billing agent and outage communications" },
      { phase: "Intelligence", horizon: "8–14 months", focus: "Predictive retention and B2B copilots" },
    ],
    outcomes: [
      { metric: "50–70% containment on routine contacts", detail: "Billing and plan queries resolved instantly" },
      { metric: "Churn reduced measurably", detail: "Right-time retention offers by segment" },
      { metric: "Bigger, faster B2B pipeline", detail: "Copilots keep every account plan current" },
    ],
  },
  {
    slug: "software",
    name: "Software Development",
    headline: "AI-native operations for technology companies",
    summary:
      "The region's software sector is scaling rapidly. We help product companies run revenue, support and success on one intelligent platform — and ship faster with AI in the loop.",
    challenges: [
      "Support volume grows faster than the team",
      "Trial-to-paid conversion depends on response speed",
      "Customer success is reactive, driven by renewal dates",
      "Product, support and sales knowledge is scattered",
      "Engineering context lost between tools",
    ],
    salesforce: [
      "Sales Cloud for PLG + sales-assisted pipelines",
      "Service Cloud for technical support with SLAs",
      "Data Cloud joining product usage with CRM",
      "Revenue Cloud for subscriptions and renewals",
    ],
    agentforce: [
      "Technical support agent grounded in product docs",
      "Trial-conversion agent engaging high-intent signups",
      "Customer-success agent monitoring health and drafting QBRs",
      "Internal engineering knowledge assistant",
    ],
    slack: [
      "Incident response workflows with status-page updates",
      "Deal-desk and discount approvals",
      "Churn-signal alerts to CS squads",
      "Release-notes digest to customer-facing teams",
    ],
    roadmap: [
      { phase: "Foundation", horizon: "0–2 months", focus: "CRM + support consolidation, usage data pipeline" },
      { phase: "Automation", horizon: "2–5 months", focus: "Support agent and trial-conversion plays" },
      { phase: "Intelligence", horizon: "5–10 months", focus: "Predictive health scoring and success copilots" },
    ],
    outcomes: [
      { metric: "40–60% ticket deflection", detail: "Documentation-grounded answers on first contact" },
      { metric: "+ trial conversion", detail: "Every high-intent signup engaged in minutes" },
      { metric: "Net revenue retention up", detail: "Risk caught quarters before renewal" },
    ],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
