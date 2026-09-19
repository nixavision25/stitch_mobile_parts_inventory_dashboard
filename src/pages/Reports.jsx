import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import DemandWeekRow from "../components/reports/DemandWeekRow";
import RestockRow from "../components/reports/RestockRow";
import ShopComparisonCard from "../components/reports/ShopComparisonCard";
import { useToast } from "../components/ui/ToastContext";
import { restockSuggestions, shopComparison, weeklyDemand } from "../data/mockData";

export default function Reports() {
  const showToast = useToast();

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg text-ink">Reports & Restock Planning</h1>
          <p className="text-body-md text-ink-muted mt-0.5">
            Demand trends, restock recommendations, and shop performance side by side.
          </p>
        </div>
        <Button variant="secondary" size="sm" icon="download" onClick={() => window.print()}>
          Export / Print
        </Button>
      </div>

      <Card>
        <div className="mb-2">
          <h2 className="text-headline-md text-ink">Weekly Demand vs. Shelf Stock</h2>
          <p className="text-body-sm text-ink-muted mt-0.5">
            Universal 9H Tempered Glass Pack — tracking sell-through against remaining shelf stock.
          </p>
        </div>
        <div className="flex flex-col">
          {weeklyDemand.map((week) => (
            <DemandWeekRow key={week.week} week={week} />
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <h2 className="text-headline-md text-ink">Restock Suggestions</h2>
            <p className="text-body-sm text-ink-muted mt-0.5">
              Ranked by urgency, based on current stock and weekly sell-through rate.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-left min-w-[820px]">
            <thead>
              <tr className="bg-surface-muted text-ink-muted uppercase text-label-sm">
                <th className="py-2.5 px-4 rounded-l-lg font-semibold">Item</th>
                <th className="py-2.5 px-4 text-right font-semibold">In Stock</th>
                <th className="py-2.5 px-4 text-right font-semibold">Sell Rate</th>
                <th className="py-2.5 px-4 text-right font-semibold">Runs Out In</th>
                <th className="py-2.5 px-4 text-right font-semibold">Suggested Order</th>
                <th className="py-2.5 px-4 text-right font-semibold">Est. Cost</th>
                <th className="py-2.5 px-4 text-center font-semibold">Urgency</th>
                <th className="py-2.5 px-4 rounded-r-lg text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {restockSuggestions.map((item) => (
                <RestockRow
                  key={item.id}
                  item={item}
                  onOrder={(i) => showToast("Purchase Order Drafted", `${i.recommendedOrder} units of ${i.name} queued for ${i.vendor}.`)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div>
        <h2 className="text-headline-md text-ink mb-4">Shop Performance Comparison</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {shopComparison.map((shop) => (
            <ShopComparisonCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </>
  );
}
