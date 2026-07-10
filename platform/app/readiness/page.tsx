import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ReadinessAssessment from "./ReadinessAssessment";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "Score your organisation across six AI readiness dimensions and receive an executive summary, recommendations and roadmap.",
};

export default function ReadinessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive assessment"
        title="AI Readiness Assessment"
        description="Eighteen questions across six dimensions — technology, data, governance, people, processes and departments. Answer honestly; the value is in the gaps. Your results include a radar profile, scorecards, an executive summary and a recommended roadmap."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <ReadinessAssessment />
      </section>
    </>
  );
}
