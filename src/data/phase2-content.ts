// These edition references are stated in the members' existing long reviews.
export const TESTIMONIAL_EDITIONS: Record<string, readonly string[]> = {
  "lohith-sai": ["04"],
  vennela: ["06"],
};

export const OFFICIAL_YOUTUBE_CHANNEL = "https://www.youtube.com/@BacktoBase_xyz";

export function getReviewCategories(role: string, longReview?: string): string[] {
  const categories = ["Community members"];
  if (/engineer|professional/i.test(role)) categories.push("Industry professionals");
  if (/content creator/i.test(role)) categories.push("Creators");
  if (/speaker at BacktoBase/i.test(longReview ?? "")) categories.push("Speaker voices");
  return categories;
}
