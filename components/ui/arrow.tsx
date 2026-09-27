import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Arrow({scrollingBehaviour, iconSize, className, right}: {scrollingBehaviour: ()=>void, iconSize: number, className: string, right?: boolean})
{
    return(
        <button
        type="button"
        onClick={() => scrollingBehaviour()}
        aria-label="Previous champion"
        className={cn(className ,"absolute top-1/2 z-10 hidden  -translate-y-1/2 items-center justify-center text-athletes-carousel-button md:flex cursor-pointer active:text-my-wine-red")}
      >
        {right  ? <ChevronRight size={iconSize} aria-hidden /> : <ChevronLeft size={iconSize} aria-hidden />}
      </button>
    )
}