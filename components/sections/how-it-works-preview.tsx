"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { PROCESS_STEPS_SHORT } from "@/constants/home";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HowItWorksPreview() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full"
        >
          <SectionHeading title="How It Works" />
        </motion.div>

        <div className="hidden w-full flex-col gap-2 lg:flex">
          <ol className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS_STEPS_SHORT.map((item, index) => (
              <motion.li
                key={item.step}
                className={cn(
                  "flex flex-col items-center gap-3 text-center",
                  oswald.className,
                )}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-[24px] font-bold ${
                    item.step === 1
                      ? "bg-my-icon-pink text-my-wine-red"
                      : "border border-white/20 bg-my-Graphite text-stone duration-300 hover:bg-my-icon-pink hover:text-my-wine-red"
                  }`}
                >
                  {item.step}
                </span>
              </motion.li>
            ))}
          </ol>
          <div className="h-1 w-full rounded bg-gray-500" />
          <ol className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS_STEPS_SHORT.map((item, index) => (
              <motion.li
                key={item.step}
                className={cn(
                  "flex flex-col items-center gap-2 text-center font-bold",
                  inter.className,
                )}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.12 + index * 0.08,
                }}
              >
                <h3 className="text-sm uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-steel-400">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="flex w-full flex-col gap-2 lg:hidden">
          <ol className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {PROCESS_STEPS_SHORT.map((item, index) => (
              <motion.li
                key={item.step}
                className={cn(
                  "flex flex-col items-center gap-3 text-center",
                  oswald.className,
                )}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-[24px] font-bold ${
                    item.step === 1
                      ? "bg-my-icon-pink text-my-wine-red"
                      : "border border-white/20 bg-my-Graphite text-stone duration-300 hover:bg-my-icon-pink hover:text-my-wine-red"
                  }`}
                >
                  {item.step}
                </span>
                <h3 className="text-sm uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-steel-400">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={reveal}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          <Button href="/how-it-works" variant="outline-white">
            More Details
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
