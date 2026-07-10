import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry } from "@/lib/data/industries";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { USE_CASES } from "@/lib/data/useCases";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const industry = getIndustry(params.slug);
  return { title: industry ? `${industry.name} Solutions` : "Industry" };
}

function OfferList({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
        {eyebrow}
      </p>
      <h3 className="mt-1 text-base font-bold text-navy-950">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  const relatedUseCases = USE_CASES.filter(
    (uc) => uc.industry === industry.name || (industry.slug === "financial-services" && uc.industry === "Financial Services")
  ).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`Industry solutions · ${industry.name}`}
        title={industry.headline}
        description={industry.summary}
      />

      {/* Challenges */}
      <section className="mx-auto max-w-container px-6 py-14">
        <SectionHeading eyebrow="The starting point" title="Industry challenges" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {industry.challenges.map((c) => (
            <div key={c} className="flex gap-3 rounded-lg border border-[var(--hairline)] bg-white p-4 text-sm text-[var(--ink-secondary)] shadow-sm">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden />
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* Opportunities */}
      <section className="border-y border-[var(--hairline)] bg-[var(--surface-tint)]">
        <div className="mx-auto max-w-container px-6 py-14">
          <SectionHeading
            eyebrow="The opportunity"
            title="What we build for this industry"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <OfferList eyebrow="Platform" title="Salesforce opportunities" items={industry.salesforce} />
            <OfferList eyebrow="Agentic AI" title="Agentforce opportunities" items={industry.agentforce} />
            <OfferList eyebrow="Flow of work" title="Slack workflows" items={industry.slack} />
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-container px-6 py-14">
        <SectionHeading eyebrow="The journey" title="AI roadmap" />
        <ol className="grid gap-4 md:grid-cols-3">
          {industry.roadmap.map((step, i) => (
            <li key={step.phase} className="relative rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
              <span className="absolute -top-3 left-6 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                {step.horizon}
              </span>
              <h3 className="mt-2 text-base font-bold text-navy-950">{step.phase}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">{step.focus}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Outcomes */}
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-container px-6 py-14">
          <SectionHeading eyebrow="The result" title="Expected outcomes" />
          <div className="grid gap-6 md:grid-cols-3">
            {industry.outcomes.map((o) => (
              <div key={o.metric} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="text-xl font-bold text-emerald-400">{o.metric}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy-100">{o.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related use cases + CTA */}
      <section className="mx-auto max-w-container px-6 py-14">
        {relatedUseCases.length > 0 && (
          <>
            <SectionHeading eyebrow="Go deeper" title="Related use cases" />
            <div className="mb-10 grid gap-4 md:grid-cols-3">
              {relatedUseCases.map((uc) => (
                <Link
                  key={uc.id}
                  href="/use-cases"
                  className="group rounded-xl border border-[var(--hairline)] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-700">
                    {uc.department}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-navy-950 group-hover:text-emerald-700">
                    {uc.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)]">{uc.value}</p>
                </Link>
              ))}
            </div>
          </>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-medium text-navy-950">
            See how this maps to your organisation — book an industry-specific
            discovery workshop.
          </p>
          <Link
            href="/contact"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Book a workshop
          </Link>
        </div>
      </section>
    </>
  );
}
