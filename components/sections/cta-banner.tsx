import { Instagram } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { inter, oswald } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Span } from "next/dist/trace";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  showInstagram?: boolean;
}

export function CtaBanner({
  title = "Ready to Protect Your Smile?",
  subtitle = "Join the elite athletes who trust ZeeGuard for ultimate protection and performance.",
}: CtaBannerProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2
          className={cn(
            "font-display md:text-7xl uppercase text-stone text-4xl text-balance font-bold  tracking-tight",
            oswald.className,
          )}
        >
          {title}
        </h2>
        <p className={cn("text-balance text-my-pink", inter.className)}>
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button>Create My Own Design</Button>

            <Button
              href="https://wa.me/201124081447"
              variant="outline-white"
              icon={
                <span className="w-7 text-[#25D366]">
                  <FontAwesomeIcon icon={fab.faWhatsapp} />
                </span>
              }
            >
              Message Us on WhatsApp
            </Button>
       
        </div>
      </Container>
    </Section>
  );
}
