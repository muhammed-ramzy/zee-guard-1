import Link from "next/link";
import { FontAwesomeIcon } from "@/node_modules/@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import instagram from "@/assets/images/instagram.svg";
import { copperplate, inter } from "@/app/fonts";

library.add(fab);
import { cn } from "@/lib/utils";
import FontIcon from "../ui/font-icon";
import { Socials } from "@/types";

const SOCIALS : Socials[] = [
  {
    label: "Instagram",
    icon: "instagram",
    href: "https://instagram.com/zeeguard",
    color: "",
  },
  {
    label: "WhatsApp",
    icon: "whatsapp",
    href: "https://wa.me/201124081447",
    color: "text-[#25D366]",
  },
  {
    label: "Facebook",
    icon: "facebook",
    href: "https://www.facebook.com/profile.php?id=61579043641115",
    color: "text-[#1877F2]",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 ">
      <div className="container-page h-min flex sm:flex-col flex-col-reverse gap-10 py-14 md:flex-row md:items-start md:justify-between items-center ">
        <div className="flex flex-col justify-between items-center md:items-start h-full">
          <div className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="zeeguard logo"
              width={50}
              height={50}
            />
            <Link
              href="/"
              className={cn(
                "flex  font-display items-baseline",
                copperplate.className,
              )}
            >
              <span className="text-blaze-500 text-[30px]">Z</span>
              <span className="text-white text-[21px]">EE</span>
              <span className="text-blaze-500 text-[30px]">G</span>
              <span className="text-white text-[21px]">UARD</span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-steel-400">
            © 2025 ZeeGuard.
            <br />
            Engineered for the Elite.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3
            className={cn(
              "font-display text-2xl uppercase tracking-wide text-white",
              inter.className,
            )}
          >
            Contact Us
          </h3>
          <ul
            className={cn(
              "mt-4 flex flex-col gap-3 text-[16px]",
              inter.className,
            )}
          >
            {SOCIALS.map((social)=>{
              return <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3  text-white/90 transition-colors hover:text-blaze-400"
              >
                <span className="w-6">
                  <FontIcon fontIcon={social.icon} className={social.color}/>
                </span>
                <span>{social.label}</span>
              </a>
            </li>})}
          </ul>
        </div>
      </div>
    </footer>
  );
}
