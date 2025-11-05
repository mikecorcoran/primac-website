import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Case Studies",
  description:
    "Read how Primac Reliability Consultants help industrial operators avoid failures, recover production, and build resilient programs.",
};

export default function CaseStudiesPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="Case Studies"
          title="Stories from the field"
          description="TODO(content): Add detailed narratives on avoided failures, recovered capacity, and long-term program improvements."
        />
        <Button href="/contact" variant="secondary">
          Share your reliability challenge
        </Button>
      </Container>
    </section>
  );
}
