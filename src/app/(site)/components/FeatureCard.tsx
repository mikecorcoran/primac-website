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
      className="card-hover group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-[#d7dde3] bg-white/98 p-6 shadow-[0_24px_36px_-38px_rgba(14,32,49,0.75)] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal md:flex-row md:items-stretch md:gap-8"
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-[#f0f3f6]/60 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" aria-hidden="true" />
      <div className="relative flex flex-1 flex-col gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d7dde3] bg-surface/80">
          <Image src={icon} alt="" width={32} height={32} aria-hidden="true" />
        </span>
        <div className="fade-in-up space-y-3">
          <h3 className="text-lg font-semibold text-steel">{title}</h3>
          <p className="text-sm text-muted sm:text-base">{description}</p>
        </div>
      </div>
      {supportingImage && (
        <div className="fade-in-up relative overflow-hidden rounded-[5px] border border-[#e1e6eb] bg-surface/80 shadow-[inset_0_1px_2px_rgba(17,35,54,0.12)] md:h-auto md:w-40">
          <Image
            src={supportingImage.src}
            alt={supportingImage.alt}
            fill
            sizes="(min-width: 768px) 10rem, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      )}
    </article>
  </Reveal>
);
