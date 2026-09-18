"use client";

import { useReducedMotion } from "motion/react";

import { useInView } from "./use-in-view";
import {
  cities,
  hubCity,
  indiaPath,
  labelAnchors,
  labeledCities,
  routes,
} from "./india-map-data";

/**
 * The hero's animated map: one hub radiating routes to a national network.
 *
 * Routes draw themselves in with a stroke-dash sweep and the nodes pop in
 * behind them, both staggered by index. The whole thing waits until it scrolls
 * into view, and renders in its final state under `prefers-reduced-motion`.
 */
export function NetworkMap() {
  const [ref, seen] = useInView<SVGSVGElement>(0.25);
  const reduced = useReducedMotion();
  // Under reduced motion the map is simply drawn in its final state.
  const revealed = Boolean(reduced) || seen;

  return (
    <svg
      ref={ref}
      viewBox="0 0 560 607"
      className="block h-auto w-full overflow-visible"
      role="img"
      aria-label="Map of India showing a national distribution and franchise network"
    >
      <defs>
        <linearGradient id="landg" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#1b2a63" />
          <stop offset="1" stopColor="#0a1030" />
        </linearGradient>
        <filter id="landglow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="9"
            floodColor="#5b7fff"
            floodOpacity="0.55"
          />
        </filter>
      </defs>

      <path
        d={indiaPath}
        fill="url(#landg)"
        stroke="#7d9bff"
        strokeWidth="1.4"
        filter="url(#landglow)"
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity .7s ease",
        }}
      />

      <g>
        {routes.map(([from, to], i) => {
          const a = cities[from];
          const b = cities[to];
          if (!a || !b) return null;
          const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
          return (
            <line
              key={`${from}-${to}`}
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke="rgba(91,127,255,0.4)"
              strokeWidth={1.5}
              style={{
                strokeDasharray: length,
                strokeDashoffset: revealed ? 0 : length,
                opacity: revealed ? 1 : 0,
                transition: `stroke-dashoffset .8s ease, opacity .4s ease`,
                transitionDelay: `${0.3 + i * 0.03}s`,
              }}
            />
          );
        })}
      </g>

      <g>
        {Object.entries(cities).map(([name, [x, y]], i) => {
          const isHub = name === hubCity;
          const isMajor = labeledCities.includes(name);
          const r = isHub ? 15 : isMajor ? 8 : 5;
          const core = isHub ? 6.5 : isMajor ? 3.8 : 2.6;
          const labelled = isHub || isMajor;
          const anchorStart = (labelAnchors[name] ?? "s") === "s";

          return (
            <g
              key={name}
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "scale(1)" : "scale(0.4)",
                transformBox: "fill-box",
                transformOrigin: "center",
                transition:
                  "opacity .5s ease, transform .55s cubic-bezier(.2,.9,.3,1.2)",
                transitionDelay: `${0.1 + i * 0.035}s`,
              }}
            >
              <circle cx={x} cy={y} r={r} fill="#060d1d" />
              <circle
                cx={x}
                cy={y}
                r={r}
                fill="none"
                stroke={isHub ? "var(--orange)" : "var(--brand)"}
                strokeWidth={isHub ? 3 : 2}
                opacity={isMajor || isHub ? 1 : 0.75}
              />
              <circle
                cx={x}
                cy={y}
                r={core}
                fill={isHub ? "var(--orange)" : "var(--brand)"}
                style={{
                  filter: isHub
                    ? "drop-shadow(0 0 10px rgba(249,115,22,.9))"
                    : isMajor
                      ? "drop-shadow(0 0 6px rgba(91,127,255,.8))"
                      : "drop-shadow(0 0 3px rgba(91,127,255,.6))",
                }}
              />
              {labelled ? (
                /*
                 * The hub is labelled underneath rather than beside it: to its
                 * right the text runs straight through the Raipur node.
                 */
                <text
                  x={isHub ? x : x + (anchorStart ? 12 : -12)}
                  y={isHub ? y + 30 : y + 4}
                  textAnchor={isHub ? "middle" : anchorStart ? "start" : "end"}
                  className="font-sans text-[13px]"
                  fontWeight={isHub ? 700 : 600}
                  fill={isHub ? "var(--text-primary)" : "var(--text-secondary)"}
                >
                  {name}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
