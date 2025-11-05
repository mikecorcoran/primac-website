import homeContent from "../content/home.json";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Industries",
  description:
    "Primac supports oil and gas, mining, utilities, forestry, marine terminals, and heavy manufacturing with field-proven reliability services.",
};

const { industries } = homeContent;

export default function IndustriesPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Industries"
          title="Reliability partnerships across Western Canada"
          description="Each sector demands different schedules, safety practices, and reporting formats. Our analysts adapt quickly while keeping findings clear."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.items.map((industry) => (
            <Card
              key={industry}
              title={industry}
              description="TODO(content): Provide sector-specific capability statements and representative project outcomes."
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
