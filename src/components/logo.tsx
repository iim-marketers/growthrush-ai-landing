import Image from "next/image";
import { cn } from "@/lib/utils";
import { getLandingContent } from "@/lib/content";

const wordmark = {
  light: "/brand/wordmark-light.png",
  dark: "/brand/wordmark.png",
} as const;

const sizes = {
  sm: "h-5 sm:h-6",
  md: "h-6 sm:h-7",
  lg: "h-8 sm:h-10",
} as const;

export async function Logo({
  size = "sm",
  tone = "light",
  className,
  eager = false,
}: {
  size?: keyof typeof sizes;
  tone?: keyof typeof wordmark;
  className?: string;
  eager?: boolean;
}) {
  const { brand } = await getLandingContent();

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
