import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

import type { Landing, Media } from "@/payload-types";
import { getClientLogos } from "@/lib/client-logos";
import { pageComposition, resolveAnchors } from "@/lib/sections";

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const toImg = (value: unknown): Img | null => {
  const media = value as Media | number | null | undefined;
  if (!media || typeof media !== "object" || !media.url) return null;

  return {
    src: media.url,
    alt: media.alt ?? "",
    width: media.width ?? 240,
    height: media.height ?? 96,
  };
};

const toStrings = (rows?: { value: string }[] | null): string[] =>
  (rows ?? []).map((row) => row.value);

const toStats = (
  rows?: { value: string; label: string }[] | null,
): { value: string; label: string }[] =>
  (rows ?? []).map(({ value, label }) => ({ value, label }));

/** Rows written straight into the database can still point nowhere. */
const usableNavLinks = (doc: Landing, anchors: Set<string>) => {
  const used = new Set<string>();

  return (doc.navLinks ?? []).flatMap(({ label, targetId }) => {
    const anchor = targetId?.trim() ?? "";
    if (!anchors.has(anchor) || used.has(anchor)) return [];
    used.add(anchor);
    return [{ label, targetId: anchor }];
  });
};

const normalize = (doc: Landing, logoCount: number) => {
  // One composition drives page order, anchors and surviving links, so the
  // three cannot disagree. Only the logo count comes from outside the document.
  const composition = pageComposition(doc).filter(
    (entry) => entry.id !== "clients" || logoCount > 0,
  );
  const anchors = new Set(composition.map((entry) => entry.anchor));

  return {
    brand: doc.brand,
    navLinks: usableNavLinks(doc, anchors),
    composition,
    anchors: resolveAnchors(doc),
    announcement: doc.announcement,
    applicationsCloseAt: doc.applicationsCloseAt,
    stickyBar: doc.stickyBar,
    footer: doc.footer,

    hero: {
      ...doc.hero,
      checks: toStrings(doc.hero.checks),
      glance: toStats(doc.hero.glance),
      credential: {
        ...doc.hero.credential,
        logo: toImg(doc.hero.credential.logo),
      },
    },
    proofStats: toStats(doc.proofStats),
    showcaseHeading: doc.showcaseHeading,
  
    problem: {
      ...doc.problem,
      wall: toStrings(doc.problem.wall),
    },
    videoTestimonials: {
      ...doc.videoTestimonials,
      items: (doc.videoTestimonials.items ?? []).map((item) => ({
        name: item.name,
        role: item.role,
        company: item.company,
        quote: item.quote,
        metrics: toStats(item.metrics),
        youtubeId: item.youtubeId ?? "",
        vimeoId: item.vimeoId ?? "",
        mp4: item.mp4 ?? "",
        poster: toImg(item.poster),
      })),
    },
    caseStudies: {
      ...doc.caseStudies,
      items: (doc.caseStudies.items ?? []).map((item) => ({
        tag: item.tag,
        brand: item.brand,
        challenge: item.challenge,
        built: item.built,
        metrics: toStats(item.metrics),
      })),
    },

    engine: {
      ...doc.engine,
      pillars: (doc.engine.pillars ?? []).map(({ idx, title, body, get }) => ({
        idx,
        title,
        body,
        get,
      })),
    },
    tracks: {
      ...doc.tracks,
      items: (doc.tracks.items ?? []).map((item) => ({
        tag: item.tag,
        title: item.title,
        points: toStrings(item.points),
      })),
    },
    fit: {
      ...doc.fit,
      yes: { ...doc.fit.yes, points: toStrings(doc.fit.yes.points) },
      no: { ...doc.fit.no, points: toStrings(doc.fit.no.points) },
    },
    offer: {
      ...doc.offer,
      includes: toStrings(doc.offer.includes),
      valueStack: (doc.offer.valueStack ?? []).map(({ label, value }) => ({ label, value })),
    },
    bonuses: {
      ...doc.bonuses,
      items: (doc.bonuses.items ?? []).map(({ tag, title, body, value }) => ({
        tag,
        title,
        body,
        value,
      })),
    },

    team: {
      ...doc.team,
      body: toStrings(doc.team.body),
      photo: toImg(doc.team.photo),
    },
    guarantee: doc.guarantee,
    inaction: {
      wait: { ...doc.inaction.wait, points: toStrings(doc.inaction.wait.points) },
      act: { ...doc.inaction.act, points: toStrings(doc.inaction.act.points) },
    },
    faq: {
      ...doc.faq,
      items: (doc.faq.items ?? []).map(({ q, a }) => ({ q, a })),
    },
    finalCta: {
      ...doc.finalCta,
      trust: toStrings(doc.finalCta.trust),
    },
  };
};

export const getLandingContent = cache(async () => {
  const payload = await getPayload({ config });
  const [doc, logos] = await Promise.all([
    payload.findGlobal({ slug: "landing", depth: 1 }),
    getClientLogos(),
  ]);
  return normalize(doc, logos.length);
});

export type LandingContent = Awaited<ReturnType<typeof getLandingContent>>;
