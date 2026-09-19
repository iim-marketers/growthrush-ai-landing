/* THIS FILE IS OWNED BY PAYLOAD */
import type { Viewport } from "next";
import type { ServerFunctionClient } from "payload";

import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";

// Payload's own stylesheet first, then our overrides on top.
import "@payloadcms/next/css";
import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f6fa",
  colorScheme: "light",
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
