import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import OpportunityExplorer from "./OpportunityExplorer";

export const metadata: Metadata = {
  title: "AI Opportunity Assessment",
  description:
    "Select your industry to see departments, challenges, AI opportunities, quick wins, a prioritisation matrix and a long-term roadmap.",
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive workshop output"
        title="AI Opportunity Assessment"
        description="This is the shape of output our discovery workshops produce. Select your industry to explore the typical departments, business challenges and AI opportunities we map — including quick wins, a prioritisation matrix and a phased roadmap you can download."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <OpportunityExplorer />
      </section>
    </>
  );
}
