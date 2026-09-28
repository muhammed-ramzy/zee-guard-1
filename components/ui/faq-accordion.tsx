"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaqItem } from "@/types";
import { inter, oswald } from "@/app/fonts";
import {motion} from 'motion/react'
interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex w-full flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <motion.div
            key={item.question}
            className="overflow-hidden rounded-lg border border-white/10 bg-ink-850 hover:brightness-130 tracking-wide"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: index * 0.07,
            }}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn("flex w-full items-center justify-between gap-4 px-6 py-4 text-left md:text-2xl font-bold text-white sm:text-base cursor-pointer ", oswald.className)}
              >
                {item.question}
                <ChevronDown
                  size={20}
                  className={cn(
                    "shrink-0 text-blaze-400 transition-transform duration-200 ",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className={cn("px-6 pb-5 text-base leading-relaxed text-steel-400", inter.className)}>
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
