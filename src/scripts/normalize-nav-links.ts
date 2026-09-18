/**
 * Drops navigation links pointing at an anchor the page does not have. The page
 * hides them anyway; this repairs what is stored.
 *
 *   pnpm fix:nav-links
 */
import config from "@payload-config";
import { getPayload } from "payload";

import { anchorChoices, pageComposition } from "@/lib/sections";

const payload = await getPayload({ config });

const doc = await payload.findGlobal({ slug: "landing", depth: 0 });
const rows = doc.navLinks ?? [];
const composition = pageComposition(doc);
const anchors = new Map(composition.map((entry) => [entry.anchor, entry.label]));

const kept: { label: string; targetId: string }[] = [];
const seen = new Set<string>();

for (const row of rows) {
  const anchor = row.targetId?.trim() ?? "";

  if (!anchors.has(anchor)) {
    payload.logger.warn(
      `navLinks: dropping "${row.label}" — nothing on the page has the anchor "#${anchor}".`,
    );
    continue;
  }
  if (seen.has(anchor)) {
    payload.logger.warn(
      `navLinks: dropping "${row.label}" — #${anchor} is already linked.`,
    );
    continue;
  }

  seen.add(anchor);
  kept.push({ label: row.label, targetId: anchor });
}

if (kept.length === rows.length) {
  payload.logger.info("navLinks: every link already points at a live section.");
} else if (kept.length === 0) {
  payload.logger.error(
    "navLinks: nothing valid is left, and at least one link is required. " +
      `Add one by hand in the admin — available anchors: ${anchorChoices(doc)
        .map((choice) => `#${choice.value}`)
        .join(", ")}.`,
  );
  process.exit(1);
} else {
  await payload.updateGlobal({ slug: "landing", data: { navLinks: kept } });
  payload.logger.info(
    `navLinks: kept ${kept.length} of ${rows.length} — ${kept
      .map((link) => `${link.label} → #${link.targetId}`)
      .join(", ")}`,
  );
}

process.exit(0);
