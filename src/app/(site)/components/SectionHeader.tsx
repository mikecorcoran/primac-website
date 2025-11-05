"use client";

import { useReveal, revealClasses } from "@/lib/motion";
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
}: SectionHeaderProps) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-3 text-pretty",
        alignment[align],
        revealClasses(isVisible, className),
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-semibold text-steel sm:text-[28px]">
        <span className="text-balance">{title}</span>
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};
