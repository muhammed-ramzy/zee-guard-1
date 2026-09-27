import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] items-center">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-display text-6xl text-blaze-500">404</span>
        <h1 className="font-display text-2xl uppercase tracking-wide text-white">
          This Page Took a Hit
        </h1>
        <p className="max-w-md text-steel-400">
          The page you&apos;re looking for doesn&apos;t exist, or it&apos;s been moved.
        </p>
        <Button href="/">Back to Home</Button>
      </Container>
    </Section>
  );
}
