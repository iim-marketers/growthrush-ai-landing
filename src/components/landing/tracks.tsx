import { getLandingContent } from "@/lib/content";
import { Frame, SectionTitle } from "./frame";
import { CheckIcon, Kicker } from "./primitives";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export async function Tracks({ anchor }: { anchor: string }) {
  const { tracks } = await getLandingContent();

  return (
    <Frame id={anchor}>
      <Reveal>
        <Kicker>{tracks.kicker}</Kicker>
        <SectionTitle>{tracks.title}</SectionTitle>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
        {tracks.items.map((track) => (
          <StaggerItem key={track.title}>
            <div className="h-full rounded-2xl border border-line-strong bg-card p-7 sm:p-8">
              <span className="mb-3.5 inline-block rounded-full bg-success/12 px-3 py-1 text-[12.5px] font-semibold text-success">
                {track.tag}
              </span>
              <h3 className="mb-4 text-2xl font-extrabold">{track.title}</h3>
              <ul className="grid gap-2.5">
                {track.points.map((point) => (
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
        ))}
      </Stagger>

      <Reveal>
        <p className="mt-6 text-subtle sm:text-base">{tracks.note}</p>
      </Reveal>
    </Frame>
  );
}
