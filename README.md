# KoinX — Tax Loss Harvesting Tool

A full-stack implementation of the KoinX Frontend Intern assignment: a Tax Loss
Harvesting interface that shows Pre/After harvesting capital gains and lets a
user simulate harvesting by selecting holdings from a table.

- **Frontend:** React + TypeScript + Tailwind CSS (Vite)
- **Backend:** Express (plain JavaScript), serving two mock REST endpoints

## Project structure

```
koinx-tax-harvesting/
├── backend/          Express mock API (holdings + capital gains)
│   ├── data/          Static JSON fixtures used by the endpoints
│   └── server.js
└── frontend/          React + TS + Tailwind app
    └── src/
        ├── api/        fetch client for the backend
        ├── components/ UI components
        ├── hooks/       useTaxHarvesting — data + selection + derived state
        ├── types/       shared TypeScript types
        └── utils/       formatting + pure calculation helpers
```

## Setup

### 1. Backend

```bash
cd backend
npm install
npm start          # runs on http://localhost:4000
```

Endpoints:
- `GET /api/holdings` — mock holdings list (each item gets a stable `id`)
- `GET /api/capital-gains` — mock pre-harvesting capital gains totals

### 2. Frontend

```bash
cd frontend
npm install
npm run dev         # runs on http://localhost:5173
```

In dev, Vite proxies `/api/*` requests to `http://localhost:4000` (see
`vite.config.ts`), so just running both servers is enough — no `.env` needed
locally.

For a deployed build, copy `.env.example` to `.env` in `frontend/` and set
`VITE_API_BASE_URL` to your deployed backend's base URL (e.g.
`https://your-backend.onrender.com/api`), then `npm run build`.

## Business logic

- **Net Short/Long Term Gains** = `profits - losses` for each bucket.
- **Realised / Effective Capital Gains** = `stcgNet + ltcgNet`.
- Selecting a holding adds its `stcg.gain`/`ltcg.gain` into the After
  Harvesting card: positive gains are added to `profits`, negative gains are
  added (as a magnitude) to `losses`. A zero gain doesn't touch either bucket.
- The "You're going to save upto $X" banner appears only when the
  post-harvesting Effective Capital Gains is lower than the pre-harvesting
  Realised Capital Gains **and** at least one holding is selected. `X` is the
  reduction in capital gains (`preRealised - postEffective`), used as a proxy
  for tax saved — the assignment brief defines the *condition* for showing
  the banner but not the exact savings formula, so this was the most direct,
  defensible interpretation from the numbers already on screen.

## Assumptions

- The two duplicate `USDC` and `ETH` entries in the holdings fixture are
  treated as distinct rows (e.g. different bridged versions) — the backend
  assigns each a stable synthetic `id` (`${coin}-${index}`) since `coin`
  alone isn't a safe unique key.
- "Amount to Sell" shows the holding's full `totalHolding` when selected
  (partial-sell isn't in scope per the brief) and `-` otherwise.
- Token amounts are formatted with adaptive precision (more decimals for
  sub-$1 balances, scientific notation for dust-level balances like the
  `SOL`/`FLAME`/`QUICK` rows) so extreme values stay legible instead of
  rendering as a wall of zeros.
- Mobile (`< md`) renders a compact list view of holdings (checkbox, asset,
  holdings + market rate); desktop (`≥ md`) renders the full table with all
  columns, matching the two layouts in the provided Figma/demo screenshots.
- "View all" reveals the full holdings list; the table starts collapsed to
  the first 6 rows, per the bonus "View All" requirement.
- The Important Notes & Disclaimers panel is collapsible and open by default,
  matching the demo screenshots.

## Bonus items implemented

- Mobile responsiveness (separate list/table layouts)
- Reusable components (`CapitalGainsCard`, `GainCell`, `CoinIcon`, etc.)
- State managed via a single custom hook (`useTaxHarvesting`) rather than
  scattering fetch/selection logic across components
- Visual feedback for selection (row highlight, selected-count caption)
- Loading and error states with retry
- "View All" / "View less" toggle in the holdings table
