"use client";

import { cn } from "@/lib/utils";
import { useCountdown } from "./use-countdown";

const UNITS = [
  { key: "d", label: "days" },
  { key: "h", label: "hrs" },
  { key: "m", label: "min" },
  { key: "s", label: "sec" },
] as const;

export function Countdown({
  closesAt,
  className,
}: {
  closesAt: string;
  className?: string;
}) {
  const left = useCountdown(closesAt);

  return (
    <div className={cn("flex gap-2", className)}>
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex-1 rounded-[0.5625rem] border border-line-strong bg-background py-2 text-center"
        >
          <b className="tabular block font-display text-[22px] font-extrabold text-orange">
            {left[unit.key]}
          </b>
          <span className="text-[11px] text-faint">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
