/* THIS FILE IS OWNED BY PAYLOAD */
import type { Metadata } from "next";

import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";

import { withAdminMetadata } from "@/lib/admin-metadata";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  withAdminMetadata(
    await generatePageMetadata({ config, params, searchParams }),
  );

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params, searchParams });

export default Page;
