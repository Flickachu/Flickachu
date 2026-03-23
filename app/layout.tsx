import "./globals.css";
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  Great_Vibes,
} from "next/font/google";

import SmoothScrollProvider from "@/components/SmoothScrollProvider";

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

export const metadata = {
  title: "Flickachu",
  description: "Luxury interiors & furniture studio",
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
      <body className="bg-[#f6f3ee] text-[#1a1a1a] antialiased font-sans">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}