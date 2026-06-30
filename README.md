# Guided by Grace

> Spend 5 minutes with God every day.

A clean, calm Christian web app / PWA. The MVP delivers a 7-day guided journey —
**Finding Peace with God** — where each day offers a Scripture reference, a short
original reflection, a prayer, and one practical step.

## Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router 6**
- No backend, no login, no payments (by design for this MVP)

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
  data/
    journey.js          # Single source of truth for the 7-day journey content
  lib/
    useProgress.js      # Local (no-account) progress tracking via localStorage
  components/           # Reusable UI: Button, Container, Navbar, DayCard, etc.
  pages/
    Landing.jsx         # Marketing landing page + email capture
    TodaysWalk.jsx      # Journey overview, progress, and day list
    DayView.jsx         # A single day's full reading
  App.jsx               # Routes
  main.jsx              # App entry
public/
  manifest.webmanifest  # PWA manifest
  icons/icon.svg        # App icon
```

## Editing journey content

All reflections, prayers, and steps live in `src/data/journey.js`. Add or edit
days there — the UI updates automatically. To add a second journey later, follow
the same shape and extend the routing.

## Notes for future work (intentionally not built yet)

- **Email reminders**: the capture form stores the address locally only. Wire it
  to a real provider (e.g. an API route + ESP) when ready.
- **Accounts & sync**: progress is per-browser via `localStorage`.
- **Payments**: none.

## Deploy to Vercel

This repo is Vercel-ready:

1. Push to a Git provider.
2. Import the project in Vercel — it auto-detects Vite.
3. Build command `npm run build`, output directory `dist`.

`vercel.json` includes an SPA rewrite so client-side routes (e.g. `/walk/day/3`)
resolve correctly on refresh.
