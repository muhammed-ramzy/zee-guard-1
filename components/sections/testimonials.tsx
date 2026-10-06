"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { HOME_TESTIMONIALS } from "@/constants/home";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import fallBackImage from "@/public/images/Fall-back-image.svg";
import { testimonialPhotos } from "@/assets/images/image";

export function TestimonialsSection({ tone = "base" }: { tone?: "base" | "raised" }) {
  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-10 p-0.5">
        <SectionHeading title="What Fighters Say" />

        <div className={cn("text-lg lg:w-auto", inter.className)}>
          <div className="mb-8 overflow-hidden">
            <div className="testimonials-marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0"
                >
                  {testimonialPhotos.map((photo, index) => (
                    <div
                      key={`${copy}-${index}`}
                      className="w-[min(68vw,15rem)] shrink-0 px-2 sm:w-64 lg:w-72"
                    >
                      <div className="relative aspect-4/5 overflow-hidden rounded-xl">
                        <Image
                          src={photo}
                          alt={`ZeeGuard testimonial photo ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 68vw, (max-width: 1024px) 256px, 288px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
{/* 
          <Carousel>
            {HOME_TESTIMONIALS.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="w-80 shrink-0 px-2 md:w-120 lg:w-1/3 snap-start"
              >
                <blockquote className="flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-ink-850 p-6">
                  <p className="italic leading-relaxed text-my-pink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-ink-700 text-steel-400">
                      <Image
                        src={t.imageUrl ? t.imageUrl : fallBackImage}
                        alt={`${t.name} testimonial photo`}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <div>
                      <p className="text-stone">{t.name}</p>
                      <p className="text-my-pink">{t.role}</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            ))}
          </Carousel> */}
        </div>
      </Container>
    </Section>
  );
}
