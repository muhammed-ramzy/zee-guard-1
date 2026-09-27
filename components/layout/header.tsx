"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants/nav";
import { cn } from "@/lib/utils";
import {lato, copperplate} from '@/app/fonts'



export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-ink-950/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center justify-between gap-2">
        <Image src={"/logo.png"} alt="zeeguard logo" width={50} height={50}/>
        <Link href="/" className={cn("flex  font-display items-baseline",copperplate.className)}>
          <span className="text-blaze-500 text-[30px]">Z</span>
          <span className="text-white text-[21px]">EE</span>
          <span className="text-blaze-500 text-[30px]">G</span>
          <span className="text-white text-[21px]">UARD</span>
        </Link>
        </div>

        <nav className="hidden items-center lg:gap-3  xl:gap-5 2xl:gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[18px] xl:text-20 2xl:text-2xl  tracking-wide transition-colors hover:text-blaze-400",
                  active ? "text-blaze-400" : "text-white/90", lato.className
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-ink-950 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-3 text-sm font-medium",
                      active ? "bg-white/5 text-blaze-400" : "text-white/90 hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
