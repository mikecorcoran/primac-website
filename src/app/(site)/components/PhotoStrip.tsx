import Image from "next/image";
import type { ImageAsset } from "@/lib/images";
import { Reveal } from "./Reveal";

export type PhotoStripProps = {
  images: ImageAsset[];
};

export const PhotoStrip = ({ images }: PhotoStripProps) => (
  <Reveal>
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
      {images.map((image, index) => (
        <div
          key={image.src}
          className="fade-in-up relative aspect-[4/3] overflow-hidden rounded-[4px] border border-[#d7dde3] bg-surface"
          style={{ transitionDelay: `${Math.min(index * 50, 80)}ms` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 90vw"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </Reveal>
);
