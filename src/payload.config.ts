import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Landing } from "./globals/Landing";
import { ADMIN_ICONS, ADMIN_TITLE_SUFFIX } from "./lib/admin-metadata";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Neon hands out both a pooled and a direct URL. Payload pushes schema changes
// in development, which PgBouncer's transaction pooling cannot carry, so prefer
// the direct connection whenever it is available.
const connectionString =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  process.env.DATABASE_URI ||
  "";

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    theme: "light",
    meta: {
      titleSuffix: ADMIN_TITLE_SUFFIX,
      icons: ADMIN_ICONS,
      defaultOGImageType: "off",
    },
    components: {
      graphics: {
        Icon: "@/components/admin/icon#AdminIcon",
        Logo: "@/components/admin/logo#AdminLogo",
      },
      logout: {
        Button: "@/components/admin/logout-button#AdminLogoutButton",
      },
      providers: ["@/components/admin/password-reveal#PasswordReveal"],
      views: {
        forgot: {
          Component:
            "@/components/admin/forgot-password-disabled#ForgotPasswordDisabled",
        },
      },
    },
  },
  collections: [Users, Media],
  globals: [Landing],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({ pool: { connectionString } }),
  sharp,
  plugins: [
    ...(blobToken
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: true },
            token: blobToken,
          }),
        ]
      : []),
  ],
});
