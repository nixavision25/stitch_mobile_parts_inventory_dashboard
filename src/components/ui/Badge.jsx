const TONES = {
  positive: "bg-positive-bg text-positive-text",
  warning: "bg-warning-bg text-warning-text",
  critical: "bg-critical-bg text-critical-text",
  draft: "bg-draft-bg text-draft",
  primary: "bg-primary-soft text-primary-active",
  neutral: "bg-surface-muted text-ink-muted",
};

const DOT_TONES = {
  positive: "bg-positive",
  warning: "bg-warning",
  critical: "bg-critical",
  draft: "bg-draft",
  primary: "bg-primary",
  neutral: "bg-ink-faint",
};

/**
 * Status pill used for stock levels, payment status, urgency, etc.
 * Always pairs a color with a text label + dot (never color alone).
 */
export default function Badge({ tone = "neutral", children, dot = true, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-semibold ${TONES[tone]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${DOT_TONES[tone]}`} />}
      {children}
    </span>
  );
}
