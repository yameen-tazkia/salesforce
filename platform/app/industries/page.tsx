import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { InteractiveCard } from "@/components/ui/Card";
import { INDUSTRIES } from "@/lib/data/industries";

export const metadata: Metadata = {
  title: "Industry Solutions",
  description:
    "Salesforce, Agentforce and Slack blueprints for the industries shaping the Gulf economy.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industry solutions"
        title="Blueprints for the industries shaping the region"
        description="Each blueprint covers the industry's real challenges, the Salesforce and Agentforce opportunities that address them, Slack workflows, a phased AI roadmap and the outcomes you should expect."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <InteractiveCard
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              title={industry.name}
              description={industry.summary}
              meta={industry.headline}
            />
          ))}
        </div>
      </section>
    </>
  );
}
