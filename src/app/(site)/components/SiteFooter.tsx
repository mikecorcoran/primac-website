import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";
import { NAV_ITEMS } from "./navigation";

const CERTIFICATIONS = ["ISNetworld", "Avetta", "COR"];

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d7dde3] bg-surface py-12 text-sm text-muted">
      <Container className="flex flex-col gap-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center text-steel">
              <span className="text-base font-semibold uppercase tracking-[0.3em]">Primac</span>
            </Link>
            <p className="max-w-md text-sm text-muted">
              Field-proven reliability engineers and analysts supporting Western Canadian industry with disciplined diagnostics
              and steady judgement.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/contact" className="w-fit">Talk to an Expert</Button>
              <Link href="tel:+118553774622" className="text-sm font-semibold text-steel transition-colors duration-200 ease-in-out hover:text-teal">
                Call 1-855-377-4622
              </Link>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <nav aria-label="Footer">
              <ul className="grid gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors duration-200 hover:text-steel"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-steel">Certifications</h3>
              <ul className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
                {CERTIFICATIONS.map((label) => (
                  <li key={label} className="inline-flex items-center gap-2 rounded-[4px] border border-[#d7dde3] bg-white/80 px-2 py-1">
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-steel"
                    >
                      <path
                        d="M8 1.5L13 4.5V11.5L8 14.5L3 11.5V4.5L8 1.5Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-[#d7dde3] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs">© {year} Primac Reliability Consultants. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-steel">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-steel">
              Terms of use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
