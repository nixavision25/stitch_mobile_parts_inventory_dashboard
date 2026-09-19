import Card from "./Card";
import Icon from "./Icon";
import Badge from "./Badge";

const ICON_CHIP_TONE = {
  primary: "bg-primary-soft text-primary",
  warning: "bg-surface-muted text-tertiary",
  critical: "bg-critical-bg text-critical",
};

const VALUE_TONE = {
  primary: "text-ink",
  warning: "text-ink",
  critical: "text-critical",
};

const CAPTION_DOT_TONE = {
  primary: "bg-primary",
  warning: "bg-tertiary",
  critical: "bg-critical",
};

/** The 4-up KPI card pattern used on the Dashboard and Reports screens. */
export default function StatCard({ label, value, icon, tone = "primary", badge, caption }) {
  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-label-md text-ink-muted uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${ICON_CHIP_TONE[tone]}`}>
          <Icon name={icon} className="text-xl" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2 flex-wrap">
        <div className={`text-display tabular-figures ${VALUE_TONE[tone]}`}>{value}</div>
        {badge && (
          <Badge tone={tone === "critical" ? "critical" : "warning"} dot>
            {badge}
          </Badge>
        )}
      </div>
      {caption && (
        <div className={`flex items-center gap-1.5 text-body-sm pt-1 ${tone === "critical" ? "text-critical" : "text-ink-muted"}`}>
          {tone === "critical" ? (
            <Icon name="schedule" className="text-xs" />
          ) : (
            <span className={`w-2 h-2 rounded-full shrink-0 ${CAPTION_DOT_TONE[tone]}`} />
          )}
          <span>{caption}</span>
        </div>
      )}
    </Card>
  );
}
