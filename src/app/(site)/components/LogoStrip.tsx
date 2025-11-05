"use client";

import Image from "next/image";
import { useReveal, revealClasses } from "@/lib/motion";
import { cn } from "./utils";

type Logo = {
  name: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type LogoStripProps = {
  logos: Logo[];
  className?: string;
};

export const LogoStrip = ({ logos, className }: LogoStripProps) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ rootMargin: "0px 0px -20%" });

  return (
    <div
      ref={ref}
      className={revealClasses(
        isVisible,
        cn(
          "flex flex-wrap items-center justify-center gap-6 rounded-[4px] border border-[#e1e6eb] bg-surface px-6 py-6 sm:gap-10 sm:px-10",
          className,
        ),
      )}
    >
      {logos.map((logo) => (
        <Image
          key={logo.name}
          src={logo.src}
          alt={logo.alt ?? logo.name}
          width={logo.width ?? 120}
          height={logo.height ?? 48}
          className="h-12 w-auto object-contain grayscale"
        />
      ))}
    </div>
  );
};
