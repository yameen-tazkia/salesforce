const TONES = {
  emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
  navy: "bg-navy-50 text-navy-800 border-navy-200",
  gold: "bg-gold-50 text-gold-800 border-gold-200",
  teal: "bg-teal-50 text-teal-900 border-teal-200",
  neutral: "bg-slate-50 text-slate-700 border-slate-200",
} as const;

export default function Badge({
  children,
  tone = "emerald",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
