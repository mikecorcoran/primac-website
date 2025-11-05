"use client";

import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { Reveal } from "./Reveal";
import { cn } from "./utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  title: string;
  description: string;
  icon?: {
    src: string;
    alt: string;
  };
  href?: string;
  as?: "article" | "div" | "li";
};

const baseClasses =
  "card-hover relative flex h-full flex-col gap-4 overflow-hidden rounded-[6px] border border-[#d7dde3] bg-white/98 p-6 shadow-[0_20px_32px_-36px_rgba(12,31,49,0.7)] transition-all duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

export const Card = ({
  title,
  description,
  icon,
  href,
  as = "article",
  className,
  ...rest
}: CardProps) => {
  const content = (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-[#f3f6f8]/60" aria-hidden="true" />
      <div className="relative flex flex-col gap-4">
        {icon && (
          <span className="fade-in-up inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d7dde3] bg-surface/80">
            <Image src={icon.src} alt={icon.alt} width={32} height={32} />
          </span>
        )}
        <div className="fade-in-up space-y-3">
          <h3 className="text-lg font-semibold text-steel">{title}</h3>
          <p className="text-sm text-muted sm:text-base">{description}</p>
        </div>
        {href && (
          <span className="fade-in-up mt-auto inline-flex items-center gap-2 text-sm font-semibold text-teal">
            Learn more
            <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Reveal>
        <Link href={href} className={cn(baseClasses, className)} {...rest}>
          {content}
        </Link>
      </Reveal>
    );
  }

  const Component = as;

  return (
    <Reveal>
      <Component className={cn(baseClasses, className)} {...rest}>
        {content}
      </Component>
    </Reveal>
  );
};
