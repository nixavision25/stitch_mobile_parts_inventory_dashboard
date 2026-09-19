import Badge from "../ui/Badge";
import Button from "../ui/Button";

const STATUS_LABEL = {
  "in-stock": "In Stock",
  low: "Low Stock",
  critical: "Critical",
};

export default function InventoryRow({ item, onMove, onRemove }) {
  return (
    <tr className="hover:bg-surface-muted/60 transition-colors border-b border-border last:border-0">
      <td className="py-3 px-4">
        <div className="text-headline-sm text-ink">{item.name}</div>
        <div className="text-label-sm text-ink-muted">
          SKU: {item.sku} • {item.category}
        </div>
      </td>
      <td className="py-3 px-4 text-body-sm text-ink-muted whitespace-nowrap">{item.location}</td>
      <td className="py-3 px-4 text-right tabular-figures">
        <span className={`text-headline-sm font-bold ${item.status === "in-stock" ? "text-ink" : item.status === "low" ? "text-tertiary" : "text-critical"}`}>
          {item.stockQty}
        </span>
        <span className="text-label-sm text-ink-muted block">of {item.reorderLevel} min</span>
      </td>
      <td className="py-3 px-4 text-right tabular-figures text-body-sm text-ink">{item.unitCost}</td>
      <td className="py-3 px-4 text-center">
        <Badge tone={item.status === "in-stock" ? "positive" : item.status === "low" ? "warning" : "critical"}>
          {STATUS_LABEL[item.status]}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-center gap-2">
          <Button size="sm" variant={item.status === "critical" ? "primary" : "secondary"} icon="local_shipping" onClick={() => onMove(item)}>
            Move
          </Button>
          <Button
            size="sm"
            variant="destructive"
            icon="delete"
            aria-label={`Remove ${item.name}`}
            onClick={() => onRemove(item)}
          />
        </div>
      </td>
    </tr>
  );
}
