"use client";

import { motion } from "motion/react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { HOME_TESTIMONIALS } from "@/constants/home";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import fallBackImage from "@/public/images/Fall-back-image.svg";

export function TestimonialsSection({ tone = "base" }: { tone?: "base" | "raised" }) {
  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-10 p-0.5">
        <SectionHeading title="What Fighters Say" />

        <div className={cn("text-lg lg:w-auto", inter.className)}>
          <Carousel>
            {HOME_TESTIMONIALS.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="w-80 shrink-0 px-2 md:w-120 lg:w-1/3 snap-start"
              >
                <blockquote className="flex flex-col gap-4 rounded-xl border border-white/10 bg-ink-850 p-6">
                  <p className={cn("italic leading-relaxed text-my-pink")}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-ink-700 text-steel-400">
                      <Image src={t.imageUrl ? t.imageUrl : fallBackImage} alt={t.quote} />
                    </span>
                    <div>
                      <p className="text-stone">{t.name}</p>
                      <p className="text-my-pink">{t.role}</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  );
}
