import { Check } from "lucide-react";
import { finalCta } from "@/lib/landing-data";
import { Frame } from "./frame";
import { CtaButton, Kicker } from "./primitives";
import { Reveal } from "./motion-primitives";
import { Countdown } from "./countdown";

export function FinalCta() {
  return (
    <Frame
      className="border-t border-hairline bg-white/2"
      innerClassName="text-center"
      backdrop={
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="glow glow-warm -top-40 left-1/2 h-115 w-115 -translate-x-1/2" />
        </div>
      }
    >
      <Reveal>
        <Kicker>{finalCta.kicker}</Kicker>
        <h2 className="mx-auto max-w-[16em] text-[clamp(1.8rem,1.1rem+2.6vw,3rem)] leading-[1.05]">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4.5 mb-7 max-w-[38em] text-subtle sm:text-[18px]">
          {finalCta.body}
        </p>

        <Countdown className="mx-auto mb-6 max-w-107.5" />

        <CtaButton size="big" className="max-sm:w-full max-sm:text-center">
          {finalCta.cta}
        </CtaButton>

        <ul className="hidden mx-auto mt-6 md:flex w-fit flex-col gap-2.5 text-left text-sm text-faint sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6.5 sm:gap-y-2">
          {finalCta.trust.map((item) => (
            <li key={item} className="flex items-center gap-1.75">
              <Check className="size-4 shrink-0 text-orange" strokeWidth={3} />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Frame>
  );
}
