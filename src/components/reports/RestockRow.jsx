import Badge from "../ui/Badge";
import Button from "../ui/Button";

const URGENCY_TONE = {
  critical: "critical",
  warning: "warning",
  moderate: "primary",
};

const URGENCY_LABEL = {
  critical: "Order Now",
  warning: "Order Soon",
  moderate: "On Track",
};

export default function RestockRow({ item, onOrder }) {
  return (
    <tr className="hover:bg-surface-muted/60 transition-colors border-b border-border last:border-0">
      <td className="py-3 px-4">
        <div className="text-headline-sm text-ink">{item.name}</div>
        <div className="text-label-sm text-ink-muted">
          SKU: {item.sku} • {item.vendor}
        </div>
      </td>
      <td className="py-3 px-4 text-right tabular-figures text-body-sm text-ink">{item.currentStock}</td>
      <td className="py-3 px-4 text-right tabular-figures text-body-sm text-ink-muted">{item.salesPerWeek}/wk</td>
      <td className="py-3 px-4 text-right tabular-figures">
        <span className={`text-body-sm font-semibold ${item.daysLeft <= 3 ? "text-critical" : "text-ink"}`}>
          {item.daysLeft} days
        </span>
      </td>
      <td className="py-3 px-4 text-right tabular-figures text-body-sm text-ink">
        {item.recommendedOrder}
        <span className="text-ink-muted"> units</span>
      </td>
      <td className="py-3 px-4 text-right tabular-figures text-body-sm text-ink">{item.estCost}</td>
      <td className="py-3 px-4 text-center">
        <Badge tone={URGENCY_TONE[item.urgency]}>{URGENCY_LABEL[item.urgency]}</Badge>
      </td>
      <td className="py-3 px-4 text-center">
        <Button size="sm" variant={item.urgency === "critical" ? "primary" : "secondary"} icon="add_shopping_cart" onClick={() => onOrder(item)}>
          Order
        </Button>
      </td>
    </tr>
  );
}
