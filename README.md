# StockLine

Inventory & payments management demo for mobile phone parts importers and distributors — multi-shop stock
visibility, transfer/shrinkage tracking, WhatsApp Khata (credit) reminders, and demand/restock reporting.

This is a **client-facing MVP demo**: all data is static mock data (no backend, no auth, no persistence). It's
built to be clicked through and evaluated, not deployed as production software.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme` config, no `tailwind.config.js`)
- [Material Symbols](https://fonts.google.com/icons) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

Other scripts:

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## Project structure

```
public/                  Static assets served as-is (logo, favicon)
src/
  components/
    ui/                  Generic reusable UI: Button, Badge, Card, Modal, Icon, StatCard, ToastContext
    layout/               App shell: Sidebar, Header, MobileNav, AppLayout, shared nav config
    dashboard/            Dashboard-only building blocks (location cards, alert rows, top sellers, ...)
    inventory/            Inventory-only building blocks (table rows)
    payments/             Payments-only building blocks (ledger rows)
    reports/              Reports-only building blocks (demand rows, restock rows, shop comparison cards)
  pages/                  One file per screen: Landing, Dashboard, Inventory, Payments, Reports
  data/
    mockData.js           Single source of truth for all mock/demo data — swap for real API calls later
  styles/
    tokens.css             Design tokens (colors, font) as a Tailwind v4 @theme block
    typography.css         Type scale as plain CSS classes (headline/body/label/display/metric)
    global.css              Base resets + imports
  App.jsx                  Route definitions
  main.jsx                 App entry point
```

## Navigation

- `/` — marketing landing page (hero, problems solved, "See it in action" CTA)
- `/app/dashboard` — daily overview: KPIs, stock-by-location, alerts, payment reminders, top sellers
- `/app/inventory` — searchable/filterable parts table across all locations, stock transfers
- `/app/payments` — Khata (credit) ledger, WhatsApp payment reminders, record payments
- `/app/reports` — weekly demand vs. stock, restock suggestions, shop-to-shop comparison

The sidebar (desktop) / bottom nav (mobile) links between the four app screens, and includes a
"Back to overview" link that returns to the landing page.

## Mock data

Everything rendered in the app is sourced from [`src/data/mockData.js`](src/data/mockData.js) — business info,
locations, KPIs, stock alerts, payment reminders, inventory items, ledger accounts, demand trends, restock
suggestions, and shop comparisons. All currency is shown in Rs. (PKR) across two shops (Lahore, Karachi) plus a
central godown. Replacing this file's exports with real API calls is the intended path to a production build.
