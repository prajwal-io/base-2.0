import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BacktoBase — Students, Builders, Creators, Founders & Professionals",
  description:
    "A student-driven community to learn, build, share, and grow together — from campuses to the real world. Founded by Yashwanth Bondapalli in Hyderabad.",
  keywords: [
    "BacktoBase",
    "Student Community",
    "Hyderabad Tech",
    "Founders",
    "AI",
    "Yashwanth Bondapalli",
    "Events",
  ],
  openGraph: {
    title: "BacktoBase Community",
    description: "A student-driven community to learn, build, share, and grow together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="paper-bg text-charcoal-900 font-sans antialiased selection:bg-brand-amber-light selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
