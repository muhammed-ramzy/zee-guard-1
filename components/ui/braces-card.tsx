"use client";

import Image from "next/image";
import { AddOnOption, AddOns, choice, TierOption } from "@/types";
import { AVAILABLE_COLORS } from "@/constants/pricing";
import { cn } from "@/lib/utils";
import { inter, oswald } from "@/app/fonts";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
interface BracesCardProps {
  badge: string;
  badgeTone: "blaze" | "gray";
  heading: string;
  description: string;
  options: TierOption[];
  image: string;
  imageAlt: string;
  direction: "left" | "right";
  addOns: AddOns;
  isLower?: boolean;
}

export function BracesCard({
  badge,
  badgeTone,
  heading,
  description,
  options,
  image,
  imageAlt,
  direction,
  addOns,
  isLower,
}: BracesCardProps) {
  const [chosenTier, setChosenTier] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [hasLowerSelection, setHasLowerSelection] = useState(false);
  const [upperSelectedData, setUpperSelectedData] = useState<choice>({
    optionName: "",
    optionPrice: 0,
    thickness: "",
    addOns: [],
  });
  const [lowerSelectedData, setLowerSelectedData] = useState<choice>({
    optionName: "",
    optionPrice: 0,
    thickness: "",
    addOns: [],
  });

  const chosenIndex = useRef<number>(0);

  const handleOptionChange = (
    optionName: string,
    optionPrice: number,
    thickness: string,
  ) => {
    if (isLower) {
      setLowerSelectedData({
        optionName: optionName,
        optionPrice: optionPrice,
        thickness: thickness,
        addOns: [], // clearing the chosen add ons if the option changes
      });
    } else {
      setUpperSelectedData({
        optionName: optionName,
        optionPrice: optionPrice,
        thickness: thickness,
        addOns: [], // clearing the chosen add ons if the option changes
      });
    }
  };

  const handleAddOnChange = (
    key: string,
    addOnOption: AddOnOption,
    checked: boolean,
  ) => {
    if (isLower) {
      setLowerSelectedData((old) => {
        const addOns = checked
          ? [...old.addOns, { key, addOnOption }]
          : old.addOns.filter((item) => item.key !== key);

        const next = { ...old, addOns };

        sessionStorage.setItem("lowerAddOn", JSON.stringify(next.addOns));

        return next;
      });
    } else {
      setUpperSelectedData((old) => {
        const addOns = checked
          ? [...old.addOns, { key, addOnOption }]
          : old.addOns.filter((item) => item.key !== key);

        const next = { ...old, addOns };

        sessionStorage.setItem("upperAddOn", JSON.stringify(next.addOns));

        return next;
      });
    }
  };

  const selectedData = isLower ? lowerSelectedData : upperSelectedData;

  useEffect(() => {
    const syncLowerSelection = () => {
      const value = sessionStorage.getItem("Lower tier") || "";
      setHasLowerSelection(Boolean(value.trim()));
    };

    // clearing session storage
    sessionStorage.clear();

    syncLowerSelection();
    window.addEventListener("selection-changed", syncLowerSelection);

    return () =>
      window.removeEventListener("selection-changed", syncLowerSelection);
  }, []);

  const visibleAddOns = Object.entries(addOns).filter(([key]) => {
    if (isLower) return false;
    if (hasLowerSelection && key === "lowerFit") return false;
    return true;
  });

  const totalPrice =
    selectedData.optionPrice +
    selectedData.addOns.reduce(
      (sum, item) => sum + (item.addOnOption?.price ?? 0),
      0,
    );

  function choose(index: number, tier: string, thickness: string) {
    // these two for the UI
    chosenIndex.current = index;
    setChosenTier(tier);

    // storing data for designer
    sessionStorage.setItem("isBraces", "true");
    if (isLower) {
      sessionStorage.setItem("upperAddOn", JSON.stringify([]));
      setUpperSelectedData((prev) => ({ ...prev, addOns: [] }));
      sessionStorage.setItem("lowerAddOn", "[]");
      setLowerSelectedData((prev) => ({ ...prev, addOns: [] }));
      sessionStorage.setItem("Lower tier", tier);
      sessionStorage.setItem("lowerTierthickness", thickness);
      setHasLowerSelection(true);
    } else {
      sessionStorage.setItem("upper tier", tier);
      sessionStorage.setItem("upperTierthickness", thickness);
      setHasLowerSelection(
        Boolean(sessionStorage.getItem("Lower tier")?.trim()),
      );
    }

    window.dispatchEvent(new Event("selection-changed"));
  }

  const handleClear = () => {
    // reset UI state
    setChosenTier(null);
    chosenIndex.current = 0;
    setLowerSelectedData({
      optionName: "",
      optionPrice: 0,
      addOns: [],
      thickness: "",
    });
    setResetKey((k) => k + 1); // forces inputs to remount unchecked
    setHasLowerSelection(false);

    // clear sessionStorage for lower jaw only
    sessionStorage.setItem("upperAddOn", JSON.stringify([]));
    sessionStorage.setItem("lowerAddOn", "[]");
    sessionStorage.setItem("Lower tier", "");
    sessionStorage.setItem("lowerTierthickness", "");
    window.dispatchEvent(new Event("selection-changed"));
  };

  useEffect(() => {
    if (isLower) {
      sessionStorage.setItem(
        "lowerAddOn",
        JSON.stringify(lowerSelectedData.addOns),
      );
    } else {
      sessionStorage.setItem(
        "upperAddOn",
        JSON.stringify(upperSelectedData.addOns),
      );
    }
  }, [chosenTier, isLower, upperSelectedData.addOns, lowerSelectedData.addOns]);

  return (
    <motion.div
      className={cn(
        "flex flex-col overflow-hidden border border-transparent bg-ink-850",
        direction == "left"
          ? "rounded-l-2xl border-l-white/10"
          : "rounded-r-2xl border-r-white/10",
      )}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.05,
      }}
    >
      <div className="relative aspect-[4/3] w-full">
        <span
          className={`absolute left-4 top-4 z-10 rounded px-3 py-1 text-xs font-bold uppercase tracking-wide ${
            badgeTone === "blaze"
              ? "bg-blaze-500 text-white"
              : "bg-white/10 text-white"
          } ${inter.className}`}
        >
          {badge}
        </span>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6 p-7">
        <div>
          <div className="flex justify-between items-center gap-x-1">
            <h3
              className={cn(
                "font-display text-[2rem] font-semibold text-balance uppercase tracking-normal text-gold-400 ",
                oswald.className,
              )}
            >
              {heading}
            </h3>
            {isLower && chosenTier && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  "rounded-2xl bg-blaze-500 px-5 py-2 text-sm font-semibold text-white cursor-pointer hover:bg-blaze-600 active:bg-blaze-700 transition-colors",
                  inter.className,
                )}
              >
                Clear
              </button>
            )}
          </div>
          <p className={cn("mt-1 text-base text-my-pink", inter.className)}>
            {description}
          </p>
        </div>

        <fieldset key={resetKey} className="flex flex-col gap-4">
          <legend className="sr-only">{heading} options</legend>
          {options.map((option, index) => (
            <label
              key={option.name + option.price}
              className="flex items-start gap-3 border-b border-white/5 pb-4 last:border-none last:pb-0  cursor-pointer"
            >
              <input
                type="radio"
                name={`${heading}-option`}
                onChange={() => {
                  choose(index, option.name, option.spec.slice(0, 3));
                  handleOptionChange(
                    option.name,
                    option.price,
                    option.spec.slice(0, 3),
                  );
                }}
                className="mt-1 h-4 w-4 accent-blaze-500 cursor-pointer"
              />
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-base font-bold text-stone",
                      inter.className,
                    )}
                  >
                    {option.name}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap text-base text-stone",
                      oswald.className,
                    )}
                  >
                    {option.price} EGP
                  </span>
                </span>
                <span
                  className={cn(
                    "whitespace-nowrap text-sm font-bold text-dark-stone",
                    inter.className,
                  )}
                >
                  {option.spec}
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wide font-semibold text-pricing-recommend",
                    oswald.className,
                  )}
                >
                  {option.recommended}
                </span>
                {index === chosenIndex.current &&
                  chosenTier === option.name &&
                  !isLower &&
                  visibleAddOns.length > 0 && (
                    <div className="mt-2 pb-2 border-b border-white/10">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                          Add-ons
                        </span>
                        <span className="text-xs font-semibold text-gold-400">
                          Total: {totalPrice} EGP
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {visibleAddOns.map(([key, addon]) => (
                          <label
                            key={key}
                            className="flex items-start gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4 accent-blaze-500 cursor-pointer"
                              onChange={(e) => {
                                handleAddOnChange(key, addon, e.target.checked);
                              }}
                            />
                            <span className="flex flex-1 flex-col gap-0.5">
                              <span className="flex items-center justify-between gap-2">
                                <span className="text-sm text-white capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                                <span className="text-xs font-semibold text-white">
                                  +{addon.price} EGP
                                </span>
                              </span>
                              <span className="text-xs text-dark-stone">
                                {addon.description}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
              </span>
            </label>
          ))}
        </fieldset>

        <p className={cn("text-xs font-bold text-my-pink", inter.className)}>
          Available colors:{" "}
          <span className="font-semibold text-gold-400">
            {AVAILABLE_COLORS.join(", ")}
          </span>
        </p>
      </div>
    </motion.div>
  );
}
