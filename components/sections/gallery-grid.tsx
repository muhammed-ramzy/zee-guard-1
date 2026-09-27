"use client";

import { useMemo, useState } from "react";
import { CategoryPills } from "@/components/ui/category-pills";
import { GalleryCard } from "@/components/ui/gallery-card";
import { DESIGN_CATEGORIES } from "@/constants/gallery";
import { GALLERY_DESIGNS } from "@/assets/images/gallery/index";

export function GalleryGrid() {
  const [activeId, setActiveId] = useState("dragons");

  const filtered = useMemo(
    () => GALLERY_DESIGNS.filter((d) => d.categoryId === activeId),
    [activeId],
  );

  const designs = filtered.length > 0 ? filtered : GALLERY_DESIGNS;
  const [featured, ...rest] = designs;

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
        // this code is for the one big item on the right and two on the left but if opened you need to edit the designs map at the bottome
        // <div className="flex flex-col lg:flex-row justify-center">
        //   {/* Featured */}
        //   {featured && (
        //     <div className="h-80 md:h-120 pb-3 pt-5 pl-6 pr-3 lg:h-174 lg:flex-2 lg:pb-3 lg:pt-5 lg:pl-3">
        //       <GalleryCard design={featured} className="h-full" />
        //     </div>
        //   )}

        //   {/* First two side cards */}
        //   <div className="flex flex-col lg:flex-1 pb-3 pt-5 pl-6 pr-3 gap-y-6">
        //     {rest.slice(0, 2).map((design) => (
        //       <div key={design.id} className="h-80 md:h-120">
        //         <GalleryCard  design={design} className="h-full" />
        //       </div>
        //     ))}
        //   </div>
        // </div>
        <div className="flex justify-center flex-wrap">
          {designs.map((design) => (
            <div key={design.id} className="lg:w-1/3 w-full p-3">
              <div>
                <GalleryCard design={design} className="h-100 text-left" />
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );

  // GRID VERSION
  // return (
  //   <div className="flex flex-col gap-10">
  //     <CategoryPills
  //       categories={DESIGN_CATEGORIES}
  //       activeId={activeId}
  //       onChange={setActiveId}
  //     />

  //     {designs.length === 0 ? (
  //       <p className="text-center text-steel-400">
  //         No designs in this category yet — check back soon.
  //       </p>
  //     ) : (
  //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 ">
  //         {featured && (
  //           <GalleryCard
  //             design={featured}
  //             className="lg:col-span-2"
  //             imageHeightClass="h-72 lg:h-full lg:min-h-[500px]"
  //           />
  //         )}
  //         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 self-start  lg:grid-cols-1 grid-rows-1">
  //           {rest.slice(0, 2).map((design) => (
  //             <GalleryCard key={design.id} design={design} imageHeightClass="h-80" />
  //           ))}
  //         </div>
  //         {rest.slice(2).length > 0 && (
  //           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
  //             {rest.slice(2).map((design) => (
  //               <GalleryCard key={design.id} design={design} imageHeightClass="h-80" />
  //             ))}
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
}
