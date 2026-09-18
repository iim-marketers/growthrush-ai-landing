"use client";

import { useCallback, type AnchorHTMLAttributes, type MouseEvent } from "react";

type ScrollLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  targetId: string;
  offset?: number;
};

export function ScrollLink({
  targetId,
  offset = 0,
  onClick,
  children,
  ...rest
}: ScrollLinkProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      // Falling back to the `href` when the section is missing would strand
      // the visitor on a `/#whatever` URL that scrolls nowhere.
      event.preventDefault();

      const target = document.getElementById(targetId);
      if (!target) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    },
    [targetId, offset, onClick],
  );

  return (
    <a href={`#${targetId}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
