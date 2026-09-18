import type { ArrayField, Validate } from "payload";

import {
  SECTIONS,
  type SectionContent,
  anchorChoices,
  pageComposition,
  resolveAnchor,
  sectionHasContent,
} from "@/lib/sections";

type NavLinkRow = { label?: null | string; targetId?: null | string };

/**
 * The dropdown only offers live anchors, leaving the save to catch a section
 * emptied or renamed after the link was made, and two links on one section.
 */
const validateTarget: Validate<string, unknown, NavLinkRow> = (
  value,
  { data, path },
) => {
  const anchor = typeof value === "string" ? value.trim() : "";
  if (anchor === "") {
    return "Choose the section this link should scroll to.";
  }

  const doc = (data ?? {}) as SectionContent;
  const composition = pageComposition(doc);

  // An empty composition means a partial API update, with nothing to judge.
  if (composition.length > 0) {
    const target = composition.find((entry) => entry.anchor === anchor);
    if (!target) {
      const emptied = SECTIONS.find(
        (section) =>
          resolveAnchor(section, doc) === anchor &&
          sectionHasContent(section.id, doc) === false,
      );
      if (emptied) {
        return `The ${emptied.label} section has no content left, so it is no longer on the page. Add entries under ${emptied.editIn}, or remove this link.`;
      }

      const available = anchorChoices(doc)
        .map((choice) => `#${choice.value}`)
        .join(", ");
      return `Nothing on the page has the anchor "#${anchor}". Currently available: ${available}.`;
    }

    const rows = (data as { navLinks?: NavLinkRow[] } | undefined)?.navLinks;
    const index = path.at(-2);
    if (Array.isArray(rows) && typeof index === "number") {
      const firstUse = rows.findIndex((row) => row?.targetId?.trim() === anchor);
      if (firstUse !== -1 && firstUse < index) {
        return `${target.label} is already linked by "${rows[firstUse]?.label ?? `link ${firstUse + 1}`}". Each section can only be linked once.`;
      }
    }
  }

  return true;
};

export const navLinksField: ArrayField = {
  name: "navLinks",
  type: "array",
  label: "Navigation links",
  labels: { plural: "Navigation links", singular: "Navigation link" },
  minRows: 1,
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: "@/components/admin/nav-link-row-label#NavLinkRowLabel",
    },
    description:
      "Shown in the header and the footer, in this order. Any section on the page can be linked here, as long as it currently has content.",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          admin: {
            width: "50%",
            description: "The wording a visitor sees, e.g. “Tracks”.",
          },
        },
        {
          name: "targetId",
          type: "text",
          label: "Section",
          required: true,
          validate: validateTarget,
          admin: {
            width: "50%",
            components: {
              Field: "@/components/admin/anchor-select-field#AnchorSelectField",
            },
            description:
              "The section this link scrolls to, by its target ID. Only sections currently on the page are offered.",
          },
        },
      ],
    },
  ],
};
