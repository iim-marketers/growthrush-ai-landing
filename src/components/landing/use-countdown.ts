"use client";

import { useEffect, useState } from "react";
import { countdownOffset } from "@/lib/landing-data";

export type TimeLeft = { d: string; h: string; m: string; s: string };

const BLANK: TimeLeft = { d: "--", h: "--", m: "--", s: "--" };

const pad = (n: number) => String(n).padStart(2, "0");

export function useCountdown(): TimeLeft {
  const [left, setLeft] = useState<TimeLeft>(BLANK);

  // Deadline is set on mount, not at render, so server and first client
  // paint agree and React reports no hydration mismatch.
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
