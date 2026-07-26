import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface-tint)] px-6 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">404</p>
      <h1 className="mt-2 text-2xl font-extrabold text-navy-950">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-[var(--ink-muted)]">
        The account or page you were looking for doesn&apos;t exist in the intelligence base.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
