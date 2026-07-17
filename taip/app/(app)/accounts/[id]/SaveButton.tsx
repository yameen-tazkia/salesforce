"use client";

import { useState } from "react";

export default function SaveButton({
  accountId,
  initialSaved,
}: {
  accountId: string;
  initialSaved: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    const res = await fetch("/api/v1/workspace/saved", {
      method: saved ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId }),
    });
    if (res.ok) setSaved(!saved);
    setBusy(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors disabled:opacity-50 ${
        saved
          ? "border-gold-300 bg-gold-50 text-gold-800 hover:bg-gold-100"
          : "border-[var(--hairline)] text-[var(--ink-secondary)] hover:border-gold-300 hover:text-gold-800"
      }`}
    >
      {saved ? "★ Saved" : "☆ Save account"}
    </button>
  );
}
