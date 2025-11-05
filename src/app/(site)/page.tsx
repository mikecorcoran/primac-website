import Image from "next/image";
import Link from "next/link";
import homeContent from "./content/home.json";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Container } from "./components/Container";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { SectionHeader } from "./components/SectionHeader";

const {
  hero,
  narrative,
  differentiators,
  services,
  industries,
  testimonial,
  certifications,
  finalCta,
} = homeContent;

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero {...hero} />

      <section className="py-[var(--spacing-section)]">
        <Container className="space-y-12">
          <SectionHeader
            eyebrow={narrative.eyebrow}
            title={narrative.title}
            align="center"
            description="A clear story arc keeps teams focused on the right actions at the right time."
          />
          <ol className="grid gap-6 lg:grid-cols-5">
            {narrative.items.map((item, index) => (
              <li key={item.title}>
                <Card
                  title={`${index + 1}. ${item.title}`}
                  description={item.description}
                  className="h-full"
                />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-surface py-[var(--spacing-section)]">
        <Container className="space-y-12">
          <SectionHeader
            eyebrow={differentiators.eyebrow}
            title={differentiators.title}
            description={differentiators.description}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {differentiators.items.map((item) => (
              <Card
                key={item.title}
                title={item.title}
                description={item.description}
                icon={{ src: item.icon, alt: item.title }}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-[var(--spacing-section)]">
        <Container className="space-y-12">
          <SectionHeader
            eyebrow={services.eyebrow}
            title={services.title}
            description="A disciplined mix of diagnostics, monitoring, and field support keeps assets predictable."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {services.items.map((item) => (
              <Card
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-[var(--spacing-section)]">
        <Container className="space-y-10">
          <SectionHeader
            eyebrow={industries.eyebrow}
            title={industries.title}
            align="center"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.items.map((industry) => (
              <Link
                key={industry}
                href={industries.href}
                className="flex items-center gap-3 rounded-[4px] border border-[#d7dde3] bg-white px-5 py-4 text-sm font-medium text-steel transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
              >
                <Image
                  src="/icons/industry.svg"
                  alt="Industry icon"
                  width={28}
                  height={28}
                  className="text-steel"
                />
                {industry}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-[var(--spacing-section)]">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6 rounded-[4px] border border-[#d7dde3] bg-white p-8 shadow-[var(--shadow-card)]">
            <p className="text-lg font-medium text-steel">“{testimonial.quote}”</p>
            <p className="text-sm font-semibold text-muted">— {testimonial.attribution}</p>
            <Button href={testimonial.cta.href} variant="ghost" className="px-0 text-sm font-semibold">
              {testimonial.cta.label}
            </Button>
          </div>
          <LogoStrip logos={certifications} />
        </Container>
      </section>

      <section className="bg-steel py-[var(--spacing-section)] text-white">
        <Container className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold sm:text-[30px]">
              <span className="text-balance">{finalCta.title}</span>
            </h2>
            <p className="text-base text-white/85">{finalCta.subtitle}</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button href={finalCta.cta.href}>{finalCta.cta.label}</Button>
            <Button href="tel:+118553774622" variant="ghost" className="text-white">
              Call 1-855-377-4622
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
