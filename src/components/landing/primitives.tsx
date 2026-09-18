import type { ReactNode } from "react";
import { Check, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollLink } from "@/components/scroll-link";
import { cn } from "@/lib/utils";

/** The small orange pill that labels each section. */
export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mb-5 inline-flex items-center gap-2.5 rounded-full border border-orange/25 bg-orange/10",
        "px-3.5 py-1.5 text-[13px] font-semibold text-orange sm:text-sm",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange" />
      {children}
    </span>
  );
}

/**
 * The primary call to action. Always an in-page anchor — the landing page
 * deliberately has no route off it.
 */
export function CtaButton({
  children,
  targetId = "offer",
  size = "default",
  className,
}: {
  children: ReactNode;
  targetId?: string;
  size?: "default" | "big";
  className?: string;
}) {
  return (
    <Button
      asChild
      className={cn(
        "btn-cta relative h-auto overflow-hidden rounded-full font-display font-bold text-white",
        "transition-transform hover:-translate-y-0.5 active:translate-y-0",
        // Sized up from the phone: the full-desktop padding made these
        // overwhelm a narrow bar, so each size starts smaller and grows at sm.
        size === "big"
          ? "px-5 py-3 text-[15px] sm:px-7 sm:py-4 sm:text-base md:text-[17px]"
          : "px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-[15px]",
        className,
      )}
    >
      <ScrollLink targetId={targetId}>{children}</ScrollLink>
    </Button>
  );
}

/** Green tick used down every benefit list. */
export function CheckIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full bg-success",
        className,
      )}
      aria-hidden
    >
      <Check className="size-3 text-background" strokeWidth={3} />
    </span>
  );
}

/** Muted cross, for the "not for you" and "if you wait" lists. */
export function CrossIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full bg-white/10",
        className,
      )}
      aria-hidden
    >
      <X className="size-3 text-subtle" strokeWidth={3} />
    </span>
  );
}

/** Square badge that heads the two "fit" columns. */
export function FitBadge({ tone }: { tone: "yes" | "no" }) {
  const Icon = tone === "yes" ? Check : Minus;
  return (
    <span
      className={cn(
        "grid size-6.5 shrink-0 place-items-center rounded-lg",
        tone === "yes" ? "bg-success" : "bg-white/15",
      )}
      aria-hidden
    >
      <Icon
        className={cn(
          "size-3.5",
          tone === "yes" ? "text-background" : "text-subtle",
        )}
        strokeWidth={3}
      />
    </span>
  );
}
