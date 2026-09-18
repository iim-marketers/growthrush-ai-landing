"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/** Height of one digit cell, in em — the reel translates in multiples of this. */
const CELL = 1.1;

/** Breathing room, in em, between the last digit and whatever follows it. */
const TAIL_GAP = 0.1;

const DIGITS = [..."0123456789"];

const reelVariants: Variants = {
  hidden: { y: 0 },
  show: ({ stops, index }: { stops: number; index: number }) => ({
    y: `-${stops * CELL}em`,
    transition: {
      duration: 1.1 + index * 0.18,
      delay: index * 0.08,
      ease: [0.12, 0.72, 0.16, 1],
    },
  }),
};

function Cell({ children }: { children: string }) {
  return (
    <span
      className="flex items-center justify-center whitespace-pre"
      style={{ height: `${CELL}em` }}
    >
      {children}
    </span>
  );
}

export function FlipNumber({
  value,
  className,
  turns = 2,
}: {
  value: string;
  className?: string;
  /** Complete 0-9 revolutions each digit spins through before landing. */
  turns?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{value}</span>;

  const chars = [...value];
  const lastDigit = chars.findLastIndex((char) => /\d/.test(char));
  let digitIndex = 0;

  return (
    <span className={className}>
      <span
        aria-hidden
        className="inline-flex tabular-nums"
        style={{ height: `${CELL}em` }}
      >
        {chars.map((char, i) => {
          if (!/\d/.test(char)) {
            return <Cell key={`${i}-${char}`}>{char}</Cell>;
          }

          const stops = turns * 10 + Number(char);
          const index = digitIndex++;

          return (
            <span
              key={`${i}-${char}`}
              className="overflow-hidden"
              style={{
                height: `${CELL}em`,
                marginRight: i === lastDigit ? `${TAIL_GAP}em` : undefined,
              }}
            >
              <motion.span
                className="flex flex-col"
                custom={{ stops, index }}
                variants={reelVariants}
              >
                {Array.from({ length: stops + 1 }, (_, n) => (
                  <Cell key={n}>{DIGITS[n % 10]}</Cell>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
