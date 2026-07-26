"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Topbar({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/v1/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="print-hidden sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--hairline)] bg-white/90 px-6 backdrop-blur">
      <p className="text-[13px] text-[var(--ink-muted)]">
        <span className="font-semibold text-navy-950">Tazkia Intelligence</span>
        <span className="mx-2 text-[var(--hairline)]">|</span>
        GCC Salesforce &amp; Agentforce account intelligence
      </p>
      <div className="flex items-center gap-4">
        <span className="text-right leading-tight">
          <span className="block text-[13px] font-semibold text-navy-950">{name}</span>
          <span className="block text-[11px] capitalize text-[var(--ink-muted)]">{role}</span>
        </span>
        <button
          onClick={logout}
          disabled={busy}
          className="rounded-lg border border-[var(--hairline)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-secondary)] transition-colors hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
