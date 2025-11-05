"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "./utils";

export type ReliabilityStep = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

type ReliabilityArcProps = {
  steps: ReliabilityStep[];
  description: string;
};

type StepItemProps = {
  step: ReliabilityStep;
  index: number;
  isActive: boolean;
  prefersReducedMotion: boolean;
  registerNode: (index: number, node: HTMLLIElement | null) => void;
  stackLevel: number;
};

const StepItem = ({
  step,
  index,
  isActive,
  prefersReducedMotion,
  registerNode,
  stackLevel,
}: StepItemProps) => {
  return (
    <li
      ref={(node) => registerNode(index, node)}
      data-index={index}
      className={cn(
        // Negative top margins make each card overlap the previous one once it reaches the sticky position.
        index === 0
          ? "mt-0"
          : "-mt-[28vh] sm:-mt-[24vh] lg:-mt-[20vh]",
        "relative min-h-[80vh] sm:min-h-[90vh] lg:min-h-[100vh]",
      )}
    >
      <article
        className={cn(
          // Sticky keeps the active card pinned roughly 18vh from the top of the viewport.
          "sticky top-[18vh]",
          "relative space-y-4 rounded-[5px] border border-[#d7dde3]/90 bg-white p-5 sm:p-6",
          "transition-[box-shadow,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none",
          !prefersReducedMotion && "will-change-transform",
          isActive
            ? "shadow-[0_30px_70px_-34px_rgba(17,37,55,0.6)]"
            : "shadow-[0_18px_36px_-30px_rgba(17,37,55,0.45)]",
          !prefersReducedMotion && (isActive ? "-translate-y-1" : "translate-y-0"),
        )}
        style={{ zIndex: isActive ? stackLevel + 10 : stackLevel }}
      >
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-steel/70 sm:text-sm">
            Step {index + 1}
          </span>
          <h3 className="text-base font-semibold text-steel sm:text-lg">{step.title}</h3>
          <p className="text-sm text-muted sm:text-base">{step.description}</p>
        </div>
        <div className="relative overflow-hidden rounded-[5px] border border-[#d7dde3]/70">
          <Image
            src={step.image.src}
            alt={step.image.alt}
            width={640}
            height={480}
            className="h-44 w-full object-cover sm:h-52"
            sizes="(min-width: 1024px) 40vw, 100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/80 via-transparent to-transparent" aria-hidden="true" />
        </div>
      </article>
    </li>
  );
};

export const ReliabilityArc = ({ steps, description }: ReliabilityArcProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const registerNode = useCallback(
    (index: number, node: HTMLLIElement | null) => {
      itemRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const nodes = itemRefs.current.filter((node): node is HTMLLIElement => Boolean(node));
    if (!nodes.length) {
      return;
    }

    // IntersectionObserver marks whichever card is closest to the pinned position as the active step.
    const observer = new IntersectionObserver(
      (entries) => {
        let dominantEntry: IntersectionObserverEntry | null = null;

        entries.forEach((entry) => {
          if (!dominantEntry || entry.intersectionRatio > dominantEntry.intersectionRatio) {
            dominantEntry = entry;
          }
        });

        if (dominantEntry) {
          const nextIndex = Number(dominantEntry.target.getAttribute("data-index") ?? 0);
          setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
          return;
        }

        const viewportAnchor = window.innerHeight * 0.45;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        nodes.forEach((node, idx) => {
          const rect = node.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportAnchor);

          if (distance < closestDistance) {
            closestDistance = distance;
            const datasetIndex = Number(node.dataset.index ?? idx);
            closestIndex = Number.isNaN(datasetIndex) ? idx : datasetIndex;
          }
        });

        setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-45% 0px -45% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
      <div className="space-y-6">
        <p className="text-base text-muted sm:text-lg">{description}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="relative hidden lg:block">
          {/* Sticky rail keeps the numbered badges aligned with the active card. */}
          <ol className="sticky top-[18vh] flex flex-col gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-[background-color,box-shadow,color] duration-300 ease-out",
                    activeIndex === index
                      ? "border-steel bg-steel text-white shadow-[0_16px_32px_-24px_rgba(17,37,55,0.45)]"
                      : "border-[#c5d0da] bg-base text-steel/70 shadow-none",
                  )}
                >
                  {index + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
        {/* Bottom padding on the list gives the last card space to release from the sticky position. */}
        <ol
          className={cn(
            "relative list-none pl-0 pb-[55vh]",
            "lg:before:absolute lg:before:left-[-2.9rem] lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gradient-to-b lg:before:from-[#c7d3dd] lg:before:via-[#dbe3ea] lg:before:to-transparent lg:before:content-['']",
          )}
        >
          {steps.map((step, index) => (
            <StepItem
              key={step.title}
              step={step}
              index={index}
              isActive={activeIndex === index}
              prefersReducedMotion={prefersReducedMotion}
              registerNode={registerNode}
              stackLevel={index + 1}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};
