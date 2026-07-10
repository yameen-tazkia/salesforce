"use client";

import { useState } from "react";
import Link from "next/link";
import { RESOURCES } from "@/lib/data/resources";
import Badge from "@/components/ui/Badge";

const TYPES = ["All", "Article", "Guide", "Framework", "Whitepaper", "Template"] as const;

const TYPE_TONES: Record<string, "emerald" | "navy" | "gold" | "teal" | "neutral"> = {
  Article: "teal",
  Guide: "emerald",
  Framework: "navy",
  Whitepaper: "gold",
  Template: "neutral",
};

export default function ResourceCentre() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");

  const results = RESOURCES.filter((r) => type === "All" || r.type === type);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            aria-pressed={type === t}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              type === t
                ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "border-[var(--hairline)] bg-white text-navy-800 hover:border-emerald-300 hover:bg-emerald-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((resource) => (
          <article
            key={resource.id}
            className="flex flex-col rounded-xl border border-[var(--hairline)] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <Badge tone={TYPE_TONES[resource.type]}>{resource.type}</Badge>
              <span className="text-[11px] font-medium text-[var(--ink-muted)]">
                {resource.readTime ?? resource.format}
              </span>
            </div>
            <h2 className="text-base font-semibold leading-snug text-navy-950">
              {resource.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-secondary)]">
              {resource.description}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-[var(--hairline)] pt-4">
              <div className="flex flex-wrap gap-1.5">
                {resource.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-[var(--ink-muted)]">
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/contact?resource=${encodeURIComponent(resource.title)}`}
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                Request →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-[var(--ink-muted)]">
        Resources are shared on request while the download centre is in
        development — each request reaches a consultant, not a mailing list.
      </p>
    </div>
  );
}
