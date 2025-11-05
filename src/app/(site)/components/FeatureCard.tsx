"use client";

import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { Reveal } from "./Reveal";
import { cn } from "./utils";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
  supportingImage?: {
    src: string;
    alt: string;
  };
} & ComponentPropsWithoutRef<"article">;

export const FeatureCard = ({
  icon,
  title,
  description,
  supportingImage,
  className,
  ...rest
}: FeatureCardProps) => (
  <Reveal className={cn("h-full", className)}>
    <article
      className="card-hover flex h-full flex-col gap-6 rounded-[4px] border border-[#d7dde3] bg-white p-6 shadow-[var(--shadow-card)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal md:flex-row md:items-stretch md:gap-8"
      {...rest}
    >
      <div className="flex flex-1 flex-col gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface">
          <Image src={icon} alt="" width={32} height={32} aria-hidden="true" />
        </span>
        <div className="fade-in-up space-y-3">
          <h3 className="text-lg font-semibold text-steel">{title}</h3>
          <p className="text-sm text-muted sm:text-base">{description}</p>
        </div>
      </div>
      {supportingImage && (
        <div className="fade-in-up relative overflow-hidden rounded-[4px] border border-[#e1e6eb] bg-surface/80 shadow-[inset_0_1px_2px_rgba(17,35,54,0.12)] md:h-auto md:w-40">
          <Image
            src={supportingImage.src}
            alt={supportingImage.alt}
            fill
            sizes="(min-width: 768px) 10rem, 100vw"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </article>
  </Reveal>
);
