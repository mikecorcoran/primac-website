"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useParallax } from "@/lib/motion";
import { Button } from "./Button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export type HeroLayer = {
  src: string;
  alt: string;
  /** Optional multiplier applied to the parallax offset (0-1). */
  depth?: number;
};

type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryLink: {
    label: string;
    href: string;
  };
  layers: HeroLayer[];
};

export const Hero = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryLink,
  layers,
}: HeroProps) => {
  const parallax = useParallax({ max: 16 });

  const normalizedLayers = useMemo(
    () =>
      layers.map((layer, index) => ({
        ...layer,
        depth:
          typeof layer.depth === "number"
            ? Math.min(Math.max(layer.depth, 0), 1)
            : Math.min(1, 0.4 + index * 0.25),
      })),
    [layers],
  );

  return (
    <section className="relative isolate overflow-hidden bg-steel text-white">
      <div className="absolute inset-0">
        {normalizedLayers.map((layer, index) => {
          const translateY = Number((parallax * layer.depth!).toFixed(2));

          return (
            <div
              key={`${layer.src}-${index}`}
              className="parallax-layer absolute inset-0"
              style={{ transform: `translateY(${translateY}px)` }}
            >
              <Image
                src={layer.src}
                alt={layer.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1d2c]/85 via-[#1e3d58]/70 to-[#0d2738]/75" aria-hidden="true" />
      </div>
      <div className="relative py-[var(--spacing-section)]">
        <Container className="relative z-10">
          <Reveal className="max-w-3xl space-y-6">
            <span className="fade-in-up text-xs font-semibold uppercase tracking-[0.28em] text-teal/80">
              {eyebrow}
            </span>
            <h1 className="fade-in-up text-4xl font-semibold leading-tight text-white sm:text-[44px]">
              <span className="text-balance">{title}</span>
            </h1>
            <p className="fade-in-up max-w-2xl text-base text-white/90 sm:text-lg">{subtitle}</p>
            <div className="fade-in-up flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              <Link
                href={secondaryLink.href}
                className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-white/80"
              >
                {secondaryLink.label}
              </Link>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
};
