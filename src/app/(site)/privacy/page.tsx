import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Privacy",
  description: "Learn how Primac Reliability Consultants handles personal information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="Privacy"
          title="Website privacy notice"
          description="TODO(content): Provide policy statements covering data collection, retention, cookies, and contact details for privacy questions."
        />
      </Container>
    </section>
  );
}
