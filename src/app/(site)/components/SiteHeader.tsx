"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { NAV_ITEMS } from "./navigation";
import { cn } from "./utils";

type MobileMenuToggleProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
};

const toggleButtonBase =
  "inline-flex h-10 w-10 items-center justify-center rounded-[4px] border transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal hover:-translate-y-0.5 hover:shadow-sm";

const toggleLineBase =
  "absolute left-0 h-[2px] w-full rounded-full bg-current transition-transform duration-200 ease-out";

const toggleLineMiddle =
  "absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-150 ease-out";

const MobileMenuToggle = ({ isOpen, onClick, className }: MobileMenuToggleProps) => (
  <button
    type="button"
    className={cn(toggleButtonBase, className)}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-haspopup="true"
    aria-controls="mobile-nav"
    aria-label={isOpen ? "Close navigation" : "Open navigation"}
  >
    <span aria-hidden className="relative block h-3.5 w-5">
      <span
        className={cn(
          toggleLineBase,
          "top-0",
          isOpen ? "translate-y-[7px] rotate-45" : "",
        )}
      />
      <span className={cn(toggleLineMiddle, isOpen ? "opacity-0" : "opacity-100")} />
      <span
        className={cn(
          toggleLineBase,
          "bottom-0",
          isOpen ? "-translate-y-[7px] -rotate-45" : "",
        )}
      />
    </span>
    <span className="sr-only">Toggle navigation</span>
  </button>
);

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
        <MobileMenuToggle
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "lg:hidden",
            isOpen ? "border-white/40 text-white" : "border-[#d7dde3] text-steel",
          )}
        />
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
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-6 pt-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-white"
                    onClick={closeMenu}
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                      Primac
                    </span>
                    <span className="text-sm font-medium text-white/70">
                      Reliability Consultants
                    </span>
                  </Link>
                  <MobileMenuToggle
                    isOpen={isOpen}
                    onClick={closeMenu}
                    className="border-white/40 text-white"
                  />
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="flex min-h-full flex-col px-6 pb-8 pt-12">
                    <nav className="space-y-6">
                      {menuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block text-2xl font-semibold tracking-tight transition-transform duration-300",
                            pathname === item.href
                              ? "text-white"
                              : "text-white/75 hover:text-white",
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
                    <div className="mt-auto space-y-4 pt-12">
                      <Button
                        href="/contact"
                        variant="primary"
                        className="w-full justify-center"
                        onClick={closeMenu}
                      >
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
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
};
