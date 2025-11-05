import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "HSE",
  description:
    "Safety leadership is foundational at Primac Reliability Consultants, with zero lost-time injuries over years of field operations.",
};

export default function HsePage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="Health, Safety & Environment"
          title="Safety leadership in the field"
          description="TODO(content): Expand on safety program elements, certifications, and field procedures that support zero lost-time injuries."
        />
        <p className="text-sm text-muted">
          Each project begins with a tailored safety plan aligned with client requirements and regulatory obligations.
        </p>
      </Container>
    </section>
  );
}
