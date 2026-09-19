import { NavLink } from "react-router-dom";
import Icon from "../ui/Icon";
import { navItems } from "./navItems";
import { business, owner } from "../../data/mockData";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-surface z-50 flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        <div className="p-5 flex items-center gap-3 bg-surface-muted">
          <img src="/logo.svg" alt={`${business.name} logo`} className="h-9 w-auto object-contain" />
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-label-lg transition-colors ${
                  isActive
                    ? "bg-primary-soft text-primary-active"
                    : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                }`
              }
            >
              <Icon name={item.icon} className="text-primary" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-label-md text-ink-muted hover:bg-surface-muted hover:text-ink transition-colors"
          >
            <Icon name="arrow_back" className="text-base" />
            <span>Back to overview</span>
          </NavLink>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 bg-surface-muted">
        <div className="flex items-center gap-3 bg-surface p-2.5 rounded-xl">
          <img src={owner.avatarUrl} alt={owner.name} className="w-8 h-8 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <div className="text-label-md text-ink truncate">
              {owner.name} ({owner.role})
            </div>
            <div className="flex items-center gap-1.5 text-label-sm text-primary">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="truncate">{owner.status}</span>
            </div>
          </div>
        </div>
        <a
          href={`tel:${business.supportPhone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface hover:bg-border/40 text-ink transition-colors text-label-md"
        >
          <Icon name="support_agent" className="text-base" />
          Help &amp; Phone Support
        </a>
      </div>
    </aside>
  );
}
