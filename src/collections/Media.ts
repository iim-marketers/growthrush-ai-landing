import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "System",
    description:
      "Brand logos, testimonial posters, and any other image used on the landing page.",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "logo", width: 480, height: undefined, position: "centre" },
      { name: "poster", width: 1280, height: undefined, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description:
          "Describes the image for screen readers. For a logo, the brand name is enough.",
      },
    },
  ],
};
