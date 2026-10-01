"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { PROCESS_STEPS_FULL } from "@/constants/home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons/faTooth";
import { motion } from "motion/react";
import { inter, oswald } from "@/app/fonts";

export function ProcessTimeline() {
  return (
    <ol className="relative mx-auto flex max-w-4xl flex-col gap-10">
      <span
        className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block"
        aria-hidden
      />

      {PROCESS_STEPS_FULL.map((item, index) => {
        const isLeft = index % 2 === 0;
        const isLast = index === PROCESS_STEPS_FULL.length - 1;

        return (
          <motion.li
            key={item.step}
            className={cn(
              "relative flex flex-col gap-4 md:w-1/2 group",
              isLeft ? "md:pr-12" : "md:ml-auto md:pl-12",
            )}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: item.step * 0.05,
            }}
          >
            <span
              className={cn(
                "absolute bottom-1 right-1 md:top-6 z-10 md:h-10 md:w-10 h-8 w-8 md:-translate-y-1/2 items-center justify-center rounded-full border-2 bg-ink-950 flex group-hover:shadow-glow-blaze duration-300",
                isLeft ? "md:-right-5" : "md:-left-5",
                isLeft
                  ? "border-my-icon-pink text-my-icon-pink shadow-glow-pink "
                  : "border-gold-500 text-gold-500",
                isLast && "border-stone text-stone bg-green-700",
              )}
              aria-hidden
            >
              {item.title == "Dental Impression" ? (
                <FontAwesomeIcon icon={faTooth} className="w-4" />
              ) : (
                <Icon
                  name={item.icon}
                  size={20}
                  strokeWidth={2}
                  enableBackground={20}
                />
              )}
            </span>

            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-ink-850 p-6 relative overflow-hidden group-hover:shadow-glow-blaze duration-300">
              <div className="flex items-center justify-between gap-3 ">
                <h3
                  className={cn(
                    "font-display text-xl uppercase tracking-wide text-stone font-semibold",
                    oswald.className,
                  )}
                >
                  {item.step}. {item.title}
                </h3>
                {item.badge && (
                  <span
                    className={cn(
                      "absolute top-0 right-0 whitespace-nowrap rounded-bl-sm bg-my-icon-pink/20 px-2.5 py-0.5 md:text-sm lg:text-base text-my-icon-pink",
                      inter.className,
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "text-base leading-relaxed text-my-pink",
                  inter.className,
                )}
              >
                {item.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
