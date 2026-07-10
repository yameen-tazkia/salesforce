"use client";

import { useEffect, useRef, useState } from "react";
import { AGENT_DEMOS } from "@/lib/data/demos";
import ArchitectureDiagram from "@/components/diagrams/ArchitectureDiagram";

export default function ExperienceCentre() {
  const [activeId, setActiveId] = useState(AGENT_DEMOS[0].id);
  const [visibleCount, setVisibleCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const demo = AGENT_DEMOS.find((d) => d.id === activeId)!;

  const stop = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
  };

  const play = () => {
    stop();
    setVisibleCount(0);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    if (visibleCount >= demo.conversation.length) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(
      () => setVisibleCount((c) => c + 1),
      visibleCount === 0 ? 300 : 1100
    );
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, visibleCount, demo.conversation.length]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleCount]);

  const selectDemo = (id: string) => {
    stop();
    setActiveId(id);
    setVisibleCount(0);
  };

  const messages = demo.conversation.slice(0, visibleCount);

  return (
    <div>
      {/* Agent selector */}
      <div className="mb-8 flex flex-wrap gap-2">
        {AGENT_DEMOS.map((d) => (
          <button
            key={d.id}
            onClick={() => selectDemo(d.id)}
            aria-pressed={d.id === activeId}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              d.id === activeId
                ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "border-[var(--hairline)] bg-white text-navy-800 hover:border-emerald-300 hover:bg-emerald-50"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Demo player */}
        <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-navy-950 px-5 py-4">
            <div>
              <p className="text-sm font-bold text-white">{demo.name}</p>
              <p className="text-xs text-navy-300">{demo.role}</p>
            </div>
            <button
              onClick={playing ? stop : play}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              {playing ? "Pause" : visibleCount > 0 ? "Replay demo" : "Play demo"}
            </button>
          </div>
          <div className="border-b border-[var(--hairline)] bg-gold-50 px-5 py-3">
            <p className="text-xs font-medium text-gold-900">
              <span className="font-bold uppercase tracking-wide">Scenario · </span>
              {demo.scenario}
            </p>
          </div>
          <div ref={logRef} className="h-[440px] space-y-3 overflow-y-auto bg-[var(--surface-tint)] p-5" aria-live="polite">
            {visibleCount === 0 && (
              <p className="pt-32 text-center text-sm text-[var(--ink-muted)]">
                Press <strong>Play demo</strong> to watch the conversation unfold.
              </p>
            )}
            {messages.map((m, i) =>
              m.from === "system" ? (
                <div key={i} className="animate-fade-up rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-center text-xs font-medium text-emerald-900">
                  ⚙ {m.text}
                </div>
              ) : (
                <div key={i} className={`animate-fade-up flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      m.from === "user"
                        ? "rounded-br-md bg-navy-900 text-white"
                        : "rounded-bl-md border border-[var(--hairline)] bg-white text-[var(--ink)]"
                    }`}
                  >
                    {m.from === "agent" && (
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                        {demo.name} · Agentforce
                      </p>
                    )}
                    {m.text}
                  </div>
                </div>
              )
            )}
            {playing && visibleCount < demo.conversation.length && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-[var(--hairline)] bg-white px-4 py-3 shadow-sm">
                  <span className="inline-flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Capabilities + architecture */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--hairline)] bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-navy-950">What this agent does</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">{demo.description}</p>
            <ul className="mt-4 space-y-2">
              {demo.capabilities.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <ArchitectureDiagram title="Reference architecture" layers={demo.architecture} />
        </div>
      </div>
    </div>
  );
}
