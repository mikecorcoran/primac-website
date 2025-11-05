import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "About Us",
  description:
    "Primac Reliability Consultants is a Western Canadian team of reliability engineers, vibration specialists, and analysts focused on operational resilience.",
};

export default function AboutPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="About"
          title="Engineers dedicated to operational resilience"
          description="TODO(content): Introduce leadership, team credentials, and decades of field experience supporting mills, mines, refineries, and terminals."
        />
        <p className="text-sm text-muted">
          Our consultants pair disciplined diagnostics with calm communication so maintenance and operations teams stay in control during high-stakes events.
        </p>
      </Container>
    </section>
  );
}
