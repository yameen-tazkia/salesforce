import type { Metadata } from "next";
import AiNavigator from "./AiNavigator";

export const metadata: Metadata = {
  title: "Tazkia AI Navigator™",
  description:
    "A guided AI consultation — assess your Salesforce, data, Slack and Agentforce readiness and receive a board-ready transformation blueprint with scores, roadmap and business case.",
};

export default function AiNavigatorPage() {
  return <AiNavigator />;
}
