import { getLandingContent } from "@/lib/content";
import { Frame, SectionTitle } from "./frame";
import { Kicker } from "./primitives";
import { Reveal } from "./motion-primitives";
import { RevenueChart } from "./revenue-chart";

export async function Problem({ anchor }: { anchor: string }) {
  const { problem } = await getLandingContent();

  return (
    <Frame
      id={anchor}
      className="bg-white/2"
      innerClassName="grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
    >
      <Reveal className="min-w-0">
        <Kicker>{problem.kicker}</Kicker>
        <SectionTitle>{problem.title}</SectionTitle>
        <p className="mt-4 max-w-[32em] text-subtle sm:text-[18px]">
          {problem.body}
        </p>

        <ul className="mt-7 max-w-[42em] border-t border-hairline">
          {problem.wall.map((item, i) => (
            <li
              key={item}
              className="flex items-baseline gap-4 border-b border-hairline py-4 text-[16.5px]"
            >
              <span className="w-5.5 shrink-0 font-display text-sm font-extrabold text-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-7 max-w-[30em] text-lg leading-snug font-semibold">
          {problem.turnLead}{" "}
          <em className="font-bold text-orange not-italic">
            {problem.turnAccent}
          </em>
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <RevenueChart problem={problem} />
      </Reveal>
    </Frame>
  );
}
