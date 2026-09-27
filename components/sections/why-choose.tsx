import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import { FEATURES } from "@/constants/home";
import {oswald, inter} from "@/app/fonts"
import { cn } from "@/lib/utils";

export function WhyChoose() {
  return (
    <Section tone="raised">
      <Container className="flex flex-col gap-12">
        <SectionHeading title="Why Serious Athletes Choose ZeeGuard" />

        <div className="grid grid-cols-1  gap-5 sm:grid-cols-2 lg:grid-cols-3 text-center">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-ink-850 px-7 py-10 hover:shadow-card transition-colors hover:border-blaze-600/50"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center text-my-icon-pink ">
                <Icon name={feature.icon} size={32} aria-hidden />
              </span>
              <h3 className={cn("font-display text-2xl uppercase tracking-wide text-stone font-bold", oswald.className)}>
                {feature.title}
              </h3>
              <p className={cn("text-4 leading-relaxed text-my-pink", inter.className)}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
