import { ShieldCheck } from "lucide-react";
import { getLandingContent } from "@/lib/content";
import { Frame } from "./frame";
import { CheckIcon, CrossIcon } from "./primitives";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export async function Guarantee() {
  const { guarantee, inaction } = await getLandingContent();

  return (
    <Frame>
      <Reveal>
        <div className="rounded-2xl border border-success bg-success/10 px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-success">
              <ShieldCheck className="size-5.5 text-background" />
            </span>
            <h3 className="text-xl font-extrabold">{guarantee.title}</h3>
          </div>
          <p className="mt-3.5 text-[15.5px] text-subtle">{guarantee.body}</p>
        </div>
      </Reveal>

      <Stagger className="mt-9 grid gap-5 md:grid-cols-2">
        <StaggerItem className="h-full">
          <div className="h-full rounded-2xl border border-hairline bg-card p-6 sm:p-7">
            <h3 className="mb-4 text-lg font-extrabold">
              {inaction.wait.title}
            </h3>
            <ul className="grid gap-3">
              {inaction.wait.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[15px] text-subtle"
                >
                  <CrossIcon className="mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </StaggerItem>

        <StaggerItem className="h-full">
          <div className="h-full rounded-2xl border border-orange bg-linear-to-br from-orange/10 to-card p-6 sm:p-7">
            <h3 className="mb-4 text-lg font-extrabold">
              {inaction.act.title}
            </h3>
            <ul className="grid gap-3">
              {inaction.act.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-[15px] text-subtle"
                >
                  <CheckIcon className="mt-0.5" />
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
