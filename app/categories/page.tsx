import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { PageHeader } from "@/components/sections/page-header";
import { PricingCard } from "@/components/ui/pricing-card";
import { BracesCard } from "@/components/ui/braces-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import {
  CORE_TIERS,
  UPPER_JAW_OPTIONS,
  LOWER_JAW_OPTIONS,
  ADD_ONS
} from "@/constants/pricing";
import { CustomizeGuardButton } from "@/components/ui/CustomizeGuardButton";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Precision engineered dental protection. From training essentials to professional grade armor, find the ZeeGuard tier that fits your game.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Choose Your <span className="text-blaze-500">Protection Level</span>
          </>
        }
        subtitle="Precision engineered dental protection. From training essentials to professional grade armor, find the tier that fits your game."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CORE_TIERS.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                highlighted={tier.badgeVariant === "popular"}
                addOns = {ADD_ONS}
              />
            ))}
          </div>
        </Container>
      </Section>


      {/* Braces */}
      <Section tone="raised">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            title="Braces Protection Series"
            subtitle="Special protection for braces with the possibility of making a lower jaw."
          />

          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <BracesCard
              badge="ELITE BRACES"
              badgeTone="blaze"
              heading="Upper Jaw"
              description="Special protection for braces with the possibility of making a lower jaw guard."
              options={UPPER_JAW_OPTIONS}
              image="/images/braces-upper.svg"
              imageAlt="Elite braces upper jaw mouthguard with custom name text"
              direction="left"
              addOns = {ADD_ONS}
              />
            <BracesCard
              badge="COREFIT BRACES"
              badgeTone="gray"
              heading="Lower Jaw (If Needed)"
              description="Affordable orthodontic protection."
              options={LOWER_JAW_OPTIONS}
              image="/images/braces-lower.svg"
              imageAlt="CoreFit braces lower jaw mouthguard with custom name text"
              direction="right"
              addOns = {ADD_ONS}
              isLower = {true}
            />
          </div>

          <div className="flex justify-center">
            {/* <Button href="/designer">
              Customize your mouthguard
            </Button> */}
            <CustomizeGuardButton/>
          </div>
        </Container>
      </Section>

      <CtaBanner showInstagram={false} />
    </>
  );
}
