import Image from "next/image";
import { Reveal } from "./Reveal";
import { cn } from "./utils";

export type PhotoStripItem = {
  src: string;
  alt: string;
  label: string;
};

type PhotoStripProps = {
  items: PhotoStripItem[];
};

const tileClasses = [
  "sm:col-span-2 sm:row-span-2 lg:col-span-3 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-1",
  "sm:col-span-1 lg:col-span-2",
];

export const PhotoStrip = ({ items }: PhotoStripProps) => (
  <Reveal>
    <div className="grid auto-rows-[160px] gap-3 sm:auto-rows-[200px] sm:grid-cols-4 lg:auto-rows-[220px] lg:grid-cols-6">
      {items.map((item, index) => (
        <figure
          key={item.src}
          className={cn(
            "fade-in-up relative overflow-hidden rounded-[5px] border border-[#d7dde3] bg-surface/80",
            tileClasses[index % tileClasses.length],
          )}
          style={{ transitionDelay: `${Math.min(index * 60, 80)}ms` }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="h-full w-full object-cover"
            sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 18vw, (min-width: 640px) 30vw, 95vw"
            loading={index <= 1 ? "eager" : "lazy"}
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1b2a]/80 via-transparent to-transparent px-4 pb-4 pt-8 text-xs font-semibold uppercase tracking-[0.26em] text-white/80">
            {item.label}
          </figcaption>
        </figure>
      ))}
    </div>
  </Reveal>
);
