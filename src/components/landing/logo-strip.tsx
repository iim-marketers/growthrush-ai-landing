import { readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import Image from "next/image";
import { Frame } from "./frame";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

const LOGO_DIR = path.join(process.cwd(), "public", "logos");
const LOGO_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg"]);

// Filenames that don't title-case cleanly.
const NAME_OVERRIDES: Record<string, string> = {
  centuryply: "Century Ply",
  ey: "EY",
  haldiram: "Haldiram's",
  itc: "ITC",
  "magik-led": "Magik LED",
};

const toBrandName = (file: string) => {
  const slug = file.replace(/\.[^.]+$/, "");
  return (
    NAME_OVERRIDES[slug] ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

const getShowcaseBrands = cache(async () => {
  const files = await readdir(LOGO_DIR);
  return files
    .filter((file) => LOGO_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({ name: toBrandName(file), src: `/logos/${file}` }));
});

export async function LogoStrip({ heading }: { heading: string }) {
  const showcaseBrands = await getShowcaseBrands();

  return (
    <Frame className="border-b border-hairline py-12 sm:py-14">
      <Reveal>
        <p className="mb-5 text-center text-[12.5px] tracking-wider text-faint uppercase">
          {heading}
        </p>
      </Reveal>
      <Stagger
        gap={0.03}
        className="mx-auto flex max-w-5xl flex-wrap justify-center"
      >
        {showcaseBrands.map((brand) => (
          <StaggerItem
            key={brand.src}
            className="flex min-w-0 basis-1/3 items-center justify-center px-2 py-4 sm:basis-1/4 sm:px-4 sm:py-5 lg:basis-1/6"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={240}
              height={96}
              className="h-9 w-full max-w-full object-contain sm:h-12"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Frame>
  );
}
