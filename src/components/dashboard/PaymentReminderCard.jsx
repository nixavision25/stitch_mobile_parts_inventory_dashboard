import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { buildWhatsAppLink, owner } from "../../data/mockData";

export default function PaymentReminderCard({ reminder }) {
  const message = `Salam ${reminder.contact.split(" (")[0]}, this is ${owner.name.split(" ")[0]} from StockLine. Gentle reminder regarding overdue Khata balance of ${reminder.amountOwed}.`;

  return (
    <div className="bg-surface-muted p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-border/30 transition-colors">
      <div className="min-w-0">
        <div className="text-headline-sm text-ink truncate">{reminder.name}</div>
        <div className="text-body-sm text-ink-muted mb-1">
          Contact: {reminder.contact} • {reminder.phone}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-label-lg tabular-figures ${reminder.urgency === "critical" ? "text-critical" : "text-ink"}`}>
            {reminder.amountOwed}
          </span>
          <Badge tone={reminder.urgency}>{reminder.daysOverdue} days overdue</Badge>
        </div>
      </div>
      <Button
        href={buildWhatsAppLink(reminder.phone, message)}
        target="_blank"
        rel="noreferrer"
        variant="primary"
        size="sm"
        icon="chat"
        className="shrink-0"
      >
        Send WhatsApp Reminder
      </Button>
    </div>
  );
}
