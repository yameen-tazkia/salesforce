import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import FrameworkJourney from "./FrameworkJourney";

export const metadata: Metadata = {
  title: "AI Transformation Framework",
  description:
    "The Tazkia AI Transformation Framework — an eight-phase journey from Discover to Managed AI Services.",
};

export default function FrameworkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Methodology"
        title="The Tazkia AI Transformation Framework"
        description="Eight phases from first conversation to long-term partnership. Click any phase to explore its objectives, activities, deliverables and the business outcomes it produces."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <FrameworkJourney />
      </section>
    </>
  );
}
