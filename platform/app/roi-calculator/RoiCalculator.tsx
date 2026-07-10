"use client";

import { useMemo, useState } from "react";
import KpiWidget from "@/components/ui/KpiWidget";
import DonutChart from "@/components/charts/DonutChart";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";

type Inputs = {
  users: number;
  casesPerMonth: number;
  salesReps: number;
  serviceSalary: number;
  salesSalary: number;
  handlingMinutes: number;
  leadsPerMonth: number;
  conversionPct: number;
  dealValue: number;
  automationPct: number;
};

const DEFAULTS: Inputs = {
  users: 120,
  casesPerMonth: 8000,
  salesReps: 25,
  serviceSalary: 120000,
  salesSalary: 180000,
  handlingMinutes: 9,
  leadsPerMonth: 1500,
  conversionPct: 4,
  dealValue: 25000,
  automationPct: 50,
};

const PRODUCTIVE_HOURS_PER_FTE = 1760;
// Conservative relative conversion uplift on AI-engaged leads (instant response, no lead left cold).
const CONVERSION_UPLIFT = 0.15;
const GROSS_MARGIN = 0.35;

function Field({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-navy-900">{label}</span>
        {suffix && <span className="text-xs text-[var(--ink-muted)]">{suffix}</span>}
      </span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full rounded-lg border border-[var(--hairline)] bg-white px-3 py-2.5 text-sm font-semibold tabular-nums text-navy-950 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
      {hint && <span className="mt-1 block text-xs text-[var(--ink-muted)]">{hint}</span>}
    </label>
  );
}

