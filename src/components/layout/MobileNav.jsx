import { NavLink } from "react-router-dom";
import Icon from "../ui/Icon";
import { navItems } from "./navItems";

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex items-center justify-around z-40 px-2 shadow-lg no-print">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 flex-1 h-full ${
              isActive ? "text-primary font-semibold" : "text-ink-muted"
            }`
          }
        >
          <Icon name={item.icon} className="text-xl" />
          <span className="text-label-sm">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
