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
  supportingPoints?: string[];
};

export const Hero = ({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryLink,
  layers,
  supportingPoints,
}: HeroProps) => {
  const parallax = useParallax({ max: 18 });

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
    <section className="relative isolate overflow-hidden bg-[#0a1b2a] text-white">
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#07121d]/80 via-[#11263a]/70 to-[#0a1b2a]/85" aria-hidden="true" />
        <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-[#0a1b2a] via-[#0a1b2a]/75 to-transparent" aria-hidden="true" />
      </div>
      <div className="relative py-[calc(var(--spacing-section)*1.1)]">
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:items-center">
            <Reveal className="max-w-3xl space-y-6">
              <span className="fade-in-up text-xs font-semibold uppercase tracking-[0.32em] text-teal/80">
                {eyebrow}
              </span>
              <h1 className="fade-in-up text-4xl font-semibold leading-tight text-white sm:text-[46px]">
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
            {supportingPoints && supportingPoints.length > 0 && (
              <Reveal className="relative">
                <div className="fade-in-up relative overflow-hidden rounded-[6px] border border-white/15 bg-white/10 shadow-[0_24px_56px_-40px_rgba(11,26,41,0.9)] backdrop-blur">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" aria-hidden="true" />
                  <div className="relative space-y-4 p-6 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
                      Where we deliver reliability
                    </p>
                    <ul className="space-y-3 text-sm text-white/85">
                      {supportingPoints.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-[#d58512]" aria-hidden="true" />
                          <span className="text-pretty">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
};
