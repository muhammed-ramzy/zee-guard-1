"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { GalleryDesign } from "@/types";
import { motion } from "motion/react";
import FontIcon from "@/components/ui/font-icon";

interface GalleryCardProps {
  design: GalleryDesign;
  className?: string;
  imageHeightClass?: string;
}

export function GalleryCard({ design, className }: GalleryCardProps) {
  const designName =
    design.title.trim() ||
    design.alt?.trim() ||
    design.id.replace(/[-_]+/g, " ");
  const whatsappMessage = `Hi, I'd like to order the ${designName} design.`;

  return (
    <motion.article
      className={cn(
        "group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-ink-850",
        className,
      )}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.05,
      }}
    >
      <div className="absolute inset-0 bg-[#000000]" />
      <div className="absolute inset-0">
        <Image
          src={design.image}
          alt={
            design.alt ??
            `${design.title} — custom mouthguard design, ${design.subtitle}`
          }
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain transition-all duration-500 brightness-120 group-hover:brightness-130 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-transparent" />
      </div>

      {design.tag && (
        <span className="absolute left-4 top-4 rounded-sm bg-gold-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950">
          {design.title}
        </span>
      )}

          <a
            href={`https://wa.me/201124081447?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${designName} on WhatsApp`}
            title={`Order ${designName} on WhatsApp`}
            className="absolute bottom-3 right-3 z-10 flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-black/75 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_14px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 hover:border-white/25 hover:bg-black/90 hover:shadow-[0_4px_14px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blaze-400"
          >
            <FontIcon fontIcon="whatsapp" className="" />
            <span className="text-xs font-bold uppercase tracking-wide text-white">
              Order {designName}
            </span>
          </a>

    </motion.article>
  );
}
