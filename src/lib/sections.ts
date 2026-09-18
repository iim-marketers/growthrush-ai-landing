/**
 * A section's `id` is its permanent key in code; its *anchor* — what a link
 * scrolls to — is the editor's, stored at `anchorPath` and defaulting to the id.
 *
 * Imports must stay out: this is pulled into the Payload config, server
 * components and admin client components alike.
 */

export type SectionDefinition = {
  id: string;
  label: string;
  editIn: string;
  hint: string;
  /** Dotted path to the editor's target ID, e.g. `faq.targetId`. */
  anchorPath: string;
  /** Lists that give the section something to show; empty means always shown. */
  contentPaths: string[];
};

export const SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    editIn: "Hero & proof → Hero",
    hint: "Headline, promise and credential card at the top of the page.",
    anchorPath: "hero.targetId",
    contentPaths: [],
  },
  {
    id: "proof",
    label: "Proof stats",
    editIn: "Hero & proof → Proof stats",
    hint: "The counter strip under the hero.",
    anchorPath: "proofTargetId",
    contentPaths: ["proofStats"],
  },
  {
    id: "clients",
    label: "Client logos",
    editIn: "Hero & proof → Logo strip heading",
    // Files on disk, not CMS entries, so the document can never call it empty.
    hint: "The row of client logos, read from public/logos.",
    anchorPath: "clientsTargetId",
    contentPaths: [],
  },
  {
    id: "problem",
    label: "The problem",
    editIn: "Problem & stories → Problem",
    hint: "The growth-ceiling argument and the revenue chart.",
    anchorPath: "problem.targetId",
    contentPaths: [],
  },
  {
    id: "testimonials",
    label: "Video testimonials",
    editIn: "Problem & stories → Video testimonials",
    hint: "Founder video cards.",
    anchorPath: "videoTestimonials.targetId",
    contentPaths: ["videoTestimonials.items"],
  },
  {
    id: "engine",
    label: "The Engine",
    editIn: "Engine & offer → Engine",
    hint: "The numbered pillar cards.",
    anchorPath: "engine.targetId",
    contentPaths: ["engine.pillars"],
  },
  {
    id: "tracks",
    label: "Tracks",
    editIn: "Engine & offer → Tracks",
    hint: "The engagement tracks and their deliverables.",
    anchorPath: "tracks.targetId",
    contentPaths: ["tracks.items"],
  },
  {
    id: "case-studies",
    label: "Case studies",
    editIn: "Problem & stories → Case studies",
    hint: "Challenge / built / metrics cards.",
    anchorPath: "caseStudies.targetId",
    contentPaths: ["caseStudies.items"],
  },
  {
    id: "fit",
    label: "Who it's for",
    editIn: "Engine & offer → Fit",
    hint: "The two-column 'this is for you if…' panels.",
    anchorPath: "fit.targetId",
    contentPaths: ["fit.yes.points", "fit.no.points"],
  },
  {
    id: "offer",
    label: "Offer",
    editIn: "Engine & offer → Offer",
    hint: "The pricing card, value stack and cohort slots.",
    anchorPath: "offer.targetId",
    contentPaths: [],
  },
  {
    id: "bonuses",
    label: "Bonuses",
    editIn: "Engine & offer → Bonuses",
    hint: "The dashed bonus cards.",
    anchorPath: "bonuses.targetId",
    contentPaths: ["bonuses.items"],
  },
  {
    id: "team",
    label: "Team",
    editIn: "Close → Team",
    hint: "The founder photo and story.",
    anchorPath: "team.targetId",
    contentPaths: ["team.body"],
  },
  {
    id: "guarantee",
    label: "Guarantee",
    editIn: "Close → Guarantee",
    hint: "The guarantee banner and the cost-of-waiting panels.",
    anchorPath: "guarantee.targetId",
    contentPaths: [],
  },
  {
    id: "faq",
    label: "FAQ",
    editIn: "Close → FAQ",
    hint: "The accordion of questions.",
    anchorPath: "faq.targetId",
    contentPaths: ["faq.items"],
  },
  {
    id: "apply",
    label: "Final CTA",
    editIn: "Close → Final CTA",
    hint: "The closing call to action at the foot of the page.",
    anchorPath: "finalCta.targetId",
    contentPaths: [],
  },
] as const satisfies readonly SectionDefinition[];

