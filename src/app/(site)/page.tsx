import Link from "next/link";
import homeContent from "./content/home.json";
import { Carousel } from "./components/Carousel";
import { Card } from "./components/Card";
import { Container } from "./components/Container";
import { FeatureCard } from "./components/FeatureCard";
import { Hero } from "./components/Hero";
import { IndustryCard } from "./components/IndustryCard";
import { LogoStrip } from "./components/LogoStrip";
import { PhotoStrip } from "./components/PhotoStrip";
import { ReliabilityArc } from "./components/ReliabilityArc";
import { SectionHeader } from "./components/SectionHeader";
import { TestimonialBand } from "./components/TestimonialBand";
import { Button } from "./components/Button";
import { getImageManifest } from "@/lib/images";

const images = getImageManifest();
const carouselImages = images.slice(0, Math.min(images.length, 8));
const photoStripImages = images.slice(Math.max(0, images.length - 6));

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

      {carouselImages.length >= 6 && (
        <section className="bg-base py-16">
          <Container className="space-y-8">
            <SectionHeader eyebrow="In the field" title="Snapshots from active monitoring programs" />
            <Carousel images={carouselImages} />
          </Container>
        </section>
      )}

      <section className="py-[var(--spacing-section)]">
        <Container className="space-y-12">
          <SectionHeader eyebrow={narrative.eyebrow} title={narrative.title} />
          <ReliabilityArc steps={narrative.items} description={narrative.description} />
        </Container>
      </section>

      <section className="bg-surface py-[var(--spacing-section)]">
        <Container className="space-y-12">
          <SectionHeader
            eyebrow={differentiators.eyebrow}
            title={differentiators.title}
            description={differentiators.description}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.items.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                supportingImage={item.supportingImage}
              />
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="py-[var(--spacing-section)]">
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
        <Container className="space-y-12">
          <SectionHeader
            eyebrow={industries.eyebrow}
            title={industries.title}
            align="center"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {industries.items.map((industry) => (
              <IndustryCard
                key={industry.title}
                title={industry.title}
                description={industry.description}
                href={industries.href}
                icon={industry.icon}
              />
            ))}
          </div>
        </Container>
      </section>

      <TestimonialBand
        quote={testimonial.quote}
        attribution={testimonial.attribution}
        cta={testimonial.cta}
        background={testimonial.background}
      />

      {photoStripImages.length > 0 && (
        <section className="bg-base py-[var(--spacing-section)]">
          <Container className="space-y-8">
            <SectionHeader
              eyebrow="In focus"
              title="Scenes from recent deployments"
              align="center"
            />
            <PhotoStrip images={photoStripImages} />
          </Container>
        </section>
      )}

      <section className="bg-steel py-[var(--spacing-section)] text-white">
        <Container className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white sm:text-[36px]">
                <span className="text-balance">{finalCta.title}</span>
              </h2>
              <p className="text-base text-white/85">{finalCta.subtitle}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={finalCta.cta.href}>{finalCta.cta.label}</Button>
                <Link
                  href="tel:+118553774622"
                  className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-white/80"
                >
                  Call 1-855-377-4622
                </Link>
              </div>
            </div>
            <div className="rounded-[4px] bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                Trusted by safety-first operators
              </p>
              <LogoStrip logos={certifications} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
