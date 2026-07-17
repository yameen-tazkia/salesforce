import type { Industry } from "@/modules/core/taxonomy";

/**
 * Industry playbooks: consulting knowledge encoded as data.
 * The briefing generator combines these with account-specific evidence.
 */

export interface IndustryPlaybook {
  painPoints: string[];
  agentforceOpportunities: string[];
  slackOpportunities: string[];
  pilotIdeas: string[];
}

export const INDUSTRY_PLAYBOOKS: Record<Industry, IndustryPlaybook> = {
  "Real Estate": {
    painPoints: [
      "Lead leakage between brokers, portals and direct channels",
      "Slow response to off-plan enquiries in peak launch windows",
      "Post-handover service requests overwhelming community teams",
      "Fragmented buyer/tenant data across sales, leasing and facilities",
    ],
    agentforceOpportunities: [
      "24/7 multilingual sales concierge qualifying and booking viewings",
      "Post-handover service agent for snagging, amenities and payments",
      "Broker-support agent answering commission, inventory and process queries",
    ],
    slackOpportunities: [
      "Launch war-rooms connecting sales, CRM and inventory teams",
      "Deal-desk channels with CRM-driven alerts on hot leads",
    ],
    pilotIdeas: [
      "Agentforce sales concierge on two flagship launches, measured on response time and qualified viewings",
      "Community-services agent pilot for one master community, measured on case deflection",
    ],
  },
  "Luxury Retail": {
    painPoints: [
      "Clienteling knowledge trapped in individual sales associates",
      "Loyalty engagement plateauing outside promotional periods",
      "Fragmented customer identity across brands and channels",
      "High-value clients expect Arabic/English concierge-grade service",
    ],
    agentforceOpportunities: [
      "AI personal-shopper agent across web, app and WhatsApp",
      "VIP concierge agent for appointments, alterations and aftercare",
      "Associate copilot surfacing client history and next-best-offer in store",
    ],
    slackOpportunities: [
      "Store-to-HQ merchandising and VIP-alert workflows",
      "Cross-brand campaign coordination with CRM-triggered notifications",
    ],
    pilotIdeas: [
      "Agentforce personal shopper for one flagship brand, measured on conversion and AOV",
      "Data Cloud identity resolution pilot across two brands' loyalty bases",
    ],
  },
  Hospitality: {
    painPoints: [
      "OTA dependency compressing margins on direct bookings",
      "Guest requests handled by phone/email with no unified profile",
      "Seasonal demand spikes overwhelm reservations and concierge teams",
      "Loyalty programmes under-personalised relative to guest data held",
    ],
    agentforceOpportunities: [
      "Booking-and-upsell agent on web/WhatsApp driving direct revenue",
      "In-stay concierge agent for requests, dining and itineraries",
      "Post-stay win-back agent triggered by loyalty lifecycle events",
    ],
    slackOpportunities: [
      "Property ops channels wired to guest-case escalations",
      "Group-wide revenue-management coordination",
    ],
    pilotIdeas: [
      "Direct-booking concierge on two properties, measured on OTA displacement",
      "Arabic/English in-stay request agent, measured on request resolution time",
    ],
  },
  Government: {
    painPoints: [
      "High-volume citizen enquiries handled manually across channels",
      "Service-level mandates (digital-first, zero-visit) with legacy tooling",
      "Arabic-first conversational quality is a hard requirement",
      "Case backlogs and duplicate requests across departments",
    ],
    agentforceOpportunities: [
      "Bilingual citizen-service agent for permits, status and payments",
      "Internal case-triage agent routing and summarising citizen requests",
      "Proactive notification agent for renewals and expiring documents",
    ],
    slackOpportunities: [
      "Inter-department case-resolution swarms with full audit trail",
      "Emergency-response coordination workflows",
    ],
    pilotIdeas: [
      "Tier-1 enquiry agent for the top 20 service types, measured on containment",
      "Case-summarisation copilot for service-centre staff",
    ],
  },
  Banking: {
    painPoints: [
      "Cost-to-income pressure with rising service volumes",
      "Chatbot containment plateaus well below automation targets",
      "Compliance constraints slow AI adoption without a trust layer",
      "Relationship managers burdened by administrative work",
    ],
    agentforceOpportunities: [
      "Card-dispute and payments-enquiry agents with core-banking actions",
      "Onboarding and KYC-document guidance agent",
      "RM copilot preparing briefs, next-best-actions and meeting summaries",
    ],
    slackOpportunities: [
      "Deal-team collaboration for corporate banking with CRM context",
      "Incident and fraud-alert response channels",
    ],
    pilotIdeas: [
      "Two-agent pilot (disputes + onboarding FAQs) with human-in-the-loop review",
      "RM briefing copilot for the priority-client desk",
    ],
  },
  "Financial Services": {
    painPoints: [
      "Quote-to-bind friction across broker and direct channels",
      "Renewal leakage from unpersonalised, manual outreach",
      "Advisors spend more time on admin than clients",
      "Regulatory reporting burden on client-facing teams",
    ],
    agentforceOpportunities: [
      "Quote-and-renewal agent for brokers and direct customers",
      "Claims first-notice-of-loss agent with status tracking",
      "Advisor copilot for portfolio summaries and meeting prep",
    ],
    slackOpportunities: [
      "Underwriting referral swarms with document context",
      "Claims escalation channels with SLA tracking",
    ],
    pilotIdeas: [
      "FNOL agent for one product line, measured on cycle time",
      "Renewal-retention agent pilot on a single book of business",
    ],
  },
  Logistics: {
    painPoints: [
      "WISMO (where-is-my-order) calls dominate contact volume",
      "Exception handling is manual and SLA-threatening",
      "Field workforce disconnected from customer commitments",
      "B2B clients demand portal self-service and live tracking",
    ],
    agentforceOpportunities: [
      "WISMO deflection agent across WhatsApp, web and voice",
      "Exception-resolution agent proposing re-delivery options",
      "Dispatcher copilot for field-service scheduling",
    ],
    slackOpportunities: [
      "Control-tower channels for exception swarms",
      "Driver-support workflows with automated escalation",
    ],
    pilotIdeas: [
      "WISMO agent for top 3 enquiry types, measured on deflection rate",
      "Field Service + Agentforce scheduling pilot in one region",
    ],
  },
  Healthcare: {
    painPoints: [
      "Appointment no-shows and call-centre abandonment",
      "Patient journeys fragmented across booking, billing and clinical systems",
      "Multilingual patient communication handled ad hoc",
      "Referral leakage between facilities",
    ],
    agentforceOpportunities: [
      "Appointment booking/rescheduling agent with reminder journeys",
      "Patient-access agent for insurance, pricing and preparation queries",
      "Post-discharge follow-up agent with escalation to care teams",
    ],
    slackOpportunities: [
      "Care-coordination channels for multidisciplinary teams",
      "Bed-management and transfer coordination",
    ],
    pilotIdeas: [
      "Booking agent for two high-volume specialities, measured on no-show rate",
      "Patient-access agent pilot on the main call-centre line",
    ],
  },
  Telecommunications: {
    painPoints: [
      "High-volume prepaid/postpaid care with thin margins",
      "Churn driven by slow issue resolution",
      "Legacy CRM constrains omni-channel service",
      "Enterprise quoting is slow and error-prone",
    ],
    agentforceOpportunities: [
      "Billing and plan-change agent across app and messaging",
      "Network-issue triage agent with proactive outage comms",
      "B2B quoting copilot on CPQ",
    ],
    slackOpportunities: [
      "Network-incident bridges with automated status updates",
      "Enterprise deal-desk collaboration",
    ],
    pilotIdeas: [
      "Care agent for top 10 billing intents, measured on containment",
      "CPQ quoting copilot for the enterprise segment",
    ],
  },
  Aviation: {
    painPoints: [
      "Disruption events create massive synchronous contact spikes",
      "Multilingual guest base across dozens of markets",
      "Loyalty members expect recognition at every touchpoint",
      "Average handle time pressure on 24/7 contact centres",
    ],
    agentforceOpportunities: [
      "Disruption rebooking agent handling IRROPS at scale",
      "Baggage and special-service request agents",
      "Loyalty servicing agent for upgrades, miles and status",
    ],
    slackOpportunities: [
      "IRROPS command-centre coordination",
      "Station-ops to contact-centre handoffs",
    ],
    pilotIdeas: [
      "WhatsApp rebooking agent for one disruption scenario class",
      "Loyalty-servicing agent for top-tier members",
    ],
  },
  Construction: {
    painPoints: [
      "Bid and subcontractor management run on spreadsheets and email",
      "Client reporting is manual and inconsistent",
      "Snagging and defect workflows leak between systems",
      "Limited customer-facing digital experience",
    ],
    agentforceOpportunities: [
      "Bid-status and document-request agent for clients and partners",
      "Subcontractor onboarding and compliance agent",
      "Defect-reporting agent for handover phases",
    ],
    slackOpportunities: [
      "Project-site coordination channels with RFI workflows",
      "Safety-incident reporting and escalation",
    ],
    pilotIdeas: [
      "Client-portal agent for one flagship project",
      "Subcontractor compliance agent pilot",
    ],
  },
};
