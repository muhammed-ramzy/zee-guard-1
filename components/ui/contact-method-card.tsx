import { ArrowRight } from "lucide-react";
import { ContactMethod, fontIcon } from "@/types";
import FontIcon from "./font-icon";
import { cn } from "@/lib/utils";
import { inter, oswald } from "@/app/fonts";


export function ContactMethodCard({ method, icon }: { method: ContactMethod, icon: fontIcon }) {
  const isExternal = method.href.startsWith("http");

  return (
    <div className={cn("flex flex-col gap-4 rounded-xl border border-white/10 bg-ink-850 p-7 text-base md:w-100 w-90", inter.className)}>
      <span className="flex h-11 w-11 items-center justify-center rounded-lg text-white">
        <FontIcon fontIcon={icon} className="w-10" />
      </span>
      <h3 className={cn("font-display text-2xl uppercase tracking-wide text-white font-semibold", oswald.className)}>
        {method.title}
      </h3>
      <p className="text-steel-400">{method.description}</p>
      <a
        href={method.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="mt-auto flex items-center justify-start gap-1.5 font-bold uppercase tracking-wide text-blaze-400 hover:text-blaze-500"
      >
        {method.actionLabel}
        <ArrowRight size={16} aria-hidden />
      </a>
    </div>
  );
}
