import type { Metadata } from "next";
import Image from "next/image";
import clinic from "@/assets/images/clinic.webp"
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ContactMethodCard } from "@/components/ui/contact-method-card";
import { LabLocationCard } from "@/components/ui/lab-location-card";
import { CONTACT_METHODS, LAB_LOCATIONS } from "@/constants/contact";
import { PageHeader } from "@/components/sections/page-header";
import { cn } from "@/lib/utils";
import { inter, oswald } from "../fonts";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Connect with the ZeeGuard performance lab to start your custom mouthguard fitting process today.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <PageHeader
            title="Let's Build Your Perfect Mouthguard"
            subtitle="Precision engineering meets elite combat protection. Connect with our lab to
                        start your custom fitting process today."
            eyebrow="Elite Performance Gear"
          />
        </Container>
      </Section>

      <Section className="pt-0!">
        <Container className="flex justify-center flex-wrap gap-5 ">
          {CONTACT_METHODS.map((method) => (
            <ContactMethodCard
              key={method.title}
              method={method}
              icon={method.icon}
            />
          ))}
        </Container>
      </Section>

      <Section className="pt-0!">
        <Container className="flex justify-center">
          <Button >Create My Own Design</Button>
        </Container>
      </Section>

      <Section tone="raised">
        <Container className="">
          {/* <div className="flex flex-col gap-6">
            <h2 className="font-display text-2xl uppercase tracking-wide text-white">
              Send a Message
            </h2>
            <ContactForm />
          </div> */}

          <div className="flex gap-6">
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 py-22">
            <div className="bg-linear-to-t  from-black/85 to-black/40 from-50% h-full absolute inset-0 z-9">

            </div>
              <Image
                src={clinic}
                alt="ZeeGuard performance lab and studio interior"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover z-8"
              />
              <div className={cn("relative z-10 flex flex-col lg:p-6 w-11/12 m-auto", inter.className)}>
                <h2 className={cn("font-display text-[2rem] font-semibold uppercase tracking-wide text-white mb-4", oswald.className)}>
                  Performance Lab &amp; Studio
                </h2>
                <div className="flex  flex-wrap justify-evenly items-center w-full m-auto rounded-2xl overflow-hidden bg-ink-900/80 gap-2">
                  {LAB_LOCATIONS.map((location, i) => (
                    <LabLocationCard
                      key={`${location.name}-${i}`}
                      location={location}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
