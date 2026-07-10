import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-container flex-col items-center px-6 py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-navy-950">
        This page doesn't exist
      </h1>
      <p className="mt-3 max-w-md text-[var(--ink-secondary)]">
        The page you're looking for may have moved. Head back to the platform
        home to keep exploring.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Back to home
      </Link>
    </section>
  );
}
