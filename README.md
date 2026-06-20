# Mood & Med Tracker App

A Progressive Web App (PWA) for tracking daily mood and medication adherence,
built with React, TypeScript, Vite and Tailwind CSS. Data is stored locally in
the browser (`localStorage`) and the app works offline via a service worker.

The original design is available on
[Figma](https://www.figma.com/design/ScigRgUnPhxDn2592113Jo/Mood---Med-Tracker-App).

## Requirements

- Node.js 20+
- npm

## Getting started

```bash
npm ci          # install dependencies (uses package-lock.json)
npm run dev     # start the dev server at http://localhost:3000
```

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the Vite dev server                    |
| `npm run build`     | Production build to `dist/`                   |
| `npm run typecheck` | Type-check the project with `tsc --noEmit`    |
| `npm run lint`      | Lint the source with ESLint                   |
| `npm test`          | Run the unit tests with Vitest                |

## Project structure

- `src/` – application source (components, screens, utilities)
- `public/` – static assets, PWA manifest and service worker (`sw.js`)
- `src/supabase/functions/server/` – Supabase **Edge Functions** (Deno runtime).
  These are deployed to Supabase and are **not** part of the Vite frontend
  build. They use Deno-style imports (`jsr:` / `npm:`) and therefore do not
  appear in `package.json` dependencies.

## Notes

- The app is frontend-only; all user data lives in `localStorage` on the device.
- `dist/` is generated output and is not committed to the repository.
