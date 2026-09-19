import Card from "../ui/Card";
import Icon from "../ui/Icon";

export default function ShopComparisonCard({ shop }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
            <Icon name={shop.icon} className="text-2xl" />
          </div>
          <div className="min-w-0">
            <div className="text-headline-sm text-ink truncate">{shop.name}</div>
            <div className="text-label-sm text-ink-muted">{shop.subtitle}</div>
          </div>
        </div>
      </div>

      <div className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-soft text-tertiary text-label-sm font-semibold">
        {shop.badge}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-label-sm text-ink-muted uppercase tracking-wide">Total Sales</div>
          <div className="text-headline-md text-ink tabular-figures">{shop.totalSales}</div>
          <div className="text-label-sm text-ink-muted">{shop.itemsSold}</div>
        </div>
        <div>
          <div className="text-label-sm text-ink-muted uppercase tracking-wide">Turnover</div>
          <div className="text-headline-md text-ink">{shop.turnover}</div>
          <div className="text-label-sm text-ink-muted">{shop.turnoverNote}</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-label-sm mb-1">
          <span className="text-ink-muted">Top Category — {shop.topCategory}</span>
          <span className="text-ink font-semibold">{shop.topCategoryShare}%</span>
        </div>
        <div className="h-2 rounded-full bg-surface-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: `${shop.topCategoryShare}%` }} />
        </div>
        <div className="text-label-sm text-ink-muted mt-1">{shop.topCategoryValue}</div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border text-body-sm text-ink-muted">
        <Icon name="person" className="text-base" />
        Shop lead: <span className="text-ink font-medium">{shop.lead}</span>
      </div>
    </Card>
  );
}
