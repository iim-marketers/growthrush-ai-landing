"use client";

import { useReducedMotion } from "motion/react";

import { problem } from "@/lib/landing-data";
import { useInView } from "./use-in-view";

const GOOD_PATH = "M64 300 C160 300 210 240 285 190 S420 92 484 55";
const BAD_PATH = "M64 300 C160 300 220 288 300 285 S430 289 484 292";

export function RevenueChart() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const reduced = Boolean(useReducedMotion());
  const revealed = reduced || seen;

  const lineStyle = (i: number) =>
    reduced
      ? undefined
      : {
          strokeDasharray: 1,
          strokeDashoffset: revealed ? 0 : 1,
          transition: `stroke-dashoffset 1.5s ease ${i * 0.25}s`,
        };

  return (
    <div
      ref={ref}
      className="rounded-[1.125rem] border border-white/12 bg-linear-to-br from-white/6 to-card p-5 pb-4 sm:p-6 sm:pb-4"
    >
      <div className="mb-1 font-display text-[15px] font-extrabold">
        {problem.chartTitle}
      </div>

      <svg
        viewBox="0 0 520 400"
        className="block h-auto w-full"
        role="img"
        aria-label={`Revenue over time: with growthrush.ai it climbs steeply; expanding the wrong way stays flat`}
      >
        <defs>
          <linearGradient id="garea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5b7fff" stopOpacity="0.33" />
            <stop offset="1" stopColor="#5b7fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[80, 140, 200, 260].map((y) => (
          <line
            key={y}
            x1="64"
            y1={y}
            x2="484"
            y2={y}
            stroke="rgba(255,255,255,.06)"
          />
        ))}
        <line x1="64" y1="40" x2="64" y2="320" stroke="rgba(255,255,255,.16)" />
        <line
          x1="64"
          y1="320"
          x2="484"
          y2="320"
          stroke="rgba(255,255,255,.16)"
        />

        <path
          d="M64 300 C160 300 210 240 285 190 S420 92 484 55 L484 320 L64 320 Z"
          fill="url(#garea)"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity .7s ease .9s",
          }}
        />

        <path
          d={BAD_PATH}
          pathLength={1}
          fill="none"
          strokeWidth={3.2}
          strokeLinecap="round"
          stroke="var(--orange)"
          className="drop-shadow-[0_0_5px_rgba(249,115,22,0.45)]"
          style={lineStyle(1)}
        />
        <path
          d={GOOD_PATH}
          pathLength={1}
          fill="none"
          strokeWidth={3.2}
          strokeLinecap="round"
          stroke="var(--brand)"
          className="drop-shadow-[0_0_6px_rgba(91,127,255,0.7)]"
          style={lineStyle(0)}
        />

        {!reduced ? (
          <circle
            r="4.5"
            fill="#dce6ff"
            className="drop-shadow-[0_0_7px_rgba(168,192,255,0.95)]"
          >
            <animateMotion
              dur="2.9s"
              begin="1.4s"
              repeatCount="indefinite"
              keyPoints="0;1;1"
              keyTimes="0;0.72;1"
              calcMode="linear"
              path={GOOD_PATH}
            />
          </circle>
        ) : null}

        <circle
          cx="484"
          cy="292"
          r="5"
          fill="var(--orange)"
          style={{ opacity: revealed ? 1 : 0, transition: "opacity .45s ease 1.35s" }}
        />
        <circle
          cx="484"
          cy="55"
          r="5"
          fill="var(--brand-soft)"
          style={{ opacity: revealed ? 1 : 0, transition: "opacity .45s ease 1.35s" }}
        />

        <text
          x="472"
          y="44"
          textAnchor="end"
          fill="var(--brand-soft)"
          className="font-sans text-[13px] font-semibold"
        >
          {problem.chartGood}
        </text>
        <text
          x="300"
          y="308"
          textAnchor="middle"
          fill="var(--orange)"
          className="font-sans text-[13px] font-semibold"
        >
          {problem.chartBad}
        </text>
        <text
          x="274"
          y="350"
          textAnchor="middle"
          fill="var(--text-muted)"
          className="font-sans text-xs"
        >
          Time
        </text>
        <text
          transform="translate(28,180) rotate(-90)"
          textAnchor="middle"
          fill="var(--text-muted)"
          className="font-sans text-xs"
        >
          Revenue
        </text>
      </svg>

      <div className="mt-2 flex justify-center gap-4.5 text-[12.5px] text-subtle">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-[3px] w-3.5 rounded-sm bg-brand" />
          {problem.chartGood}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-[3px] w-3.5 rounded-sm bg-orange" />
          The wrong way
        </span>
      </div>
    </div>
  );
}
