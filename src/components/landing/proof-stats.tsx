import { proofStats } from "@/lib/landing-data";
import { Frame } from "./frame";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

export function ProofStats() {
  return (
    <Frame
      id="proof"
      className="border-y border-hairline bg-white/2 py-10 sm:py-12"
    >
      <Reveal>
        <p className="mb-6 text-center text-[13px] text-faint">
          The expansion experience behind brands you already know
        </p>
      </Reveal>
      <Stagger className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-6">
        {proofStats.map((stat) => (
          <StaggerItem key={stat.label} className="text-center">
            <div className="font-display text-[clamp(1.9rem,1rem+3.6vw,2.9rem)] font-extrabold tracking-tight text-orange drop-shadow-[0_0_24px_rgba(249,115,22,0.25)]">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-subtle">{stat.label}</div>
          </StaggerItem>
        ))}
      </Stagger>
    </Frame>
  );
}
