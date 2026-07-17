export type NavItem = {
  label: string;
  href: string;
  description: string;
  group: "Advise" | "Explore" | "Experience" | "Engage";
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "AI Navigator™",
    href: "/ai-navigator",
    description:
      "Our flagship guided consultation — scores, roadmap and business case",
    group: "Advise",
  },
  {
    label: "Transformation Framework",
    href: "/framework",
    description: "Our eight-phase AI transformation methodology",
    group: "Advise",
  },
  {
    label: "AI Readiness Assessment",
    href: "/readiness",
    description: "Score your organisation across six readiness dimensions",
    group: "Advise",
  },
  {
    label: "Agentforce ROI Calculator",
    href: "/roi-calculator",
    description: "Model savings, uplift and payback for AI agents",
    group: "Advise",
  },
  {
    label: "AI Opportunity Assessment",
    href: "/opportunities",
    description: "Industry-specific opportunity mapping and prioritisation",
    group: "Advise",
  },
  {
    label: "Industry Solutions",
    href: "/industries",
    description: "Salesforce, Agentforce and Slack blueprints by industry",
    group: "Explore",
  },
  {
    label: "Use Case Library",
    href: "/use-cases",
    description: "A searchable database of practical AI use cases",
    group: "Explore",
  },
  {
    label: "Agentforce Experience Centre",
    href: "/experience-centre",
    description: "Interactive agent demonstrations and architectures",
    group: "Experience",
  },
  {
    label: "Slack Workflow Intelligence",
    href: "/slack-intelligence",
    description: "Step-through intelligent Slack workflows",
    group: "Experience",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Transformation stories with measured outcomes",
    group: "Engage",
  },
  {
    label: "Resource Centre",
    href: "/resources",
    description: "Frameworks, guides, whitepapers and templates",
    group: "Engage",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Book a workshop, assessment or pilot programme",
    group: "Engage",
  },
];
