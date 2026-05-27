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

## Project order

1. **Trade Promo Optimiser** (featured) — execDas / RGM dashboard
2. Atlas Companion, Data Product Marketplace, Smart Targets
3. Academic & side projects
