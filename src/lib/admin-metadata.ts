import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://get.growthrush.ai";
const ADMIN_NAME = "growthrush.ai Admin";
const ADMIN_DESCRIPTION =
  "Private content management for growthrush.ai — landing page copy, media and admin accounts.";

// Payload joins this onto the view title with a space of its own, so no leading
// space here. Titles read "Dashboard · growthrush.ai Admin".
export const ADMIN_TITLE_SUFFIX = `· ${ADMIN_NAME}`;

export const ADMIN_ICONS = [
  { rel: "icon", type: "image/png", url: "/brand/admin-icon.png" },
];

const toTitleString = (title: Metadata["title"]): string | undefined => {
  if (!title) {
    return undefined;
  }
  if (typeof title === "string") {
    return title;
  }
  if ("absolute" in title) {
    return title.absolute ?? undefined;
  }
  return "default" in title ? title.default : undefined;
};

// The 404 view never reads `admin.meta`, so it arrives without the suffix.
const withSuffix = (title: string) =>
  title.endsWith(ADMIN_TITLE_SUFFIX) ? title : `${title} ${ADMIN_TITLE_SUFFIX}`;

/**
 * Strips Payload's own branding from the metadata it generates for the admin
 * panel — default Open Graph copy, "Payload, CMS" keywords, a localhost
 * `metadataBase` — and marks the panel as non-indexable. The per-view title
 * ("Dashboard", "Users", "Editing - Landing Page") is kept.
 */
export const withAdminMetadata = (payloadMetadata: Metadata): Metadata => {
  const title = withSuffix(toTitleString(payloadMetadata.title) ?? ADMIN_NAME);
  const description = payloadMetadata.description || ADMIN_DESCRIPTION;

  return {
    ...payloadMetadata,
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: ADMIN_NAME,
    icons: ADMIN_ICONS,
    keywords: undefined,
    openGraph: {
      type: "website",
      siteName: ADMIN_NAME,
      title,
      description,
      locale: "en_IN",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
};
