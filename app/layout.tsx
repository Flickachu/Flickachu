import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  Great_Vibes,
} from "next/font/google";
import ChatWidget from "./components/ChatWidget";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import { SanityLive } from "@/sanity/lib/live";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cursive",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Laminate Gallery",
  description: "Luxury interiors and bespoke furniture studio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} ${vibes.variable}`}
    >
      <body className="bg-[#f6f3ee] text-[#1a1a1a] antialiased font-sans selection:bg-[#a27725] selection:text-white">

        <Suspense fallback={null}>
          <SmoothScrollProvider>
            <Navbar />
            {children}
            <Footer />
            <BackToTop />
            <ChatWidget />
            <SanityLive />
          </SmoothScrollProvider>
        </Suspense>

      </body>
    </html>
  );
}
