"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  withDivider?: boolean;
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Standard "TITLE + short accent divider + optional subtitle" pattern
 * used at the top of nearly every section across the site.
 */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  withDivider = true,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className,
      )}
      {...props}
    >
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={reveal}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={cn(
          oswald.className,
          "font-display text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl md:text-[3rem]",
        )}
      >
        {title}
      </motion.h2>
      {withDivider && <span className="divider-accent" aria-hidden />}
      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className={cn(
            "text-base font-normal text-my-pink sm:text-lg",
            inter.className,
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest2 text-ink-950",
        className,
      )}
    >
      {children}
    </span>
  );
}
