"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CollapsibleSection({
  title,
  number,
  children,
  defaultOpen = true,
}: {
  title: string;
  number?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl bg-ink-850 p-4 lg:p-6 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between hover:cursor-pointer"
      >
        <h2 className="font-display text-lg uppercase tracking-wide text-white">
          {number && <span className="mr-2 text-blaze-500">{number}.</span>}
          {title}
        </h2>
        <span className="text-steel-400 transition-transform duration-200 group-hover:text-white">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </span>
      </button>
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "mt-4 max-h-[2000px] opacity-100" : "mt-0 max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
