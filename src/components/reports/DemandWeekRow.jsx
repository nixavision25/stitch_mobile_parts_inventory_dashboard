import Badge from "../ui/Badge";

const MAX = 100;

export default function DemandWeekRow({ week }) {
  const soldPct = Math.min(100, (week.sold / MAX) * 100);
  const stockPct = Math.min(100, (week.stock / MAX) * 100);

  return (
    <div className="flex flex-col gap-2 py-3 border-b border-border last:border-0">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-headline-sm text-ink">{week.week}</span>
          <span className="text-label-sm text-ink-muted ml-2">{week.range}</span>
        </div>
        <Badge tone={week.tone}>{week.note}</Badge>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-ink-muted w-14 shrink-0">Sold</span>
          <div className="flex-1 h-2.5 rounded-full bg-surface-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${soldPct}%` }} />
          </div>
          <span className="text-label-sm text-ink tabular-figures w-10 text-right">{week.sold}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-ink-muted w-14 shrink-0">Stock</span>
          <div className="flex-1 h-2.5 rounded-full bg-surface-muted overflow-hidden">
            <div
              className={`h-full rounded-full ${week.tone === "critical" ? "bg-critical" : week.tone === "warning" ? "bg-warning" : "bg-tertiary"}`}
              style={{ width: `${stockPct}%` }}
            />
          </div>
          <span className="text-label-sm text-ink tabular-figures w-10 text-right">{week.stock}</span>
        </div>
      </div>
    </div>
  );
}
