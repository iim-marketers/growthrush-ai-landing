import { Frame } from "./frame";
import { CtaButton } from "./primitives";
import { Reveal } from "./motion-primitives";

/** The wide gradient CTA band repeated between sections. */
export function CtaBand({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Frame className="py-4">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[1.125rem] border border-white/12 bg-linear-to-br from-brand/12 to-orange/5 px-6 py-7 sm:px-8 max-sm:flex-col max-sm:items-start">
          <div>
            <h3 className="text-xl font-extrabold">{title}</h3>
            <p className="mt-1 text-[14.5px] text-subtle">{body}</p>
          </div>
          <CtaButton size="big" className="max-sm:w-full max-sm:text-center">
            {cta}
          </CtaButton>
        </div>
      </Reveal>
    </Frame>
  );
}

/** The plainer centred CTA, used between the denser sections. */
export function CtaMid({ cta, sub }: { cta: string; sub: string }) {
  return (
    <Frame className="py-3">
      <Reveal className="flex flex-col items-center gap-2.5 text-center">
        <CtaButton size="big" className="max-sm:w-full max-sm:text-center">
          {cta}
        </CtaButton>
        <span className="text-[13px] text-faint">{sub}</span>
      </Reveal>
    </Frame>
  );
}
