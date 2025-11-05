"use client";

import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { useReveal, revealClasses } from "@/lib/motion";
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

export const Card = ({
  title,
  description,
  icon,
  href,
  as = "article",
  className,
  ...rest
}: CardProps) => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  const content = (
    <>
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface text-steel">
          <Image src={icon.src} alt={icon.alt} width={32} height={32} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-steel">{title}</h3>
      <p className="mt-3 text-sm text-muted sm:text-base">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal">
          Learn more
          <span aria-hidden="true">→</span>
        </span>
      )}
    </>
  );

  const classes = revealClasses(
    isVisible,
    cn(
      "flex h-full flex-col rounded-[4px] border border-[#d7dde3] bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[var(--shadow-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
      href && "focus-visible:outline-offset-[6px]",
      className,
    ),
  );

  if (href) {
    return (
      <Link ref={ref as never} href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const Component = as;

  return (
    <Component ref={ref as never} className={classes} {...rest}>
      {content}
    </Component>
  );
};
