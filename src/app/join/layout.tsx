import type { Metadata } from "next";

const title = "Join BacktoBase — Hyderabad Community";
const description =
  "Join BacktoBase to attend an edition, volunteer, speak, or mentor with Hyderabad’s student and builder community.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/images/community-panoramic.jpg", alt: "BacktoBase community gathering" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/community-panoramic.jpg"],
  },
};

export default function JoinLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
