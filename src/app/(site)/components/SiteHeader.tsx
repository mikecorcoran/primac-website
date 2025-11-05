"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { NAV_ITEMS } from "./navigation";
import { cn } from "./utils";

export const SiteHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const { body } = document;
    if (isOpen) {
      const previous = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = previous;
      };
    }

    return undefined;
  }, [isOpen]);

  const menuItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => ({
        ...item,
        delay: `${index * 40}ms`,
      })),
    [],
  );

  const closeMenu = () => setIsOpen(false);

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
      {isClient
        ? createPortal(
            <div
              id="mobile-nav"
              className={cn(
                "lg:hidden",
                "fixed inset-0 z-[80] origin-top text-white transition-opacity duration-300 ease-out",
                "bg-[#081522]",
                isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
              )}
              role="dialog"
              aria-modal="true"
              aria-hidden={!isOpen}
              style={{ backgroundColor: "#081522" }}
            >
              <div className="flex h-full flex-col justify-between px-6 pb-8 pt-24">
                <nav className="space-y-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block text-2xl font-semibold tracking-tight transition-transform duration-300",
                        pathname === item.href ? "text-white" : "text-white/75 hover:text-white",
                      )}
                      style={{
                        transform: isOpen ? "none" : "translateY(12px)",
                        transitionDelay: isOpen ? item.delay : "0ms",
                      }}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="space-y-4">
                  <Button href="/contact" variant="primary" className="w-full justify-center" onClick={closeMenu}>
                    Request Assessment
                  </Button>
                  <Link
                    href="tel:+118553774622"
                    className="block text-center text-sm font-semibold uppercase tracking-[0.28em] text-white/80"
                    onClick={closeMenu}
                  >
                    Call 1-855-377-4622
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
};
