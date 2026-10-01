"use client";

import { CONTACT_METHODS } from "@/constants/contact";
import FontIcon from "@/components/ui/font-icon";
import { cn } from "@/lib/utils";
import { Share2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function SocilaMediaIcons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      aria-label="Social media"
      className={cn(
        "fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-2 z-50 flex max-w-[calc(100vw-1.5rem)] flex-row-reverse items-center gap-2 transition-all duration-300 ease-out sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:flex-col sm:rounded-full sm:border sm:border-white/20 sm:bg-white/10 sm:p-2 sm:shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:ring-1 sm:ring-inset sm:ring-white/10 sm:backdrop-blur-xl sm:backdrop-saturate-150 cursor-pointer",
        isOpen &&
          "rounded-full border border-white/20 bg-white/10 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/10 backdrop-blur-xl backdrop-saturate-150",
      )}
    >
      <button
        type="button"
        aria-label={
          isOpen ? "Close social media links" : "Open social media links"
        }
        title={isOpen ? "Close social media links" : "Open social media links"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-my-icon-pink p-1 text-my-wine-red shadow-glow-gold backdrop-blur-xl transition-all duration-300 hover:bg-my-wine-red hover:text-my-icon-pink active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blaze-400 sm:hidden  cursor-pointer",
          isOpen && "rotate-90",
        )}
      >
        {isOpen ? <X size={20} /> : <Share2 size={20} />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <div className="flex flex-row-reverse gap-2 sm:hidden">
            {CONTACT_METHODS.map((social, index) => (
              <motion.a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.title}
                title={social.title}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, scale: 0.7, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 10 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blaze-400"
              >
                <FontIcon fontIcon={social.icon} className="" />
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>
      <div className="hidden flex-col gap-2 sm:flex">
        {CONTACT_METHODS.map((social) => (
          <a
            key={social.title}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.title}
            title={social.title}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-200 hover:-translate-x-1 hover:border-white/25 hover:bg-white/15 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blaze-400"
          >
            <FontIcon fontIcon={social.icon} className="" />
          </a>
        ))}
      </div>
    </nav>
  );
}
