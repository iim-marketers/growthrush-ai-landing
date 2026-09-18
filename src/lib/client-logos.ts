import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type ClientLogo = { name: string; src: string };

/**
 * Keys set the running order, values are the alt text — filenames alone read
 * badly ("Ey", "Centuryply"). Unlisted files still appear, after these.
 */
const NAMED: Record<string, string> = {
  "haldiram.png": "Haldiram's",
  "ey.png": "EY",
  "emami.png": "Emami",
  "itc.png": "ITC",
  "joy.png": "Joy",
  "nephrocare.png": "Nephrocare",
  "adyant-ayurveda.png": "Adyant Ayurveda",
  "emporium-solutions.png": "Emporium Solutions",
  "pepsi.png": "Pepsi",
  "magik-led.png": "Magik LED",
  "centuryply.png": "Century Ply",
};

const LOGO_DIR = path.join(process.cwd(), "public", "logos");
const IMAGE = /\.(?:avif|jpe?g|png|svg|webp)$/i;

const nameFromFile = (file: string): string =>
  file
    .replace(IMAGE, "")
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(" ");

export const getClientLogos = cache(async (): Promise<ClientLogo[]> => {
  let files: string[];

  try {
    files = (await readdir(LOGO_DIR)).filter((file) => IMAGE.test(file));
  } catch {
    // Normally build time, where `public/` exists. A CMS save re-renders on
    // the server, where it may not — keep the strip rather than lose it.
    files = Object.keys(NAMED);
  }

  const present = new Set(files);
  const listed = Object.keys(NAMED).filter((file) => present.has(file));
  const unlisted = files.filter((file) => !(file in NAMED)).sort();

  return [...listed, ...unlisted].map((file) => ({
    name: NAMED[file] ?? nameFromFile(file),
    src: `/logos/${file}`,
  }));
});
