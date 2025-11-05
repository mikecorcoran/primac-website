"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { NAV_ITEMS } from "./navigation";
import { cn } from "./utils";

export const SiteHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    queueMicrotask(() => setIsOpen(false));
  }, [isOpen, pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d7dde3] bg-base/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[var(--max-content)] items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-steel">
          <span className="text-sm font-semibold uppercase tracking-[0.3em]">Primac</span>
          <span className="hidden text-sm font-medium text-muted sm:inline">Reliability Consultants</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors duration-200 hover:text-steel",
                pathname === item.href && "text-steel",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href="/contact" variant="primary">
            Request Assessment
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#d7dde3] text-steel transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {isOpen ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <path d="M4 7H20M4 12H20M4 17H20" />
            )}
          </svg>
        </button>
      </div>
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <nav className="space-y-4 border-t border-[#d7dde3] bg-base px-6 py-6 text-sm font-medium text-muted">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-[4px] px-2 py-2 transition-colors duration-200 hover:bg-surface hover:text-steel",
                pathname === item.href && "bg-surface text-steel",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="w-full justify-center">
            Request Assessment
          </Button>
        </nav>
      </div>
    </header>
  );
};
