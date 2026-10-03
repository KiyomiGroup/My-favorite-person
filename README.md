# For My Favorite Human ❤️

A mobile-first, interactive Boyfriend's Day website (React + TypeScript + Vite). Fully static: no backend, no accounts.

**Build status: All 6 stages complete.** Each new stage is delivered as an updated ZIP.

## Requirements
- [Node.js](https://nodejs.org) 20 or newer (only needed to run it locally)
- A free GitHub account

## Run locally
```bash
npm install
npm run dev        # opens http://localhost:5173
npm run build      # type-check + production build into /dist
```

## Add your photographs
1. Put your photos in `public/images/`.
2. Open `src/config/images.ts`, set `file` to the file name and `enabled: true`.
3. Tweak `objectPosition` if a face gets cropped.

Slots: `opening` (first screen), `scrapbook` (middle stages), `letter` (final letter).
Until enabled, a CSS heart illustration is shown.

## Edit text
All stage text lives in `src/config/content.ts`.

## Deploy to GitHub Pages
1. Create a new **public** repository on GitHub (e.g. `boyfriend-day`).
2. Upload all files from this ZIP (after unzipping) to the repository root. Keep the `.github` folder. On GitHub: **Add file → Upload files**, drag everything in, **Commit**.
   - Do NOT upload `node_modules` or `dist`.
3. Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish (about 1 minute).
5. Your link is `https://YOUR-USERNAME.github.io/REPO-NAME/` (also shown at the end of the workflow run and under Settings → Pages).

The workflow sets the base path from your repository name automatically (`/REPO-NAME/`, or `/` for a `username.github.io` repo). Manual builds use `REPO_NAME` in `vite.config.ts`.

## Publish later changes
When a new stage arrives, unzip it, upload the files to the same repository (replacing existing ones, but keep your edits in `src/config/images.ts` and `public/images/`), and commit to `main`. The site redeploys automatically.

## Edit the love letter
The whole letter is in `src/config/content.ts` under `letter` (wrap words in `**double asterisks**` for bold). The "For all times. / Always." lines are `jokeLine1` and `jokeLine2`. The reward-quiz text is under `stage6`.
