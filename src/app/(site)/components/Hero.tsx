"use client";

import Image from "next/image";
import { Button } from "./Button";
import { Container } from "./Container";
import { revealClasses, useReveal } from "@/lib/motion";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  background: {
    src: string;
    alt: string;
  };
};

export const Hero = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  background,
}: HeroProps) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ rootMargin: "-10%" });

  return (
    <section className="relative isolate overflow-hidden bg-steel text-white">
      <div className="absolute inset-0">
        <Image
          src={background.src}
          alt={background.alt}
          fill
          priority
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1d2c]/85 via-[#1e3d58]/70 to-[#0d2738]/75" aria-hidden="true" />
      </div>
      <div className="relative py-[var(--spacing-section)]">
        <Container>
          <div ref={ref} className={revealClasses(isVisible, "max-w-2xl space-y-6 text-pretty")}> 
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal/80">
              Reliability for critical assets
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-[36px]">
              <span className="text-balance">{title}</span>
            </h1>
            <p className="text-base text-white/90 sm:text-lg">{subtitle}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              <Button href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