export default function RoiCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [currency, setCurrency] = useState("AED");

  const set = (key: keyof Inputs) => (v: number) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  const r = useMemo(() => {
    const automation = Math.min(95, Math.max(0, inputs.automationPct)) / 100;

    // Service economics
    const automatedCasesYr = inputs.casesPerMonth * 12 * automation;
    const hoursSaved = (automatedCasesYr * inputs.handlingMinutes) / 60;
    const fteReleased = hoursSaved / PRODUCTIVE_HOURS_PER_FTE;
    const serviceSavings = fteReleased * inputs.serviceSalary;

    // Sales economics — agents engage leads instantly on the automated share
    const engagedLeadsYr = inputs.leadsPerMonth * 12 * automation;
    const incrementalDeals =
      engagedLeadsYr * (inputs.conversionPct / 100) * CONVERSION_UPLIFT;
    const revenueUplift = incrementalDeals * inputs.dealValue;
    const upliftMargin = revenueUplift * GROSS_MARGIN;

    // Sales productivity: reps get ~4 hrs/week back from prep & admin agents
    const repHoursSaved = inputs.salesReps * 4 * 46;
    const repCapacityValue =
      (repHoursSaved / PRODUCTIVE_HOURS_PER_FTE) * inputs.salesSalary;

    const annualBenefit = serviceSavings + upliftMargin + repCapacityValue;

    // Investment model: implementation (one-off) + platform & usage (annual)
    const implementation = 350000 + inputs.users * 800;
    const annualRun = inputs.users * 1400 + automatedCasesYr * 1.5;
    const firstYearInvestment = implementation + annualRun;

    const roiPct =
      firstYearInvestment > 0
        ? ((annualBenefit - annualRun) / firstYearInvestment) * 100
        : 0;
    const monthlyBenefit = annualBenefit / 12;
    const monthlyRun = annualRun / 12;
    const net = monthlyBenefit - monthlyRun;
    const paybackMonths = net > 0 ? implementation / net : Infinity;

    // 24-month cumulative net position (benefit ramps over first 4 months)
    const cumulative: number[] = [];
    let acc = -implementation;
    for (let m = 1; m <= 24; m++) {
      const ramp = Math.min(1, m / 4);
      acc += monthlyBenefit * ramp - monthlyRun;
      cumulative.push(Math.round(acc));
    }

    return {
      automation,
      automatedCasesYr,
      hoursSaved,
      fteReleased,
      serviceSavings,
      revenueUplift,
      upliftMargin,
      repCapacityValue,
      annualBenefit,
      implementation,
      annualRun,
      roiPct,
      paybackMonths,
      cumulative,
    };
  }, [inputs]);

  const fmt = (v: number) =>
    `${currency} ${Math.round(v).toLocaleString("en-US")}`;
  const fmtShort = (v: number) =>
    Math.abs(v) >= 1_000_000
      ? `${(v / 1_000_000).toFixed(1)}M`
      : Math.abs(v) >= 1_000
        ? `${Math.round(v / 1_000)}k`
        : `${Math.round(v)}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
      {/* Inputs */}
      <div className="h-fit rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-950">Your numbers</h2>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-lg border border-[var(--hairline)] px-2 py-1.5 text-xs font-semibold text-navy-900"
            aria-label="Currency"
          >
            {["AED", "SAR", "QAR", "USD"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="space-y-4">
          <Field label="Current CRM users" value={inputs.users} onChange={set("users")} />
          <Field label="Service cases per month" value={inputs.casesPerMonth} onChange={set("casesPerMonth")} />
          <Field label="Average handling time" suffix="minutes" value={inputs.handlingMinutes} onChange={set("handlingMinutes")} />
          <Field label="Average service salary" suffix={`${currency}/year`} value={inputs.serviceSalary} onChange={set("serviceSalary")} />
          <Field label="Sales reps" value={inputs.salesReps} onChange={set("salesReps")} />
          <Field label="Average sales salary" suffix={`${currency}/year`} value={inputs.salesSalary} onChange={set("salesSalary")} />
          <Field label="Leads per month" value={inputs.leadsPerMonth} onChange={set("leadsPerMonth")} />
          <Field label="Current lead conversion" suffix="%" value={inputs.conversionPct} onChange={set("conversionPct")} step={0.5} />
          <Field label="Average deal value" suffix={currency} value={inputs.dealValue} onChange={set("dealValue")} />
          <div>
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-sm font-medium text-navy-900">Expected AI automation</span>
              <span className="text-sm font-bold tabular-nums text-emerald-700">{inputs.automationPct}%</span>
            </span>
            <input
              type="range"
              min={10}
              max={90}
              step={5}
              value={inputs.automationPct}
              onChange={(e) => set("automationPct")(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
              aria-label="Expected AI automation percentage"
            />
            <span className="mt-1 block text-xs text-[var(--ink-muted)]">
              Share of cases and leads handled by AI agents. 40–60% is typical
              within the first year.
            </span>
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiWidget label="Estimated annual savings" value={Math.round(r.serviceSavings + r.repCapacityValue)} prefix={`${currency} `} caption="Service containment + rep capacity released" tone="emerald" />
          <KpiWidget label="Revenue uplift" value={Math.round(r.revenueUplift)} prefix={`${currency} `} caption={`From faster lead engagement (${GROSS_MARGIN * 100}% margin counted in ROI)`} tone="gold" />
          <KpiWidget label="Time saved" value={Math.round(r.hoursSaved)} suffix=" hrs/yr" caption="Service handling time automated" tone="teal" />
          <KpiWidget label="Capacity released" value={r.fteReleased} decimals={1} suffix=" FTE" caption="Redeployable to higher-value work" tone="navy" />
          <KpiWidget label="First-year ROI" value={Math.max(-100, Math.round(r.roiPct))} suffix="%" caption="Net benefit over total first-year investment" tone="emerald" />
          <KpiWidget
            label="Payback period"
            value={Number.isFinite(r.paybackMonths) ? Math.round(r.paybackMonths * 10) / 10 : 0}
            decimals={1}
            suffix=" months"
            caption={Number.isFinite(r.paybackMonths) ? "Time to recover implementation cost" : "Not reached with current inputs"}
            tone="gold"
          />
        </div>

        <div className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
          <LineChart
            title="Cumulative net position over 24 months"
            labels={Array.from({ length: 24 }, (_, i) => `M${i + 1}`)}
            series={[
              {
                name: "Cumulative net benefit",
                color: "var(--series-1)",
                values: r.cumulative,
              },
            ]}
            formatValue={(v) => `${currency} ${fmtShort(v)}`}
          />
          <p className="mt-3 text-xs text-[var(--ink-muted)]">
            Starts at –{fmt(r.implementation)} (implementation), ramping to full
            benefit by month 4. Crossing zero marks payback.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
            <DonutChart
              title="Case handling mix after AI"
              centerValue={`${Math.round(r.automation * 100)}%`}
              centerLabel="AI-resolved"
              slices={[
                { label: "Resolved by AI agents", value: r.automation * 100, color: "var(--series-1)" },
                { label: "Handled by your team", value: (1 - r.automation) * 100, color: "var(--series-4)" },
              ]}
            />
          </div>
          <div className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
            <BarChart
              title="Where the annual benefit comes from"
              bars={[
                { label: "Service cost savings", value: r.serviceSavings, valueLabel: fmt(r.serviceSavings) },
                { label: "Sales capacity released", value: r.repCapacityValue, valueLabel: fmt(r.repCapacityValue) },
                { label: "Margin on revenue uplift", value: r.upliftMargin, valueLabel: fmt(r.upliftMargin) },
              ]}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gold-200 bg-gold-50 p-6">
          <h3 className="text-sm font-bold text-gold-900">Model assumptions</h3>
          <ul className="mt-2 space-y-1 text-xs leading-relaxed text-gold-900/80">
            <li>• {PRODUCTIVE_HOURS_PER_FTE.toLocaleString()} productive hours per FTE per year; capacity is redeployed, not necessarily reduced.</li>
            <li>• {CONVERSION_UPLIFT * 100}% relative conversion uplift on AI-engaged leads; {GROSS_MARGIN * 100}% gross margin counted toward ROI.</li>
            <li>• Sales reps regain ~4 hours/week from briefing and admin agents.</li>
            <li>• Investment: one-off implementation ({fmt(r.implementation)}) plus annual platform &amp; usage ({fmt(r.annualRun)}).</li>
            <li>• Directional estimates for discussion — we validate every figure against your actuals in the Design phase.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
