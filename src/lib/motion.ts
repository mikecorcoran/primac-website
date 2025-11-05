"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type RevealOptions = {
  /** Offset applied to the intersection observer root margin. Defaults to `0px 0px -10%`. */
  rootMargin?: string;
  /** When set to `false`, the element will hide again when it leaves the viewport. */
  once?: boolean;
};

export const revealClassName = "fade-in-up";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useReveal = <T extends HTMLElement>({
  rootMargin = "0px 0px -10%",
  once = true,
}: RevealOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin }),
    [rootMargin],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (prefersReducedMotion()) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) {
          observer.disconnect();
        }
      } else if (!once) {
        setIsVisible(false);
      }
    }, observerOptions);

    observer.observe(node);

    return () => observer.disconnect();
  }, [observerOptions, once]);

  return { ref, isVisible } as const;
};

export const revealClasses = (isVisible: boolean, extra?: string) =>
  [revealClassName, isVisible && "is-visible", extra]
    .filter(Boolean)
    .join(" ");
