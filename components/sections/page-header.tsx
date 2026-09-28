"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { inter, oswald } from "@/app/fonts";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70"
        aria-hidden
      />
      <Container className="relative flex flex-col items-center gap-5 py-20 text-center md:py-28">
        {eyebrow && (
          <motion.span
            className="inline-block rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase tracking text-ink-950"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={reveal}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          className={cn(
            "text-balance font-bold font-display text-4xl md:text-5xl lg:text-7xl uppercase leading-tight tracking-tight text-stone",
            oswald.className,
          )}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={cn(
              "max-w-2xl text-balance text-base text-steel-400 sm:text-lg",
              inter.className,
            )}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={reveal}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
