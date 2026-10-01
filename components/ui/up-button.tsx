"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+4.25rem)] right-2 z-40 cursor-pointer rounded-full border-2 border-white bg-my-icon-pink p-1 text-my-wine-red shadow-glow-gold transition-all duration-200 hover:bg-my-wine-red hover:text-my-icon-pink active:scale-95 md:bottom-6 md:right-6"
    >
      <ChevronUp className="md:w-12 md:h-12 w-9 h-9" />
    </button>
  );
}
