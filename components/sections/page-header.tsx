import { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { inter, oswald } from "@/app/fonts";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}

/**
 * Shared hero-style header used at the top of interior pages
 * (Gallery, Categories, Designer, How It Works, Athletes, Contact).
 */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" aria-hidden />
      <Container className="relative flex flex-col items-center gap-5 py-20 text-center md:py-28">
        {eyebrow && (
          <span className="inline-block rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase tracking text-ink-950">
            {eyebrow}
          </span>
        )}
        <h1 className={cn(" text-balance font-bold font-display text-4xl md:text-5xl lg:text-7xl uppercase leading-tight tracking-tight text-stone", oswald.className)}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn("max-w-2xl text-balance text-base text-steel-400 sm:text-lg", inter.className)}>
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
