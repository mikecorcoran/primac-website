"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Reveal } from "./Reveal";
import { cn } from "./utils";

type IndustryCardProps = {
  title: string;
  href: string;
  icon: string;
  description?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

export const IndustryCard = ({
  title,
  href,
  icon,
  description,
  className,
  ...rest
}: IndustryCardProps) => (
  <Reveal>
    <Link
      href={href}
      className={cn(
        "card-hover group flex w-full items-start gap-4 rounded-[4px] border border-[#d7dde3] bg-white/90 px-5 py-4 text-left transition-colors duration-200 ease-in-out hover:bg-surface/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
        className,
      )}
      {...rest}
    >
      <span className="fade-in-up inline-flex h-12 w-12 flex-none items-center justify-center rounded-full border border-[#cfd6dd] bg-white text-steel">
        <Image src={icon} alt="" width={28} height={28} aria-hidden="true" />
      </span>
      <span className="fade-in-up flex flex-col gap-1 text-sm text-steel">
        <span className="font-semibold text-steel">{title}</span>
        {description && <span className="text-muted/80">{description}</span>}
      </span>
    </Link>
  </Reveal>
);
