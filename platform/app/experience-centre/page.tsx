import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ExperienceCentre from "./ExperienceCentre";

export const metadata: Metadata = {
  title: "Agentforce Experience Centre",
  description:
    "Interactive demonstrations of Agentforce agents — sales, service, knowledge, executive and Slack AI — with workflow examples and architecture diagrams.",
};

export default function ExperienceCentrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience centre"
        title="See Agentforce think, act and hand off"
        description="Five agents, five real scenarios. Play each conversation to watch how an agent qualifies, resolves, cites, escalates — and where the human stays in the loop. Then inspect the architecture behind it."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <ExperienceCentre />
      </section>
    </>
  );
}
