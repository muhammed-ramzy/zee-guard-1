"use client";

import { inter } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { DesignCategory } from "@/types";
import { motion } from "motion/react"

interface CategoryPillsProps {
  categories: DesignCategory[];
  activeId: string;
  onChange?: (id: string) => void;
}

/**
 * Horizontal pill filter used on the Gallery page and mirrored
 * (statically) as a preview on the Home page.
 */
export function CategoryPills({ categories, activeId, onChange }: CategoryPillsProps) {
  return (
    <div className="flex  overflow-x-auto whitespace-nowrap w-full  lg:justify-center scrollbar-auto [&::-webkit-scrollbar]:hidden  gap-3" role="tablist" aria-label="Design categories">
      {categories.map((category, i) => {
        const active = category.id === activeId;
        return (
          <motion.button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(category.id)}
            className={cn(
              "rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-tight transition-colors sm:text-sm cursor-pointer",
              active
                ? "border-blaze-500 bg-blaze-500 text-white"
                : "border-white/15 text-white/80 hover:border-white/40",
              !onChange && "cursor-default", inter.className
            )}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: i * 0.05,
            }}
          >
            {category.label}
          </motion.button>
        );
      })}
    </div>
  );
}
