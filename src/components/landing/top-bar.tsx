"use client";

import { announcement } from "@/lib/landing-data";
import { useCountdown } from "./use-countdown";

/** Announcement strip above the nav, with the applications-close countdown. */
export function TopBar() {
  const left = useCountdown();

  return (
    <div className="border-b border-hairline bg-[#070c1a] text-[13.5px]">
      <div className="mx-auto flex max-w-[74rem] flex-wrap items-center justify-center gap-4 px-5 py-2.5 sm:px-7 sm:justify-between">
        <span className="hidden items-center gap-2.5 text-subtle sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
          </span>
          {announcement.live}
        </span>
        <span className="text-subtle">
          {announcement.countdownLabel}{" "}
          <b className="tabular font-display font-extrabold text-orange">
            {left.d}
          </b>
          d{" "}
          <b className="tabular font-display font-extrabold text-orange">
            {left.h}
          </b>
          h{" "}
          <b className="tabular font-display font-extrabold text-orange">
            {left.m}
          </b>
          m{" "}
          <b className="tabular font-display font-extrabold text-orange">
            {left.s}
          </b>
          s
        </span>
      </div>
    </div>
  );
}
