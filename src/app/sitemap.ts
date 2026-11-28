import type { MetadataRoute } from "next";
import { EDITIONS, TESTIMONIALS } from "@/data/communityData";
import { siteUrl } from "@/lib/site-url";

const publicPaths = [
  "/", "/about", "/community", "/contact", "/connect", "/editions", "/events",
  "/founder", "/highlights", "/reviews", "/videos",
  ...EDITIONS.map(({ editionNumber }) => `/editions/${editionNumber}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...publicPaths, ...TESTIMONIALS.map(({ slug }) => `/testimonials/${slug}`)].map(
    (path) => ({ url: new URL(path, siteUrl).toString() }),
  );
}
