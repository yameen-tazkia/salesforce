export type Opportunity = {
  title: string;
  department: string;
  challenge: string;
  description: string;
  impact: 1 | 2 | 3; // 1 low → 3 high
  effort: 1 | 2 | 3;
  quickWin: boolean;
  horizon: "0–3 months" | "3–6 months" | "6–12 months" | "12+ months";
};

export type OpportunityProfile = {
  industry: string;
  slug: string;
  departments: string[];
  challenges: string[];
  opportunities: Opportunity[];
};

export const OPPORTUNITY_PROFILES: OpportunityProfile[] = [
  {
    industry: "Real Estate",
    slug: "real-estate",
    departments: ["Sales", "Marketing", "Customer Care", "Collections", "Operations"],
    challenges: [
      "Launch-day lead spikes overwhelm the sales team",
      "Slow follow-up loses international buyers",
      "Handover season buries customer care",
      "Payment-plan follow-up is inconsistent",
      "No live view of pipeline across projects",
    ],
    opportunities: [
      { title: "24/7 lead qualification agent", department: "Sales", challenge: "Launch-day lead spikes overwhelm the sales team", description: "Qualify, score and route every enquiry in seconds, in Arabic and English.", impact: 3, effort: 2, quickWin: true, horizon: "0–3 months" },
      { title: "Viewing booking automation", department: "Sales", challenge: "Slow follow-up loses international buyers", description: "Agent books viewings across broker calendars with automatic reminders.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "Owner handover & snagging agent", department: "Customer Care", challenge: "Handover season buries customer care", description: "Self-service handover slots, snag logging with photos, contractor SLA tracking.", impact: 3, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Collections reminder agent", department: "Collections", challenge: "Payment-plan follow-up is inconsistent", description: "Personalised reminders and payment promises within approved parameters.", impact: 2, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Executive pipeline digest in Slack", department: "Operations", challenge: "No live view of pipeline across projects", description: "Daily AI commentary on sales velocity by project, with inline Q&A.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "Predictive launch-demand modelling", department: "Marketing", challenge: "Launch-day lead spikes overwhelm the sales team", description: "Forecast demand by segment to staff launches and shape campaigns.", impact: 3, effort: 3, quickWin: false, horizon: "6–12 months" },
    ],
  },
  {
    industry: "Financial Services",
    slug: "financial-services",
    departments: ["Retail Banking", "Contact Centre", "Relationship Management", "Compliance", "Operations"],
    challenges: [
      "Routine queries dominate the contact centre",
      "Onboarding and KYC take weeks",
      "RMs spend more time preparing than advising",
      "Evidencing decisions for regulators is manual",
      "Islamic finance queries need precise answers",
    ],
    opportunities: [
      { title: "Retail banking service agent", department: "Contact Centre", challenge: "Routine queries dominate the contact centre", description: "Authenticated balance, card and payment queries contained end to end.", impact: 3, effort: 3, quickWin: false, horizon: "3–6 months" },
      { title: "Onboarding & KYC status agent", department: "Retail Banking", challenge: "Onboarding and KYC take weeks", description: "Guided document collection with proactive status updates.", impact: 3, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "RM briefing copilot", department: "Relationship Management", challenge: "RMs spend more time preparing than advising", description: "Compliant client review packs generated on demand.", impact: 3, effort: 2, quickWin: true, horizon: "0–3 months" },
      { title: "Islamic finance knowledge agent", department: "Retail Banking", challenge: "Islamic finance queries need precise answers", description: "Governed, approved answers on Shariah-compliant products.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "AI audit trail & governance dashboards", department: "Compliance", challenge: "Evidencing decisions for regulators is manual", description: "Every agent action logged, dashboarded and exception-alerted.", impact: 2, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Predictive attrition & next-best-offer", department: "Operations", challenge: "Routine queries dominate the contact centre", description: "Data Cloud signals drive proactive retention and cross-sell.", impact: 3, effort: 3, quickWin: false, horizon: "6–12 months" },
    ],
  },
  {
    industry: "Hospitality",
    slug: "hospitality",
    departments: ["Front Office", "Guest Services", "Sales & MICE", "Marketing", "Operations"],
    challenges: [
      "Peak-time guest requests queue behind the front desk",
      "Event proposals take days to produce",
      "Guest preferences are scattered across systems",
      "Loyalty engagement drops between stays",
      "Duty managers learn about issues too late",
    ],
    opportunities: [
      { title: "Guest concierge agent", department: "Guest Services", challenge: "Peak-time guest requests queue behind the front desk", description: "Instant multilingual handling of requests, bookings and recommendations.", impact: 3, effort: 2, quickWin: true, horizon: "0–3 months" },
      { title: "MICE proposal agent", department: "Sales & MICE", challenge: "Event proposals take days to produce", description: "Availability-checked, priced proposals drafted in hours.", impact: 3, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Unified guest profile", department: "Operations", challenge: "Guest preferences are scattered across systems", description: "Data Cloud joins PMS, POS and service history into one profile.", impact: 3, effort: 3, quickWin: false, horizon: "3–6 months" },
      { title: "Pre-arrival personalisation journeys", department: "Marketing", challenge: "Loyalty engagement drops between stays", description: "Tailored upgrades and experiences offered before every stay.", impact: 2, effort: 2, quickWin: false, horizon: "6–12 months" },
      { title: "Duty-manager escalation workflow", department: "Front Office", challenge: "Duty managers learn about issues too late", description: "Slack escalations with SLA timers from the moment an issue is logged.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "VIP arrival briefing digest", department: "Front Office", challenge: "Guest preferences are scattered across systems", description: "Each morning's VIP arrivals briefed to the team in Slack.", impact: 1, effort: 1, quickWin: true, horizon: "0–3 months" },
    ],
  },
  {
    industry: "Logistics",
    slug: "logistics",
    departments: ["Customer Service", "Sales & Pricing", "Operations", "Customs", "Executive"],
    challenges: [
      "WISMO queries dominate service volume",
      "Exceptions are handled reactively",
      "Standard-lane quotes take days",
      "Customs document queries interrupt specialists",
      "Leadership lacks live corridor performance",
    ],
    opportunities: [
      { title: "Shipment status agent", department: "Customer Service", challenge: "WISMO queries dominate service volume", description: "TMS-connected answers on portal, email and WhatsApp.", impact: 3, effort: 2, quickWin: true, horizon: "0–3 months" },
      { title: "Proactive exception notifications", department: "Operations", challenge: "Exceptions are handled reactively", description: "Customers notified with revised ETAs before they ask.", impact: 3, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Instant standard-lane quoting", department: "Sales & Pricing", challenge: "Standard-lane quotes take days", description: "Rate-card pricing, quote documents and pipeline entries automated.", impact: 3, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Customs documentation assistant", department: "Customs", challenge: "Customs document queries interrupt specialists", description: "Grounded answers on requirements by commodity and corridor.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "On-time-performance digest", department: "Executive", challenge: "Leadership lacks live corridor performance", description: "Daily OTP and exception summary with AI commentary in Slack.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "Predictive ETA modelling", department: "Operations", challenge: "Exceptions are handled reactively", description: "ML-driven ETAs from telematics and historical corridor data.", impact: 3, effort: 3, quickWin: false, horizon: "6–12 months" },
    ],
  },
  {
    industry: "Government",
    slug: "government",
    departments: ["Citizen Services", "Licensing", "Inspections", "Policy", "Executive"],
    challenges: [
      "Citizens queue for questions that need no queue",
      "Application status drives repeat contact",
      "Inspection scheduling is manual",
      "Frontline staff can't find current policy quickly",
      "Service KPIs are reported monthly, not live",
    ],
    opportunities: [
      { title: "Arabic-first citizen service agent", department: "Citizen Services", challenge: "Citizens queue for questions that need no queue", description: "Multilingual answers on services, fees and requirements 24/7.", impact: 3, effort: 2, quickWin: true, horizon: "0–3 months" },
      { title: "Application status automation", department: "Licensing", challenge: "Application status drives repeat contact", description: "Proactive status updates at every stage of every application.", impact: 3, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Inspection scheduling agent", department: "Inspections", challenge: "Inspection scheduling is manual", description: "Self-service booking with route-optimised inspector calendars.", impact: 2, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Policy knowledge assistant", department: "Policy", challenge: "Frontline staff can't find current policy quickly", description: "Cited answers from the governed policy library, in Slack.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "Live service-performance dashboards", department: "Executive", challenge: "Service KPIs are reported monthly, not live", description: "Happiness and SLA metrics streamed to leadership daily.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "Cross-entity life-event journeys", department: "Citizen Services", challenge: "Application status drives repeat contact", description: "One journey across entities for life events like business setup.", impact: 3, effort: 3, quickWin: false, horizon: "12+ months" },
    ],
  },
  {
    industry: "Luxury Retail",
    slug: "luxury-retail",
    departments: ["Boutique", "Clienteling", "E-commerce", "Marketing", "Aftercare"],
    challenges: [
      "Client relationships live in advisors' phones",
      "VIPs go unrecognised across channels",
      "Advisors spend hours preparing appointments",
      "Aftercare requests get lost between teams",
      "Cross-boutique stock checks are slow",
    ],
    opportunities: [
      { title: "Advisor briefing assistant", department: "Clienteling", challenge: "Advisors spend hours preparing appointments", description: "Client briefs with history, preferences and suggestions on demand.", impact: 3, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "Single client view", department: "Marketing", challenge: "VIPs go unrecognised across channels", description: "Data Cloud unifies boutique, online and service history.", impact: 3, effort: 3, quickWin: false, horizon: "3–6 months" },
      { title: "Concierge & aftercare agent", department: "Aftercare", challenge: "Aftercare requests get lost between teams", description: "Repairs, reservations and care requests handled end to end.", impact: 2, effort: 2, quickWin: false, horizon: "3–6 months" },
      { title: "Cross-boutique stock workflow", department: "Boutique", challenge: "Cross-boutique stock checks are slow", description: "Slack stock requests with real-time availability and transfer tracking.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "VIP arrival alerts", department: "Boutique", challenge: "VIPs go unrecognised across channels", description: "Appointment and arrival signals briefed to boutique teams instantly.", impact: 2, effort: 1, quickWin: true, horizon: "0–3 months" },
      { title: "Predictive clienteling signals", department: "Clienteling", challenge: "Client relationships live in advisors' phones", description: "Next-best-touch recommendations from purchase and engagement patterns.", impact: 3, effort: 3, quickWin: false, horizon: "6–12 months" },
    ],
  },
];
