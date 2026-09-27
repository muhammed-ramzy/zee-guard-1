import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { TRUST_STATS } from "@/constants/home";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";
import ScrollCounter from "../ui/counter";

export function TrustStats() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-12 ">
        <SectionHeading
          title="Trusted by Egypt's Top Fighters"
          subtitle="Trusted by athletes competing in boxing, MMA, kickboxing, BJJ, karate, taekwondo, and more."
        />

        {/* grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 */}
        <div className="flex flex-wrap justify-center gap-4  w-full">
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col grow w-5/12 lg:w-2/12 items-center justify-center gap-2 rounded-4xl border border-t-2 border-gold-400 bg-ink-850 px-4 py-8 text-center"
            >
              <span className={cn("flex items-center font-display text-3xl text-gold-400 sm:text-4xl md:text-5xl font-bold", oswald.className)}>
                +<ScrollCounter target={stat.value}/>
              </span>
              <span className={cn("text-sm sm:text-base uppercase tracking-wide text-my-pink", inter.className)}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <Button href="/athletes" variant="outline-white">
          Meet Our Athletes
        </Button>
      </Container>
    </Section>
  );
}
