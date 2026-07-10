import type { ArchLayer } from "@/components/diagrams/ArchitectureDiagram";

export type DemoMessage = {
  from: "user" | "agent" | "system";
  text: string;
};

export type AgentDemo = {
  id: string;
  name: string;
  role: string;
  description: string;
  scenario: string;
  conversation: DemoMessage[];
  capabilities: string[];
  architecture: ArchLayer[];
};

export const AGENT_DEMOS: AgentDemo[] = [
  {
    id: "sales-agent",
    name: "Sales Agent",
    role: "Lead qualification & pipeline acceleration",
    description:
      "Engages every inbound lead in seconds, qualifies against your criteria and books meetings straight into rep calendars.",
    scenario:
      "A prospective buyer enquires about a waterfront off-plan development at 11:40 pm.",
    conversation: [
      { from: "user", text: "Hi, I saw the Marina Heights launch. Are 2-bedroom units still available?" },
      { from: "agent", text: "Welcome! Yes — 2-bedroom residences at Marina Heights are available from AED 2.4M, with 60/40 payment plans. May I ask if you're buying to live in or as an investment?" },
      { from: "user", text: "Investment mostly. What's the expected rental yield?" },
      { from: "agent", text: "Comparable units in the marina district achieve 6.5–7.2% gross yield. Based on your interest, I'd recommend the 04-type corner units — stronger rental demand and only 6 remain. Would you like me to arrange a viewing or a call with our investment specialist?" },
      { from: "user", text: "A call would be great. I'm in London though." },
      { from: "agent", text: "No problem. Omar Al-Rashid covers our international investors and has availability tomorrow at 2:00 pm or 5:30 pm London time. Which suits you?" },
      { from: "user", text: "5:30 works." },
      { from: "agent", text: "Booked — you'll receive a calendar invitation and a Marina Heights investment pack shortly. Omar will call you on this number. Anything else I can help with tonight?" },
      { from: "system", text: "Lead scored 92/100 · Routed to Omar Al-Rashid · Briefing pack generated · Meeting booked in Salesforce" },
    ],
    capabilities: [
      "Qualifies against configurable criteria (budget, timeline, intent)",
      "Books meetings across rep calendars with time-zone handling",
      "Generates briefing packs from CRM and product data",
      "Hands off seamlessly with full conversation context",
    ],
    architecture: [
      { name: "Channels", tone: "teal", nodes: ["Web Chat", "WhatsApp", "Property Portals"] },
      { name: "Agent Reasoning", tone: "emerald", nodes: ["Qualification Topics", "Scheduling Actions", "Guardrails & Tone"] },
      { name: "Platform", tone: "navy", nodes: ["Sales Cloud", "Data Cloud", "Calendar Integration"] },
    ],
  },
  {
    id: "service-agent",
    name: "Service Agent",
    role: "Autonomous case resolution",
    description:
      "Resolves routine service requests end to end — authenticated, audited and escalating to humans exactly when policy requires.",
    scenario:
      "A logistics customer asks about a delayed shipment on WhatsApp.",
    conversation: [
      { from: "user", text: "Shipment TZK-88412 was due today. Where is it?" },
      { from: "agent", text: "Let me check that for you… TZK-88412 cleared Jebel Ali customs at 09:14 and is on vehicle DXB-214. Due to port congestion it's running about 5 hours behind — revised delivery is today between 6–8 pm. I've already notified the consignee." },
      { from: "user", text: "That's a problem, our warehouse closes at 7." },
      { from: "agent", text: "Understood. Two options: I can prioritise your stop for a 5:30–6:30 pm window, or reschedule to tomorrow 8–10 am at no charge. Which works better?" },
      { from: "user", text: "Tonight please, early as possible." },
      { from: "agent", text: "Done — TZK-88412 is now first drop on the evening route, ETA 5:45 pm. You'll get live tracking and a confirmation when the driver is 30 minutes away." },
      { from: "system", text: "Route re-sequenced via TMS · Case logged & resolved · CSAT survey scheduled" },
    ],
    capabilities: [
      "Live integration with operational systems (TMS, ERP, billing)",
      "Takes real actions within policy: rebooking, re-sequencing, refunds",
      "Proactive notifications on exceptions",
      "Escalates with full context when judgement is required",
    ],
    architecture: [
      { name: "Channels", tone: "teal", nodes: ["WhatsApp", "Portal", "Email"] },
      { name: "Agent Reasoning", tone: "emerald", nodes: ["Status Topics", "Rebooking Actions", "Escalation Policy"] },
      { name: "Platform", tone: "navy", nodes: ["Service Cloud", "MuleSoft → TMS", "Data Cloud"] },
    ],
  },
  {
    id: "knowledge-assistant",
    name: "Knowledge Assistant",
    role: "Grounded answers for employees",
    description:
      "Answers policy, product and procedure questions from your governed knowledge base — always with citations, never from guesswork.",
    scenario:
      "A bank branch officer checks a financing policy during a customer meeting.",
    conversation: [
      { from: "user", text: "Can a non-resident open a Murabaha auto financing agreement? Customer has UAE income but Qatar residency." },
      { from: "agent", text: "Yes, with conditions. Per Credit Policy 4.2.1 (updated March 2026): non-residents with verifiable UAE-sourced income are eligible for Murabaha auto financing up to 60% of vehicle value, subject to a salary transfer letter and 12-month statement. Standard resident terms allow 80%. Source: Retail Credit Policy Manual §4.2.1." },
      { from: "user", text: "Does the 60% cap apply to used vehicles too?" },
      { from: "agent", text: "For used vehicles the cap tightens to 50% for non-residents, and the vehicle must be under 5 years old at maturity (§4.2.3). Would you like the full eligibility checklist to share with the customer?" },
      { from: "user", text: "Yes please." },
      { from: "agent", text: "Here's the checklist as a PDF, generated from the current policy version. I've flagged that §4.2 is due for quarterly review on 1 August — answers after that date may change." },
      { from: "system", text: "All answers cited to governed sources · Policy version 2026.03 · Interaction logged for audit" },
    ],
    capabilities: [
      "Grounded exclusively in approved knowledge sources",
      "Citations on every answer, with version awareness",
      "Generates customer-ready documents from templates",
      "Full audit logging for regulated environments",
    ],
    architecture: [
      { name: "Access", tone: "teal", nodes: ["Slack", "Service Console", "Mobile"] },
      { name: "Agent Reasoning", tone: "emerald", nodes: ["Retrieval Grounding", "Citation Enforcement", "Freshness Checks"] },
      { name: "Knowledge", tone: "navy", nodes: ["Governed Knowledge Base", "Policy Library", "Data Cloud"] },
    ],
  },
  {
    id: "executive-assistant",
    name: "Executive Assistant",
    role: "Leadership intelligence on demand",
    description:
      "Gives executives direct answers about the business — pipeline, service, revenue — with the numbers and the 'why' behind them.",
    scenario:
      "A COO prepares for a board meeting from the back of a car.",
    conversation: [
      { from: "user", text: "How is Q3 pipeline looking against target?" },
      { from: "agent", text: "Q3 pipeline stands at AED 148M against a AED 130M target — 114% coverage. However, weighted pipeline is AED 96M (74%) because two mega-deals (Al Noor Group, AED 22M; Falcon Holdings, AED 14M) remain at proposal stage past their expected close reviews." },
      { from: "user", text: "What's blocking the Al Noor deal?" },
      { from: "agent", text: "Last activity 11 days ago. The account team notes procurement requested revised payment terms on 28 June; our counter-proposal is awaiting CFO approval — it's been in the approval queue for 4 days. That approval is the immediate blocker." },
      { from: "user", text: "Ping the CFO's office and flag it as urgent for me." },
      { from: "agent", text: "Done — I've escalated the approval in Slack with deal context, marked urgent, and copied you. I'll notify you the moment it's actioned. Anything else before your board session at 2 pm?" },
      { from: "system", text: "Approval escalated in Slack · Executive briefing updated · Follow-up reminder set" },
    ],
    capabilities: [
      "Direct answers over live CRM, service and finance data",
      "Explains movement: what changed, why, who owns it",
      "Takes actions: escalations, reminders, meeting prep",
      "Available in Slack and mobile — wherever leaders are",
    ],
    architecture: [
      { name: "Access", tone: "teal", nodes: ["Slack DM", "Mobile"] },
      { name: "Agent Reasoning", tone: "emerald", nodes: ["Analytics Topics", "Narrative Generation", "Action Framework"] },
      { name: "Data", tone: "navy", nodes: ["Data Cloud", "Sales & Service Cloud", "Tableau Semantics"] },
    ],
  },
  {
    id: "slack-ai",
    name: "Slack AI",
    role: "Intelligence in the flow of work",
    description:
      "Summaries, search and automation inside the channels where work already happens — no new tools to learn.",
    scenario:
      "A regional manager returns from leave to 400 unread messages.",
    conversation: [
      { from: "user", text: "Summarise what I missed in #ksa-operations this week." },
      { from: "agent", text: "Key items from #ksa-operations (4–10 July): 1) Riyadh DC go-live moved to 22 July after fit-out delays — approved by Khalid. 2) The NEOM logistics tender response was submitted Tuesday; decision expected in 3 weeks. 3) Two escalations closed, one open: cold-chain client reporting temperature variance — assigned to Fatima, SLA due tomorrow." },
      { from: "user", text: "What's the history on that cold-chain escalation?" },
      { from: "agent", text: "First raised 8 July, 14:22 by the client's ops lead. Sensor logs show variance on route RUH-JED only. Fatima's hypothesis: a faulty unit on vehicle KSA-31, which is now booked for inspection tomorrow 9 am. Client has been updated twice; tone is cooperative." },
      { from: "user", text: "Set a reminder for me at 11 am tomorrow to check the outcome." },
      { from: "agent", text: "Reminder set for 11:00 am tomorrow: 'Check KSA-31 inspection outcome and cold-chain escalation status.' I'll include a live status link." },
      { from: "system", text: "Thread summarised across 6 days · Reminder created · Escalation linked to Service Cloud case" },
    ],
    capabilities: [
      "Channel and thread summarisation on demand",
      "Enterprise search across conversations and connected apps",
      "Reminders, workflows and huddle notes",
      "Connected to Salesforce cases, deals and dashboards",
    ],
    architecture: [
      { name: "Workspace", tone: "teal", nodes: ["Channels", "Huddles", "Canvas"] },
      { name: "Intelligence", tone: "emerald", nodes: ["Slack AI Summaries", "AI Search", "Workflow Builder"] },
      { name: "Enterprise Data", tone: "navy", nodes: ["Salesforce", "Drive & Docs", "Data Cloud"] },
    ],
  },
];
