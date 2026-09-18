"use client";

import { useEffect, useState } from "react";
import { countdownOffset } from "@/lib/landing-data";

export type TimeLeft = { d: string; h: string; m: string; s: string };

const BLANK: TimeLeft = { d: "--", h: "--", m: "--", s: "--" };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The applications-close countdown, shared by the top bar, the offer card and
 * the closing section.
 *
 * The deadline is set from the browser's clock on mount rather than at render,
 * so the server and the first client paint agree on the placeholder and React
 * does not report a hydration mismatch.
 */
export function useCountdown(): TimeLeft {
  const [left, setLeft] = useState<TimeLeft>(BLANK);

  useEffect(() => {
    const deadline =
      Date.now() +
      ((countdownOffset.days * 24 + countdownOffset.hours) * 3600 +
        countdownOffset.minutes * 60) *
        1000;

    const tick = () => {
      const diff = Math.max(deadline - Date.now(), 0);
      setLeft({
        d: pad(Math.floor(diff / 86_400_000)),
        h: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
        m: pad(Math.floor((diff % 3_600_000) / 60_000)),
        s: pad(Math.floor((diff % 60_000) / 1000)),
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return left;
}
