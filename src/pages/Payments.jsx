import { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import StatCard from "../components/ui/StatCard";
import LedgerRow from "../components/payments/LedgerRow";
import { useToast } from "../components/ui/ToastContext";
import { ledgerAccounts as seedLedgerAccounts, locations } from "../data/mockData";

const FILTERS = [
  { id: "all", label: "All Accounts" },
  { id: "overdue", label: "Overdue" },
  { id: "due-soon", label: "Due Soon" },
  { id: "paid", label: "Paid" },
];

const PAYMENT_METHODS = ["Cash", "Bank Transfer", "EasyPaisa / JazzCash", "Cheque"];

function parseAmount(label) {
  return Number(label.replace(/[^\d]/g, "")) || 0;
}

function nowDateTime() {
  const now = new Date();
  return {
    date: now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    time: now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
  };
}

function nextReceiptNo(accounts) {
  const paidCount = accounts.reduce((n, a) => n + (a.paymentHistory?.length || 0), 0);
  return `RCPT-${3400 + paidCount}`;
}

export default function Payments() {
  const showToast = useToast();
  const [accounts, setAccounts] = useState(seedLedgerAccounts);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [lockClientSelect, setLockClientSelect] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [historyAccountId, setHistoryAccountId] = useState(null);

  const shopOptions = useMemo(() => [...new Set(accounts.map((a) => a.shop))], [accounts]);

  const { totalOwed, overdueCount, oldestOverdue } = useMemo(() => {
    const unpaid = accounts.filter((a) => a.status !== "paid");
    return {
      totalOwed: unpaid.reduce((sum, a) => sum + parseAmount(a.amountOwed), 0),
      overdueCount: accounts.filter((a) => a.status === "overdue").length,
      oldestOverdue: accounts.length ? Math.max(0, ...accounts.map((a) => a.daysOverdue)) : 0,
    };
  }, [accounts]);

  const dueThisWeek = useMemo(() => {
    const dueSoon = accounts.filter((a) => a.status === "due-soon");
    return {
      total: dueSoon.reduce((sum, a) => sum + parseAmount(a.amountOwed), 0),
      count: dueSoon.length,
    };
  }, [accounts]);

  const filteredAccounts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return accounts.filter((account) => {
      const matchesFilter = activeFilter === "all" || account.status === activeFilter;
      const matchesQuery = !q || account.name.toLowerCase().includes(q) || account.contact.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [accounts, query, activeFilter]);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || null;
  const historyAccount = accounts.find((a) => a.id === historyAccountId) || null;

  function handleCopyPhone(phone) {
    navigator.clipboard?.writeText(phone);
    showToast("Phone Number Copied", phone);
  }

  function openPaymentModalForAccount(account) {
    setSelectedAccountId(account.id);
    setLockClientSelect(true);
    setPaymentModalOpen(true);
  }

  function openPaymentModalGeneric() {
    const firstUnpaid = accounts.find((a) => a.status !== "paid");
    setSelectedAccountId((firstUnpaid || accounts[0])?.id || "");
    setLockClientSelect(false);
    setPaymentModalOpen(true);
  }

  function closePaymentModal() {
    setPaymentModalOpen(false);
    setLockClientSelect(false);
  }

  function handleRecordSubmit(e) {
    e.preventDefault();
    if (!selectedAccount) return;
    const form = new FormData(e.target);
    const paidAmount = Number(form.get("amount"));
    const method = form.get("method");
    const depositTo = form.get("depositTo");
    const paidBy = form.get("paidBy").trim() || selectedAccount.contact;
    if (!paidAmount || paidAmount <= 0) return;

    const owed = parseAmount(selectedAccount.amountOwed);
    const newOwed = Math.max(0, owed - paidAmount);
    const newStatus = newOwed === 0 ? "paid" : selectedAccount.status;
    const { date, time } = nowDateTime();
    const receiptNo = nextReceiptNo(accounts);
    const entry = {
      id: receiptNo,
      date,
      time,
      amount: `Rs. ${paidAmount.toLocaleString("en-PK")}`,
      method,
      receiptNo,
      paidBy,
      balanceAfter: `Rs. ${newOwed.toLocaleString("en-PK")}`,
    };

    setAccounts((prev) =>
      prev.map((a) =>
        a.id === selectedAccount.id
          ? {
              ...a,
              amountOwed: `Rs. ${newOwed.toLocaleString("en-PK")}`,
              status: newStatus,
              daysOverdue: newStatus === "paid" ? 0 : a.daysOverdue,
              paymentHistory: [entry, ...(a.paymentHistory || [])],
            }
          : a
      )
    );

    closePaymentModal();
    showToast(
      "Payment Recorded",
      `Rs. ${paidAmount.toLocaleString("en-PK")} logged for ${selectedAccount.name} by ${paidBy} (${method}, deposited to ${depositTo}). New balance: Rs. ${newOwed.toLocaleString("en-PK")}.`
    );
  }

  function handleAddClientSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name").trim();
    const contact = form.get("contact").trim();
    const phone = form.get("phone").trim();
    const shop = form.get("shop");
    const openingBalance = Number(form.get("openingBalance")) || 0;

    const newAccount = {
      id: `ledger-${Date.now()}`,
      name,
      contact,
      phone,
      shop,
      amountOwed: `Rs. ${openingBalance.toLocaleString("en-PK")}`,
      daysOverdue: 0,
      status: openingBalance > 0 ? "due-soon" : "paid",
      invoiceRef: `INV-${2200 + accounts.length}`,
      paymentHistory: [],
    };

    setAccounts((prev) => [newAccount, ...prev]);
    setAddClientOpen(false);
    e.target.reset();
    showToast("Client Account Added", `${name} added to the Khata ledger.`);
  }

  function handleRemoveConfirm() {
    setAccounts((prev) => prev.filter((a) => a.id !== removeTarget.id));
    showToast("Account Removed", `${removeTarget.name} was removed from the ledger.`);
    setRemoveTarget(null);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg text-ink">Payments & Khata Balances</h1>
          <p className="text-body-md text-ink-muted mt-0.5">
            Track wholesale credit accounts and send WhatsApp reminders in one tap.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" icon="person_add" onClick={() => setAddClientOpen(true)}>
            Add Client Account
          </Button>
          <Button size="sm" icon="add" onClick={openPaymentModalGeneric}>
            Record New Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Outstanding"
          value={`Rs. ${totalOwed.toLocaleString("en-PK")}`}
          icon="account_balance_wallet"
          tone="critical"
          caption={`Across ${accounts.filter((a) => a.status !== "paid").length} wholesale accounts`}
        />
        <StatCard
          label="Overdue Accounts"
          value={`${overdueCount} Khata`}
          icon="pending_actions"
          tone="warning"
          caption={overdueCount ? `Oldest is ${oldestOverdue} days overdue` : "Nothing past due"}
        />
        <StatCard
          label="Due This Week"
          value={`Rs. ${dueThisWeek.total.toLocaleString("en-PK")}`}
          icon="event_upcoming"
          tone="primary"
          caption={`${dueThisWeek.count} client${dueThisWeek.count === 1 ? "" : "s"} expected to pay soon`}
        />
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-lg" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by shop or contact name..."
              className="w-full bg-surface-muted pl-10 pr-4 py-2.5 rounded-lg text-body-md text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-label-md transition-colors ${
                  activeFilter === f.id ? "bg-primary text-on-primary" : "bg-surface-muted text-ink hover:bg-border/50"
                }`}
              >
                {f.label} ({f.id === "all" ? accounts.length : accounts.filter((a) => a.status === f.id).length})
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-surface-muted text-ink-muted uppercase text-label-sm">
                <th className="py-2.5 px-4 rounded-l-lg font-semibold">Account</th>
                <th className="py-2.5 px-4 font-semibold">Phone</th>
                <th className="py-2.5 px-4 text-right font-semibold">Balance</th>
                <th className="py-2.5 px-4 text-right font-semibold">Overdue</th>
                <th className="py-2.5 px-4 text-center font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold">Last Payment</th>
                <th className="py-2.5 px-4 rounded-r-lg text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <LedgerRow
                  key={account.id}
                  account={account}
                  onRecordPayment={openPaymentModalForAccount}
                  onCopyPhone={handleCopyPhone}
                  onRemove={setRemoveTarget}
                  onViewHistory={(a) => setHistoryAccountId(a.id)}
                />
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-body-md text-ink-muted">
                    No accounts match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-label-sm text-ink-muted px-2">
          Showing {filteredAccounts.length} of {accounts.length} wholesale accounts • {overdueCount} overdue account
          {overdueCount === 1 ? "" : "s"} require follow-up.
        </p>
      </Card>

      {/* Record Payment — usable both from a row ("Record") and from the header for any client */}
      <Modal
        open={paymentModalOpen}
        onClose={closePaymentModal}
        title={selectedAccount ? `Record Payment — ${selectedAccount.name}` : "Record Payment"}
        titleIcon="payments"
      >
        {selectedAccount && selectedAccount.status === "paid" ? (
          <div className="flex flex-col gap-3">
            <p className="text-body-md text-ink-muted">
              {selectedAccount.contact} has no outstanding Khata balance. Last known settlement was in full.
            </p>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={closePaymentModal}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={handleRecordSubmit}>
            <div>
              <label className="block text-label-md text-ink mb-1">Select Client</label>
              <select
                value={selectedAccountId}
                disabled={lockClientSelect}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-70"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.amountOwed} owed
                  </option>
                ))}
              </select>
            </div>
            {selectedAccount && (
              <p className="text-body-sm text-ink-muted">
                Outstanding balance: <span className="text-ink font-semibold">{selectedAccount.amountOwed}</span>
              </p>
            )}
            <div>
              <label className="block text-label-md text-ink mb-1">Amount Paid (Rs.)</label>
              <input
                name="amount"
                type="number"
                min="1"
                required
                defaultValue={selectedAccount ? parseAmount(selectedAccount.amountOwed) : ""}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Paid By</label>
              <input
                name="paidBy"
                type="text"
                key={selectedAccount?.id}
                defaultValue={selectedAccount?.contact || ""}
                placeholder="Who physically made this payment"
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Payment Method</label>
              <select
                name="method"
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-label-md text-ink mb-2">Deposit To Location</label>
              <div className="flex flex-col gap-2">
                {locations.map((loc, i) => (
                  <label key={loc.id} className="flex items-center gap-2 text-body-sm text-ink">
                    <input type="radio" name="depositTo" value={loc.name} defaultChecked={i === 0} className="accent-primary" />
                    {loc.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={closePaymentModal}>
                Cancel
              </Button>
              <Button type="submit">Save Payment</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Add Client Account — bring a new wholesale account onto the Khata ledger */}
      <Modal open={addClientOpen} onClose={() => setAddClientOpen(false)} title="Add Client Account" titleIcon="person_add">
        <form className="flex flex-col gap-3" onSubmit={handleAddClientSubmit}>
          <div>
            <label className="block text-label-md text-ink mb-1">Shop / Business Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Bilal Mobile Repair Hub"
              className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-label-md text-ink mb-1">Contact Person</label>
              <input
                name="contact"
                type="text"
                required
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Phone</label>
              <input
                name="phone"
                type="text"
                required
                placeholder="+92 3XX XXXXXXX"
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-label-md text-ink mb-1">Shop / Area</label>
              <input
                name="shop"
                list="shop-options"
                type="text"
                required
                defaultValue={shopOptions[0] || ""}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <datalist id="shop-options">
                {shopOptions.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Opening Balance (Rs.)</label>
              <input
                name="openingBalance"
                type="number"
                min="0"
                defaultValue={0}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setAddClientOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" icon="person_add">
              Add Account
            </Button>
          </div>
        </form>
      </Modal>

      {/* Remove account — confirm before dropping a client from the ledger */}
      <Modal open={!!removeTarget} onClose={() => setRemoveTarget(null)} title="Remove Account" titleIcon="delete">
        {removeTarget && (
          <div className="flex flex-col gap-4">
            <p className="text-body-md text-ink-muted">
              Remove <span className="text-ink font-semibold">{removeTarget.name}</span> from the Khata ledger?
              {removeTarget.status !== "paid" && (
                <> This account still owes <span className="text-critical font-semibold">{removeTarget.amountOwed}</span>.</>
              )}
              {" "}This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setRemoveTarget(null)}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" icon="delete" onClick={handleRemoveConfirm}>
                Remove Account
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Payment History — every payment logged for this client: who paid, when, and what's left */}
      <Modal
        open={!!historyAccount}
        onClose={() => setHistoryAccountId(null)}
        title={historyAccount ? `Payment History — ${historyAccount.name}` : ""}
        titleIcon="history"
        size="lg"
      >
        {historyAccount && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-body-sm bg-surface-muted rounded-lg px-3 py-2.5">
              <span className="text-ink-muted">
                Invoice Ref: <span className="text-ink font-semibold">{historyAccount.invoiceRef}</span>
              </span>
              <span className="text-ink-muted">
                Currently Owed:{" "}
                <span className={`font-semibold ${historyAccount.status === "paid" ? "text-positive" : "text-critical"}`}>
                  {historyAccount.amountOwed}
                </span>
              </span>
            </div>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-left min-w-[560px]">
                <thead>
                  <tr className="bg-surface-muted text-ink-muted uppercase text-label-sm">
                    <th className="py-2 px-3 rounded-l-lg font-semibold">Date & Time</th>
                    <th className="py-2 px-3 font-semibold">Receipt #</th>
                    <th className="py-2 px-3 text-right font-semibold">Amount Paid</th>
                    <th className="py-2 px-3 font-semibold">Method</th>
                    <th className="py-2 px-3 font-semibold">Paid By</th>
                    <th className="py-2 px-3 rounded-r-lg text-right font-semibold">Balance Left</th>
                  </tr>
                </thead>
                <tbody>
                  {(historyAccount.paymentHistory || []).map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <td className="py-2.5 px-3 text-body-sm text-ink whitespace-nowrap">
                        {p.date}, {p.time}
                      </td>
                      <td className="py-2.5 px-3 text-body-sm text-ink-muted whitespace-nowrap">{p.receiptNo}</td>
                      <td className="py-2.5 px-3 text-right tabular-figures text-body-sm text-ink font-semibold">{p.amount}</td>
                      <td className="py-2.5 px-3 text-body-sm text-ink-muted">{p.method}</td>
                      <td className="py-2.5 px-3 text-body-sm text-ink-muted">{p.paidBy}</td>
                      <td className="py-2.5 px-3 text-right tabular-figures text-body-sm text-ink-muted">{p.balanceAfter}</td>
                    </tr>
                  ))}
                  {(!historyAccount.paymentHistory || historyAccount.paymentHistory.length === 0) && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-body-sm text-ink-muted">
                        No payments recorded yet for this account.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                icon="payments"
                onClick={() => {
                  setHistoryAccountId(null);
                  openPaymentModalForAccount(historyAccount);
                }}
              >
                Record Another Payment
              </Button>
              <Button variant="secondary" onClick={() => setHistoryAccountId(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
