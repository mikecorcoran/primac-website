"use client";

import { Reveal } from "./Reveal";
import { cn } from "./utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const alignment: Record<"left" | "center", string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) => (
  <Reveal className={cn("flex flex-col gap-3 text-pretty", alignment[align], className)}>
    {eyebrow && (
      <span className="fade-in-up text-xs font-semibold uppercase tracking-[0.28em] text-teal">
        {eyebrow}
      </span>
    )}
    <h2 className="fade-in-up text-2xl font-semibold text-steel sm:text-[30px]">
      <span className="text-balance">{title}</span>
    </h2>
    {description && (
      <p className="fade-in-up max-w-2xl text-base text-muted sm:text-lg">
        {description}
      </p>
    )}
  </Reveal>
);
