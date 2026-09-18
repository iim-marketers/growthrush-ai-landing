import type { GlobalConfig } from "payload";

import { followAnchorRenames } from "@/lib/follow-anchor-renames";
import { revalidateLanding } from "@/lib/revalidate-landing";
import { pointsPanel, sectionHeading, statList, stringList } from "./fields";
import { getSection, sectionAdminNote } from "@/lib/sections";
import { anchorField } from "./anchor-field";
import { navLinksField } from "./nav-links";

export const Landing: GlobalConfig = {
  slug: "landing",
  label: "Landing Page",
  admin: {
    group: "Content",
    description:
      "Every piece of copy on get.growthrush.ai. Saving republishes the live page.",
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [followAnchorRenames],
    afterChange: [revalidateLanding],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Chrome",
          description: "Brand, navigation, announcement bar, sticky CTA, footer.",
          fields: [
            {
              name: "brand",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "name", type: "text", required: true, admin: { width: "34%" } },
                    {
                      name: "suffix",
                      type: "text",
                      required: true,
                      admin: { width: "33%", description: "Rendered in the accent colour, e.g. .ai" },
                    },
                    { name: "tagline", type: "text", required: true, admin: { width: "33%" } },
                  ],
                },
              ],
            },
            navLinksField,
            {
              name: "announcement",
              type: "group",
              fields: [
                { name: "live", type: "text", required: true },
                { name: "countdownLabel", type: "text", required: true },
              ],
            },
            {
              name: "applicationsCloseAt",
              type: "date",
              required: true,
              label: "Applications close at",
              admin: {
                date: { pickerAppearance: "dayAndTime" },
                description:
                  "The countdown counts down to this moment. Push it forward when a new cohort opens.",
              },
            },
            {
              name: "stickyBar",
              type: "group",
              label: "Sticky mobile CTA",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "sub", type: "text", required: true },
                { name: "cta", type: "text", required: true },
              ],
            },
            {
              name: "footer",
              type: "group",
              fields: [
                { name: "company", type: "text", required: true },
                { name: "blurb", type: "textarea", required: true },
                {
                  name: "legal",
                  type: "textarea",
                  required: true,
                  admin: {
                    description:
                      "Third-party brand disclaimer. Check any wording change with counsel before saving.",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Hero & proof",
          fields: [
            {
              name: "hero",
              type: "group",
              admin: { description: sectionAdminNote("hero") },
              fields: [
                anchorField(getSection("hero")!),
                { name: "kicker", type: "text", required: true },
                {
                  type: "row",
                  fields: [
                    { name: "titleLead", type: "text", required: true, admin: { width: "50%" } },
                    {
                      name: "titleAccent",
                      type: "text",
                      required: true,
                      admin: { width: "50%", description: "Second line, rendered in the accent colour." },
                    },
                  ],
                },
                { name: "lede", type: "textarea", required: true },
                stringList("checks", "Check list", "The 'without…' reassurance bullets."),
                statList("glance", "At a glance", "The duration / format / outcome strip."),
                {
                  type: "row",
                  fields: [
                    { name: "cta", type: "text", required: true, admin: { width: "40%" } },
                    { name: "ctaNote", type: "text", required: true, admin: { width: "60%" } },
                  ],
                },
                {
                  name: "credential",
                  type: "group",
                  label: "Credential card",
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "initial",
                          type: "text",
                          required: true,
                          maxLength: 1,
                          admin: { width: "20%", description: "Fallback letter if the logo fails to load." },
                        },
                        { name: "logo", type: "upload", relationTo: "media", admin: { width: "80%" } },
                      ],
                    },
                    { name: "headline", type: "text", required: true },
                    { name: "body", type: "text", required: true },
                  ],
                },
                { name: "mapCaption", type: "text", required: true },
              ],
            },
            anchorField(getSection("proof")!),
            statList(
              "proofStats",
              "Proof stats",
              `The counter strip under the hero. ${sectionAdminNote("proof")}`,
            ),
            anchorField(getSection("clients")!),
            {
              name: "showcaseHeading",
              type: "text",
              required: true,
              label: "Logo strip heading",
              admin: {
                description:
                  "Small label above the client logo row. The logos themselves come from the public/logos folder in the codebase, not from here.",
              },
            },
          ],
        },
        {
          label: "Problem & stories",
          fields: [
            {
              name: "problem",
              type: "group",
              admin: { description: sectionAdminNote("problem") },
              fields: [
                anchorField(getSection("problem")!),
                ...sectionHeading(),
                { name: "body", type: "textarea", required: true },
                stringList("wall", "The wall", "What goes wrong when brands scale unaided."),
                { name: "turnLead", type: "textarea", required: true },
                { name: "turnAccent", type: "text", required: true },
                {
                  type: "row",
                  fields: [
                    { name: "chartTitle", type: "text", required: true, admin: { width: "34%" } },
                    { name: "chartGood", type: "text", required: true, admin: { width: "33%" } },
                    { name: "chartBad", type: "text", required: true, admin: { width: "33%" } },
                  ],
                },
              ],
            },
            {
              name: "videoTestimonials",
              type: "group",
              label: "Video testimonials",
              admin: { description: sectionAdminNote("testimonials") },
              fields: [
                anchorField(getSection("testimonials")!),
                ...sectionHeading({ lede: true }),
                {
                  name: "items",
                  type: "array",
                  admin: {
                    initCollapsed: true,
                    description:
                      "Fill exactly one video source per entry. YouTube ID wins, then Vimeo, then MP4.",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "name", type: "text", required: true, admin: { width: "34%" } },
                        { name: "role", type: "text", required: true, admin: { width: "33%" } },
                        { name: "company", type: "text", required: true, admin: { width: "33%" } },
                      ],
                    },
                    { name: "quote", type: "textarea", required: true },
                    statList("metrics", "Metrics"),
                    {
                      type: "row",
                      fields: [
                        { name: "youtubeId", type: "text", admin: { width: "34%" } },
                        { name: "vimeoId", type: "text", admin: { width: "33%" } },
                        { name: "mp4", type: "text", admin: { width: "33%", description: "Full URL to an .mp4" } },
                      ],
                    },
                    {
                      name: "poster",
                      type: "upload",
                      relationTo: "media",
                      admin: { description: "Thumbnail shown before the video plays." },
                    },
                  ],
                },
              ],
            },
            {
              name: "caseStudies",
              type: "group",
              admin: { description: sectionAdminNote("case-studies") },
              fields: [
                anchorField(getSection("case-studies")!),
                ...sectionHeading({ lede: true }),
                {
                  name: "items",
                  type: "array",
                  minRows: 1,
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "tag", type: "text", required: true, admin: { width: "50%" } },
                        { name: "brand", type: "text", required: true, admin: { width: "50%" } },
                      ],
                    },
                    { name: "challenge", type: "textarea", required: true },
                    { name: "built", type: "textarea", required: true },
                    statList("metrics", "Metrics"),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Engine & offer",
          fields: [
            {
              name: "engine",
              type: "group",
              admin: { description: sectionAdminNote("engine") },
              fields: [
                anchorField(getSection("engine")!),
                ...sectionHeading({ lede: true }),
                {
                  name: "pillars",
                  type: "array",
                  label: "Pillars",
                  minRows: 1,
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "idx",
                          type: "text",
                          required: true,
                          admin: { width: "20%", description: "Displayed number, e.g. 01" },
                        },
                        { name: "title", type: "text", required: true, admin: { width: "80%" } },
                      ],
                    },
                    { name: "body", type: "textarea", required: true },
                    {
                      name: "get",
                      type: "text",
                      required: true,
                      admin: { description: "Completes the sentence 'You get …'" },
                    },
                  ],
                },
              ],
            },
            {
              name: "tracks",
              type: "group",
              admin: { description: sectionAdminNote("tracks") },
              fields: [
                anchorField(getSection("tracks")!),
                ...sectionHeading(),
                {
                  name: "items",
                  type: "array",
                  minRows: 1,
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "tag", type: "text", required: true, admin: { width: "50%" } },
                        { name: "title", type: "text", required: true, admin: { width: "50%" } },
                      ],
                    },
                    stringList("points", "Deliverables"),
                  ],
                },
                { name: "note", type: "textarea", required: true },
              ],
            },
            {
              name: "fit",
              type: "group",
              admin: { description: sectionAdminNote("fit") },
              fields: [
                anchorField(getSection("fit")!),
                ...sectionHeading(),
                pointsPanel("yes", "This is for you if"),
                pointsPanel("no", "This is not for you if"),
              ],
            },
            {
              name: "offer",
              type: "group",
              admin: { description: sectionAdminNote("offer") },
              fields: [
                anchorField(getSection("offer")!),
                ...sectionHeading(),
                {
                  name: "slots",
                  type: "group",
                  label: "Cohort slots",
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "taken", type: "number", required: true, min: 0, admin: { width: "50%" } },
                        { name: "total", type: "number", required: true, min: 1, admin: { width: "50%" } },
                      ],
                    },
                  ],
                },
                { name: "cardTitle", type: "text", required: true },
                { name: "cardSub", type: "textarea", required: true },
                stringList("includes", "What's included"),
                statList("valueStack", "Value stack", "Line items and their stated value."),
                {
                  type: "row",
                  fields: [
                    { name: "totalValue", type: "text", required: true, admin: { width: "25%" } },
                    { name: "priceLead", type: "text", required: true, admin: { width: "25%" } },
                    { name: "price", type: "text", required: true, admin: { width: "25%" } },
                    { name: "priceSuffix", type: "text", required: true, admin: { width: "25%" } },
                  ],
                },
                { name: "credit", type: "textarea", required: true },
                { name: "cta", type: "text", required: true },
                { name: "anchor", type: "textarea", required: true },
                {
                  type: "row",
                  fields: [
                    {
                      name: "engagementLead",
                      type: "text",
                      required: true,
                      admin: { width: "35%", description: "Bolded lead-in, e.g. 'The done-for-you engagement'" },
                    },
                    { name: "engagementNote", type: "textarea", required: true, admin: { width: "65%" } },
                  ],
                },
              ],
            },
            {
              name: "bonuses",
              type: "group",
              admin: { description: sectionAdminNote("bonuses") },
              fields: [
                anchorField(getSection("bonuses")!),
                ...sectionHeading(),
                {
                  name: "items",
                  type: "array",
                  minRows: 1,
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "tag", type: "text", required: true, admin: { width: "30%" } },
                        { name: "title", type: "text", required: true, admin: { width: "45%" } },
                        { name: "value", type: "text", required: true, admin: { width: "25%" } },
                      ],
                    },
                    { name: "body", type: "textarea", required: true },
                  ],
                },
                { name: "total", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Close",
          fields: [
            {
              name: "team",
              type: "group",
              admin: { description: sectionAdminNote("team") },
              fields: [
                anchorField(getSection("team")!),
                ...sectionHeading(),
                stringList("body", "Paragraphs", "Each entry renders as its own paragraph."),
                {
                  name: "photo",
                  type: "upload",
                  relationTo: "media",
                  admin: {
                    description:
                      "Portrait crop (4:5). Left empty, the section shows a styled placeholder box.",
                  },
                },
              ],
            },
            {
              name: "guarantee",
              type: "group",
              admin: { description: sectionAdminNote("guarantee") },
              fields: [
                anchorField(getSection("guarantee")!),
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
              ],
            },
            {
              name: "inaction",
              type: "group",
              label: "Cost of waiting",
              fields: [pointsPanel("wait", "Every quarter you wait"), pointsPanel("act", "If you start now")],
            },
            {
              name: "faq",
              type: "group",
              admin: { description: sectionAdminNote("faq") },
              fields: [
                anchorField(getSection("faq")!),
                ...sectionHeading(),
                {
                  name: "items",
                  type: "array",
                  minRows: 1,
                  admin: { initCollapsed: true },
                  fields: [
                    { name: "q", type: "text", required: true, label: "Question" },
                    { name: "a", type: "textarea", required: true, label: "Answer" },
                  ],
                },
              ],
            },
            {
              name: "finalCta",
              type: "group",
              admin: { description: sectionAdminNote("apply") },
              fields: [
                anchorField(getSection("apply")!),
                ...sectionHeading(),
                { name: "body", type: "textarea", required: true },
                { name: "cta", type: "text", required: true },
                stringList("trust", "Trust chips"),
              ],
            },
          ],
        },
      ],
    },
  ],
};
