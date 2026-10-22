# Tenun Lestari

Website for **Tenun Lestari**, a fictional Indonesian brand of sustainable handwoven textiles and home goods: ikat cloth, lurik scarves, songket cushion covers and woven table linen, made together with local artisans using natural dyes.

The site is in **Bahasa Indonesia** by default, with an **English** version under `/en/`. It includes a brand home page, a product collection, services (custom orders, weaving workshops, partnerships, repair), a journal with insights, a contact page, and a fabric care guide built with Starlight.

> Tenun Lestari, its artisans, villages, testimonials, prices and statistics are all fictional sample content. Domains (`tenunlestari.example`), email addresses and social links are placeholders.

This project is a customised derivative of the open-source [ScrewFast](https://github.com/mearashadowfax/ScrewFast) template (MIT). See [Credits and attribution](#credits-and-attribution).

---

## Contents

- [What was customised](#what-was-customised)
- [Stack](#stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Content and copy](#content-and-copy)
- [Artwork](#artwork)
- [Deployment](#deployment)
- [Credits and attribution](#credits-and-attribution)
- [License](#license)

## What was customised

Compared with the upstream ScrewFast template, this fork changes:

- **Brand and metadata.** Name, tagline, descriptions, placeholder domain and contact email, web manifest, theme colour, Open Graph image and favicon.
- **Colours and typography.** A new Tailwind v4 palette in `src/assets/styles/global.css`: `nila` (deep indigo, primary), `ochre` (warm gold accent) and neutrals retuned to an unbleached-cotton off-white with an indigo-tinted dark mode. Fonts are self-hosted via Fontsource: **Fraunces** (serif display) for headings and **Plus Jakarta Sans** for body text. The Starlight docs use the same colours and fonts.
- **Logo.** A woven "anyaman" diamond mark with a stacked serif wordmark (`src/components/BrandLogo.astro`).
- **Languages.** Bahasa Indonesia is the default marketing locale (no URL prefix) and English is secondary (`/en/`). The French locale was removed. The docs follow the same pair (root = `id`, `/en/`).
- **Home page.** Reordered to tell the brand story: hero, weaving process, values, artisan story, collection tabs, sample testimonials, weaving workshops, FAQ and a closing call to action. The partner-logo strip was removed.
- **New components.**
  - `WeavingProcess.astro` ("Proses Menenun"): the four hand-done stages from yarn to finished cloth.
  - `ArtisanStory.astro` ("Cerita Pengrajin"): illustration with a pull quote, the brand story and artisan profile cards.
  - New icons: spool, droplet, loom, leaf, Instagram and YouTube.
- **Navigation and footer.** Indonesian/English labels, regrouped footer links, placeholder social profiles and a footer credit to the ScrewFast template.
- **Content.** Four products, three journal posts, three insights, the services page and the FAQ/workshop data were rewritten for Tenun Lestari in both languages. The construction docs were replaced with a short fabric care guide.
- **Images.** All template photography was removed. Every image is original artwork generated from geometric weaving motifs by `scripts/generate-images.mjs`, so no remote images are used and the Unsplash allowance was dropped from the Astro config and CSP.

## Stack

- [Astro](https://astro.build/) 7 with content collections and MDX
- [Tailwind CSS](https://tailwindcss.com/) 4 (via `@tailwindcss/vite`) and [Preline UI](https://preline.co/)
- [Starlight](https://starlight.astro.build/) for the care guide
- [Fontsource](https://fontsource.org/) (Fraunces, Plus Jakarta Sans)
- [GSAP](https://gsap.com/) and [Lenis](https://lenis.darkroom.engineering/) for animation and smooth scrolling
- [sharp](https://sharp.pixelplumbing.com/) for image generation and processing
- TypeScript, Prettier, pnpm

## Getting started

Requirements: Node.js 24 (CI uses 24) and pnpm. If pnpm is not installed globally, use `corepack pnpm` or `npx pnpm`.

```bash
pnpm install
pnpm dev          # start the dev server at http://localhost:4321
pnpm build        # astro check + astro build + HTML minification
pnpm preview      # serve the production build
pnpm test:smoke   # check every marketing route in both locales (after a build)
```

Regenerate the artwork after changing a motif or palette value:

```bash
node scripts/generate-images.mjs
```

## Project structure

```text
src/
├── assets/styles/        # global.css (theme tokens), Starlight styles
├── components/
│   ├── sections/landing/ # HeroSection, WeavingProcess, ArtisanStory, ...
│   ├── sections/...      # features, testimonials, pricing (workshops), FAQ, navbar & footer
│   └── ui/               # buttons, cards, forms, icons, avatars, ...
├── content/
│   ├── products/{id,en}/ # collection entries
│   ├── blog/{id,en}/     # journal posts
│   ├── insights/{id,en}/ # insights
│   └── docs/             # Starlight care guide (root = id, en/)
├── copy/                 # id.ts (defines the shape) and en.ts
├── data_files/           # site constants, navigation, FAQ/feature/workshop JSON (+ en/)
├── images/tenun/         # generated artwork
├── pages/                # one-line route shells (id); pages/en/ for English
├── utils/                # locale, content and metadata helpers
└── views/                # one view per route, shared by both locales
scripts/
├── generate-images.mjs   # favicon, social card and all site artwork
└── smoke.mjs             # post-build route checks
```

`AI_GUIDE.md` and `CONTEXT.md` describe the conventions in more detail (path aliases, where copy lives, how locales work).

## Content and copy

- **UI and page text** lives in `src/copy/id.ts` and `src/copy/en.ts`. The Indonesian table defines the type, so a missing English string fails `astro check`.
- **Products, journal posts and insights** are Markdown files under `src/content/<collection>/<locale>/`. Use the same file name in both locales so the language switcher links the two versions.
- **Navigation and social links** are in `src/data_files/navigation.ts`; their labels are in the copy tables.
- **Locales** are owned by `src/utils/locale.ts`. Unprefixed paths are Bahasa Indonesia, `/en/…` is English.

## Artwork

`scripts/generate-images.mjs` draws every image from four motif generators: ikat (stepped diamonds), lurik (stripes), songket (eight-point stars) and anyaman (basket weave), arranged into simple scenes (draped cloth, folded stacks, a loom, yarn skeins, dye pots). Scenes are rasterised to WebP with sharp, so the Astro build never processes SVG. The palette constants at the top of the script mirror the Tailwind tokens.

## Deployment

The output in `dist/` is a static site. `vercel.json` keeps the template's security headers and rewrites unknown `/en/…` paths to the English 404 page. Before deploying for real, replace the placeholder domain in `astro.config.mjs` and `src/data_files/constants.ts`, the contact email and the social links.

## Credits and attribution

This site is built on **[ScrewFast](https://github.com/mearashadowfax/ScrewFast)** by Emil Gulamov ([@mearashadowfax](https://github.com/mearashadowfax)), an open-source Astro + Tailwind CSS template released under the **MIT License**. The layout system, many UI components, the locale/copy architecture, the SEO metadata helpers, the build pipeline and the CI setup come from ScrewFast; the full upstream commit history is preserved in this repository. Thank you to the author and contributors.

Also used: [Preline UI](https://preline.co/), [Starlight](https://starlight.astro.build/), the [Fraunces](https://github.com/undercasetype/Fraunces) and [Plus Jakarta Sans](https://github.com/tokotype/PlusJakartaSans) typefaces (SIL Open Font License) via Fontsource, and the icon geometry already included in the template.

## License

Released under the MIT License, the same as the upstream template. The original copyright notice is kept in [LICENSE](LICENSE).
