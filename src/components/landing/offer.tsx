import { getLandingContent } from "@/lib/content";
import { Frame, SectionTitle } from "./frame";
import { CheckIcon, CtaButton, Kicker } from "./primitives";
import { Reveal } from "./motion-primitives";
import { Countdown } from "./countdown";

export async function Offer() {
  const { offer, applicationsCloseAt } = await getLandingContent();

  return (
    <Frame id="offer" className="bg-white/2">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Kicker>{offer.kicker}</Kicker>
            <SectionTitle>{offer.title}</SectionTitle>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line-strong bg-card px-4 py-3">
            <span className="relative flex h-2.25 w-2.25">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2.25 w-2.25 rounded-full bg-success" />
            </span>
            <span className="text-sm text-subtle">
              <b className="text-ink">
                {offer.slots.taken} of {offer.slots.total}
              </b>{" "}
              cohort slots open this quarter
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-9 grid overflow-hidden rounded-[1.25rem] border border-line-strong bg-card lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10">
            <h3 className="text-[27px] font-extrabold">{offer.cardTitle}</h3>
            <p className="mt-2.5 max-w-[30em] text-base text-subtle">
              {offer.cardSub}
            </p>
            <ul className="mt-6 grid gap-3">
              {offer.includes.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15.5px]">
                  <CheckIcon className="mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center border-t border-hairline bg-linear-to-b from-white/5 to-transparent p-7 sm:p-10 lg:border-t-0 lg:border-l">
            <div className="mb-4 border-b border-dashed border-line-strong pb-3">
              {offer.valueStack.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-3.5 py-1 text-[13.5px] text-subtle"
                >
                  <span>{row.label}</span>
                  <span className="text-ink">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mb-5 flex justify-between text-sm font-bold">
              <span>Total value</span>
              <span>{offer.totalValue}</span>
            </div>

            <div className="text-[13px] text-faint">{offer.priceLead}</div>
            <div className="my-1 font-display text-[52px] leading-none font-extrabold tracking-tight">
              {offer.price}
              <small className="ml-1.5 text-[17px] font-semibold text-faint">
                {offer.priceSuffix}
              </small>
            </div>
            <p className="mb-5 text-sm text-subtle">{offer.credit}</p>

            <Countdown closesAt={applicationsCloseAt} className="mb-5" />

            <CtaButton size="big" className="w-full text-center">
              {offer.cta}
            </CtaButton>

            <p className="mt-4.5 border-t border-hairline pt-4 text-sm leading-normal text-subtle">
              {offer.anchor}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-6 max-w-[44em] text-base text-subtle">
          <b className="text-ink">{offer.engagementLead}</b> —{" "}
          {offer.engagementNote}
        </p>
      </Reveal>
    </Frame>
  );
}
