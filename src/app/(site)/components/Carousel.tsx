"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "./utils";

const emblaOptions = { align: "start" as const, loop: false };

export type CarouselItem = {
  src: string;
  alt: string;
  title: string;
  summary: string;
  location?: string;
};

type CarouselProps = {
  items: CarouselItem[];
};

export const Carousel = ({ items }: CarouselProps) => {
  const [viewportRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateStates = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    let raf = 0;
    const sync = () => {
      raf = window.requestAnimationFrame(() => {
        updateStates();
      });
    };

    sync();
    emblaApi.on("reInit", updateStates);
    emblaApi.on("select", updateStates);

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      emblaApi.off("reInit", updateStates);
      emblaApi.off("select", updateStates);
    };
  }, [emblaApi, updateStates]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi.scrollPrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi.scrollNext();
    }
  };

  return (
    <div className="relative">
      <div className="-mx-6 sm:mx-0">
        <div
          className="overflow-hidden px-6 sm:px-0"
          ref={viewportRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Project imagery"
        >
          <div className="flex touch-pan-y gap-4 sm:gap-6">
            {items.map((item, index) => (
              <article
                key={item.src}
                className="group relative min-w-0 shrink-0 basis-full rounded-[5px] border border-[#d0d9e1] bg-white shadow-[0_22px_45px_-38px_rgba(12,31,49,0.55)] transition-transform duration-300 ease-out sm:basis-[46%] lg:basis-[32%]"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 80vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#091a2b]/85 via-[#0f2336]/20 to-transparent" aria-hidden="true" />
                {item.location && (
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-semibold uppercase tracking-[0.32em] text-white/75">
                    {item.location}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 px-5 pb-6 pt-5">
                <h3 className="text-base font-semibold text-steel">{item.title}</h3>
                <p className="text-sm text-muted">{item.summary}</p>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white via-white/80 to-transparent sm:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-white via-white/80 to-transparent sm:block" aria-hidden="true" />
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            className="card-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dde3] bg-white text-steel transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous slide"
            disabled={!canScrollPrev}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="card-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dde3] bg-white text-steel transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next slide"
            disabled={!canScrollNext}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Carousel dots">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={cn(
                "h-2.5 w-2.5 rounded-full border border-[#cfd6dd] transition-colors duration-200 ease-in-out",
                selectedIndex === index ? "bg-steel" : "bg-white",
              )}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-selected={selectedIndex === index}
              role="tab"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
