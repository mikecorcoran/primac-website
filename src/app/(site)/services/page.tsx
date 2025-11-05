import homeContent from "../content/home.json";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Services",
  description:
    "Primac delivers vibration analysis, condition monitoring, advanced diagnostics, and troubleshooting support across Western Canada.",
};

const { services } = homeContent;

export default function ServicesPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Services"
          title="Reliability programs sized to your operation"
          description="Our analysts design programs that balance precision diagnostics with pragmatic field execution."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.items.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        <div className="flex items-center justify-start">
          <Button href="/contact">Discuss a Reliability Assessment</Button>
        </div>
      </Container>
    </section>
  );
}
