import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("container-page", className)} {...props}>
      {children}
    </div>
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  tone?: "base" | "raised";
}

/**
 * Full-bleed section wrapper. `tone="raised"` gives a subtly lighter
 * panel color, used to separate stacked sections without hard borders.
 */
export function Section({ children, className, tone = "base", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "section-y",
        tone === "raised" ? "bg-ink-900" : "bg-ink-950",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
