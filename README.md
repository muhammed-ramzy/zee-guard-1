# ZeeGuard

Custom-protection marketing site for ZeeGuard mouthguards, built with Next.js 15 (App
Router), React 19, TypeScript, and Tailwind CSS — recreated pixel-for-pixel from the
supplied design screenshots.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Pages

| Route             | Purpose                                                        |
| ------------------ | --------------------------------------------------------------- |
| `/`                | Home — hero, features, trust stats, category preview, process, comparison table, testimonials, FAQ, CTA |
| `/gallery`         | Filterable design gallery                                       |
| `/categories`      | Pricing tiers (CoreFit / DesignFlex / Fusion) + Braces series    |
| `/designer`        | Interactive live-preview mouthguard configurator                |
| `/how-it-works`    | Six-step process timeline                                       |
| `/athletes`        | Sponsored athletes, stats, and verified reviews                 |
| `/contact`         | Contact methods, validated contact form (React Hook Form + Zod), lab locations |

## Project structure

```
app/                 Routes (App Router), layout, global styles, self-hosted fonts
components/
  layout/             Header, Footer
  sections/           Page-level sections composed from ui/ primitives
  ui/                 Reusable primitives: Button, Container, Card variants, etc.
constants/            Static content/data that feeds the sections (typed via types/)
lib/                  cn() utility, Zod schemas
types/                Shared TypeScript interfaces
public/images/        Placeholder artwork (SVG) — swap for real photography/product shots
```

## Notes & assumptions

- **Images**: all imagery under `public/images/` is placeholder art generated to match
  each design's color story (mouthguard product shots, athlete portraits, gallery
  pieces, lab photo). Swap in real photography using the same filenames, or update the
  `IMAGE_MAP` in the relevant card component.
- **Fonts**: Anton (display) + Inter (body) are self-hosted under `app/fonts/` via
  `next/font/local`, so the build has no runtime dependency on Google Fonts.
- **Designer page**: implemented as a working configurator (name/model/thickness
  fields, artwork upload, color picker, scale/position/rotation sliders, PNG export,
  and an "open Instagram" action) since the design shows a functional studio tool
  rather than static content.
- **Contact form**: the screenshots didn't include a message form, so one was added
  (React Hook Form + Zod validation) as the reasonable next step for a "Contact Us"
  page; it currently logs submissions to the console — wire up an API route or email
  service to make it live.
- **Content**: category list, testimonials, FAQ copy, pricing, and athlete bios are
  transcribed directly from the screenshots; anything not legible in the source images
  (e.g. exact map coordinates) uses a reasonable placeholder.
