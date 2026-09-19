---
name: Wholesale Ledger & Inventory System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#7d4200'
  on-tertiary: '#ffffff'
  tertiary-container: '#a15600'
  on-tertiary-container: '#ffe6d5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  metric-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  metric-display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

The design system establishes a quiet, dependable, and error-resistant operational environment for wholesale distributors, warehouse supervisors, and procurement clerks. The primary emotional objective is unhurried confidence: users deal with high transaction volumes, high SKU counts, variable margins, and tight credit terms; the interface must feel as stable and orderly as physical accounting stock cards.

The aesthetic blends Corporate / Modern with functional minimalism:
- **Zero Tech Jargon:** Labels prioritize clear commercial terminology ("In Stock", "Unpaid Balance", "Shipment Arrived", "Vendor Owed") over abstract software patterns.
- **Data Clarity Over Novelty:** Visual density is managed through structural borders, clear tabular alignment, and generous tap targets rather than nested menus or complex layered drawers.
- **Physical Ledger Metaphor:** Clean flat cards, crisp line dividers, high-contrast text, and distinct semantic indicator pills that allow warehouse and office staff to assess lot statuses and credit limits at a glance.

## Colors

The palette is engineered for all-day operational use under standard warehouse strip lighting and office monitors, maximizing legibility and minimizing visual fatigue.

### Core Roles
- **Primary (`#0F766E` - Deep Teal):** Used for key calls-to-action (e.g., "Confirm Order", "Receive Shipment"), active navigation states, and confirmed states. It conveys enterprise stability without the cold impersonality of generic corporate blue.
- **Secondary (`#0F172A` - Deep Navy Slate):** Primary headline color, high-emphasis text, prominent currency figures, and structural emphasis.
- **Tertiary (`#D97706` - Warm Amber):** Reserved strictly for warnings, pending customs clearance, approaching payment deadlines, and low stock thresholds.
- **Neutral (`#64748B` - Slate):** Used for secondary captions, metadata labels, unit measures, and disabled indicators.

### Surface & Border Hierarchy
- **Canvas / App Background:** `#F1F5F9` (Subtle cool off-white that prevents screen glare).
- **Surface / Card Background:** `#FFFFFF` (Crisp white for primary data containers and tables).
- **Secondary Surface / Header Fill:** `#F8FAFC` (Muted surface for table headers, ledger summary bars, and locked fields).
- **Structural Borders:** `#E2E8F0` (Crisp separation lines for rows, ledger grids, and field containers).
- **Active Focus Outline:** `#0D9488` with a 2px offset.

### Operational Status Tokens
- **Positive / In-Stock / Cleared:** `#16A34A` text on `#DCFCE7` background.
- **Warning / Low Stock / Due Soon:** `#D97706` text on `#FEF3C7` background.
- **Critical / Overdue / Out of Stock / Damaged:** `#DC2626` text on `#FEE2E2` background.
- **Draft / Inactive:** `#475569` text on `#F1F5F9` background.

## Typography

Plus Jakarta Sans is selected for its high x-height, open counter shapes, and unambiguous letterforms (critical for distinguishing serial numbers, IMEI blocks, and part codes like `0` vs `O` or `1` vs `l`).

### Numeric & Ledger Rules
- All numeric columns (quantities, cost prices, selling margins, invoices, payment balances) must apply tabular lining figures (`font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1`).
- Decimal places must align vertically across entire data tables.
- Currency symbols must render at secondary weight or standard body size to prevent obscuring whole-number values.

## Layout & Spacing

The layout is built on a 12-column fluid grid system with strict bounding containers for desktop environments (`max-width: 1440px`) to prevent ultra-wide data tables from drifting out of natural eye-scan range.

### Breakpoints & Adaptive Reflow
- **Desktop (1024px+):** Full 12-column layout. Main ledger sheets feature a persistent 280px left rail for primary entity navigation (Suppliers, Stock, Invoices, Customers, Warehouses) and an expansive right data sheet.
- **Tablet (768px - 1023px):** 8-column layout. Navigation collapses to a top persistent bar; secondary ledger sidebars collapse into overlay slide-overs. Table columns utilize horizontal scrolling with locked primary identification columns (Part SKU / Order ID).
- **Mobile (< 768px):** 4-column layout. Dense tabular grids transform into structured stacked cards. Data points are paired strictly into key-value horizontal strips. Tap targets increase to a minimum height of 48px to accommodate one-handed operation on warehouse floors.

