# KoinX — Tax Loss Harvesting Assignment

This repository contains a full-stack implementation of the KoinX Frontend Intern assignment. The app provides a responsive tax-loss harvesting experience with mock API integration, selection-based recalculation of capital gains, and a polished dark/light UI.

## Features

- Responsive dashboard with pre-harvesting and after-harvesting capital gains cards
- Interactive holdings table with select-all / per-row selection
- Real-time recalculation of profits, losses, net gains, and realised gains
- Loading and error states for API requests
- Collapsible disclaimer panel and a “How it works?” tooltip
- Dark/light theme toggle

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Express.js with mock REST endpoints

## Project structure

```text
koinx-tax-harvesting/
├── backend/             Mock Express API
│   ├── data/             JSON fixtures for holdings and capital gains
│   └── server.js         API server entry point
├── frontend/            React + TypeScript app
│   ├── src/              Application source code
│   └── package.json      Frontend dependencies and scripts
└── README.md            This file
```

## Getting started

### 1) Backend

```bash
cd backend
npm install
npm start
```

The mock API will run at http://localhost:4000.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite app will run at http://localhost:5173 and proxy API requests to the backend.

## API endpoints

- GET /api/holdings
- GET /api/capital-gains

## Business logic

- Net short-term and long-term gains are calculated as profits minus losses.
- Selecting a holding updates the after-harvesting card in real time.
- Positive gains are added to profits, negative gains are added to losses, and the effective capital gains are recalculated.
- The savings message appears when post-harvesting effective gains are lower than pre-harvesting realised gains and at least one asset is selected.

## Assumptions

- Duplicate holdings in the mock data are treated as distinct rows.
- “Amount to Sell” displays the full holding amount for selected rows and a dash otherwise.
- The implementation uses a simple, defensible savings proxy based on the reduction in realised capital gains.
- The table initially shows the first 6 rows and can be expanded with the “View all” control.

## Screenshots

Add screenshots to the repository’s docs or assets folder and update this section with images for:

- Desktop overview
- Mobile holdings view
- Dark mode view

## Deployment

- Frontend: deploy the Vite app on Vercel or Netlify.
- Backend: deploy the Express server on Render, Railway, or a similar Node hosting provider.
- For production, set the frontend environment variable VITE_API_BASE_URL to the deployed backend URL.

## Bonus items implemented

- Mobile responsiveness
- Reusable UI components
- Loading and error states
- Selection feedback and “View all” behaviour
- Light/dark theme support
