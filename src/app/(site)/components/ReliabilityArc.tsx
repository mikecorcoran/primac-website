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
        "card-hover rounded-[4px] border bg-white/95 p-5 transition-colors duration-200 ease-in-out",
        isActive ? "border-steel shadow-[var(--shadow-card)]" : "border-[#d7dde3]",
      )}
      aria-current={isActive ? "step" : undefined}
    >
      <div className="fade-in-up space-y-3" style={{ transitionDelay: delay }}>
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-teal/80">
          Step {index + 1}
        </div>
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
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="space-y-6">
        <p className="text-base text-muted sm:text-lg">{description}</p>
        <ol className="space-y-4">
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
      <div className="fade-in-up sticky top-24 overflow-hidden rounded-[4px] border border-[#d7dde3] bg-[#0e1f2f] shadow-[var(--shadow-card)]">
        <Image
          key={activeStep.image.src}
          src={activeStep.image.src}
          alt={activeStep.image.alt}
          width={720}
          height={480}
          className="h-full w-full object-cover opacity-90"
          sizes="(min-width: 1024px) 40vw, 100vw"
          loading="lazy"
        />
      </div>
    </div>
  );
};
