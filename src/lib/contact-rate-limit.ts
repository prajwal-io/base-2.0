import { createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let rateLimiter: Ratelimit | undefined;

function getRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Contact rate limiter is not configured.");

  rateLimiter ??= new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(20, "1 h"),
    prefix: "backtobase:contact",
    analytics: false,
  });

  return { rateLimiter, token };
}

export async function checkContactRateLimit(ip: string): Promise<boolean> {
  const { rateLimiter: limiter, token } = getRateLimiter();
  const identifier = createHmac("sha256", token).update(ip).digest("hex");
  const { success } = await limiter.limit(identifier);
  return success;
}
