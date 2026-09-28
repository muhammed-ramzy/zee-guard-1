"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { TRUST_STATS } from "@/constants/home";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";
import ScrollCounter from "../ui/counter";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function TrustStats() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-12 ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full"
        >
          <SectionHeading
            title="Trusted by Egypt's Top Fighters"
            subtitle="Trusted by athletes competing in boxing, MMA, kickboxing, BJJ, karate, taekwondo, and more."
          />
        </motion.div>

        <div className="flex w-full flex-wrap justify-center gap-4">
          {TRUST_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex w-5/12 grow flex-col items-center justify-center gap-2 rounded-4xl border border-t-2 border-gold-400 bg-ink-850 px-4 py-8 text-center lg:w-2/12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08,
              }}
            >
              <span
                className={cn(
                  "flex items-center font-display text-3xl font-bold text-gold-400 sm:text-4xl md:text-5xl",
                  oswald.className,
                )}
              >
                +<ScrollCounter target={stat.value} />
              </span>
              <span
                className={cn(
                  "text-sm uppercase tracking-wide text-my-pink sm:text-base",
                  inter.className,
                )}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
        >
          <Button href="/athletes" variant="outline-white">
            Meet Our Athletes
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
