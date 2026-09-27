import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { fontVariables } from './fonts';
import "./globals.css";
import ScrollToTopButton from "@/components/ui/up-button";


export const metadata: Metadata = {
  title: {
    default: "ZeeGuard",
    template: "%s | ZeeGuard",
  },
  description:
    "Dentist-made custom-fit mouthguards trusted by national-level athletes in Karate, MMA, Boxing and Kickboxing.",
  openGraph: {
    title: "ZeeGuard | Custom Protection for Elite Fighters",
    description:
      "Dentist-made custom-fit mouthguards trusted by national-level athletes in Karate, MMA, Boxing and Kickboxing.",
    siteName: "ZeeGuard",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
          </main>
        <ScrollToTopButton/>
        <Footer />
      </body>
    </html>
  );
}
