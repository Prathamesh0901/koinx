# Frontend — KoinX Tax Loss Harvesting

This folder contains the React + TypeScript frontend for the tax-loss harvesting assignment.

## Features

- Pre-harvesting and after-harvesting capital gains cards
- Holdings table with row and select-all selection
- Loading, empty, and error states
- Dark/light theme support
- Responsive layout for mobile and desktop

## Setup

```bash
cd frontend
npm install
npm run dev
```

By default, the app expects the mock backend at http://localhost:4000. The Vite dev server proxies /api requests to that backend automatically.

## Production build

```bash
npm run build
```

## Environment variables

If you want to point the frontend to a deployed backend instead of the local mock API, create a .env file in this folder:

```env
VITE_API_BASE_URL=https://your-backend-url/api
```

## Project structure

```text
src/
├── api/           API client helpers
├── components/    Reusable UI components
├── hooks/         Data and selection state hooks
├── types/         TypeScript models
└── utils/         Formatting and calculation helpers
```

## Screenshots

Add screenshots for the desktop dashboard, mobile holdings view, and dark mode here once you have deployed the app.
