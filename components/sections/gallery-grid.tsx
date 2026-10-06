"use client";

import { useMemo, useState } from "react";
import { CategoryPills } from "@/components/ui/category-pills";
import { GalleryCard } from "@/components/ui/gallery-card";
import { DESIGN_CATEGORIES } from "@/constants/gallery";
import { GALLERY_DESIGNS } from "@/assets/images/gallery/index";

export function GalleryGrid() {
  const [activeId, setActiveId] = useState("comic-based");

  const filtered = useMemo(
    () => GALLERY_DESIGNS.filter((d) => d.categoryId === activeId),
    [activeId],
  );

  const designs = filtered.length > 0 ? filtered : GALLERY_DESIGNS;

  return (
    <div className="flex flex-col gap-5">
      <CategoryPills
        categories={DESIGN_CATEGORIES}
        activeId={activeId}
        onChange={setActiveId}
      />

      {designs.length === 0 ? (
        <p className="text-center text-steel-400">
          No designs in this category yet — check back soon.
        </p>
      ) : (
        <div className="flex justify-center flex-wrap">
          {designs.map((design) => (
            <div key={design.id} className="lg:w-1/4 w-full p-3">
              <div>
                <GalleryCard design={design} className="text-left" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
