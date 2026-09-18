# growthrush.ai — National Expansion landing page

A standalone, single-page landing site for the done-for-you national expansion
offer. Every piece of copy, every logo and the countdown deadline are edited in
Payload CMS at `/admin`; the components hold layout only.

## Stack

Matched to the main `growthrush-ai` app so the two stay consistent:

- **Next.js 16** (App Router) + React 19
- **Payload CMS 3** on Postgres, mounted at `/admin` in this same app
- **pnpm**
- **Tailwind CSS v4** (CSS-first config in `src/app/(frontend)/globals.css`)
- **shadcn/ui** (`radix-nova` style, Radix base) + lucide-react icons
- **motion** for scroll reveals
- **Inter** / **Outfit** via `next/font`

## Getting started

```bash
cp .env.example .env          # then fill in the values described there
pnpm install
pnpm seed                     # migrates the launch copy into the CMS (once)
pnpm dev                      # http://localhost:3000 — admin at /admin
```

`pnpm seed` writes the original hardcoded copy from
[`src/seed/initial-content.ts`](src/seed/initial-content.ts) into the `landing`
global, uploads `public/logos/*` and the stand-in artwork in `src/seed/assets/`
into the media library, and creates the admin user from `ADMIN_EMAIL` /
`ADMIN_PASSWORD`. It is safe to re-run: media is matched by filename, the user is
only created when none exists, and the global is overwritten wholesale.

Payload reads `DATABASE_URL_UNPOOLED` in preference to `DATABASE_URL`. It pushes
schema changes automatically in development, and PgBouncer's transaction pooling
cannot carry the session state that needs.

Other scripts:

```bash
pnpm build                    # production build (needs DATABASE_URL — the page
                              # is prerendered from the database)
pnpm lint
pnpm generate:types           # regenerate src/payload-types.ts after a schema change
pnpm generate:importmap       # regenerate the admin import map after adding a custom component
```

## Theme

The palette is carried over verbatim from the main app's `globals.css` — dark
navy surface (`#050814`), brand blue (`#5b7fff`), orange accent (`#f97316`),
green for affirmative ticks. The design this page was built from used
green/saffron; those were remapped onto the app's tokens.

The landing page is dark-only, so the app's `.theme-light` block is not carried
over. Every colour is a token: change it in `globals.css`, not in a component.

## Page structure

Sections render in order from
[`src/app/(frontend)/page.tsx`](src/app/(frontend)/page.tsx); each one lives in
`src/components/landing/`.

| Section | Component | Anchor |
| --- | --- | --- |
| Announcement + countdown | `top-bar.tsx` | — |
| Sticky nav | `site-nav.tsx` | — |
| Hero + India network map | `hero.tsx`, `network-map.tsx` | — |
| Headline stats | `proof-stats.tsx` | `#proof` |
| Client logo strip | `logo-strip.tsx` | — |
| Problem + revenue chart | `problem.tsx`, `revenue-chart.tsx` | — |
| Video testimonials | `video-testimonials.tsx` | — |
| The Expansion Engine | `engine.tsx` | `#engine` |
| Distributor / Franchise tracks | `tracks.tsx` | `#tracks` |
| Case studies | `case-studies.tsx` | — |
| Fit / not a fit | `fit.tsx` | — |
| Offer + price + countdown | `offer.tsx` | `#offer` |
| Bonuses | `bonuses.tsx` | — |
| Team | `team.tsx` | — |
| Guarantee + cost of waiting | `guarantee.tsx` | — |
| FAQ | `faq.tsx` | `#faq` |
| Closing CTA | `final-cta.tsx` | — |
| Sticky bottom CTA | `sticky-cta.tsx` | — |
| Footer | `site-footer.tsx` | — |

`cta-break.tsx` provides the CTA bands repeated between sections.

### No route off this page

By design, the site is one page with no way out: every link is a `ScrollLink`
in-page anchor, and there is no `next/link` import or external `href` anywhere
in `src/`. Nothing points back at the main growthrush.ai app.

## Editing content

