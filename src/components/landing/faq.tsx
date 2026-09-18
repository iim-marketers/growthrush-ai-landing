"use client";

import { useState } from "react";
import type { LandingContent } from "@/lib/content";
import { Frame, SectionTitle } from "./frame";
import { Kicker } from "./primitives";
import { Reveal } from "./motion-primitives";
import { cn } from "@/lib/utils";

export function Faq({
  anchor,
  faq,
}: {
  anchor: string;
  faq: LandingContent["faq"];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Frame id={anchor} className="bg-white/2">
      <Reveal>
        <Kicker>{faq.kicker}</Kicker>
        <SectionTitle>{faq.title}</SectionTitle>
      </Reveal>

      <div className="mt-10 border-t border-hairline">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-hairline">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent py-5 text-left font-display text-[17px] font-bold sm:text-lg"
                >
                  {item.q}
                  <span
                    aria-hidden
                    className={cn(
                      "relative size-6 shrink-0 transition-transform duration-250",
                      isOpen && "rotate-45",
                    )}
                  >
                    <span className="absolute top-1 left-2.75 h-3.75 w-0.5 rounded-sm bg-orange" />
                    <span className="absolute top-2.75 left-1 h-0.5 w-3.75 rounded-sm bg-orange" />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[52em] pb-5 text-subtle sm:text-base">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
