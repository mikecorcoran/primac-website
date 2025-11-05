"use client";

import Image from "next/image";
import { useReveal } from "@/lib/motion";

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
};

const StepItem = ({ step, index }: StepItemProps) => {
  const { ref } = useReveal<HTMLLIElement>({ rootMargin: "-15% 0px" });
  const transitionDelay = `${index * 80}ms`;

  return (
    <li ref={ref} className="relative pl-14 sm:pl-[3.75rem]">
      <div
        className="fade-in-up absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#c5d0da] bg-base text-sm font-semibold text-steel shadow-[0_14px_28px_-24px_rgba(17,37,55,0.6)] transition-[opacity,transform] duration-400 ease-out sm:h-11 sm:w-11"
        style={{ transitionDelay }}
        aria-hidden="true"
      >
        {index + 1}
      </div>
      <div
        className="fade-in-up relative z-10 space-y-4 rounded-[5px] border border-[#d7dde3] bg-white p-5 shadow-[0_18px_36px_-28px_rgba(17,37,55,0.45)] transition-[opacity,transform] duration-400 ease-out sm:p-6"
        style={{ transitionDelay }}
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
      </div>
    </li>
  );
};

export const ReliabilityArc = ({ steps, description }: ReliabilityArcProps) => {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
      <div className="space-y-6">
        <p className="text-base text-muted sm:text-lg">{description}</p>
      </div>
      <ol className="relative grid list-none gap-10 pl-0 before:absolute before:left-[1.35rem] before:top-1 before:bottom-1 before:z-0 before:w-px before:bg-gradient-to-b before:from-[#c7d3dd] before:via-[#dbe3ea] before:to-transparent before:content-[''] sm:before:left-[1.55rem]">
        {steps.map((step, index) => (
          <StepItem key={step.title} step={step} index={index} />
        ))}
      </ol>
    </div>
  );
};
