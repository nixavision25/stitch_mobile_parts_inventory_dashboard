import Icon from "../ui/Icon";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function StockAlertRow({ alert, onAction }) {
  return (
    <div className="bg-surface-muted p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-border/30 transition-colors">
      <div className="min-w-0">
        <div className="text-headline-sm text-ink truncate mb-1">{alert.name}</div>
        <div className="flex flex-wrap items-center gap-2 text-body-sm text-ink-muted">
          <span className="inline-flex items-center gap-1 text-label-md text-ink">
            <Icon name={alert.locationIcon} className="text-sm text-primary" />
            {alert.location}
          </span>
          <span>•</span>
          <Badge tone={alert.urgency}>{alert.stockLabel}</Badge>
        </div>
      </div>
      <Button
        size="sm"
        variant={alert.urgency === "critical" ? "primary" : "subtle"}
        icon={alert.actionIcon}
        className="shrink-0"
        onClick={() => onAction?.(alert)}
      >
        {alert.actionLabel}
      </Button>
    </div>
  );
}
