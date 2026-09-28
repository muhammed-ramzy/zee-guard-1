"use client";

import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { AddOnOption, AddOns, choice, PricingTier } from "@/types";
import { Button } from "@/components/ui/button";
import { AVAILABLE_COLORS } from "@/constants/pricing";
import { inter, oswald } from "@/app/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
// import corefitImage from "@/assets/images/categories/corefit.png";
import designFlexImage from "@/assets/images/categories/DesignFlex.webp";
import fusionImage from "@/assets/images/categories/DesignFlex.webp";
import { useEffect, useRef, useState } from "react";

const BADGE_STYLES: Record<PricingTier["badgeVariant"], string> = {
  essential: "bg-white/10 text-white",
  popular: "bg-blaze-500 text-white",
  pro: "bg-gold-500 text-ink-950",
};

const IMAGE_MAP: Record<string, StaticImageData> = {
  corefit: designFlexImage,
  designflex: designFlexImage,
  fusion: fusionImage,
};

const COLOR_SWATCH: Record<string, string> = {
  Black: "bg-black",
  White: "bg-white",
  Blue: "bg-blue-600",
  Pink: "bg-pink-500",
  Green: "bg-emerald-500",
};

interface PricingCardProps {
  tier: PricingTier;
  highlighted?: boolean;
  addOns: AddOns;
}

