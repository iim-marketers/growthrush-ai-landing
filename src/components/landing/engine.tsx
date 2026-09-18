import { engine } from "@/lib/landing-data";
import { Frame, SectionLede, SectionTitle } from "./frame";
import { Kicker } from "./primitives";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export function Engine() {
  return (
    <Frame id="engine" className="bg-white/2">
      <Reveal>
        <Kicker>{engine.kicker}</Kicker>
        <SectionTitle>{engine.title}</SectionTitle>
        <SectionLede>{engine.lede}</SectionLede>
      </Reveal>

      <Stagger className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {engine.pillars.map((pillar) => (
          <StaggerItem key={pillar.idx} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-hairline bg-card p-6 transition-all hover:-translate-y-1 hover:border-line-strong sm:p-7">
              <div className="font-display text-[15px] font-extrabold text-orange">
                {pillar.idx}
              </div>
              <h3 className="mt-3 mb-2 text-xl font-extrabold">
                {pillar.title}
              </h3>
              <p className="text-[15px] text-subtle">{pillar.body}</p>
              <p className="mt-auto border-l-2 border-orange pl-3 pt-3.5 text-sm">
                <b className="font-bold text-orange">You get:</b> {pillar.get}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Frame>
  );
}