Everything lives in the **Landing Page** global at `/admin`, split into five
tabs: Chrome, Hero & proof, Problem & stories, Engine & offer, Close. Saving any
tab revalidates `/` immediately — no redeploy.

- **Logos** — *Hero & proof → Client logo strip*. Upload replacements into the
  Media collection; `alt` text is required and is what screen readers announce.
- **Countdown** — *Chrome → Applications close at* is a real date-time. The
  ticker itself is computed on the client (see `use-countdown.ts`) so server and
  client agree on the first render. Push the date forward when a new cohort
  opens.
- **Video testimonials** — set exactly one of `youtubeId`, `vimeoId` or `mp4`
  on an entry to make that card playable; `poster` is optional. Leave all three
  empty and the card shows a hint instead. The embed only mounts on click, so
  an unplayed page makes no third-party requests.
- **Case studies / testimonials** ship with `[Brand name]` placeholders — swap
  in real names and figures before launch.

### How content reaches the page

[`src/lib/content.ts`](src/lib/content.ts) reads the global through Payload's
Local API (in-process, no HTTP) and normalises it — bullet lists come back as
`string[]`, uploads as `{ src, alt, width, height }`. It is wrapped in React's
`cache`, so each server section calls `getLandingContent()` for its own slice and
they all share one database read per request. Only the interactive (`"use
client"`) sections take content as props from `page.tsx`.

The page is prerendered, so a save would otherwise never reach visitors: the
`afterChange` hook in [`src/lib/revalidate-landing.ts`](src/lib/revalidate-landing.ts)
calls `revalidatePath("/")` on every publish.

### Changing the content model

Edit [`src/globals/Landing.ts`](src/globals/Landing.ts), then run
`pnpm generate:types` and update the mapping in `src/lib/content.ts`. Payload
generates the Postgres migration on next boot in dev.

### Media storage

Uploads go to Vercel Blob whenever `BLOB_READ_WRITE_TOKEN` is set, which is what
makes them work on a serverless host with a read-only filesystem. Without the
token, Payload falls back to writing `public/media` on local disk.

Either way the files are served through Payload's own `/api/media/file/<name>`
route, so they are same-origin and need no `images.remotePatterns` entry in
`next.config.ts`.

## The admin panel

`/admin` redirects straight to the login form; sign in with `ADMIN_EMAIL` and
`ADMIN_PASSWORD`. The panel is pinned to the dark theme to match the marketing
site — [`src/app/(payload)/custom.scss`](src/app/(payload)/custom.scss) re-points
Payload's `--theme-elevation-*` ramp at the brand navy, which tints the whole
surface without restyling individual components. The wordmark and nav mark come
from [`src/components/admin/`](src/components/admin/).

Two things the admin styling depends on, both easy to break:

- **`sass` must stay installed.** Payload's stylesheet is SCSS, and Next silently
  ships an unstyled panel if it cannot compile it.
- **`import "@payloadcms/next/css"` must stay in
  [`(payload)/layout.tsx`](src/app/(payload)/layout.tsx)**, before `./custom.scss`
  so the overrides land on top. A CSS import in a route handler does nothing.

Payload's class names (`.template-minimal__wrap`, `.login__brand`,
`.nav__link--active`) are internal, not a public API. If a Payload upgrade makes
part of the panel look wrong, check those selectors still exist before adding new
ones — a rule targeting a class that no longer exists fails silently.

After adding or changing a custom admin component, run `pnpm generate:importmap`.

## Known placeholders

- Case study and video testimonial names, quotes and metrics.
- Video testimonial posters are generic stock images from
  [Lorem Picsum](https://picsum.photos), seeded so the cards are not empty.
  Replace them in the media library with real video stills.
- The team photo is an optional upload (*Close → Team → Photo*). Left empty, the
  section falls back to the styled placeholder box.
- The design had a second "As featured in" press-logo strip; there are no press
  logos in the repo, so only the real brand strip is rendered.
- Both "Register & get your Blueprint" CTAs scroll to the offer section. Point
  them at a real form or payment flow when one exists.

## Accessibility & motion

Every scroll reveal, the map, the chart and the CTA shine respect
`prefers-reduced-motion` and render in their final state when it is set.
