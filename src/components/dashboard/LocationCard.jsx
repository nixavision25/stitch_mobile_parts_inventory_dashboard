import Icon from "../ui/Icon";

export default function LocationCard({ location }) {
  return (
    <div className="bg-surface-muted rounded-xl p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name={location.icon} className="text-primary text-xl shrink-0" />
            <span className="text-headline-sm text-ink truncate">{location.name}</span>
          </div>
          <span className="text-label-lg text-primary shrink-0">{location.percentage}%</span>
        </div>
        <p className="text-body-sm text-ink-muted mb-4">{location.description}</p>
        <div className="w-full h-2.5 bg-border rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full"
            style={{ width: `${location.percentage}%`, backgroundColor: location.barColor }}
          />
        </div>
      </div>
      <div className="flex items-baseline justify-between pt-2">
        <span className="text-metric tabular-figures text-ink">{location.stockValueLabel}</span>
        <span className="text-label-md text-ink-muted">{location.parts.toLocaleString()} parts</span>
      </div>
    </div>
  );
}
