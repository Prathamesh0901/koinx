# Backend — KoinX Tax Loss Harvesting

This folder contains a lightweight Express mock API for the KoinX assignment.

## Features

- Serves mock holdings data
- Serves mock capital gains data
- Adds small artificial latency to mimic real API calls
- Supports CORS for local frontend development

## Setup

```bash
cd backend
npm install
npm start
```

The server runs at http://localhost:4000.

## Endpoints

- GET /api/holdings
- GET /api/capital-gains
- GET /

## Data files

- data/holdings.json
- data/capitalGains.json

## Deployment

Deploy this Express app to Render, Railway, Fly.io, or another Node hosting service. Once deployed, set the frontend environment variable VITE_API_BASE_URL to the deployed API URL.
