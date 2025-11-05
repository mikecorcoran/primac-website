import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Careers",
  description:
    "Join Primac Reliability Consultants to apply advanced diagnostics and calm leadership in demanding industrial environments.",
};

export default function CareersPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="Careers"
          title="Work with a trusted field team"
          description="TODO(content): Outline open roles, competencies, and expectations for reliability specialists and analysts."
        />
        <Button href="mailto:careers@primacreliability.com" variant="secondary">
          careers@primacreliability.com
        </Button>
      </Container>
    </section>
  );
}
