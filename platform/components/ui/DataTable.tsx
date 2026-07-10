export default function DataTable({
  caption,
  columns,
  rows,
}: {
  caption?: string;
  columns: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--hairline)] bg-white shadow-sm shadow-navy-950/[0.03]">
      <table className="w-full min-w-[560px] text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-[var(--hairline)] bg-navy-50/50">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-navy-800"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[var(--hairline)] last:border-0 hover:bg-emerald-50/40"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3.5 align-top text-[var(--ink-secondary)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
