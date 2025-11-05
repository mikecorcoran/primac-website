"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useReveal } from "@/lib/motion";
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

type StepCardProps = {
  step: ReliabilityStep;
  index: number;
  isActive: boolean;
  onVisible: (index: number) => void;
  onSelect: (index: number) => void;
};

const StepCard = ({ step, index, isActive, onVisible, onSelect }: StepCardProps) => {
  const { ref, isVisible } = useReveal<HTMLLIElement>({ rootMargin: "-20% 0px -35%" });
  const contentId = useId();

  useEffect(() => {
    if (isVisible) {
      onVisible(index);
    }
  }, [index, isVisible, onVisible]);

  return (
    <li
      ref={ref}
      className={cn(
        "relative rounded-[5px] border border-transparent bg-white p-5 pl-14 transition-colors duration-200 ease-in-out sm:p-6 sm:pl-16",
        isActive
          ? "border-steel shadow-[0_18px_36px_-30px_rgba(17,37,55,0.65)]"
          : "border-[#d7dde3]",
      )}
      aria-current={isActive ? "step" : undefined}
    >
      <div
        className={cn(
          "absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold text-steel transition-colors duration-200 ease-in-out sm:left-6 sm:top-6 sm:h-10 sm:w-10",
          isActive
            ? "border-steel bg-steel text-white shadow-[0_12px_32px_-18px_rgba(30,61,88,0.65)]"
            : "border-[#d7dde3] bg-surface",
        )}
        aria-hidden="true"
      >
        {index + 1}
      </div>
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 text-left"
        onClick={() => onSelect(index)}
        aria-expanded={isActive}
        aria-controls={contentId}
      >
        <div className="flex-1 space-y-2">
          <h3 className="text-base font-semibold text-steel sm:text-lg">{step.title}</h3>
          <p className="hidden text-sm text-muted lg:block lg:text-base">{step.description}</p>
        </div>
        <svg
          className={cn(
            "mt-1 h-5 w-5 flex-shrink-0 text-muted transition-transform duration-200 ease-in-out lg:hidden",
            isActive ? "rotate-180" : "rotate-0",
          )}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M4 7.5L10 13.5L16 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={contentId}
        className={cn(
          "grid overflow-hidden text-sm text-muted transition-[grid-template-rows,opacity] duration-300 ease-out sm:text-base",
          isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
          "lg:mt-4 lg:grid-rows-[1fr] lg:opacity-100",
        )}
      >
        <div className="min-h-0 space-y-3">
          <p className="lg:hidden">{step.description}</p>
          <div className="relative overflow-hidden rounded-[6px] border border-[#d7dde3] lg:hidden">
            <Image
              src={step.image.src}
              alt={step.image.alt}
              width={640}
              height={480}
              className="h-48 w-full object-cover"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/85 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </li>
  );
};

export const ReliabilityArc = ({ steps, description }: ReliabilityArcProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStep = useMemo(() => steps[activeIndex] ?? steps[0], [activeIndex, steps]);

  const handleVisible = useCallback(
    (index: number) => {
      setActiveIndex((prev) => (prev === index ? prev : index));
    },
    [],
  );

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="space-y-6">
        <p className="text-base text-muted sm:text-lg">{description}</p>
        <ol className="relative space-y-4 before:absolute before:left-[2.35rem] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-[#ccd5de] before:to-transparent sm:before:left-[2.75rem]">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              isActive={activeIndex === index}
              onVisible={handleVisible}
              onSelect={handleSelect}
            />
          ))}
        </ol>
      </div>
      <div className="hidden overflow-hidden rounded-[6px] border border-[#d7dde3] bg-[#0e1f2f] shadow-[0_32px_48px_-40px_rgba(8,23,38,0.8)] lg:sticky lg:top-24 lg:block">
        <div className="relative">
          <Image
            key={activeStep.image.src}
            src={activeStep.image.src}
            alt={activeStep.image.alt}
            width={720}
            height={480}
            className="h-full w-full object-cover opacity-95"
            sizes="(min-width: 1024px) 38vw, 100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061321]/85 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 bg-gradient-to-t from-[#061321]/95 via-[#061321]/60 to-transparent px-6 pb-6 pt-10">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Step {activeIndex + 1}</span>
            <p className="text-base font-semibold text-white">{activeStep.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
