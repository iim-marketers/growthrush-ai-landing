# growthrush.ai — National Expansion landing page

A standalone, single-page landing site for the done-for-you national expansion
offer. Every piece of copy and the countdown deadline are edited in Payload CMS
at `/admin`; the components hold layout only. The client logo strip is the one
exception — it reads `public/logos` straight from the codebase.

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
global, uploads the stand-in artwork in `src/seed/assets/` into the media
library, and creates the admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD`. It is safe to re-run: media is matched by filename, the user is
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
pnpm fix:nav-links            # drop navigation links whose section is gone
```

`pnpm fix:nav-links` repairs navigation links that point at an anchor the page
no longer has. The admin will not save one and the page will not render one, so
this is only needed for links written straight into the database, or stored
before these rules existed. It runs with the schema push disabled — set
`PAYLOAD_SKIP_SCHEMA_PUSH=true` for any script that has to read the database
before Payload reshapes it — and does nothing when every link is already valid.

## Theme

The palette is carried over verbatim from the main app's `globals.css` — dark
navy surface (`#050814`), brand blue (`#5b7fff`), orange accent (`#f97316`),
green for affirmative ticks. The design this page was built from used
green/saffron; those were remapped onto the app's tokens.

The landing page is dark-only, so the app's `.theme-light` block is not carried
over. Every colour is a token: change it in `globals.css`, not in a component.

## Page structure

The page is composed at request time by `pageComposition()` in
[`src/lib/sections.ts`](src/lib/sections.ts), and
[`src/app/(frontend)/page.tsx`](src/app/(frontend)/page.tsx) renders whatever it
returns. Each built-in section lives in `src/components/landing/`.

The order of the sections is fixed in code — it is the funnel the page was
designed around. What the CMS controls is which of them appear and what anchor
each one answers to.

The anchors below are defaults: each section has a **Target ID** field in the
admin, and changing it changes the `#anchor` the section renders with.

| Section | Component | Default target ID | Hidden when |
| --- | --- | --- | --- |
| Announcement + countdown | `top-bar.tsx` | — | never |
| Sticky nav | `site-nav.tsx` | — | never |
| Hero + India network map | `hero.tsx`, `network-map.tsx` | `#hero` | never |
| Headline stats | `proof-stats.tsx` | `#proof` | no proof stats |
| Client logo strip | `logo-strip.tsx` | `#clients` | `public/logos` is empty |
| Problem + revenue chart | `problem.tsx`, `revenue-chart.tsx` | `#problem` | never |
| Video testimonials | `video-testimonials.tsx` | `#testimonials` | no entries |
| The Expansion Engine | `engine.tsx` | `#engine` | no pillars |
| Distributor / Franchise tracks | `tracks.tsx` | `#tracks` | no tracks |
| Case studies | `case-studies.tsx` | `#case-studies` | no entries |
| Fit / not a fit | `fit.tsx` | `#fit` | no points either side |
| Offer + price + countdown | `offer.tsx` | `#offer` | never |
| Bonuses | `bonuses.tsx` | `#bonuses` | no entries |
| Team | `team.tsx` | `#team` | no paragraphs |
| Guarantee + cost of waiting | `guarantee.tsx` | `#guarantee` | never |
| FAQ | `faq.tsx` | `#faq` | no questions |
| Closing CTA | `final-cta.tsx` | `#apply` | never |
| Sticky bottom CTA | `sticky-cta.tsx` | — | never |
| Footer | `site-footer.tsx` | — | never |

`cta-break.tsx` provides the CTA bands repeated between sections.

### Sections and navigation stay in step

`pageComposition()` is the single pass that decides what the page contains, and
everything else is derived from it — so a navigation link can never outlive what
it points at:

- **A section with no content is not rendered.** An empty heading is worse than
  no section, and every link aimed at it disappears with it.
- **In the admin**, *Chrome → Navigation links* offers a live dropdown of the
  anchors currently on the page — the sections that still have content. It is
  built by [`anchor-select-field.tsx`](src/components/admin/anchor-select-field.tsx),
  which rebuilds a stand-in document from the open form and runs the same
  `pageComposition()` over it, so the list updates as you type without a save.
- **Target IDs must be unique** and URL-safe, checked across all sections.
- **Renaming a target ID carries the links with it.** A `beforeValidate` hook
  ([`follow-anchor-renames.ts`](src/lib/follow-anchor-renames.ts)) rewrites every
  navigation link that pointed at the old anchor, so a rename is not a trap.
- **At render time**, [`src/lib/content.ts`](src/lib/content.ts) drops any link
  whose anchor is not on the page or is already used, so rows written straight
  into the database cannot put a dead link there either.
- **In the browser**, `ScrollLink` handles the click itself in every case, so a
  link can never strand a visitor on a `/#something` URL that scrolls nowhere.

Adding a section means adding it to `SECTIONS` in `src/lib/sections.ts` with its
`anchorPath` and `contentPaths`, adding that target-ID field to
`src/globals/Landing.ts`, and adding a case to `BuiltInSection` in `page.tsx`.
The switch is exhaustive over `SectionId`, so a missing case is a build error.

### No route off this page

By design, the site is one page with no way out: every link is a `ScrollLink`
in-page anchor, and there is no `next/link` import or external `href` anywhere
in `src/`. Nothing points back at the main growthrush.ai app.

## Editing content

Everything lives in the **Landing Page** global at `/admin`, split into five
tabs: Chrome, Hero & proof, Problem & stories, Engine & offer, Close. Saving any
tab revalidates `/` immediately — no redeploy.

- **Navigation links** — *Chrome → Navigation links*. Each row is a label plus a
  section picked from a dropdown of what is currently on the page; the order here
  is the order in the header and the footer. A section with no content cannot be
  linked, because it is not rendered.
- **Target IDs** — every section has one, next to its own fields, and it is what
  a navigation link points at. Leave it blank to keep the built-in default shown
  as the field's placeholder. Rename it and the links follow automatically.
- **Client logos** — **not** in the CMS. The strip renders whatever image files
  sit in [`public/logos`](public/logos), so adding a brand means dropping a file
  in; there is nothing to upload and nothing to save. Only the heading above the
  strip is editable, at *Hero & proof → Logo strip heading*.

  [`src/lib/client-logos.ts`](src/lib/client-logos.ts) holds a map of filename →
  display name. Its keys set the running order and its values are the `alt` text
  a screen reader announces, because filenames alone read badly ("Ey",
  "Centuryply"). A file that is not in the map still appears, after the listed
  ones, named from its filename — so the map is worth an entry whenever the
  derived name is wrong.

  The page is prerendered, so the folder is read at build time. A CMS save
  re-renders it on the server, where `public/` is not traced into the bundle by
  default — `outputFileTracingIncludes` in `next.config.ts` puts it there, and
  the reader falls back to the map if the folder is unreadable anyway.
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
