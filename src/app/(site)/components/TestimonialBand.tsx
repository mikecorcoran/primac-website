"use client";

import Image from "next/image";
import { useParallax } from "@/lib/motion";
import { Button } from "./Button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type TestimonialBandProps = {
  quote: string;
  attribution: string;
  cta: {
    label: string;
    href: string;
  };
  background: {
    src: string;
    alt: string;
  };
};

export const TestimonialBand = ({ quote, attribution, cta, background }: TestimonialBandProps) => {
  const parallax = useParallax({ max: 10 });

  return (
    <section className="relative isolate overflow-hidden bg-steel text-white">
      <div className="absolute inset-0">
        <div
          className="parallax-layer absolute inset-0"
          style={{ transform: `translateY(${parallax.toFixed(2)}px)` }}
        >
          <Image
            src={background.src}
            alt={background.alt}
            fill
            className="h-full w-full object-cover opacity-70"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-[#091622]/82 backdrop-blur-sm" aria-hidden="true" />
      </div>
      <div className="relative py-[var(--spacing-section)]">
        <Container>
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <blockquote className="fade-in-up text-xl font-medium text-white sm:text-2xl">
              “{quote}”
            </blockquote>
            <p className="fade-in-up text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              {attribution}
            </p>
            <div className="fade-in-up flex justify-center">
              <Button href={cta.href} variant="ghost" className="text-white hover:text-white/80">
                {cta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
};
