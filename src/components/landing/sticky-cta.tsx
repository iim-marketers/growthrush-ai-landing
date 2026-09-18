"use client";

import { useEffect, useState } from "react";
import type { LandingContent } from "@/lib/content";
import { CtaButton } from "./primitives";
import { cn } from "@/lib/utils";

export function StickyCta({
  stickyBar,
}: {
  stickyBar: LandingContent["stickyBar"];
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      setShow(y > 760 && y < max - 420);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-70 border-t border-line-strong bg-background/95 backdrop-blur-lg transition-transform duration-300",
        show ? "translate-y-0" : "translate-y-[130%]",
      )}
    >
      <div className="mx-auto flex max-w-[74rem] items-center justify-between gap-4 px-4 py-2.5 sm:px-7 sm:py-3">
        <div className="flex min-w-0 flex-col">
          <b className="truncate font-display text-[15px] font-extrabold">
            {stickyBar.title}
          </b>
          <span className="hidden text-[12.5px] text-faint sm:block">
            {stickyBar.sub}
          </span>
        </div>
        <CtaButton className="shrink-0">{stickyBar.cta}</CtaButton>
      </div>
    </div>
  );
}
