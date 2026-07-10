import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import RoiCalculator from "./RoiCalculator";

export const metadata: Metadata = {
  title: "Agentforce ROI Calculator",
  description:
    "Model the savings, revenue uplift, time saved and payback period of deploying Agentforce in your organisation.",
};

export default function RoiPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive calculator"
        title="Agentforce ROI Calculator"
        description="Enter your operating numbers and see estimated savings, revenue uplift, capacity released and payback period — using the same model we build business cases with. All figures are directional estimates for discussion, refined during a Design phase."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <RoiCalculator />
      </section>
    </>
  );
}
