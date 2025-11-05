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
  "card-hover flex h-full flex-col gap-4 rounded-[4px] border border-[#d7dde3] bg-white/95 p-6 shadow-[var(--shadow-card)] transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

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
      {icon && (
        <span className="fade-in-up inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface">
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
