import { getLandingContent } from "@/lib/content";
import { Frame, SectionLede, SectionTitle } from "./frame";
import { Kicker } from "./primitives";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export async function CaseStudies({ anchor }: { anchor: string }) {
  const { caseStudies } = await getLandingContent();

  return (
    <Frame id={anchor} className="bg-white/2">
      <Reveal>
        <Kicker>{caseStudies.kicker}</Kicker>
        <SectionTitle>{caseStudies.title}</SectionTitle>
        <SectionLede>{caseStudies.lede}</SectionLede>
      </Reveal>

      <Stagger className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.items.map((item, i) => (
          <StaggerItem key={i} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-hairline bg-card p-6 transition-all hover:-translate-y-1 hover:border-line-strong sm:p-7">
              <span className="mb-3.5 self-start rounded-full bg-success/12 px-2.75 py-1 text-xs font-semibold text-success">
                {item.tag}
              </span>
              <h3 className="mb-3 text-[22px] font-extrabold">{item.brand}</h3>
              <p className="mb-2.5 text-[14.5px] text-subtle">
                <b className="font-bold text-ink">Challenge:</b>{" "}
                {item.challenge}
              </p>
              <p className="mb-2.5 text-[14.5px] text-subtle">
                <b className="font-bold text-ink">What we built:</b>{" "}
                {item.built}
              </p>
              <div className="mt-auto flex gap-5.5 border-t border-hairline pt-4">
                {item.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="font-display text-[22px] font-extrabold text-orange">
                      {metric.value}
                    </div>
                    <div className="text-xs text-faint">{metric.label}</div>
                  </div>
                ))}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Frame>
  );
}
