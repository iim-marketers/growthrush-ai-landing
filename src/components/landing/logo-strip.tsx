"use client";

import Image from "next/image";
import type { LandingContent } from "@/lib/content";
import { Frame } from "./frame";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export function LogoStrip({
  heading,
  showcaseBrands,
}: {
  heading: string;
  showcaseBrands: LandingContent["showcaseBrands"];
}) {
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
            key={brand.name}
            className="flex min-w-0 basis-1/3 items-center justify-center px-2 py-4 sm:basis-1/4 sm:px-4 sm:py-5 lg:basis-1/6"
          >
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt || brand.name}
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
