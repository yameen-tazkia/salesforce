import type { ArchLayer } from "@/components/diagrams/ArchitectureDiagram";

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  services: string[];
  challenge: string[];
  approach: string[];
  architecture: ArchLayer[];
  solution: string[];
  outcomes: { metric: string; label: string }[];
  lessons: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "gulf-developer-launch-engine",
    client: "Leading UAE Property Developer",
    industry: "Real Estate",
    title: "An AI launch engine that never sleeps",
    summary:
      "A flagship developer turned launch-day chaos into a qualified, prioritised pipeline — with an Agentforce agent qualifying every enquiry in seconds, around the clock.",
    services: ["Discovery", "Design", "Pilot", "Implement", "Managed AI Services"],
    challenge: [
      "Off-plan launches generated 10,000+ enquiries in 48 hours across portals, WhatsApp and call centre — far beyond what the sales team could triage.",
      "International buyers in different time zones received first responses up to 14 hours after enquiring; competitors responded first.",
      "Brokers received raw lead lists with no context, wasting their first call on qualification instead of selling.",
    ],
    approach: [
      "A two-week Discovery aligned sales leadership on the launch journey and defined qualification criteria worth automating.",
      "The pilot targeted one launch: an Agentforce qualification agent in Arabic and English, integrated with Sales Cloud lead routing.",
      "Weekly value tracking compared agent-qualified cohorts against the previous launch's baseline before scaling to all projects.",
    ],
    architecture: [
      { name: "Engagement Channels", tone: "teal", nodes: ["Property Portals", "WhatsApp", "Web Forms", "Call Centre"] },
      { name: "AI Agent Layer", tone: "emerald", nodes: ["Qualification Agent", "Viewing Booking Agent", "Broker Briefing Assistant"] },
      { name: "Platform", tone: "navy", nodes: ["Sales Cloud", "Marketing Cloud", "Data Cloud Profile"] },
      { name: "Operations", tone: "gold", nodes: ["Slack Launch War-Room", "Deal-Desk Approvals", "Executive Digest"] },
    ],
    solution: [
      "The qualification agent engages every enquiry within seconds, scoring budget, timeline, unit preference and financing intent.",
      "Hot leads route to brokers with a full briefing pack; warm leads enter nurture journeys automatically.",
      "A Slack launch war-room gives leadership live sales velocity, with discount approvals handled in-channel.",
    ],
    outcomes: [
      { metric: "93%", label: "of enquiries engaged within 60 seconds" },
      { metric: "+22%", label: "conversion on agent-qualified leads" },
      { metric: "38 hrs", label: "broker time saved per launch weekend" },
      { metric: "5 mo", label: "payback on total programme cost" },
    ],
    lessons: [
      "Qualification criteria must come from top brokers, not management assumptions — the pilot's biggest uplift came from re-tuning scoring with broker feedback.",
      "Arabic conversational quality is a differentiator; invest in evaluation with native speakers before launch.",
      "A visible war-room turned sceptical sales leadership into the programme's loudest champions.",
    ],
  },
  {
    slug: "regional-bank-service-transformation",
    client: "Regional Islamic Bank",
    industry: "Financial Services",
    title: "Governed AI in a regulated contact centre",
    summary:
      "A Gulf-headquartered Islamic bank contained the majority of routine service contacts with an authenticated Agentforce agent — with governance the regulator praised.",
    services: ["Assess", "Design", "Pilot", "Implement", "Optimise"],
    challenge: [
      "Balance, card and payment queries consumed 68% of contact-centre capacity while complex needs queued.",
      "Previous chatbot attempts failed on trust: unauthenticated, uncited answers on Shariah-compliant products created compliance risk.",
      "Every automation initiative stalled at governance review for lack of auditability.",
    ],
    approach: [
      "An AI Readiness Assessment scored governance as the binding constraint — so the programme started there, co-designing the audit model with compliance before any build.",
      "The agent launched on three contact drivers with full authentication, action logging and human handoff, then expanded driver by driver.",
      "Islamic finance answers were grounded exclusively in a governed, scholar-approved knowledge base with citations.",
    ],
    architecture: [
      { name: "Channels", tone: "teal", nodes: ["Mobile App", "Web Banking", "Phone IVR Deflection"] },
      { name: "AI Agent Layer", tone: "emerald", nodes: ["Banking Service Agent", "Islamic Finance Knowledge Agent", "Onboarding Status Agent"] },
      { name: "Platform & Data", tone: "navy", nodes: ["Financial Services Cloud", "Data Cloud (in-region)", "Core Banking via MuleSoft"] },
      { name: "Governance", tone: "gold", nodes: ["Audit Trail Store", "Compliance Dashboards", "Slack Exception Alerts"] },
    ],
    solution: [
      "The service agent authenticates customers, resolves account and card queries, and executes low-risk actions like card freezes.",
      "Sensitive intents hand off to advisors with complete conversation context — no customer repeats themselves.",
      "Compliance monitors a live dashboard of agent actions with Slack alerts on policy exceptions.",
    ],
    outcomes: [
      { metric: "61%", label: "containment of routine contacts" },
      { metric: "-44%", label: "average wait time for complex queries" },
      { metric: "100%", label: "of agent actions auditable end to end" },
      { metric: "+18", label: "NPS on digital service journeys" },
    ],
    lessons: [
      "In regulated industries, governance is the critical path — designing it first accelerated everything after.",
      "Containment targets should exclude intents you *want* humans to handle; measuring the right denominator kept trust with the union and staff.",
      "Citing sources in Islamic finance answers converted internal sceptics faster than any accuracy statistic.",
    ],
  },
  {
    slug: "gcc-logistics-visibility",
    client: "GCC Logistics Group",
    industry: "Logistics",
    title: "From 'where is my shipment?' to proactive service",
    summary:
      "A multi-country logistics group deflected the majority of status queries and began telling customers about exceptions before customers noticed them.",
    services: ["Discover", "Design", "Pilot", "Implement", "Adopt"],
    challenge: [
      "Two in three inbound contacts asked for shipment status the customer could not self-serve.",
      "Exception handling was reactive: customers discovered delays at delivery windows, escalating to account managers.",
      "Quotes for standard lanes took 2–3 days, losing time-sensitive freight to faster rivals.",
    ],
    approach: [
      "Discovery mapped contact drivers by corridor and proved WISMO deflection alone justified the programme.",
      "A MuleSoft integration layer unified TMS, customs and last-mile data before any agent went live — data first, agent second.",
      "The pilot ran on the UAE–KSA corridor with the group's three largest customers as design partners.",
    ],
    architecture: [
      { name: "Customer Channels", tone: "teal", nodes: ["Customer Portal", "Email", "WhatsApp Business"] },
      { name: "AI Agent Layer", tone: "emerald", nodes: ["Shipment Status Agent", "Exception Notification Agent", "Quoting Agent"] },
      { name: "Integration & Data", tone: "navy", nodes: ["MuleSoft API Layer", "TMS / WMS", "Data Cloud"] },
      { name: "Operations", tone: "gold", nodes: ["Slack Corridor War-Rooms", "OTP Digest", "Escalation Workflows"] },
    ],
    solution: [
      "The status agent answers WISMO on any channel with live milestone data and predicted ETAs.",
      "When exceptions occur, affected customers are notified proactively with revised ETAs and options.",
      "Standard-lane quotes are priced and issued in minutes, with exceptions approved through Slack deal-desk workflows.",
    ],
    outcomes: [
      { metric: "72%", label: "WISMO deflection within four months" },
      { metric: "8 min", label: "median exception-to-notification time" },
      { metric: "-83%", label: "quote turnaround time on standard lanes" },
      { metric: "3.9×", label: "first-year return on programme investment" },
    ],
    lessons: [
      "Integration quality determines agent quality — the weeks spent on the API layer were the programme's best investment.",
      "Proactive notifications changed customer behaviour: portal logins fell, satisfaction rose. Measure the journey, not the channel.",
      "Design-partner customers became references, which shortened the sales cycle for the group's premium visibility product.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
