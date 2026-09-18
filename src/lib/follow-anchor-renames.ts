import type { GlobalBeforeValidateHook } from "payload";

import {
  SECTIONS,
  type SectionContent,
  anchorIsPresent,
  resolveAnchor,
} from "@/lib/sections";

type LandingLike = SectionContent & {
  navLinks?: { targetId?: null | string }[] | null;
};

/**
 * A link stores the anchor text, not a reference, so renaming a section's
 * target ID would orphan every link aimed at it. Rewrite them before validation
 * runs, so a rename does what an editor expects.
 */
export const followAnchorRenames: GlobalBeforeValidateHook = ({
  data,
  originalDoc,
}) => {
  if (!data || !originalDoc) return data;

  const incoming = data as LandingLike;
  const previous = originalDoc as LandingLike;
  const renames = new Map<string, string>();

  for (const section of SECTIONS) {
    // A partial API update would otherwise look like a rename to the default.
    if (!anchorIsPresent(section, incoming)) continue;

    const before = resolveAnchor(section, previous);
    const after = resolveAnchor(section, incoming);
    if (before && after && before !== after) renames.set(before, after);
  }

  if (renames.size === 0) return data;

  for (const link of incoming.navLinks ?? []) {
    if (!link) continue;
    const anchor = link.targetId?.trim() ?? "";
    link.targetId = renames.get(anchor) ?? link.targetId;
  }

  return data;
};
