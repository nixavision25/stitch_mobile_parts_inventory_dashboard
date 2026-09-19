import Card from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import StatCard from "../components/ui/StatCard";
import LocationCard from "../components/dashboard/LocationCard";
import StockAlertRow from "../components/dashboard/StockAlertRow";
import PaymentReminderCard from "../components/dashboard/PaymentReminderCard";
import TopSellerCard from "../components/dashboard/TopSellerCard";
import { useToast } from "../components/ui/ToastContext";
import { dashboardKpis, locations, owner, paymentReminders, stockAlerts, topSellers } from "../data/mockData";

export default function Dashboard() {
  const showToast = useToast();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-display text-ink">Good Morning, {owner.name.split(" ")[0]}</span>
            <span className="inline-flex items-center justify-center p-1 rounded-full bg-primary-soft text-primary" title="System Status: Normal">
              <Icon name="verified" className="text-sm" />
            </span>
          </div>
          <p className="text-body-md text-ink-muted">
            Here is what needs your attention across your central godown and 2 retail shops today.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface text-ink text-label-md shadow-sm">
            <Icon name="event_available" className="text-base text-primary" />
            <span>Live Feed</span>
          </div>
          <Button variant="secondary" size="sm" icon="print" onClick={() => window.print()}>
            Print Daily Summary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardKpis.map((kpi) => (
          <StatCard key={kpi.id} {...kpi} />
        ))}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h2 className="text-headline-md text-ink">Stock Distribution Across Your 3 Locations</h2>
            <p className="text-body-sm text-ink-muted mt-0.5">
              Real-time inventory levels, capital allocation, and current location focus
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-muted text-label-sm text-ink-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            All storerooms synchronized
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-critical" />
              <h2 className="text-headline-md text-ink">Stock Alerts (Running Out Fast)</h2>
            </div>
            <span className="text-label-sm text-ink-muted">{stockAlerts.length} Urgent Items</span>
          </div>
          <p className="text-body-sm text-ink-muted mb-4">
            Parts below minimal safety stock that require immediate transfers or supplier ordering.
          </p>
          <div className="flex flex-col gap-3 flex-1">
            {stockAlerts.map((alert) => (
              <StockAlertRow
                key={alert.id}
                alert={alert}
                onAction={(a) => showToast("Stock Movement Scheduled", `${a.actionLabel}: ${a.name}`)}
              />
            ))}
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-tertiary" />
              <h2 className="text-headline-md text-ink">Payment Reminders (Udhaar / Khata)</h2>
            </div>
            <span className="text-label-sm text-ink-muted">Total: Rs. 1,248,000</span>
          </div>
          <p className="text-body-sm text-ink-muted mb-4">
            Wholesale repair shops with overdue store credit invoices. Tap to ping them directly.
          </p>
          <div className="flex flex-col gap-3 flex-1">
            {paymentReminders.map((reminder) => (
              <PaymentReminderCard key={reminder.id} reminder={reminder} />
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h2 className="text-headline-md text-ink">Top Selling Items This Week</h2>
            <p className="text-body-sm text-ink-muted">Highest turnover parts generating revenue across both retail counters</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-primary text-label-md hover:underline"
            onClick={() => showToast("Full parts rank", "This demo only shows the top performers.")}
          >
            View full parts rank
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {topSellers.map((item) => (
            <TopSellerCard key={item.id} item={item} />
          ))}
        </div>
      </Card>
    </>
  );
}
