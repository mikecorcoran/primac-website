import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Terms of Use",
  description: "Understand the terms governing use of the Primac Reliability Consultants website.",
};

export default function TermsPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="Terms"
          title="Website terms of use"
          description="TODO(content): Outline acceptable use, liability limits, and governing law for the site."
        />
      </Container>
    </section>
  );
}
