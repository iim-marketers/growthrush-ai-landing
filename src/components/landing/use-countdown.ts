"use client";

import { useEffect, useState } from "react";

export type TimeLeft = { d: string; h: string; m: string; s: string };

const BLANK: TimeLeft = { d: "--", h: "--", m: "--", s: "--" };

const pad = (n: number) => String(n).padStart(2, "0");

export function useCountdown(closesAt: string): TimeLeft {
  const [left, setLeft] = useState<TimeLeft>(BLANK);

  // The ticker starts on mount rather than at render, so server and first
  // client paint agree and React reports no hydration mismatch.
  useEffect(() => {
    const deadline = new Date(closesAt).getTime();
    if (Number.isNaN(deadline)) return;

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
  }, [closesAt]);

  return left;
}
