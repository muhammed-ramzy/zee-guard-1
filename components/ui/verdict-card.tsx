import { Star, BadgeCheck, UserRound } from "lucide-react";
import { Testimonial } from "@/types";

export function VerdictCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-ink-850 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-700 text-steel-400">
            <UserRound size={20} aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{testimonial.name}</p>
            {testimonial.rating && (
              <div className="flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < testimonial.rating! ? "fill-gold-500 text-gold-500" : "text-steel-600"}
                    aria-hidden
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {testimonial.verified && (
          <span className="flex items-center gap-1 whitespace-nowrap rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-emerald-400">
            <BadgeCheck size={12} aria-hidden />
            Verified Buyer
          </span>
        )}
      </div>

      {testimonial.role && !testimonial.verified && (
        <p className="text-xs font-semibold uppercase tracking-wide text-steel-500">
          {testimonial.role}
        </p>
      )}

      <p className="text-sm leading-relaxed text-steel-400">&ldquo;{testimonial.quote}&rdquo;</p>

      {testimonial.verified && (
        <p className="text-xs font-semibold text-steel-500">{testimonial.role}</p>
      )}
    </div>
  );
}
