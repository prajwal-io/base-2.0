"use server";

import { headers } from "next/headers";
import { checkContactRateLimit } from "@/lib/contact-rate-limit";
import { createJoinSubmission, type JoinState } from "@/lib/join-submission";

const handleJoinSubmission = createJoinSubmission(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? checkContactRateLimit
    : undefined,
);

export async function prepareJoin(_previous: JoinState, form: FormData): Promise<JoinState> {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || null;
  return handleJoinSubmission(_previous, form, ip);
}
