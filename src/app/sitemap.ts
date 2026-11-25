import type { MetadataRoute } from "next";
import { TESTIMONIALS } from "@/data/communityData";
import { siteUrl } from "@/lib/site-url";

const publicPaths = ["/", "/about", "/community", "/events", "/founder", "/join"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...publicPaths, ...TESTIMONIALS.map(({ slug }) => `/testimonials/${slug}`)].map(
    (path) => ({ url: new URL(path, siteUrl).toString() }),
  );
}
