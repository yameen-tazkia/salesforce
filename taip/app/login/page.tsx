import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-navy-950 p-10 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 400px at 20% 10%, rgba(12,130,89,0.35), transparent), radial-gradient(500px 400px at 90% 90%, rgba(14,148,174,0.25), transparent)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-base font-extrabold">
            T
          </span>
          <span className="text-sm font-bold tracking-wide">Tazkia Intelligence</span>
        </div>
        <div className="relative">
          <h1 className="max-w-md text-3xl font-extrabold leading-tight">
            Tazkia Account Intelligence Platform
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-200">
            Identify, research and prioritise the GCC organisations most ready for
            Salesforce and Agentforce transformation — and prepare insight-led
            outreach that lands.
          </p>
          <ul className="mt-6 space-y-2 text-[13px] text-navy-200">
            {[
              "Salesforce confidence scoring from public evidence",
              "AI opportunity & readiness estimation",
              "Stakeholder mapping and outreach briefings",
            ].map((line) => (
              <li key={line} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-[11px] text-navy-400">
          Internal platform · Authorised users only
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-[var(--surface-tint)] px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-950 text-base font-extrabold text-white">
              T
            </span>
          </div>
          <h2 className="text-xl font-bold text-navy-950">Sign in</h2>
          <p className="mt-1 text-sm text-[var(--ink-muted)]">
            Use your Tazkia internal account.
          </p>
          <LoginForm />
          <div className="mt-8 rounded-lg border border-[var(--hairline)] bg-white p-4 text-xs leading-relaxed text-[var(--ink-muted)]">
            <p className="font-semibold text-[var(--ink-secondary)]">Demo environment</p>
            <p className="mt-1">
              tariq@tazkia.internal / admin · amira@tazkia.internal / consult ·
              layla@tazkia.internal / analyst · guest@tazkia.internal / viewer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
