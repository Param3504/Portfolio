# Param Prajapati — Portfolio

Personal portfolio site built with **React + Vite**. Content is sourced from resume and project work (including **Trade Promo Optimiser** in execDas).

## Run locally

```bash
cd Portfolio
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Replace placeholder images

Drop your own files into `public/` (same filenames):

| File | Use |
|------|-----|
| `profile.svg` or `profile.jpg` | Hero photo — update `src/App.tsx` `src` if you change extension |
| `project-trade-promo.svg` | Trade Promo Optimiser screenshot |
| `project-genai.svg` | Atlas / GenAI project |
| `project-default.svg` | Other projects |

## Build for production

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Deploy to GitHub Pages

Live URL (after deploy): **https://param3504.github.io/Portfolio/**

1. Create a public repo: [github.com/new](https://github.com/new) named **`portfolio`** (no README).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. From this folder, push (one-time login if prompted):

```bash
cd Portfolio
git remote add origin https://github.com/Param3504/Portfolio.git   # skip if already set
git push -u origin main
```

The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

> `vite.config.ts` uses `base: "/Portfolio/"` — must match your repo name exactly (case-sensitive on GitHub Pages).

## Project order

1. **Trade Promo Optimiser** (featured) — execDas / RGM dashboard
2. Atlas Companion, Data Product Marketplace, Smart Targets
3. Academic & side projects
