"use client";

import { useRef } from "react";
import Arrow from "./arrow";

export function Carousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.3, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <Arrow scrollingBehaviour={() => {scrollBy(-1)}} className="left-0 -translate-x-12" iconSize={50}/>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto  scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <Arrow scrollingBehaviour={() => {scrollBy(1)}} className="right-0 translate-x-12" iconSize={50} right/>
    </div>
  );
}


