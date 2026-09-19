import Icon from "../ui/Icon";
import { business, locations } from "../../data/mockData";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

export default function Header() {
  return (
    <header className="sticky top-0 lg:left-72 right-0 bg-surface shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex flex-wrap items-center justify-between px-4 lg:px-6 py-2.5 gap-3 no-print">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex lg:hidden items-center gap-2 pr-3 border-r border-border">
          <img src="/logo.svg" alt={`${business.name} logo`} className="h-7 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-1.5 text-label-md text-ink">
          <Icon name="calendar_today" className="text-primary text-base" />
          <span>Today: {today} • All locations open</span>
        </div>
        <div className="hidden xl:flex items-center gap-1.5">
          {locations.map((loc) => (
            <span
              key={loc.id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-muted text-ink text-label-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              {loc.name.split("—")[0].trim()} (Active)
            </span>
          ))}
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-1.5 bg-surface-muted px-3 py-1.5 rounded-xl text-label-md text-ink">
        <Icon name="call" className="text-primary text-base" />
        <span>
          Helpline: {business.supportPhone} / {business.supportPhoneAlt}
        </span>
      </div>
    </header>
  );
}
