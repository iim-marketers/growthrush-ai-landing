import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/landing-data";

/**
 * The real wordmark, in two tones. `light` is the white-lettered cut for the
 * dark surface; `dark` is the black-lettered original, for white surfaces.
 */
const wordmark = {
  light: "/brand/wordmark-light.png",
  dark: "/brand/wordmark.png",
} as const;

/** Height only — the aspect ratio comes from the file (1078 × 166). */
const sizes = {
  sm: "h-5 sm:h-6",
  md: "h-6 sm:h-7",
  lg: "h-8 sm:h-10",
} as const;

export function Logo({
  size = "sm",
  tone = "light",
  className,
  eager = false,
}: {
  size?: keyof typeof sizes;
  tone?: keyof typeof wordmark;
  className?: string;
  /** Above the fold: skip lazy-loading. (`priority` is deprecated in Next 16.) */
  eager?: boolean;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={wordmark[tone]}
        alt={`${brand.name}${brand.suffix}`}
        width={1078}
        height={166}
        sizes="(max-width: 640px) 200px, 260px"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={cn("w-auto", sizes[size])}
      />
    </div>
  );
}
