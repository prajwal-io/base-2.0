import { Bricolage_Grotesque, Fraunces, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const footerSerifFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-footer-serif",
  display: "swap",
  weight: ["600", "700"],
});
