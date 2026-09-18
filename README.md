# growthrush.ai — National Expansion landing page

A standalone, single-page landing site for the done-for-you national expansion
offer. Frontend only — all content is static, in
[`src/lib/landing-data.ts`](src/lib/landing-data.ts), shaped so Payload CMS can
fill it later without touching the components.

## Stack

Matched to the main `growthrush-ai` app so the two stay consistent:

- **Next.js 16** (App Router) + React 19
- **pnpm**
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **shadcn/ui** (`radix-nova` style, Radix base) + lucide-react icons
- **motion** for scroll reveals
- **Inter** / **Outfit** via `next/font`

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Theme

The palette is carried over verbatim from the main app's `globals.css` — dark
navy surface (`#050814`), brand blue (`#5b7fff`), orange accent (`#f97316`),
green for affirmative ticks. The design this page was built from used
green/saffron; those were remapped onto the app's tokens.

The landing page is dark-only, so the app's `.theme-light` block is not carried
over. Every colour is a token: change it in `globals.css`, not in a component.

## Page structure

Sections render in order from [`src/app/page.tsx`](src/app/page.tsx); each one
lives in `src/components/landing/`.

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

Everything is in `src/lib/landing-data.ts`.

- **Logos** — `showcaseBrands`. Files are in `public/logos/`, copied from the
  main app.
- **Countdown** — `countdownOffset` sets how far out the deadline runs from
  first paint. It is deliberately computed on the client (see
  `use-countdown.ts`) so server and client agree on the first render.
- **Video testimonials** — set exactly one of `youtubeId`, `vimeoId` or `mp4`
  on an entry to make that card playable; `poster` is optional. Leave all three
  empty and the card shows a hint instead. The embed only mounts on click, so
  an unplayed page makes no third-party requests.
- **Case studies / testimonials** currently hold `[Brand name]` placeholders —
  swap in real names and figures before launch.

## Known placeholders

- Case study and video testimonial names, quotes and metrics.
- The team photo (`team.tsx`) is an empty framed box.
- The design had a second "As featured in" press-logo strip; there are no press
  logos in the repo, so only the real brand strip is rendered.
- Both "Register & get your Blueprint" CTAs scroll to the offer section. Point
  them at a real form or payment flow when one exists.

## Accessibility & motion

Every scroll reveal, the map, the chart and the CTA shine respect
`prefers-reduced-motion` and render in their final state when it is set.
