import { team } from "@/lib/landing-data";
import { Frame, SectionTitle } from "./frame";
import { Kicker } from "./primitives";
import { Reveal } from "./motion-primitives";

export function Team() {
  return (
    <Frame
      className="bg-white/2"
      innerClassName="grid items-center gap-11 lg:grid-cols-[0.8fr_1.2fr]"
    >
      <Reveal>
        <div className="mx-auto grid aspect-4/5 w-full max-w-75 place-items-center rounded-[1.25rem] border border-line-strong bg-linear-to-br from-white/6 to-card text-sm text-faint lg:max-w-none">
          [ Team photo ]
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <Kicker>{team.kicker}</Kicker>
        <SectionTitle>{team.title}</SectionTitle>
        {team.body.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 max-w-[38em] text-subtle sm:text-[16.5px]"
          >
            {paragraph}
          </p>
        ))}
      </Reveal>
    </Frame>
  );
}
