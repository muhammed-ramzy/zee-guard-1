import { Check, X } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { COMPARISON_ROWS } from "@/constants/home";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";

export function DifferenceTable() {
  return (
    <Section tone="raised">
      <Container className="flex flex-col gap-10">
        <SectionHeading title="The Difference Is Clear" align="center" withDivider />

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className={cn("border-b border-white/10 whitespace-nowrap text-2xl lg:text-3xl uppercase tracking-wide font-semibold ", oswald.className)}>
                <th className="px-6 py-4 text-stone">Feature</th>
                <th className="px-6 py-4 text-my-pink ">Traditional Boil &amp; Bite</th>
                <th className="px-6 py-4 text-my-icon-pink">ZeeGuard Custom</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(i % 2 === 0 ? "bg-ink-850" : "bg-ink-900", inter.className, "text-[16px] font-normal hover:brightness-200")}
                >
                  <td className="px-6 py-4 text-stone">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-my-icon-pink">
                    <span className="flex items-center gap-2">
                      <X size={16} className="shrink-0 text-blaze-500" aria-hidden />
                      {row.traditional}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone">
                    <span className="flex items-center gap-2">
                      <Check size={16} className="shrink-0 text-emerald-500" aria-hidden />
                      {row.zeeguard}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
