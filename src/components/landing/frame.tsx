import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FrameProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  /** Decorative layer painted behind the content, inside the section. */
  backdrop?: ReactNode;
  children: ReactNode;
};

export function Frame({
  id,
  className,
  innerClassName,
  backdrop,
  children,
}: FrameProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-[clamp(3rem,6vw,5.5rem)] outline-none",
        className,
      )}
    >
      {backdrop}
      <div
        className={cn(
          "relative z-2 mx-auto w-full max-w-296 px-5 sm:px-7",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Section heading, at the one size every section uses. */
export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "max-w-[15em] text-[clamp(1.8rem,1.1rem+2.6vw,3rem)] leading-[1.05]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** The supporting line under a section heading. */
export function SectionLede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("mt-4 max-w-[34em] text-subtle sm:text-[17px]", className)}
    >
      {children}
    </p>
  );
}
