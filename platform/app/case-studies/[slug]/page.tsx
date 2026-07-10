import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy } from "@/lib/data/caseStudies";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ArchitectureDiagram from "@/components/diagrams/ArchitectureDiagram";
import Badge from "@/components/ui/Badge";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cs = getCaseStudy(params.slug);
  return { title: cs ? cs.title : "Case study" };
}

function NarrativeBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-navy-950">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  return (
    <>
      <PageHeader eyebrow={`Case study · ${cs.industry}`} title={cs.title} description={cs.summary}>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="navy">{cs.client}</Badge>
          {cs.services.map((s) => (
            <Badge key={s} tone="teal">{s}</Badge>
          ))}
        </div>
      </PageHeader>

      {/* Outcomes strip */}
      <section className="border-b border-[var(--hairline)] bg-navy-950">
        <div className="mx-auto grid max-w-container grid-cols-2 gap-px px-6 py-10 md:grid-cols-4">
          {cs.outcomes.map((o) => (
            <div key={o.label} className="p-4 text-center">
              <p className="text-3xl font-bold tracking-tight text-emerald-400">{o.metric}</p>
              <p className="mt-1 text-xs leading-snug text-navy-200">{o.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-container px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <NarrativeBlock title="The business challenge" items={cs.challenge} />
          <NarrativeBlock title="Our approach" items={cs.approach} />
        </div>
      </section>

      <section className="border-y border-[var(--hairline)] bg-[var(--surface-tint)]">
        <div className="mx-auto max-w-container px-6 py-14">
          <SectionHeading eyebrow="Under the hood" title="Solution architecture" />
          <div className="grid gap-10 lg:grid-cols-2">
            <ArchitectureDiagram layers={cs.architecture} />
            <NarrativeBlock title="The solution in practice" items={cs.solution} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-container px-6 py-14">
        <SectionHeading
          eyebrow="What we learned"
          title="Lessons learned"
          description="We publish lessons because they're the most valuable part of any engagement — yours will be different, but these patterns repeat."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {cs.lessons.map((lesson, i) => (
            <div key={lesson} className="rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-sm font-bold text-gold-800">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">{lesson}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-medium text-navy-950">
            Facing a similar challenge? Let's compare notes.
          </p>
          <div className="flex gap-3">
            <Link href="/case-studies" className="rounded-lg border border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100">
              More case studies
            </Link>
            <Link href="/contact" className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
