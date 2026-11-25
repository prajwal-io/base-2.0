import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero Preview — BacktoBase",
  robots: { index: false, follow: false },
};

export default function HeroPreviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
