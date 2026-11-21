import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { inter, displayFont, footerDisplayFont, footerSerifFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
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
    images: [{ url: "/images/community-panoramic.jpg", alt: "BacktoBase community gathering" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/community-panoramic.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${displayFont.variable} ${footerDisplayFont.variable} ${footerSerifFont.variable}`}
    >
      <body className="paper-bg text-charcoal-900 font-sans antialiased selection:bg-brand-amber-light selection:text-amber-900">
        <MotionConfig reducedMotion="user">
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {children}
          </div>
        </MotionConfig>
      </body>
    </html>
  );
}
