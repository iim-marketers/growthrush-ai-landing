import type { Field, Validate } from "payload";

import {
  ANCHOR_HELP,
  SECTIONS,
  type SectionContent,
  type SectionDefinition,
  allAnchors,
  checkAnchor,
} from "@/lib/sections";

/** Checked against the whole document: an anchor is only wrong relative to the others. */
export const validateAnchor: Validate<string, unknown, unknown> = (
  value,
  { data, path },
) => {
  const raw = typeof value === "string" ? value.trim() : "";
  const ownPath = path.join(".");

  if (raw !== "") {
    const usable = checkAnchor(raw);
    if (usable !== true) return usable;
  }

  // Blank falls back to the permanent id, and that is what a link points at.
  const fallback = SECTIONS.find((section) => section.anchorPath === ownPath);
  const resolved = raw || fallback?.id;

  if (!resolved) {
    return `Give this section an anchor. ${ANCHOR_HELP}`;
  }

  const clash = allAnchors((data ?? {}) as SectionContent).find(
    (entry) => entry.path !== ownPath && entry.anchor === resolved,
  );
  if (clash) {
    return `"${resolved}" is already the anchor for ${clash.label}. Each section needs its own.`;
  }

  return true;
};

export const anchorField = (section: SectionDefinition): Field => ({
  name: section.anchorPath.split(".").at(-1)!,
  type: "text",
  label: "Target ID (anchor)",
  validate: validateAnchor,
  admin: {
    placeholder: section.id,
    description: `${ANCHOR_HELP} Leave it blank to use "${section.id}".`,
  },
});
