"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/motion";
import { cn } from "./utils";

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

export const Reveal = <T extends ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: RevealProps<T>) => {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      ref={ref as never}
      className={cn(isVisible && "is-visible", className)}
      {...rest}
    >
      {children}
    </Component>
  );
};
