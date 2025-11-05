import { readdirSync } from "node:fs";
import { join, extname } from "node:path";

export type ImageAsset = {
  src: string;
  alt: string;
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const toTitleCase = (value: string) =>
  value
    .split(/[-_\s]+/g)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export const getImageManifest = () => {
  const imagesDir = join(process.cwd(), "public", "images");
  const files = readdirSync(imagesDir, { withFileTypes: true })
    .filter((item) => item.isFile())
    .map((item) => item.name)
    .filter((name) => IMAGE_EXTENSIONS.has(extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return files.map((fileName) => ({
    src: `/images/${fileName}`,
    alt: toTitleCase(fileName.replace(extname(fileName), "")),
  }));
};
