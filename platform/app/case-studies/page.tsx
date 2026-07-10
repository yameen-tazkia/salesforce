import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import { CASE_STUDIES } from "@/lib/data/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "AI transformation stories with measured outcomes — challenge, approach, architecture, solution and lessons learned.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Transformation stories, measured honestly"
        description="Every case study follows the same discipline as our delivery: the business challenge, the approach, the architecture, the solution — and the outcomes and lessons, including what we'd do differently."
      />
      <section className="mx-auto max-w-container px-6 py-14">
        <div className="space-y-8">
          {CASE_STUDIES.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group grid gap-6 rounded-2xl border border-[var(--hairline)] bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg md:grid-cols-[1fr_280px]"
            >
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <Badge tone="navy">{cs.industry}</Badge>
                  <Badge tone="neutral">{cs.client}</Badge>
                </div>
                <h2 className="text-xl font-bold text-navy-950 group-hover:text-emerald-700 md:text-2xl">
                  {cs.title}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-[var(--ink-secondary)]">
                  {cs.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  Read the case study
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="grid grid-cols-2 content-center gap-3">
                {cs.outcomes.slice(0, 4).map((o) => (
                  <div key={o.label} className="rounded-lg bg-[var(--surface-tint)] p-3 text-center">
                    <p className="text-lg font-bold text-emerald-700">{o.metric}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-[var(--ink-muted)]">{o.label}</p>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
