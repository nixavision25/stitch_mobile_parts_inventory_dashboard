import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { buildWhatsAppLink, owner } from "../../data/mockData";

const STATUS_TONE = {
  overdue: "critical",
  "due-soon": "warning",
  paid: "positive",
};

const STATUS_LABEL = {
  overdue: "Overdue",
  "due-soon": "Due Soon",
  paid: "Paid",
};

const AVATAR_TONE = {
  overdue: "bg-critical-bg text-critical-text",
  "due-soon": "bg-warning-bg text-warning-text",
  paid: "bg-positive-bg text-positive-text",
};

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

export default function LedgerRow({ account, onRecordPayment, onCopyPhone, onRemove, onViewHistory }) {
  const message = `Salam ${account.contact}, this is ${owner.name.split(" ")[0]} from StockLine. Gentle reminder regarding your Khata balance of ${account.amountOwed} (${account.invoiceRef}) for ${account.shop}.`;
  const latestPayment = account.paymentHistory?.[0];

  return (
    <tr className="hover:bg-surface-muted/60 transition-colors border-b border-border last:border-0">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-label-md font-bold shrink-0 ${AVATAR_TONE[account.status]}`}>
            {getInitials(account.name)}
          </div>
          <div>
            <div className="text-headline-sm text-ink">{account.name}</div>
            <div className="text-label-sm text-ink-muted">
              {account.contact} • {account.shop} • {account.invoiceRef}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <button
          type="button"
          onClick={() => onCopyPhone(account.phone)}
          className="inline-flex items-center gap-1.5 text-body-sm text-ink-muted hover:text-primary transition-colors"
        >
          <Icon name="content_copy" className="text-sm" />
          {account.phone}
        </button>
      </td>
      <td className="py-3 px-4 text-right tabular-figures">
        <span className={`text-headline-sm font-bold ${account.status === "paid" ? "text-ink-muted" : "text-ink"}`}>
          {account.amountOwed}
        </span>
      </td>
      <td className="py-3 px-4 text-right tabular-figures text-body-sm text-ink-muted">
        {account.status === "paid" ? "—" : `${account.daysOverdue} days`}
      </td>
      <td className="py-3 px-4 text-center">
        <Badge tone={STATUS_TONE[account.status]}>{STATUS_LABEL[account.status]}</Badge>
      </td>
      <td className="py-3 px-4 text-body-sm text-ink-muted whitespace-nowrap">
        {latestPayment ? (
          <button
            type="button"
            onClick={() => onViewHistory(account)}
            className="text-left hover:text-primary transition-colors"
          >
            <div className="text-ink font-semibold">{latestPayment.amount}</div>
            <div className="text-label-sm">
              {latestPayment.date}, {latestPayment.time} ({latestPayment.method})
            </div>
          </button>
        ) : (
          "No payments yet"
        )}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-center gap-2">
          {account.status === "overdue" && (
            <a
              href={buildWhatsAppLink(account.phone, message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold shadow-sm transition-colors whitespace-nowrap px-3 py-1.5 text-label-md bg-[#128C7E] hover:bg-[#075E54] text-white"
            >
              <Icon name="chat" className="text-base" aria-hidden="true" />
              <span>Remind Now</span>
            </a>
          )}
          {account.status === "due-soon" && (
            <Button size="sm" variant="secondary" icon="forum" href={buildWhatsAppLink(account.phone, message)} target="_blank" rel="noreferrer">
              Send Reminder
            </Button>
          )}
          <Button
            size="sm"
            variant={account.status === "paid" ? "secondary" : "primary"}
            icon="payments"
            onClick={() => onRecordPayment(account)}
          >
            {account.status === "paid" ? "View" : "Record"}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon="history"
            aria-label={`Payment history for ${account.name}`}
            onClick={() => onViewHistory(account)}
          />
          <Button
            size="sm"
            variant="destructive"
            icon="delete"
            aria-label={`Remove ${account.name}`}
            onClick={() => onRemove(account)}
          />
        </div>
      </td>
    </tr>
  );
}
