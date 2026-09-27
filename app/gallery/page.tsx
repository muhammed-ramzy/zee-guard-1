import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { oswald } from "../fonts";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore ZeeGuard's elite gallery of performance-engineered mouthguard designs, from anime and gaming to fully custom artwork.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Find Your <span className="text-blaze-500">Style</span>
          </>
        }
        subtitle="Explore our elite gallery of performance-engineered mouthguard designs. Built for the octagon, customized for you."
      />
      <Section>
        <Container className="text-center">
          <GalleryGrid />
          <Button variant="solid" className={oswald.className + ` mt-5`}>
          Create My Own Design
        </Button>
        </Container>
      </Section>
    </>
  );
}
