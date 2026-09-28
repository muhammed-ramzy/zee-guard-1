"use client";

import { motion } from "motion/react";
import { ContactMethodCard } from "@/components/ui/contact-method-card";
import { CONTACT_METHODS } from "@/constants/contact";
import { Container, Section } from "@/components/ui/container";

export function ContactMethodsReveal() {
  return (
    <Section className="pt-0!">
      <Container className="flex flex-wrap justify-center gap-5">
        {CONTACT_METHODS.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }
          }
          >
            <ContactMethodCard method={method} icon={method.icon} />
          </motion.div>
        ))}
      </Container>
    </Section>
  );
}
