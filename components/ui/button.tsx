'use client'
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { oswald } from "@/app/fonts";

type ButtonVariant =
  | "solid"
  | "outline-white"
  | "outline-gold"
  | "ghost";


const VARIANT_STYLES: Record<ButtonVariant, string> = {
  solid:
    "bg-blaze-gradient text-white shadow-glow-blaze hover:brightness-110 active:brightness-95 border-b-[#FEBB2D] border-b-4 ",
  "outline-white":
    "border border-my-pink/30 text-my-icon-pink hover:bg-white/10",
  "outline-gold":
    "border border-b-[#FEBB2D] border-b-4 border-gold-500 text-gold-400 hover:bg-gold-500/10",
  ghost: "text-white hover:text-blaze-400",
};


const baseStyles =
  cn("inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide transition-all duration-300 focus-visible:outline-hidden disabled:opacity-50 disabled:pointer-events-none px-3 md:px-6 h-[76px] hover:scale-105 rounded-[26px] text-2xl md:text-3xl font-bold whitespace-nowrap py-1", oswald.className);

interface CommonProps {
  variant?: ButtonVariant;
  // size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> {
  href?: undefined;
}

interface ButtonAsLink
  extends CommonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Shared CTA button. Renders a Next.js Link when `href` is provided,
 * otherwise a native button element.
 */
export function Button({
  variant = "solid",
  icon,
  className,
  children,
  href ="/categories",
  disabled = false, 
  ...props
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    VARIANT_STYLES[variant],
    disabled && "opacity-50 pointer-events-none cursor-not-allowed",
    className
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    
     // 👇 if disabled, strip href and block clicks
    const safeHref = disabled ? undefined : href;

    if (isExternal) {
      return (
        <a
          href={safeHref}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {icon}
      {children}
    </button>
  );
}
