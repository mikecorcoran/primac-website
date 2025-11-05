"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  href?: string;
  variant?: ButtonVariant;
};

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_14px_30px_-18px_rgba(213,133,18,0.75)] hover:bg-[#c2770f] hover:-translate-y-1",
  secondary:
    "border border-steel text-steel hover:bg-surface/80 hover:-translate-y-1",
  ghost:
    "text-teal hover:text-steel hover:-translate-y-1",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[4px] px-5 py-2.5 text-sm font-semibold leading-tight tracking-tight transition-all duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-60";

export const Button = ({
  children,
  className,
  href,
  variant = "primary",
  ...props
}: ButtonBaseProps) => {
  const classes = cn(baseClasses, variantMap[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
