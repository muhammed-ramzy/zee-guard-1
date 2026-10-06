import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { ChampionCard } from "@/components/ui/champion-card";
import { Carousel } from "@/components/ui/carousel";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ATHLETE_STATS, CHAMPIONS } from "@/constants/athletes";
import { PageHeader } from "@/components/sections/page-header";
import { cn } from "@/lib/utils";
import { oswald } from "../fonts";
import { TestimonialsSection } from "@/components/sections/testimonials";
import Counter from "@/components/ui/counter";


export const metadata: Metadata = {
  title: "Athletes",
  description:
    "Trusted by national-level athletes. See the champions who wear ZeeGuard in the octagon, the ring, and on the mat.",
};

export default function AthletesPage() {
  return (
    <>
      <Section className="pt-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <PageHeader
                    title="Trusted by International Athletes"
                    subtitle="In the octagon or on the mat, compromise is not an option. ZeeGuard is the
            chosen armor for champions who demand elite protection without sacrificing
            breathability or focus."
            eyebrow="Elite Performance Gear"
                  />
        </Container>
      </Section>

      <Section tone="raised" className="py-10! border-t-2 border-gold-400">
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-3  md:divide-my-Graphite md:divide-x-2 ">
          {ATHLETE_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center  ">
              <span className={cn("font-display font-bold text-4xl text-gold-400 sm:text-5xl md:text-7xl", oswald.className)}>
                {stat.isPercent ? "%" : "+"}<Counter target={stat.value}/>
              </span>
              <span className={cn("md:text-2xl font-semibold uppercase tracking-wide text-stone sm:text-sm", oswald.className)}>
                {stat.label}
              </span>
            </div>
          ))}
        </Container>
      </Section>


          {/* Athletes */}
      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading title="Our Elite Champions" />
          <Carousel>
            {CHAMPIONS.map((athlete) => (
              <div key={athlete.name} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] p-2">
                <ChampionCard athlete={athlete} />
              </div>
            ))}
          </Carousel>
        </Container>
      </Section>

      <Section tone="raised">
        <Container className="flex flex-col gap-10" >
          <TestimonialsSection tone="raised"/>
         
          {/* <SectionHeading
            title="The Verdict"
            subtitle="Real feedback from fighters who demand the best."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {ATHLETE_TESTIMONIALS.map((t) => (
              <VerdictCard key={t.name} testimonial={t} />
            ))}
          </div> */}
        </Container>
      </Section>

      <CtaBanner showInstagram={false} />
    </>
  );
}
