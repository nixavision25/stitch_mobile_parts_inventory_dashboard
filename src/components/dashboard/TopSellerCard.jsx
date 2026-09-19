import Icon from "../ui/Icon";

export default function TopSellerCard({ item }) {
  return (
    <div className="bg-surface-muted rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="w-10 h-10 rounded-lg bg-border/50 flex items-center justify-center text-primary shrink-0">
          <Icon name={item.icon} className="text-xl" />
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-label-sm ${
            item.featured ? "bg-primary-soft text-primary-active" : "bg-border/60 text-ink"
          }`}
        >
          #{item.rank} Seller
        </span>
      </div>
      <div className="min-w-0 mb-4">
        <div className="text-headline-sm text-ink truncate">{item.name}</div>
        <div className="text-body-sm text-ink-muted">{item.subtitle}</div>
      </div>
      <div className="flex items-baseline justify-between pt-1">
        <span className="text-metric tabular-figures text-ink">{item.revenue}</span>
        <span className="text-label-md text-primary font-semibold">{item.unitsSold} sold</span>
      </div>
    </div>
  );
}
