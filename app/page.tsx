import { Hero } from "@/components/sections/hero";
import { WhyChoose } from "@/components/sections/why-choose";
import { TrustStats } from "@/components/sections/trust-stats";
import { CategoryPreview } from "@/components/sections/category-preview";
import { HowItWorksPreview } from "@/components/sections/how-it-works-preview";
import { DifferenceTable } from "@/components/sections/difference-table";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";


export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <TrustStats />
      <CategoryPreview />
      <HowItWorksPreview />
      <DifferenceTable />
      <TestimonialsSection />
      <Faq />
      <CtaBanner />
    </>
  );
}
