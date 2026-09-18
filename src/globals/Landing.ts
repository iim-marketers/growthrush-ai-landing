import type { GlobalConfig } from "payload";

import { revalidateLanding } from "@/lib/revalidate-landing";
import { pointsPanel, sectionHeading, statList, stringList } from "./fields";

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
            {
              name: "navLinks",
              type: "array",
              label: "Navigation links",
              minRows: 1,
              admin: {
                initCollapsed: true,
                description:
                  "Section ID must match an id rendered on the page (engine, tracks, proof, offer, faq).",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, admin: { width: "50%" } },
                    { name: "targetId", type: "text", required: true, admin: { width: "50%" } },
                  ],
                },
              ],
            },
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
              fields: [
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
            statList("proofStats", "Proof stats", "The four counters under the hero."),
            {
              name: "showcaseHeading",
              type: "text",
              required: true,
              label: "Logo strip heading",
              admin: { description: "Small label above the client logo row." },
            },
            {
              name: "showcaseBrands",
              type: "array",
              label: "Client logo strip",
              minRows: 1,
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "name", type: "text", required: true, admin: { width: "50%" } },
                    {
                      name: "logo",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                      admin: { width: "50%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Problem & stories",
          fields: [
            {
              name: "problem",
              type: "group",
              fields: [
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
              fields: [
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
              fields: [
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
              fields: [
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
              fields: [
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
              fields: [
                ...sectionHeading(),
                pointsPanel("yes", "This is for you if"),
                pointsPanel("no", "This is not for you if"),
              ],
            },
            {
              name: "offer",
              type: "group",
              fields: [
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
              fields: [
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
              fields: [
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
              fields: [
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
              fields: [
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
              fields: [
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
