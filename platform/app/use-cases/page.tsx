import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import UseCaseLibrary from "./UseCaseLibrary";

export const metadata: Metadata = {
  title: "Use Case Library",
  description:
    "A searchable database of practical AI use cases — filter by industry, department, technology and business objective.",
};

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use case library"
        title="Practical AI use cases, not science projects"
        description="Every use case here has a problem, a solution, an effort estimate and a value statement — because that's the bar an investment decision needs. Search and filter to find the ones that fit your organisation."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <UseCaseLibrary />
      </section>
    </>
  );
}
