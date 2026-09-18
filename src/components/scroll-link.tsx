"use client";

import { useCallback, type AnchorHTMLAttributes, type MouseEvent } from "react";

type ScrollLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** id of the section to scroll to, without the leading `#`. */
  targetId: string;
  /**
   * Breathing room left above the section once it lands. Defaults to 0: the
   * landing frames are full-height with their own internal padding, so
   * aligning their top edge to the viewport top is what fills the screen.
   */
  offset?: number;
};

/**
 * In-page anchor that scrolls smoothly and, unlike a plain `<a href="#...">`,
 * leaves the hash out of the URL. The `href` is kept so the link still works
 * (as a plain jump) before hydration and reads correctly to assistive tech.
 */
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

      const target = document.getElementById(targetId);
      if (!target) return;

      // Preventing the default is what keeps `#how-it-works` out of the URL.
      event.preventDefault();

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      // Move keyboard focus along with the scroll, without letting focus()
      // yank the page there instantly.
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
