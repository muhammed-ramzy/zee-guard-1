"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { CategoryPills } from "@/components/ui/category-pills";
import { GalleryCard } from "@/components/ui/gallery-card";
import { Button } from "@/components/ui/button";
import { DESIGN_CATEGORIES } from "@/constants/gallery";
import { useMemo, useState } from "react";
import { GALLERY_DESIGNS } from "@/assets/images/gallery/index";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function CategoryPreview() {
  const [activeId, setActiveId] = useState("dragons");

  const filtered = useMemo(
    () => GALLERY_DESIGNS.filter((d) => d.categoryId === activeId),
    [activeId],
  );

  const designs = filtered.length > 0 ? filtered : GALLERY_DESIGNS;

  const preview = designs.slice(0, 4);

  return (
    <Section tone="raised">
      <Container className="flex flex-col items-center gap-10 ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full"
        >
          <SectionHeading title="Explore Design Categories" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="w-full"
        >
          <CategoryPills
            onChange={setActiveId}
            categories={DESIGN_CATEGORIES}
            activeId={activeId}
          />
        </motion.div>

        <div className="flex w-full flex-wrap justify-center">
          {preview.map((design, index) => (
            <motion.div
              className="w-full py-4 lg:w-1/4 lg:px-2"
              key={design.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08,
              }}
            >
              <GalleryCard design={design} className="h-80 lg:h-65" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
        >
          <Button href="/gallery">Explore More Designs</Button>
        </motion.div>
      </Container>
    </Section>
  );
}
