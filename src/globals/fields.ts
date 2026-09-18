import type { ArrayField, Field } from "payload";

export const stringList = (
  name: string,
  label: string,
  description?: string,
  overrides: Partial<ArrayField> = {},
): Field => ({
  name,
  type: "array",
  label,
  minRows: 1,
  admin: { description, initCollapsed: true },
  fields: [{ name: "value", type: "text", required: true }],
  ...overrides,
});

export const statList = (
  name: string,
  label: string,
  description?: string,
  overrides: Partial<ArrayField> = {},
): Field => ({
  name,
  type: "array",
  label,
  minRows: 1,
  admin: { description, initCollapsed: true },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
          admin: { width: "40%", description: "e.g. 300+, ₹250 Cr, 14 mo" },
        },
        { name: "label", type: "text", required: true, admin: { width: "60%" } },
      ],
    },
  ],
  ...overrides,
});

export const sectionHeading = (opts: { lede?: boolean } = {}): Field[] => [
  {
    type: "row",
    fields: [
      {
        name: "kicker",
        type: "text",
        required: true,
        admin: { width: "35%", description: "Small eyebrow label above the title." },
      },
      { name: "title", type: "textarea", required: true, admin: { width: "65%" } },
    ],
  },
  ...(opts.lede ? [{ name: "lede", type: "textarea", required: true } as Field] : []),
];

export const pointsPanel = (name: string, label: string): Field => ({
  name,
  type: "group",
  label,
  fields: [
    { name: "title", type: "text", required: true },
    stringList("points", "Points"),
  ],
});
