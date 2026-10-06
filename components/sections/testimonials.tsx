"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { testimonialPhotos } from "@/assets/images/image";

export function TestimonialsSection({ tone = "base" }: { tone?: "base" | "raised" }) {
  const photoTrackRef = useRef<HTMLDivElement>(null);
  const pointerDragRef = useRef<{
    pointerId: number;
    startX: number;
    startTime: number;
    duration: number;
    animation: Animation;
  } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const track = photoTrackRef.current;
    const animation = track?.getAnimations()[0];
    if (!track || !animation) return;

    const timing = animation.effect?.getTiming();
    const duration =
      typeof timing?.duration === "number" ? timing.duration : 55_000;

    pointerDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTime: Number(animation.currentTime ?? 0),
      duration,
      animation,
    };
    animation.pause();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = pointerDragRef.current;
    const track = photoTrackRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !track) return;

    const loopWidth = track.scrollWidth / 2;
    if (loopWidth === 0) return;

    const nextTime =
      drag.startTime -
      (event.clientX - drag.startX) * (drag.duration / loopWidth);
    drag.animation.currentTime =
      ((nextTime % drag.duration) + drag.duration) % drag.duration;
  };

  const finishPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = pointerDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    pointerDragRef.current = null;
    drag.animation.play();
  };

  return (
    <Section tone={tone}>
      <Container className="flex flex-col gap-10 p-0.5">
        <SectionHeading title="What Fighters Say" />

        <div className={cn("text-lg lg:w-auto", inter.className)}>
          <div
            role="region"
            aria-label="Testimonial photos. Drag or swipe horizontally to browse."
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onPointerCancel={finishPointerDrag}
            onLostPointerCapture={finishPointerDrag}
            onDragStart={(event) => event.preventDefault()}
            className="mb-8 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: "pan-y" }}
          >
            <div
              ref={photoTrackRef}
              className="testimonials-marquee-track flex w-max will-change-transform"
            >
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
                          draggable={false}
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
