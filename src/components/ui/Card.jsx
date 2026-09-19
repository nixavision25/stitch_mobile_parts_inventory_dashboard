/** Generic white section container used across every screen. */
export default function Card({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component
      className={`bg-surface rounded-xl shadow-sm border border-border/60 p-4 sm:p-5 lg:p-6 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
