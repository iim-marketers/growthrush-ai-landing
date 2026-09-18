import { fit } from "@/lib/landing-data";
import { Frame, SectionTitle } from "./frame";
import { CheckIcon, CrossIcon, FitBadge, Kicker } from "./primitives";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export function Fit() {
  return (
    <Frame>
      <Reveal>
        <Kicker>{fit.kicker}</Kicker>
        <SectionTitle>{fit.title}</SectionTitle>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
        <StaggerItem className="h-full">
          <div className="h-full rounded-2xl border border-line-strong bg-card p-7 sm:p-8">
            <h3 className="mb-4 flex items-center gap-2.5 text-[19px] font-extrabold">
              <FitBadge tone="yes" />
              {fit.yes.title}
            </h3>
            <ul className="grid gap-3">
              {fit.yes.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[15.5px] text-subtle"
                >
                  <CheckIcon className="mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem className="h-full">
          <div className="h-full rounded-2xl border border-hairline p-7 sm:p-8">
            <h3 className="mb-4 flex items-center gap-2.5 text-[19px] font-extrabold">
              <FitBadge tone="no" />
              {fit.no.title}
            </h3>
            <ul className="grid gap-3">
              {fit.no.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[15.5px] text-subtle"
                >
                  <CrossIcon className="mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>
      </Stagger>
    </Frame>
  );
}
