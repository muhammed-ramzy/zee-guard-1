"use client";

import { motion } from "motion/react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  showInstagram?: boolean;
}

export function CtaBanner({
  title = "Ready to Protect Your Smile?",
  subtitle = "Join the elite athletes who trust ZeeGuard for ultimate protection and performance.",
}: CtaBannerProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className={cn(
            "font-display text-4xl font-bold uppercase tracking-tight text-stone text-balance md:text-7xl",
            oswald.className,
          )}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className={cn("text-balance text-my-pink", inter.className)}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Button>Create My Own Design</Button>

          <Button
            href="https://wa.me/201124081447"
            variant="outline-white"
            icon={
              <span className="w-7 text-[#25D366]">
                <FontAwesomeIcon icon={fab.faWhatsapp} />
              </span>
            }
          >
            Message Us on WhatsApp
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
