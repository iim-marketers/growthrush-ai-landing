/**
 * One-shot migration of the hardcoded launch copy in `initial-content.ts` into
 * the Payload `landing` global. Safe to re-run: media is matched by alt text and
 * the global is overwritten wholesale.
 *
 *   pnpm seed
 */
import path from "path";
import { fileURLToPath } from "url";

import config from "@payload-config";
import { getPayload } from "payload";

import * as c from "./initial-content";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const payload = await getPayload({ config });

const list = (values: readonly string[]) => values.map((value) => ({ value }));
const stats = (rows: readonly { value: string; label: string }[]) =>
  rows.map(({ value, label }) => ({ value, label }));

async function upload(filePath: string, alt: string): Promise<number> {
  const filename = path.basename(filePath);

  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
  });
  if (existing.docs[0]) {
    payload.logger.info(`media: reusing ${filename}`);
    return existing.docs[0].id;
  }

  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath,
  });
  payload.logger.info(`media: uploaded ${filename}`);
  return doc.id;
}

const { totalDocs: userCount } = await payload.count({ collection: "users" });
if (userCount === 0) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (email && password) {
    await payload.create({
      collection: "users",
      data: { email, password, name: "Admin" },
    });
    payload.logger.info(`users: created admin ${email}`);
  } else {
    payload.logger.info(
      "users: none yet — set ADMIN_EMAIL and ADMIN_PASSWORD in .env and re-run, or create one at /admin.",
    );
  }
}

const fromPublic = (p: string) => path.join(projectRoot, "public", p.replace(/^\//, ""));
const fromAssets = (p: string) => path.join(projectRoot, "src/seed/assets", p);

const brandLogos = new Map<string, number>();
for (const brand of c.showcaseBrands) {
  brandLogos.set(brand.name, await upload(fromPublic(brand.src), brand.name));
}

const credentialLogo = await upload(
  fromPublic(c.hero.credential.logo),
  c.hero.credential.logoAlt,
);

const posters: number[] = [];
for (let i = 1; i <= 3; i++) {
  posters.push(
    await upload(fromAssets(`testimonial-${i}.jpg`), `Placeholder video still ${i}`),
  );
}

const applicationsCloseAt = new Date(
  Date.now() +
    ((c.countdownOffset.days * 24 + c.countdownOffset.hours) * 60 +
      c.countdownOffset.minutes) *
      60_000,
).toISOString();

await payload.updateGlobal({
  slug: "landing",
  data: {
    brand: { ...c.brand },
    navLinks: c.navLinks.map(({ label, targetId }) => ({ label, targetId })),
    announcement: { ...c.announcement },
    applicationsCloseAt,
    stickyBar: { ...c.stickyBar },
    footer: { ...c.footer },

    hero: {
      ...c.hero,
      checks: list(c.hero.checks),
      glance: stats(c.hero.glance),
      credential: {
        initial: c.hero.credential.initial,
        logo: credentialLogo,
        headline: c.hero.credential.headline,
        body: c.hero.credential.body,
      },
    },
    proofStats: stats(c.proofStats),
    showcaseHeading: "Expansion experience across brands",
    showcaseBrands: c.showcaseBrands.map((brand) => ({
      name: brand.name,
      logo: brandLogos.get(brand.name)!,
    })),

    problem: { ...c.problem, wall: list(c.problem.wall) },
    videoTestimonials: {
      kicker: "Video testimonials",
      title: "Hear it from the founders we've scaled.",
      lede:
        "Real founders, real numbers. Tap play to watch — swap in your own clips by editing one entry per card.",
      items: c.videoTestimonials.map((item, i) => ({
        name: item.name,
        role: item.role,
        company: item.company,
        quote: item.quote,
        metrics: stats(item.metrics),
        youtubeId: item.youtubeId,
        vimeoId: item.vimeoId,
        mp4: item.mp4,
        poster: posters[i],
      })),
    },
    caseStudies: {
      ...c.caseStudies,
      items: c.caseStudies.items.map((item) => ({ ...item, metrics: stats(item.metrics) })),
    },

    engine: { ...c.engine, pillars: c.engine.pillars.map((p) => ({ ...p })) },
    tracks: {
      ...c.tracks,
      items: c.tracks.items.map((item) => ({
        tag: item.tag,
        title: item.title,
        points: list(item.points),
      })),
    },
    fit: {
      ...c.fit,
      yes: { title: c.fit.yes.title, points: list(c.fit.yes.points) },
      no: { title: c.fit.no.title, points: list(c.fit.no.points) },
    },
    offer: {
      ...c.offer,
      engagementLead: "The done-for-you engagement",
      slots: { ...c.offer.slots },
      includes: list(c.offer.includes),
      valueStack: c.offer.valueStack.map(({ label, value }) => ({ label, value })),
    },
    bonuses: { ...c.bonuses, items: c.bonuses.items.map((item) => ({ ...item })) },

    team: { ...c.team, body: list(c.team.body) },
    guarantee: { ...c.guarantee },
    inaction: {
      wait: { title: c.inaction.wait.title, points: list(c.inaction.wait.points) },
      act: { title: c.inaction.act.title, points: list(c.inaction.act.points) },
    },
    faq: { ...c.faq, items: c.faq.items.map(({ q, a }) => ({ q, a })) },
    finalCta: { ...c.finalCta, trust: list(c.finalCta.trust) },
  },
});

payload.logger.info("landing: seeded");
process.exit(0);
