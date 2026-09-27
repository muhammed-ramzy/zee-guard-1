import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From concept to combat. Understanding how ZeeGuard engineers the ultimate defensive equipment for elite athletes.",
};

export default function HowItWorksPage() {
  return (
    <Section className="pt-16">
      <Container className="flex flex-col items-center gap-16">
        <PageHeader
          title="The Process"
          subtitle="From concept to combat. Understanding how we engineer the ultimate defensive
            equipment for elite athletes."
        />

        <ProcessTimeline />

        <Button >Create My Own Design</Button>
      </Container>
    </Section>
  );
}
