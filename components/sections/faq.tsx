import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FAQ_ITEMS } from "@/constants/home";

export function Faq() {
  return (
    <Section tone="raised">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="w-full max-w-3xl">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </Section>
  );
}
