import type { Metadata } from "next";
import { Agentation } from "agentation";
import { SiteShell } from "@/components/layout/SiteShell";
import { inter, displayFont, footerSerifFont } from "./fonts";
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
      suppressHydrationWarning
      className={`${inter.variable} ${displayFont.variable} ${footerSerifFont.variable}`}
    >
      <body className="paper-bg text-charcoal-900 font-sans antialiased selection:bg-brand-amber-light selection:text-amber-900">
        <SiteShell>{children}</SiteShell>
        {process.env.NODE_ENV === "development" && (
          <Agentation endpoint="http://localhost:4747" />
        )}
      </body>
    </html>
  );
}
