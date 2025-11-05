"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export const MOTION = {
  dur: 240,
  ease: "ease-in-out",
} as const;

type RevealOptions = {
  /** Sets how far outside the viewport the observer should trigger. */
  rootMargin?: string;
  /** Intersection ratio required before marking the element visible. */
  threshold?: number;
};

export const usePrefersReducedMotion = () => {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefers(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return prefers;
};

export const useReveal = <T extends HTMLElement>({
  rootMargin = "0px 0px -12%",
  threshold = 0.1,
}: RevealOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin, threshold }),
    [rootMargin, threshold],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (isVisible) {
      node.classList.add("is-visible");
      return;
    }

    if (prefersReducedMotion) {
      const raf = window.requestAnimationFrame(() => {
        setIsVisible(true);
        node.classList.add("is-visible");
      });
      return () => window.cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          node.classList.add("is-visible");
          observer.disconnect();
        }
      });
    }, observerOptions);

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible, observerOptions, prefersReducedMotion]);

  return { ref, isVisible } as const;
};

type ParallaxOptions = {
  /** The maximum total translateY distance (in px) applied across the scroll range. */
  max?: number;
};

export const useParallax = ({ max = 20 }: ParallaxOptions = {}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      const raf = window.requestAnimationFrame(() => setValue(0));
      return () => window.cancelAnimationFrame(raf);
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / viewportHeight, 0), 1);
      const offset = (progress - 0.5) * max;
      setValue(Number(offset.toFixed(2)));
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [max, prefersReducedMotion]);

  return prefersReducedMotion ? 0 : value;
};
