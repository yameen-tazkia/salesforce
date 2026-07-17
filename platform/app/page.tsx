import Link from "next/link";
import KpiWidget from "@/components/ui/KpiWidget";
import SectionHeading from "@/components/ui/SectionHeading";
import { InteractiveCard } from "@/components/ui/Card";
import { NAV_ITEMS } from "@/lib/nav";
import { INDUSTRIES } from "@/lib/data/industries";

const INSIGHTS = [
  {
    tag: "Agentforce",
    title: "Agentic AI moves from pilots to production across the GCC",
    summary:
      "Enterprises are shifting budget from experimentation to governed, autonomous agents on revenue and service journeys.",
  },
  {
    tag: "Governance",
    title: "Regulators reward auditability, not caution",
    summary:
      "The organisations scaling fastest in regulated sectors designed their audit trail first — and unlocked scope others are still negotiating.",
  },
  {
    tag: "Adoption",
    title: "The 90-day window decides AI ROI",
    summary:
      "Deployments with structured adoption programmes achieve 3× the sustained usage of technically identical deployments without one.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(700px 420px at 85% -10%, rgba(12,130,89,0.45), transparent 60%), radial-gradient(560px 380px at -5% 30%, rgba(14,148,174,0.25), transparent 60%), radial-gradient(480px 300px at 70% 110%, rgba(184,134,11,0.18), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-container px-6 py-20 md:py-28">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden />
            The Tazkia Intelligence Platform
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Practical AI transformation for the{" "}
            <span className="text-emerald-400">Gulf enterprise</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            We help organisations across the Gulf and wider Muslim world adopt
            practical AI through Salesforce, Agentforce, Slack and intelligent
            automation — with governance, adoption and measured value built in
            from day one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/ai-navigator"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-500"
            >
              Launch the AI Navigator™
            </Link>
            <Link
              href="/framework"
              className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore Our Framework
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm text-navy-200">
            Our flagship guided consultation — fifteen minutes with a digital
            senior advisor, ending in a board-ready AI transformation
            blueprint.
          </p>
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-navy-300">
            Primary markets · UAE · Saudi Arabia · Qatar &nbsp;&nbsp;|&nbsp;&nbsp;
            Expanding · Malaysia · Indonesia
          </p>
        </div>
      </section>

      {/* KPI band */}
      <section className="border-b border-[var(--hairline)] bg-[var(--surface-tint)]">
        <div className="mx-auto max-w-container px-6 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiWidget label="Industries served" value={10} caption="Deep vertical expertise across the region" tone="emerald" />
            <KpiWidget label="AI use cases catalogued" value={24} suffix="+" caption="Practical, deliverable and measured" tone="teal" />
            <KpiWidget label="Typical pilot duration" value={6} suffix=" wks" caption="From kickoff to measured value" tone="gold" />
            <KpiWidget label="Framework phases" value={8} caption="Discover through Managed AI Services" tone="navy" />
          </div>
        </div>
      </section>

      {/* Business overview */}
      <section className="mx-auto max-w-container px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="Who we are"
          title="An AI-native partner, not a traditional consultancy"
          description="Tazkia Intelligence pairs enterprise delivery discipline with deep Salesforce, Agentforce and Slack expertise. We design AI that your regulators can audit, your teams will adopt and your CFO can measure."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Advisory grounded in delivery",
              body: "Every recommendation we make is one we have implemented. Strategy, architecture and build come from the same team.",
            },
            {
              title: "Regional by design",
              body: "Arabic-first experiences, data residency, national AI strategies and Islamic finance awareness are built into our method — not retrofitted.",
            },
            {
              title: "Value you can audit",
              body: "Every engagement carries a business case, a measurement plan and quarterly value reviews against actuals.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm shadow-navy-950/[0.03]">
              <span className="mb-4 block h-1 w-10 rounded-full bg-gold-500" aria-hidden />
              <h3 className="text-base font-semibold text-navy-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest insights */}
      <section className="border-y border-[var(--hairline)] bg-[var(--surface-tint)]">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <SectionHeading
            eyebrow="Latest AI insights"
            title="What we're telling clients this quarter"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {INSIGHTS.map((insight) => (
              <article key={insight.title} className="rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm shadow-navy-950/[0.03]">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  {insight.tag}
                </p>
                <h3 className="text-base font-semibold leading-snug text-navy-950">
                  {insight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {insight.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industry focus */}
      <section className="mx-auto max-w-container px-6 py-16 md:py-20">
        <SectionHeading
          eyebrow="Industry focus"
          title="Deep expertise where the region is investing"
          description="Every industry blueprint pairs Salesforce and Agentforce opportunities with Slack workflows, an AI roadmap and expected outcomes."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-xl border border-[var(--hairline)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
            >
              <h3 className="text-sm font-semibold text-navy-950 group-hover:text-emerald-700">
                {industry.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--ink-muted)]">
                {industry.headline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick navigation */}
      <section className="border-t border-[var(--hairline)] bg-[var(--surface-tint)]">
        <div className="mx-auto max-w-container px-6 py-16 md:py-20">
          <SectionHeading
            eyebrow="Explore the platform"
            title="Interactive tools, not brochureware"
            description="Assess your readiness, model your ROI and experience Agentforce — before a single sales conversation."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NAV_ITEMS.filter((i) => i.href !== "/contact").map((item) => (
              <InteractiveCard
                key={item.href}
                href={item.href}
                title={item.label}
                description={item.description}
                meta={item.group}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-800 text-white">
        <div className="mx-auto flex max-w-container flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to see what practical AI looks like for you?
            </h2>
            <p className="mt-2 max-w-xl text-emerald-100">
              Book a discovery workshop and leave with a prioritised opportunity
              map — whatever you decide next.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            Book a Discovery Workshop
          </Link>
        </div>
      </section>
    </>
  );
}
