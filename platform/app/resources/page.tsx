import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ResourceCentre from "./ResourceCentre";

export const metadata: Metadata = {
  title: "Resource Centre",
  description:
    "Articles, guides, frameworks, whitepapers and workshop templates from Tazkia Intelligence.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resource centre"
        title="The thinking behind the platform"
        description="Frameworks, guides, whitepapers and workshop templates — the same materials we use in engagements, made available so you can start before we ever meet."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <ResourceCentre />
      </section>
    </>
  );
}
