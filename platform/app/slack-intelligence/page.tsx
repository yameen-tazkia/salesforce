import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import WorkflowExplorer from "./WorkflowExplorer";

export const metadata: Metadata = {
  title: "Slack Workflow Intelligence",
  description:
    "Interactive Slack workflows for sales, service, approvals, executive reporting, alerts, knowledge search and customer escalations.",
};

export default function SlackIntelligencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Slack workflow intelligence"
        title="Work moves faster where work already happens"
        description="Approvals, escalations, alerts and executive reporting belong in the flow of work — not in email chains and stale decks. Step through each workflow to see how Slack, Agentforce and Salesforce operate as one system."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <WorkflowExplorer />
      </section>
    </>
  );
}
