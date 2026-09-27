import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { DesignerStudio } from "@/components/sections/designer-studio";

export const metadata: Metadata = {
  title: "Designer",
  description:
    "Build your custom ZeeGuard mouthguard in the live studio configurator: choose your model, upload artwork, and fine-tune the fit.",
};

export default function DesignerPage() {
  return (
    <Section className="pt-10">
      <Container>
        <DesignerStudio />
      </Container>
    </Section>
  );
}
