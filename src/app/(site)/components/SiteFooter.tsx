import Link from "next/link";
import { NAV_ITEMS } from "./navigation";

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d7dde3] bg-surface py-10 text-sm text-muted">
      <div className="mx-auto flex w-full max-w-[var(--max-content)] flex-col gap-8 px-6 sm:px-8 lg:flex-row lg:justify-between lg:px-10">
        <div className="max-w-md space-y-3">
          <Link href="/" className="text-steel">
            <span className="text-base font-semibold uppercase tracking-[0.3em]">Primac</span>
          </Link>
          <p className="text-sm">
            Field-proven reliability engineers and analysts supporting Western Canadian industry with disciplined diagnostics and steady judgement.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 hover:text-steel"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-[var(--max-content)] flex-col gap-4 border-t border-[#d7dde3] px-6 pt-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p className="text-xs">
          © {year} Primac Reliability Consultants. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <Link href="/privacy" className="transition-colors duration-200 hover:text-steel">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors duration-200 hover:text-steel">
            Terms of use
          </Link>
        </div>
      </div>
    </footer>
  );
};
