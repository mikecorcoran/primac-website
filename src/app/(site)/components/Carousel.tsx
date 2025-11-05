"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ImageAsset } from "@/lib/images";
import { cn } from "./utils";

const emblaOptions = { align: "start" as const, loop: false };

type CarouselProps = {
  images: ImageAsset[];
  heading?: string;
};

export const Carousel = ({ images, heading }: CarouselProps) => {
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
    <section aria-label={heading ?? "Project imagery"} className="space-y-6">
      {heading && (
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-teal">
          {heading}
        </div>
      )}
      <div className="relative">
        <div
          className="overflow-hidden rounded-[4px]"
          ref={viewportRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="flex touch-pan-y gap-4">
            {images.map((image) => (
              <div
                key={image.src}
                className="relative min-w-0 shrink-0 basis-[80%] sm:basis-[45%] md:basis-[30%]"
              >
                <div className="fade-in-up relative overflow-hidden rounded-[4px] border border-[#d7dde3] bg-surface">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={640}
                    height={428}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center bg-gradient-to-r from-white via-white/80 to-transparent pl-2 pr-8" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center bg-gradient-to-l from-white via-white/80 to-transparent pl-8 pr-2" aria-hidden="true" />
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="card-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dde3] bg-white text-steel transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous image"
              disabled={!canScrollPrev}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="card-hover inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7dde3] bg-white text-steel transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next image"
              disabled={!canScrollNext}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Image selection">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-[#cfd6dd] transition-colors duration-200 ease-in-out",
                  selectedIndex === index ? "bg-steel" : "bg-white",
                )}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Show image ${index + 1}`}
                aria-selected={selectedIndex === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
