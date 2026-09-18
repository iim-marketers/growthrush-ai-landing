"use client";

import { useCallback, type AnchorHTMLAttributes, type MouseEvent } from "react";

/**
 * Anchor that returns to the top of the page. `#top` is the spec's fallback
 * fragment for the document root, so this still works as a plain jump before
 * hydration; once hydrated it scrolls smoothly and keeps the hash out of the
 * URL, the same way {@link ScrollLink} does for in-page sections.
 */
export function ScrollToTop({
  onClick,
  children,
  ...rest
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      // Let cmd/ctrl/middle clicks open a new tab the way the browser wants.
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [onClick],
  );

  return (
    <a href="#top" onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
