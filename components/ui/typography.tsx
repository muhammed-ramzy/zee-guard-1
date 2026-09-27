import { HTMLAttributes, ReactNode } from "react";
import {inter, oswald} from "@/app/fonts"
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  withDivider?: boolean;
}

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
        "flex flex-col gap-4 group",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <h2 className={cn(oswald.className, "font-display text-3xl uppercase tracking-wide text-white sm:text-4xl md:text-[3rem] font-bold")}>
        {title}
      </h2>
      {withDivider && <span className="divider-accent" aria-hidden />}
      {subtitle && (
        <p className={cn("text-base text-my-pink sm:text-lg font-normal", inter.className)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest2 text-ink-950",
        className
      )}
    >
      {children}
    </span>
  );
}
