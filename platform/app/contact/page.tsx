import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery workshop, an AI readiness assessment or request a pilot programme with Tazkia Intelligence.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engage"
        title="Start with a conversation that produces something"
        description="Every engagement option below ends with a concrete deliverable — an opportunity map, a readiness scorecard or a working pilot. Choose where you'd like to begin."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <Suspense>
          <ContactForm />
        </Suspense>
      </section>
    </>
  );
}
