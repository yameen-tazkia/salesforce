export default function ProgressBar({
  label,
  value,
  max = 100,
  showValue = true,
  valueLabel,
}: {
  label?: string;
  value: number;
  max?: number;
  showValue?: boolean;
  valueLabel?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          {label && (
            <span className="text-sm font-medium text-navy-900">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-semibold tabular-nums text-emerald-700">
              {valueLabel ?? `${Math.round(pct)}%`}
            </span>
          )}
        </div>
      )}
      <div
        className="h-2 overflow-hidden rounded-full bg-navy-100"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-emerald-600 transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