export function PricingCard({ tier, highlighted, addOns }: PricingCardProps) {
  const [chosenTier, setchosenTier] = useState<string | null>(null);
  const chosenIndex = useRef<number>(0);
  const [msg, setMsg] = useState<string>(encodeURIComponent(""));
  const [chosenColor, setChosenColor] = useState<string>("Black");

  // Using refs - no re-renders
  const [selectedData, setSelectedData] = useState<choice>({
    optionName: "",
    optionPrice: 0,
    thickness: "",
    addOns: [],
  });

  const handleOptionChange = (
    optionName: string,
    optionPrice: number,
    thickness: string,
  ) => {
    console.log(optionName);

    setSelectedData({
      optionName: optionName,
      optionPrice: optionPrice,
      thickness: thickness,
      addOns: [], // clearing the chosen add ons if the option changes
    });

    // setting color to transparent if coreshield is chosen for the ones don't have color and black for the one having colors
    if (optionName.toLowerCase().includes("colorshield")) {
      setChosenColor("Black");
    } else {
      setChosenColor("Transparent");
    }
  };

  const handleAddOnChange = (
    key: string,
    addOnOption: AddOnOption,
    checked: boolean,
  ) => {
    setSelectedData((old) => {
      const addOns = checked
        ? [...old.addOns, { key, addOnOption }]
        : old.addOns.filter((item) => item.key !== key);

      const next = { ...old, addOns };
      const addOnStorageKey = `${tier.id}AddOn`;

      sessionStorage.setItem("selectedCategory", tier.id);
      sessionStorage.setItem(addOnStorageKey, JSON.stringify(next.addOns));

      return next;
    });
  };

  const totalPrice =
    selectedData.optionPrice +
    selectedData.addOns.reduce(
      (sum, item) => sum + (item.addOnOption?.price ?? 0),
      0,
    );

  function choose(index: number, tierName: string, thickness: string) {
    chosenIndex.current = index;
    setchosenTier(tierName);

    const storagePrefix = `${tier.id}`;
    sessionStorage.setItem("isBraces", "false");
    sessionStorage.setItem("selectedCategory", tier.id);
    sessionStorage.setItem("upper tier", "");
    sessionStorage.setItem("upperTierthickness", "");
    sessionStorage.setItem("Lower tier", "");
    sessionStorage.setItem("lowerTierthickness", "");
    sessionStorage.setItem("lowerAddOn", "[]");
    sessionStorage.setItem("upperAddOn", JSON.stringify([]));
    sessionStorage.setItem("singleAddOn", JSON.stringify([]));
    sessionStorage.setItem(`${storagePrefix}Tier`, tierName);
    sessionStorage.setItem(`${storagePrefix}Thickness`, thickness);
    sessionStorage.setItem("tier", tierName);
    sessionStorage.setItem("thickness", thickness);

    const chosenTier = sessionStorage.getItem(`${storagePrefix}Tier`);
    if (chosenTier) console.log(chosenTier);
  }

  function setWhatsappMsg() {
    const chosenAddOns = selectedData.addOns.map((addOn) => addOn.key);
    const addOnsMsg = chosenAddOns.length > 0 ? chosenAddOns.join(", ") : "";

    const fullMsg = `Tier: ${chosenTier}\nColor: ${chosenColor}\n${addOnsMsg && "Add Ons: " + addOnsMsg}`;

    setMsg(encodeURIComponent(fullMsg));
  }

  useEffect(() => {
    if (chosenTier?.toLowerCase().includes("corefit")) {
      setWhatsappMsg();
    }

    const addOnStorageKey = `${tier.id}AddOn`;
    sessionStorage.setItem("selectedCategory", tier.id);
    sessionStorage.setItem(
      addOnStorageKey,
      JSON.stringify(selectedData.addOns),
    );

    console.log(encodeURIComponent(msg));
    console.log(chosenColor);
    console.log(chosenTier);
  }, [chosenColor, chosenTier, selectedData.addOns, tier.id, msg]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border bg-ink-850",
        highlighted
          ? "border-blaze-500 shadow-glow-blaze lg:-translate-y-4"
          : tier.badgeVariant === "pro"
            ? "border-gold-600/50"
            : "border-white/10",
      )}
    >
      <div className="relative">
        {/* Badge */}
        <span
          className={cn(
            "absolute left-4 top-4 z-10 rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-wide",
            inter.className,
            BADGE_STYLES[tier.badgeVariant],
          )}
        >
          {tier.badge}
        </span>

        {/* Image */}
        <div className="relative h-52 md:h-80 lg:h-64 w-full bg-ink-900">
          <Image
            src={IMAGE_MAP[tier.id] ?? "/images/tier-corefit.svg"}
            alt={`${tier.name} mouthguard product preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col gap-6 p-7", inter.className)}>
        {/* Headline and description */}
        <div>
          <h3
            className={cn(
              "font-display text-[2rem] uppercase tracking-wide font-semibold",
              tier.badgeVariant === "popular" ? "text-gold-400" : "text-white",
              oswald.className,
            )}
          >
            {tier.name}
          </h3>
          <p className="mt-1 text-base text-my-pink">{tier.description}</p>
        </div>

        <fieldset className="flex flex-col gap-4">
          <legend className="sr-only">{tier.name} options</legend>
          {tier.options.map((option, index) => (
            <div key={option.name}>
              <label className="flex  items-start gap-3 border-b border-white/5 pb-4 last:border-none last:pb-0 cursor-pointer">
                <input
                  type="radio"
                  name={`${tier.id}-option`}
                  // defaultChecked={index === 0}
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
                  {/* Name and price */}
                  <span className="flex items-center justify-between gap-2">
                    {/* Name */}
                    <span className="text-base font-bold text-stone">
                      {option.name}
                    </span>
                    {/* Price */}
                    <span
                      className={cn(
                        "whitespace-nowrap text-sm font-semibold text-white",
                        oswald.className,
                      )}
                    >
                      {option.price} EGP
                    </span>
                  </span>
                  {/* Spec */}
                  <span className="text-xs text-dark-stone font-bold">
                    {option.spec}
                  </span>
                  {/* Sports Recommendations */}
                  <span
                    className={cn(
                      "text-[0.63rem] uppercase tracking-wide text-pricing-recommend font-semibold",
                      oswald.className,
                    )}
                  >
                    {option.recommended}
                  </span>
                  {index === chosenIndex.current &&
                    chosenTier === option.name && (
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
                          {Object.entries(addOns).map(([key, addon]) => (
                            <label
                              key={key}
                              className="flex items-start gap-3 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 accent-blaze-500 cursor-pointer"
                                onChange={(e) => {
                                  // Handle checkbox change here
                                  handleAddOnChange(
                                    key,
                                    addon,
                                    e.target.checked,
                                  );
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

                  {chosenTier === option.name && option.hasColorPicker && (
                    <div className="flex flex-col gap-0">
                      <span className="text-xs font-semibold uppercase tracking-wide text-steel-400 mb-1">
                        Choose Color
                      </span>
                      <div className="flex gap-2">
                        {AVAILABLE_COLORS.map((color) => (
                          <button
                            key={color}
                            id={color}
                            type="button"
                            aria-label={color}
                            onClick={() => setChosenColor(color)}
                            className={cn(
                              "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer",
                              COLOR_SWATCH[color],
                              chosenColor === color
                                ? "border border-black ring-2 ring-white scale-105"
                                : "border-white/50",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </span>
              </label>
            </div>
          ))}
        </fieldset>

        {!tier.hasColorPicker && (
          <p className="text-xs text-my-pink font-bold">
            Available colors:{" "}
            <span className="font-semibold text-gold-400">
              {AVAILABLE_COLORS.join(", ")}
            </span>
          </p>
        )}

        {tier.id === "corefit" ? (
          <Button
            // href={`https://wa.me/201505703992?text=${msg.current}`}
            href={`https://web.whatsapp.com/send?phone=201505703992&text=${msg}`} // this if Ziad wants web only but then u'll need to datect phones to handle phone application
            variant="solid"
            icon=<FontAwesomeIcon icon={fab.faWhatsapp} className="w-8" />
            className="mt-auto w-full bg-none! bg-emerald-600! shadow-none hover:bg-emerald-600!"
            disabled={msg.trim() == ""}
          >
            {tier.ctaLabel}
          </Button>
        ) : (
          <Button
            href={"/designer"}
            onClick={() => {
              sessionStorage.setItem("isBraces", "false");
              sessionStorage.setItem("selectedCategory", tier.id);
            }}
            variant={tier.ctaVariant === "solid" ? "solid" : tier.ctaVariant}
            className="mt-auto w-full"
            disabled={chosenTier == null || chosenTier == ""}
          >
            {tier.ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
