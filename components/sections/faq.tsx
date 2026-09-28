"use client";

import { motion } from "motion/react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { FAQ_ITEMS } from "@/constants/home";

export function Faq() {
  return (
    <Section tone="raised">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading title="Frequently Asked Questions" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-3xl"
        >
          <FaqAccordion items={FAQ_ITEMS} />
        </motion.div>
      </Container>
    </Section>
  );
}
