import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/SectionHeader";

export const metadata = {
  title: "Contact",
  description:
    "Request a reliability assessment or speak with Primac Reliability Consultants about your maintenance objectives.",
};

export default function ContactPage() {
  return (
    <section className="py-[var(--spacing-section)]">
      <Container className="space-y-8">
        <SectionHeader
          eyebrow="Contact"
          title="Request a reliability assessment"
          description="24/7 availability. Serving Western Canada’s mills, mines, refineries, terminals, and utilities."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-steel">Call or email</h3>
            <p className="text-sm text-muted">
              We respond within one business day. For urgent issues, please call.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+118553774622" className="text-steel transition-colors duration-200 hover:text-teal">
                1-855-377-4622
              </a>
              <br />
              <a href="mailto:info@primacreliability.com" className="text-steel transition-colors duration-200 hover:text-teal">
                info@primacreliability.com
              </a>
            </div>
          </div>
          <div className="space-y-4 rounded-[4px] border border-[#d7dde3] bg-white p-6 shadow-[var(--shadow-card)]">
            <p className="text-sm text-muted">
              TODO(content): Embed the contact form or outline submission requirements (name, role, site, equipment, timelines).
            </p>
            <Button href="mailto:info@primacreliability.com">Email Primac</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
