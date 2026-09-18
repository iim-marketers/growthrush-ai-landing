import { bonuses } from "@/lib/landing-data";
import { Frame, SectionTitle } from "./frame";
import { Kicker } from "./primitives";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export function Bonuses() {
  return (
    <Frame>
      <Reveal>
        <Kicker>{bonuses.kicker}</Kicker>
        <SectionTitle>{bonuses.title}</SectionTitle>
      </Reveal>

      <Stagger className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bonuses.items.map((bonus) => (
          <StaggerItem key={bonus.tag} className="h-full">
            <div className="h-full rounded-2xl border border-dashed border-line-strong bg-card p-6">
              <div className="text-xs font-bold text-orange">{bonus.tag}</div>
              <h4 className="my-2 font-display text-lg font-extrabold">
                {bonus.title}
              </h4>
              <p className="text-[14.5px] text-subtle">{bonus.body}</p>
              <p className="mt-3.5 text-sm text-faint">
                Value <b className="font-bold text-success">{bonus.value}</b>
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <p className="mt-6 text-center text-base text-subtle">
          Total bonus value:{" "}
          <b className="font-display font-extrabold text-orange">
            {bonuses.total}
          </b>{" "}
          — included free.
        </p>
      </Reveal>
    </Frame>
  );
}
