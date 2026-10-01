"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HERO_BADGES } from "@/constants/home";
import { cn } from "@/lib/utils";
import { oswald, inter } from "@/app/fonts";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('/images/logo-transparent.webp')] bg-top bg-no-repeat sm:bg-center bg-size-[auto_650px] sm:bg-size-[auto_1300px]"
        initial={{ opacity: 0.45, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-[#200002]/88" />
      <div className="absolute inset-0 bg-black/45" />

      <Container className="relative flex min-h-dvh flex-col items-center justify-center gap-1 pt-17 pb-8 text-center">
        <motion.h1
          className={cn(
            "max-w-4xl font-display uppercase leading-[1.05] tracking-wide text-contact-gold text-3xl md:text-5xl lg:text-[70px] font-bold",
            oswald.className,
          )}
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          Custom Protection For
          <br />
          <span className="text-blaze-500">Elite Fighters</span>
        </motion.h1>

        <motion.div
          className="relative mx-auto w-full max-w-lg"
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/logo-black.webp"
              alt="ZeeGuard custom-fit mouthguard, black with silver crest logo"
              width={900}
              height={600}
              priority
              className="w-full drop-shadow-[0_0_30px_rgba(255,0,0,0.25)]"
            />
          </motion.div>
        </motion.div>

        <motion.p
          className={cn(
            "text-balance text-sm text-my-darker-pink sm:text-lg mb-2",
            inter.className,
          )}
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <span className="font-bold text-my-pink">Dentist-made</span>{" "}
          custom-fit mouthguards trusted by national-level athletes in all Martial arts.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          <Button
            href="/categories"
            variant="solid"
            className={cn(oswald.className, "mb-2")}
          >
            Create My Own Design
          </Button>
        </motion.div>

        <motion.ul
          className={cn(
            "flex flex-wrap items-center justify-center gap-x-2 pt-2 sm:gap-x-12 sm:gap-y-3",
            inter.className,
          )}
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
        >
          {HERO_BADGES.map((badge) => (
            <li
              key={badge}
              className="group mb-1 flex items-center gap-2 text-xs font-semibold text-my-pink sm:mb-0 sm:text-sm hover:text-my-hovered-pink"
            >
              <CheckCircle2
                size={20}
                className="text-gold-500 transition-transform duration-300 group-hover:text-gold-300 group-hover:scale-110"
                aria-hidden
              />
              {badge.toUpperCase()}
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
