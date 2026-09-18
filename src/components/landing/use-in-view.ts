"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Fires once, the first time the element scrolls into view.
 *
 * Returns the ref to attach and whether it has been seen yet. The state is only
 * set from the observer callback, never synchronously in the effect body, so it
 * does not trigger a cascading render on mount.
 */
export function useInView<T extends Element>(
  threshold = 0.25,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            observer.disconnect();
          }
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen];
}