export type SectionId = (typeof SECTIONS)[number]["id"];

const BY_ID = new Map<string, SectionDefinition>(
  SECTIONS.map((section) => [section.id, section]),
);

export const getSection = (id: string): SectionDefinition | undefined =>
  BY_ID.get(id);

export const isSectionId = (value: unknown): value is SectionId =>
  typeof value === "string" && BY_ID.has(value);

export type SectionContent = object;

const readPath = (doc: unknown, path: string): unknown =>
  path
    .split(".")
    .reduce<unknown>(
      (value, key) =>
        value && typeof value === "object"
          ? (value as Record<string, unknown>)[key]
          : undefined,
      doc,
    );

/**
 * `null` means the document does not carry those fields at all — a partial API
 * update — which callers must treat as unknown rather than empty, or a partial
 * save trips the navigation-link validation.
 */
export const sectionContentCount = (
  section: SectionDefinition,
  doc: SectionContent,
): null | number => {
  if (section.contentPaths.length === 0) return 1;

  let total = 0;
  let known = false;

  for (const path of section.contentPaths) {
    const value = readPath(doc, path);
    if (value === undefined) continue;
    known = true;
    if (Array.isArray(value)) total += value.length;
  }

  return known ? total : null;
};

export const sectionHasContent = (
  id: string,
  doc: SectionContent,
): boolean | null => {
  const section = getSection(id);
  if (!section) return false;
  const count = sectionContentCount(section, doc);
  return count === null ? null : count > 0;
};

export const visibleSections = (doc: SectionContent): Record<SectionId, boolean> =>
  Object.fromEntries(
    SECTIONS.map((section) => [
      section.id,
      (sectionContentCount(section, doc) ?? 0) > 0,
    ]),
  ) as Record<SectionId, boolean>;

export const resolveAnchor = (
  section: SectionDefinition,
  doc: SectionContent,
): string => {
  const stored = readPath(doc, section.anchorPath);
  return typeof stored === "string" && stored.trim() !== ""
    ? stored.trim()
    : section.id;
};

export const anchorIsPresent = (
  section: SectionDefinition,
  doc: SectionContent,
): boolean => readPath(doc, section.anchorPath) !== undefined;

export const resolveAnchors = (doc: SectionContent): Record<SectionId, string> =>
  Object.fromEntries(
    SECTIONS.map((section) => [section.id, resolveAnchor(section, doc)]),
  ) as Record<SectionId, string>;

export type PageEntry = {
  anchor: string;
  id: SectionId;
  label: string;
};

export const pageComposition = (doc: SectionContent): PageEntry[] => {
  const anchors = resolveAnchors(doc);
  const visible = visibleSections(doc);

  return SECTIONS.filter((section) => visible[section.id as SectionId]).map(
    (section) => ({
      anchor: anchors[section.id as SectionId],
      id: section.id as SectionId,
      label: section.label,
    }),
  );
};

export const anchorChoices = (
  doc: SectionContent,
): { label: string; value: string }[] =>
  pageComposition(doc).map((entry) => ({
    label: `${entry.label} — #${entry.anchor}`,
    value: entry.anchor,
  }));

export const ANCHOR_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const ANCHOR_HELP =
  "Lower-case letters, numbers and hyphens — this becomes the #anchor a navigation link scrolls to.";

export const checkAnchor = (value: string): string | true => {
  if (!ANCHOR_PATTERN.test(value)) {
    return `"${value}" is not a usable anchor. ${ANCHOR_HELP}`;
  }
  return true;
};

export const allAnchors = (
  doc: SectionContent,
): { anchor: string; label: string; path: string }[] =>
  SECTIONS.map((section) => ({
    anchor: resolveAnchor(section, doc),
    label: section.label,
    path: section.anchorPath,
  }));

export const sectionAdminNote = (id: SectionId): string => {
  const section = getSection(id)!;

  return section.contentPaths.length > 0
    ? `Renders the "${section.label}" section. Remove every entry and the section — along with any navigation link pointing at it — drops off the page.`
    : `Renders the "${section.label}" section, which is always part of the page.`;
};
