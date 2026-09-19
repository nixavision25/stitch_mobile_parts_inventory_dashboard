import { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import InventoryRow from "../components/inventory/InventoryRow";
import { useToast } from "../components/ui/ToastContext";
import { inventoryItems as seedInventoryItems, locations, deriveStockStatus } from "../data/mockData";

const locationNames = locations.map((loc) => loc.name);

export default function Inventory() {
  const showToast = useToast();
  const [items, setItems] = useState(seedInventoryItems);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [moveTarget, setMoveTarget] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [addItemOpen, setAddItemOpen] = useState(false);

  const categories = useMemo(() => ["all", ...new Set(items.map((item) => item.category))], [items]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesQuery = !q || item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, activeCategory]);

  function handleAddItemSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name").trim();
    const sku = form.get("sku").trim().toUpperCase();
    const category = form.get("category").trim();
    const location = form.get("location");
    const stockQty = Number(form.get("stockQty"));
    const reorderLevel = Number(form.get("reorderLevel"));
    const unitCost = Number(form.get("unitCost"));

    const newItem = {
      id: `inv-${Date.now()}`,
      name,
      sku,
      category,
      location,
      stockQty,
      reorderLevel,
      unitCost: `Rs. ${unitCost.toLocaleString("en-PK")}`,
      status: deriveStockStatus(stockQty, reorderLevel),
    };

    setItems((prev) => [newItem, ...prev]);
    setAddItemOpen(false);
    e.target.reset();
    showToast("Item Added to Inventory", `${name} logged at ${location} with ${stockQty} units in stock.`);
  }

  function handleTransferSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const from = form.get("from");
    const to = form.get("to");
    const quantity = form.get("quantity");
    const rider = form.get("rider").trim();

    setItems((prev) => prev.map((item) => (item.id === moveTarget.id ? { ...item, location: to } : item)));
    setMoveTarget(null);
    showToast(
      "Transfer Voucher Created",
      `${quantity} units of ${moveTarget.name} routed ${from} → ${to} with ${rider}. Manifest sent to receiving manager.`
    );
  }

  function handleRemoveConfirm() {
    setItems((prev) => prev.filter((item) => item.id !== removeTarget.id));
    showToast("Item Removed", `${removeTarget.name} was removed from your inventory records.`);
    setRemoveTarget(null);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface p-5 rounded-xl shadow-sm">
        <div>
          <h1 className="text-headline-lg text-ink">Inventory Across Locations</h1>
          <p className="text-body-md text-ink-muted mt-0.5">
            Search, filter, and move stock between your godown and retail shops.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" icon="flag" onClick={() => showToast("Security Alert Logged", "Incident report initiated. Warehouse security alerted to retain transport CCTV footage.")}>
            Flag Discrepancy
          </Button>
          <Button variant="secondary" size="sm" icon="download" onClick={() => window.print()}>
            Export / Print
          </Button>
          <Button size="sm" icon="add" onClick={() => setAddItemOpen(true)}>
            Add New Item
          </Button>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-lg" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by part name or SKU..."
              className="w-full bg-surface-muted pl-10 pr-4 py-2.5 rounded-lg text-body-md text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-label-md transition-colors ${
                  activeCategory === cat ? "bg-primary text-on-primary" : "bg-surface-muted text-ink hover:bg-border/50"
                }`}
              >
                {cat === "all" ? "All Parts" : cat}
                {cat !== "all" && (
                  <span className="ml-1 opacity-70">({items.filter((i) => i.category === cat).length})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-left min-w-[760px]">
            <thead>
              <tr className="bg-surface-muted text-ink-muted uppercase text-label-sm">
                <th className="py-2.5 px-4 rounded-l-lg font-semibold">Item</th>
                <th className="py-2.5 px-4 font-semibold">Location</th>
                <th className="py-2.5 px-4 text-right font-semibold">Stock</th>
                <th className="py-2.5 px-4 text-right font-semibold">Unit Cost</th>
                <th className="py-2.5 px-4 text-center font-semibold">Status</th>
                <th className="py-2.5 px-4 rounded-r-lg text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <InventoryRow key={item.id} item={item} onMove={setMoveTarget} onRemove={setRemoveTarget} />
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-body-md text-ink-muted">
                    No parts match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-label-sm text-ink-muted px-2">
          Showing {filteredItems.length} of {items.length} items across {locations.length} locations.
        </p>
      </Card>

      {/* Add New Item — real intake fields, distinct from the transfer/move flow */}
      <Modal open={addItemOpen} onClose={() => setAddItemOpen(false)} title="Add New Item to Inventory" titleIcon="inventory">
        <form className="flex flex-col gap-3" onSubmit={handleAddItemSubmit}>
          <div>
            <label className="block text-label-md text-ink mb-1">Part Name & Model</label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. iPhone 14 Pro OLED Display"
              className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-label-md text-ink mb-1">SKU</label>
              <input
                name="sku"
                type="text"
                required
                placeholder="LCD-APL-14P"
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Category</label>
              <input
                name="category"
                list="category-options"
                type="text"
                required
                defaultValue={categories.find((c) => c !== "all") || ""}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <datalist id="category-options">
                {categories.filter((c) => c !== "all").map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>
          <div>
            <label className="block text-label-md text-ink mb-1">Initial Location</label>
            <select
              name="location"
              required
              className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {locationNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-label-md text-ink mb-1">Stock Qty</label>
              <input
                name="stockQty"
                type="number"
                min="0"
                required
                defaultValue={10}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Reorder Level</label>
              <input
                name="reorderLevel"
                type="number"
                min="1"
                required
                defaultValue={20}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Unit Cost (Rs.)</label>
              <input
                name="unitCost"
                type="number"
                min="0"
                required
                defaultValue={1000}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setAddItemOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" icon="add">
              Add to Inventory
            </Button>
          </div>
        </form>
      </Modal>

      {/* Move Stock — transfer an existing item between locations */}
      <Modal open={!!moveTarget} onClose={() => setMoveTarget(null)} title={moveTarget ? `Move: ${moveTarget.name}` : ""} titleIcon="local_shipping">
        {moveTarget && (
          <form className="flex flex-col gap-3" onSubmit={handleTransferSubmit}>
            <div>
              <label className="block text-label-md text-ink mb-1">From Location</label>
              <select
                name="from"
                defaultValue={moveTarget.location}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {locationNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">To Location</label>
              <select
                name="to"
                defaultValue={locationNames.find((name) => name !== moveTarget.location) || locationNames[0]}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {locationNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Quantity to Move</label>
              <input
                name="quantity"
                type="number"
                min="1"
                max={moveTarget.stockQty}
                defaultValue={Math.min(10, moveTarget.stockQty)}
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-label-md text-ink mb-1">Assigned Rider / Chota / Cargo</label>
              <input
                name="rider"
                type="text"
                required
                placeholder="e.g. Bilal (Rider/Chota - Bike 124)"
                className="w-full bg-surface-muted px-3 py-2 rounded-lg text-body-md text-ink border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="flex items-start gap-2 bg-warning-bg text-warning-text text-body-sm rounded-lg p-3">
              <Icon name="verified_user" className="text-base mt-0.5 shrink-0" />
              <span>Rider must carry a signed physical manifest slip matching this voucher before dispatch.</span>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={() => setMoveTarget(null)}>
                Cancel
              </Button>
              <Button type="submit">Create Transfer Voucher</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Remove item — confirm before permanently dropping a row */}
      <Modal open={!!removeTarget} onClose={() => setRemoveTarget(null)} title="Remove Item" titleIcon="delete">
        {removeTarget && (
          <div className="flex flex-col gap-4">
            <p className="text-body-md text-ink-muted">
              Remove <span className="text-ink font-semibold">{removeTarget.name}</span> ({removeTarget.sku}) from your
              inventory records? This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setRemoveTarget(null)}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" icon="delete" onClick={handleRemoveConfirm}>
                Remove Item
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
