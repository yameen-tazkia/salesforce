export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--hairline)] bg-gradient-to-b from-emerald-50/60 to-white">
      <div className="mx-auto max-w-container px-6 py-14 md:py-20">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-navy-950 md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)] md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
