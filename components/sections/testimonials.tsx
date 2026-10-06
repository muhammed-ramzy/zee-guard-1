"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
        </div>
      </Container>
    </Section>
  );
}
