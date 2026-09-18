import type { CollectionConfig } from "payload";

import { Forbidden } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "System",
  },
  auth: true,
  hooks: {
    beforeOperation: [
      ({ operation, req }) => {
        if (operation === "forgotPassword" || operation === "resetPassword") {
          throw new Forbidden(req.t);
        }
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      admin: { description: "Shown in the admin panel header." },
    },
  ],
};
