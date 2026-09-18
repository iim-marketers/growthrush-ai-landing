import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The logo strip reads `public/logos` from disk, including when a CMS save
  // re-renders the page on the server — where it is not otherwise traced.
  outputFileTracingIncludes: {
    "/": ["./public/logos/**"],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
