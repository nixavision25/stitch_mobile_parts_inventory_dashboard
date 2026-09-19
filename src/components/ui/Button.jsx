const VARIANTS = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active",
  secondary: "bg-surface border border-border-strong text-ink hover:bg-surface-muted",
  subtle: "bg-surface-muted text-ink hover:bg-border/60",
  destructive: "bg-surface border border-red-200 text-red-600 hover:bg-red-50",
  ghost: "text-primary hover:underline",
};

const SIZES = {
  sm: "px-3 py-1.5 text-label-md gap-1.5",
  md: "px-4 py-2.5 text-label-md gap-2",
  lg: "px-5 py-3 text-label-lg gap-2",
};

/**
 * Shared button: renders as <a> when `href` is given (e.g. WhatsApp/tel links),
 * otherwise as <button>. Keeps every CTA in the app visually consistent.
 */
export default function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconEl,
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-lg font-semibold shadow-sm transition-colors whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const content = (
    <>
      {iconEl}
      {icon && <span className="material-symbols-outlined text-base" aria-hidden="true">{icon}</span>}
      {children && <span>{children}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  const Component = as || "button";
  return (
    <Component type={as ? undefined : "button"} className={classes} {...props}>
      {content}
    </Component>
  );
}
