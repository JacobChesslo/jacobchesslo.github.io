# jacobchesslo.github.io

Personal website and consulting site for **Jacob Chesslo** — software engineer and physicist. A fast, accessible, statically-rendered site with cinematic scroll-driven canvas scenes (a Lorenz attractor on the science page, connecting community clusters on the lifestyle page).

**Live:** https://jacobchesslo.github.io

## Stack

- **[Astro](https://astro.build)** — static site generation
- **[SolidJS](https://solidjs.com)** — interactive islands
- **TypeScript** · **TailwindCSS**
- **[Playwright](https://playwright.dev)** — cross-browser test suite

## Structure

```text
src/
├── pages/
│   ├── index.astro              # Home
│   ├── consulting/
│   │   ├── index.astro          # Consulting hub
│   │   ├── science.astro        # Scientific / HPC software consulting
│   │   └── lifestyle.astro      # Web & community-platform consulting
│   └── cv.astro                 # Curriculum vitae (rendered from the submodule)
├── components/                  # Header, Footer, Quotes, shared constants
├── layouts/Layout.astro         # Shared shell — head, nav, JSON-LD schema
├── styles/global.css            # Design tokens + global styles
└── content/curriculum-vitae/    # CV content (git submodule)
scripts/generate-cv-pdf.mjs      # Renders the CV to a downloadable PDF (puppeteer)
```

## Getting started

The CV content lives in a git submodule, so pull it in after cloning:

```sh
git clone --recurse-submodules https://github.com/JacobChesslo/jacobchesslo.github.io.git
# already cloned without submodules?
git submodule update --init

npm install
npm run dev        # http://localhost:4321
```

## Commands

| Command                | Action                                       |
| :--------------------- | :------------------------------------------- |
| `npm run dev`          | Dev server at `localhost:4321`               |
| `npm run build`        | Generate the CV PDF, then build to `./dist/` |
| `npm run preview`      | Preview the production build locally         |
| `npm run test`         | Run the Playwright suite                     |
| `npm run lint`         | ESLint                                       |
| `npm run format:check` | Prettier formatting check                    |

## Deployment

Pushing to `main` triggers the GitHub Actions pipeline (`.github/workflows/`): lint + Prettier, a cross-browser Playwright matrix, then a build (with a freshly-generated CV PDF) deployed to GitHub Pages. A Husky pre-push hook runs the same lint/format/build/test gates locally first.
