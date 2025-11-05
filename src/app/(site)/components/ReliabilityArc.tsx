"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
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
};

const StepCard = ({ step, index, isActive, onVisible }: StepCardProps) => {
  const { ref, isVisible } = useReveal<HTMLLIElement>({ rootMargin: "-20% 0px -35%" });

  useEffect(() => {
    if (isVisible) {
      onVisible(index);
    }
  }, [index, isVisible, onVisible]);

  const delay = `${Math.min(index * 60, 80)}ms`;

  return (
    <li
      ref={ref}
      className={cn(
        "relative rounded-[5px] border border-transparent bg-white/95 p-6 pl-10 transition-colors duration-200 ease-in-out",
        isActive ? "border-steel shadow-[0_18px_36px_-30px_rgba(17,37,55,0.65)]" : "border-[#d7dde3]",
      )}
      aria-current={isActive ? "step" : undefined}
    >
      <div className="absolute left-4 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-[#d7dde3] bg-surface text-xs font-semibold text-steel">
        {index + 1}
      </div>
      <div className="fade-in-up space-y-3" style={{ transitionDelay: delay }}>
        <h3 className="text-lg font-semibold text-steel">{step.title}</h3>
        <p className="text-sm text-muted sm:text-base">{step.description}</p>
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

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="space-y-6">
        <p className="text-base text-muted sm:text-lg">{description}</p>
        <ol className="relative space-y-4 before:absolute before:left-7 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-[#ccd5de] before:to-transparent">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              isActive={activeIndex === index}
              onVisible={handleVisible}
            />
          ))}
        </ol>
      </div>
      <div className="fade-in-up sticky top-24 overflow-hidden rounded-[6px] border border-[#d7dde3] bg-[#0e1f2f] shadow-[0_32px_48px_-40px_rgba(8,23,38,0.8)]">
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
