import { hero } from "@/lib/landing-data";
import { Frame } from "./frame";
import { CheckIcon, CtaButton, Kicker } from "./primitives";
import { NetworkMap } from "./network-map";

export function Hero() {
  return (
    <Frame
      className="pt-[clamp(2.4rem,5vw,4rem)] pb-[clamp(2.75rem,5vw,5rem)]"
      backdrop={
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="glow glow-brand -top-30 -right-20 h-130 w-130" />
          <div className="glow glow-warm -bottom-35 -left-25 h-95 w-95" />
        </div>
      }
    >
      <div className="grid items-center gap-11 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-slide-up">
          <Kicker>{hero.kicker}</Kicker>

          <h1 className="text-[clamp(1.9rem,1.2rem+2.2vw,2.6rem)] leading-[1.06]">
            <span className="text-[0.8em]">{hero.titleLead}</span>
            <br />
            <span className="bg-linear-to-r from-orange to-warn bg-clip-text text-transparent">
              {hero.titleAccent}
            </span>
          </h1>

          <p className="mt-5 max-w-[30em] text-[17px] text-subtle sm:text-[19px]">
            {hero.lede}
          </p>

          <ul className="mt-6 grid gap-2.5">
            {hero.checks.map((check) => (
              <li key={check} className="flex items-center gap-2.5 text-ink">
                <CheckIcon />
                {check}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {hero.glance.map((item) => (
              <div
                key={item.label}
                className="min-w-33 flex-1 rounded-xl border border-hairline bg-card px-4 py-3"
              >
                <div className="text-xs text-faint">{item.label}</div>
                <div className="mt-0.5 font-display text-base font-extrabold">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <CtaButton size="big" className="max-sm:w-full max-sm:text-center">
              {hero.cta}
            </CtaButton>
          </div>
          <p className="mt-3 text-sm text-faint">{hero.ctaNote}</p>

          <div className="mt-6 flex items-center gap-3.5 border-t border-hairline pt-5.5">
            <div className="grid size-10.5 shrink-0 place-items-center rounded-[0.625rem] bg-linear-to-br from-brand to-brand-soft font-display text-lg font-extrabold text-background">
              {hero.credential.initial}
            </div>
            <p className="text-sm leading-snug text-subtle">
              <strong className="font-bold text-ink">
                {hero.credential.headline}
              </strong>
              <br />
              {hero.credential.body}
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-116 lg:ml-auto lg:mr-0">
          <NetworkMap />

          <span className="mt-2 block text-center text-[12.5px] text-faint pr-22 lg:pr-28">
            {hero.mapCaption}
          </span>
        </div>
      </div>
    </Frame>
  );
}
