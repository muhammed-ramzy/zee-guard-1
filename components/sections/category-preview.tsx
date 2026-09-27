'use client'

import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { CategoryPills } from "@/components/ui/category-pills";
import { GalleryCard } from "@/components/ui/gallery-card";
import { Button } from "@/components/ui/button";
import { DESIGN_CATEGORIES } from "@/constants/gallery";
import { useMemo, useState } from "react";
import {GALLERY_DESIGNS} from "@/assets/images/gallery/index"

export function CategoryPreview() {
  
  const [activeId, setActiveId] = useState("dragons");
  
  const filtered = useMemo(
    () => GALLERY_DESIGNS.filter((d) => d.categoryId === activeId),
    [activeId]
  );

  const designs = filtered.length > 0 ? filtered : GALLERY_DESIGNS;
  
  const preview = designs.slice(0, 4);

  return (
    <Section tone="raised">
      <Container className="flex flex-col items-center gap-10 ">
        <SectionHeading title="Explore Design Categories" />

        <CategoryPills  onChange={setActiveId} categories={DESIGN_CATEGORIES} activeId={activeId} />

        {/* grid w-full grid-cols-2 gap-4 md:grid-cols-4 */}
        <div className="flex justify-center flex-wrap w-full">

          {preview.map((design) => (
          <div className="w-full lg:w-1/4 lg:px-2 py-4" key={design.id}>
            <GalleryCard  design={design} className="lg:h-65 h-80" />
          </div>
          ))}
        </div>

        <Button href="/gallery">Explore More Designs</Button>
      </Container>
    </Section>
  );
}
