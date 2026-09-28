import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HERO_BADGES } from "@/constants/home";
import { cn } from "@/lib/utils";
import { oswald, inter } from "@/app/fonts";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/images/logo-transparent.webp')] bg-top sm:bg-center bg-no-repeat bg-size-[auto_650px]  sm:bg-size-[auto_1300px]"  />

      {/* First color layer */}
      <div className="absolute inset-0 bg-[#200002]/88" />

      {/* Second color layer */}
      <div className="absolute inset-0 bg-black/45" />

      <Container className="relative flex flex-col items-center gap-7 h-screen justify-center text-center">
        <h1
          className={cn(
            "max-w-4xl font-display  uppercase leading-[1.05] tracking-wide text-contact-gold text-3xl md:text-5xl lg:text-[70px] font-bold",
            oswald.className,
          )}
        >
          Custom Protection For
          <br />
          <span className="text-blaze-500">Elite Fighters</span>
        </h1>

        <div className="animate-mouthguard relative mx-auto w-full max-w-xl">
          <Image
            src="/images/logo-black.webp"
            alt="ZeeGuard custom-fit mouthguard, black with silver crest logo"
            width={900}
            height={600}
            priority
            className="w-full"
          />
        </div>

        <p
          className={cn(
            " text-balance text-sm text-my-darker-pink sm:text-lg ",
            inter.className,
          )}
        >
          <span className="font-bold text-my-pink">Dentist-made</span> custom-fit mouthguards
          trusted by national-level athletes in Karate, MMA, Boxing and
          Kickboxing.
        </p>

        <Button href="/categories" variant="solid" className={oswald.className}>
          Create My Own Design
        </Button>

        <ul
          className={cn(
            "flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-12 sm:gap-y-3  pt-2",
            inter.className,
          )}
        >
          {HERO_BADGES.map((badge) => (
            <li
              key={badge}
              className="flex items-center gap-2 text-xs text-my-pink font-semibold sm:text-sm hover:text-my-hovered-pink group sm:mb-0 mb-2"
            >
              <CheckCircle2
                size={20}
                className="text-gold-500 group-hover:text-gold-300"
                aria-hidden
              />
              {badge.toUpperCase()}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
