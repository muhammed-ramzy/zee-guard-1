import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { PROCESS_STEPS_SHORT } from "@/constants/home";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";

export function HowItWorksPreview() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading title="How It Works" />
        {/* The laptop version */}
        <div className="lg:flex flex-col gap-2 w-full hidden">
          <ol className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS_STEPS_SHORT.map((item) => (
              <li key={item.step} className={cn("flex flex-col items-center gap-3 text-center", oswald.className)}>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-[24px] font-bold ${
                    item.step === 1
                      ? "bg-my-icon-pink text-my-wine-red"
                      : "border border-white/20 bg-my-Graphite hover:bg-my-icon-pink hover:text-my-wine-red duration-300 text-stone"
                  }`}
                >
                  {item.step}
                </span>
              </li>
            ))}
          </ol>
          {/* seperator line */}
          <div className="bg-gray-500 h-1 w-full rounded"></div>
          <ol className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS_STEPS_SHORT.map((item) => (
              <li key={item.step} className={cn("flex flex-col items-center gap-2 text-center font-bold", inter.className)}>
                <h3 className="text-sm  uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-steel-400">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>

          {/* Tablet and mobile version */}
          <div className="flex flex-col gap-2 w-full lg:hidden">
          <ol className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS_STEPS_SHORT.map((item) => (
              <li key={item.step} className={cn("flex flex-col items-center gap-3 text-center", oswald.className)}>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-[24px] font-bold ${
                    item.step === 1
                      ? "bg-my-icon-pink text-my-wine-red"
                      : "border border-white/20 bg-my-Graphite hover:bg-my-icon-pink hover:text-my-wine-red duration-300 text-stone"
                  }`}
                >
                  {item.step}
                </span>
                <h3 className="text-sm  uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-steel-400">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <Button href="/how-it-works" variant="outline-white">
          More Details
        </Button>
      </Container>
    </Section>
  );
}
