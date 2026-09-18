import Image from "next/image";
import { getClientLogos } from "@/lib/client-logos";
import { getLandingContent } from "@/lib/content";
import { Frame } from "./frame";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

/** The one section not backed by the CMS: its logos are the files on disk. */
export async function LogoStrip({ anchor }: { anchor: string }) {
  const { showcaseHeading } = await getLandingContent();
  const logos = await getClientLogos();

  return (
    <Frame id={anchor} className="border-b border-hairline py-12 sm:py-14">
      <Reveal>
        <p className="mb-5 text-center text-[12.5px] tracking-wider text-faint uppercase">
          {showcaseHeading}
        </p>
      </Reveal>
      <Stagger
        gap={0.03}
        className="mx-auto flex max-w-5xl flex-wrap justify-center"
      >
        {logos.map((logo) => (
          <StaggerItem
            key={logo.src}
            className="flex min-w-0 basis-1/3 items-center justify-center px-2 py-4 sm:basis-1/4 sm:px-4 sm:py-5 lg:basis-1/6"
          >
            <Image
              src={logo.src}
              alt={logo.name}
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