## Elevation & Depth

This system avoids heavy shadows, 3D skeuomorphism, and intense blurred glass. Visual hierarchy is established almost entirely via tonal layering and low-contrast outlines.

- **Level 0 (Canvas Base):** Flat `#F1F5F9`.
- **Level 1 (Card / Ledger Container):** Flat `#FFFFFF` enclosed in a 1px solid `#E2E8F0` border. No drop shadow.
- **Level 2 (Dropdowns, Autocomplete SKUs, Floating Action Bars):** `#FFFFFF` surface with a 1px solid `#CBD5E1` border and a soft ambient shadow: `0 4px 12px -2px rgba(15, 23, 42, 0.08)`.
- **Level 3 (Modals / Critical Overlays):** `#FFFFFF` surface with `0 12px 24px -4px rgba(15, 23, 42, 0.12)`, backed by a `#0F172A` backdrop scrim at 45% opacity.

## Shapes

The design system employs a "Soft" corner language (`roundedness: 1`). Wholesale inventory management is information-dense; overly rounded corners waste horizontal space and soften the strict rectangular precision required by enterprise ledgers.

- **Inputs, Buttons, Cards, and Data Tables:** `0.25rem` (4px) or `0.5rem` (8px).
- **Status Badges and Count Chips:** Full pill shape (`9999px`) to immediately separate operational status tags from interactive data buttons and input fields.

## Components

### Buttons
- **Primary Action:** Solid `#0F766E` background, `#FFFFFF` bold text, minimum height 44px (48px on mobile), padding `0.75rem 1.5rem`, corner radius 6px. Hover: `#0D9488`. Active: `#115E59`.
- **Secondary Action:** `#FFFFFF` background, 1px solid `#CBD5E1` border, `#0F172A` text. Hover: `#F8FAFC`.
- **Destructive Action:** `#FFFFFF` background, 1px solid `#FECACA` border, `#DC2626` text. Hover: `#FEF2F2`.
- **Button Group / Segmented Control:** Connected buttons with 1px interior dividers in `#E2E8F0` for switching views (e.g., "All Orders | Unpaid | Received").

### Status Chips & Badges
- Strict pill shape (`rounded-full`), padding `0.25rem 0.75rem`, font token `label-md`.
- **In Stock / Paid:** Background `#DCFCE7`, text `#15803D`.
- **Low Stock / Due Soon:** Background `#FEF3C7`, text `#B45309`.
- **Critical / Overdue / Out:** Background `#FEE2E2`, text `#B91C1C`.
- All badges must pair a text label with a 6px solid color dot to aid rapid recognition without relying on color perception alone.

### Data Tables & Ledger Sheets
- **Header Row:** Background `#F8FAFC`, height 40px, bottom border 2px solid `#CBD5E1`, text uppercase `label-sm` in `#64748B`.
- **Data Rows:** Background `#FFFFFF`, alternating hover state `#F8FAFC`, row height 48px, bottom border 1px solid `#E2E8F0`.
- **Summary / Total Rows:** Fixed at bottom or top, background `#F1F5F9`, font weight 700, 2px top border in `#0F172A`.
- Column alignments: Left-align descriptions and SKUs; right-align quantities, unit prices, and sub-totals; center-align badges.

### Input Fields & Search Bars
- Background `#FFFFFF`, 1px solid `#CBD5E1`, padding `0.625rem 0.875rem`, corner radius 6px, text `body-md` in `#0F172A`.
- Placeholder text in `#94A3B8`.
- Focus state: Border color `#0F766E` with a 2px outer ring `rgba(15, 118, 110, 0.15)`.
- Numeric input inputs must provide clean, accessible increment/decrement steppers for rapid carton/case adjustment.

### Checkboxes & Selection Controls
- Checkbox dimensions: 20px x 20px, 4px corner radius, 1.5px solid `#94A3B8`.
- Selected state: Solid `#0F766E` fill with `#FFFFFF` crisp check mark icon.
- Hit area: Padded transparent boundary extending to at least 40px x 40px for error-free line-item selection in fast-paced receiving.

### Cards & Summary KPI Blocks
- `#FFFFFF` surface with 1px border `#E2E8F0` and 8px border radius.
- Padding: `1.25rem`.
- Structure: Small uppercase label (`label-md`) at top, primary value in `metric-display` in `#0F172A`, followed by a sub-caption or trend marker (e.g., "34 orders pending payment").