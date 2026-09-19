import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { business } from "../data/mockData";

const PROBLEMS = [
  {
    icon: "visibility",
    title: "Stock visibility across every location",
    description:
      "See exactly what's sitting in your godown and each retail shop in real time, so you stop over-ordering parts you already have and under-ordering the ones flying off the shelf.",
  },
  {
    icon: "shield",
    title: "Theft & shrinkage prevention",
    description:
      "Every transfer between locations is logged and time-stamped. When counts don't match, you'll know exactly which shop, which shift, and which item — before it becomes a pattern.",
  },
  {
    icon: "chat",
    title: "Automatic WhatsApp payment reminders",
    description:
      "Stop chasing Khata balances by memory. StockLine tracks who owes what and lets you send a WhatsApp reminder to any overdue account in a single tap.",
  },
  {
    icon: "trending_up",
    title: "Top-seller & demand insights",
    description:
      "Know which parts actually move before you place your next order — weekly demand trends and restock suggestions are calculated for you automatically.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <img src="/logo.svg" alt={`${business.name} logo`} className="h-8 w-auto object-contain" />
          <Button as={Link} to="/app/dashboard" size="sm" icon="arrow_forward">
            See it in action
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft text-primary-active text-label-md">
            <Icon name="storefront" className="text-sm" />
            Built for mobile parts importers & distributors
          </div>
          <h1 className="text-ink font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl">
            Inventory and payments,{" "}
            <span className="text-primary">under control</span> — across every shop.
          </h1>
          <p className="text-body-lg text-ink-muted max-w-2xl sm:text-lg">
            {business.name} keeps stock, transfers, and Khata balances in sync across your godown and retail shops,
            catches shrinkage before it adds up, and reminds customers to pay — automatically, over WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button as={Link} to="/app/dashboard" size="lg" icon="play_arrow">
              See it in action
            </Button>
            <a href="#problems" className="text-primary text-label-lg hover:underline px-2 py-1">
              What problems does it solve?
            </a>
          </div>

          <div className="w-full max-w-4xl mt-10 bg-surface rounded-2xl shadow-lg border border-border p-3 sm:p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total Stock Value", value: "Rs. 1.85 Cr", icon: "inventory", tone: "text-primary" },
                { label: "Items Running Low", value: "7 Items", icon: "warning", tone: "text-tertiary" },
                { label: "Overdue (Udhaar)", value: "Rs. 1.24M", icon: "pending_actions", tone: "text-critical" },
                { label: "Today's Sales", value: "Rs. 482,000", icon: "point_of_sale", tone: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-muted rounded-xl p-3 sm:p-4 flex flex-col gap-2 text-left">
                  <Icon name={stat.icon} className={`text-xl ${stat.tone}`} />
                  <div className="text-headline-sm text-ink tabular-figures">{stat.value}</div>
                  <div className="text-label-sm text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="problems" className="bg-surface border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-headline-lg sm:text-3xl font-bold text-ink">
                Built around the problems you actually have
              </h2>
              <p className="text-body-lg text-ink-muted mt-3">
                Not a generic inventory tool — StockLine is shaped around how import & distribution businesses
                actually lose money.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PROBLEMS.map((item) => (
                <div key={item.title} className="bg-canvas rounded-xl p-5 sm:p-6 flex flex-col gap-3 border border-border/60">
                  <div className="w-11 h-11 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                    <Icon name={item.icon} className="text-2xl" />
                  </div>
                  <h3 className="text-headline-md text-ink">{item.title}</h3>
                  <p className="text-body-md text-ink-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col items-center text-center gap-5">
          <h2 className="text-headline-lg sm:text-3xl font-bold text-ink">See your business in one dashboard</h2>
          <p className="text-body-lg text-ink-muted max-w-xl">
            This demo is loaded with sample data from a Lahore & Karachi mobile parts distributor, so you can click
            around exactly the way you would with your own shops.
          </p>
          <Button as={Link} to="/app/dashboard" size="lg" icon="dashboard">
            Launch the Dashboard
          </Button>
        </section>
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-ink-muted text-body-sm">
            <img src="/logo.svg" alt={`${business.name} logo`} className="h-6 w-auto object-contain" />
            <span>{business.tagline}</span>
          </div>
          <a href={`tel:${business.supportPhone.replace(/\s/g, "")}`} className="text-body-sm text-ink-muted hover:text-primary flex items-center gap-1.5">
            <Icon name="support_agent" className="text-base" />
            {business.supportPhone}
          </a>
        </div>
      </footer>
    </div>
  );
}
