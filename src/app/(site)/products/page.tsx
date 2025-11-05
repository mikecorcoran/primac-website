import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Products",
  description:
    "Primac integrates condition monitoring hardware and software partners to support long-term reliability programs.",
};

export default function ProductsPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="Products"
          title="Solution partners we trust"
          description="TODO(content): Add details about preferred monitoring platforms, data collectors, and analysis toolsets."
        />
        <p className="text-sm text-muted">
          Reach out to learn how Primac configures technology stacks around your operational needs instead of a one-size-fits-all offering.
        </p>
      </Container>
    </section>
  );
}
