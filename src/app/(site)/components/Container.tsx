"use client";

import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "./utils";

export type ContainerProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
> & {
  /** Controls the maximum width of the container. Defaults to the design max token. */
  widthClassName?: string;
};

export const Container = ({
  children,
  className,
  widthClassName = "max-w-[var(--max-content)]",
  ...rest
}: ContainerProps) => (
  <div
    className={cn(
      "mx-auto w-full px-6 sm:px-8 lg:px-10",
      widthClassName,
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);
