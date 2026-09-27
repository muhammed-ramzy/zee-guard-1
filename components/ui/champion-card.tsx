import Image, { StaticImageData } from "next/image";
import { Trophy } from "lucide-react";
import { Athlete } from "@/types";
import { cn } from "@/lib/utils";
import { inter, oswald } from "@/app/fonts";



const DISCIPLINE_STYLES: Record<string, string> = {
  Karate: "bg-gold-500 text-ink-950",
  "Pro MMA": "bg-blaze-500 text-white",
  Boxing: "bg-white/10 text-white",
};

export function ChampionCard({ athlete }: { athlete: Athlete }) {
  const src = "/images/athlete-marcus.svg";

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-850">
      <div className="relative aspect-4/5 w-full overflow-hidden">
        <span
          className={`absolute left-4 top-4 z-10 rounded px-3 py-1 text-xs font-bold uppercase tracking-wide bg-gold-500 text-ink-950`}
        >
          {athlete.discipline}
        </span>
        <Image
          src={athlete.img}
          alt={`${athlete.name}, ${athlete.discipline} athlete sponsored by ZeeGuard`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top "
        />
        <div className="absolute inset-0 bg-linear-to-t from-1 from-black/60 to-transparent" />
      </div>

      <div className={cn("flex flex-1 flex-col gap-4 p-6", inter.className)}>
        <h3 className={cn("font-display text-[2rem] font-semibold uppercase tracking-wide text-white whitespace-nowrap", oswald.className)}>
          {athlete.name}
        </h3>

        <ul className="flex flex-col gap-1.5">
          {athlete.achievements.map((achievement) => (
            <li key={achievement} className="flex items-center gap-2 text-xs text-gold-400">
              <Trophy size={14} aria-hidden />
              {achievement}
            </li>
          ))}
        </ul>

        <p className="mt-auto text-sm italic leading-relaxed text-steel-400">
          &ldquo;{athlete.quote}&rdquo;
        </p>
      </div>
    </article>
  );
}
