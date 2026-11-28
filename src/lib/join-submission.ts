import { createGmailComposeUrl, createMailtoComposeUrl } from "../data/contact";

export type JoinState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "draft"; draftText: string; gmailUrl: string; mailtoUrl: string };

const allowedInterests = new Set(["events", "mentoring", "building", "volunteering", "partnerships"]);
const interestLabels: Record<string, string> = {
  events: "Attend community events",
  mentoring: "Mentor or share experience",
  building: "Build with the community",
  volunteering: "Volunteer",
  partnerships: "Explore a partnership",
} as const;

export function createJoinSubmission(checkRateLimit?: (ip: string) => Promise<boolean>) {
  return async (_previous: JoinState, form: FormData, ip?: string | null): Promise<JoinState> => {
    const field = (key: string) => {
      const value = form.get(key);
      return typeof value === "string" ? value.trim() : "";
    };
    const name = field("name").replace(/[\r\n]+/g, " ");
    const email = field("email");
    const role = field("role");
    const interests = form.getAll("interests").filter(
      (value): value is string => typeof value === "string" && allowedInterests.has(value),
    );

    if (field("website") || !name || name.length > 120 || role.length > 120 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || interests.length > 5) {
      return { status: "error", message: "Check your name and email address, then try again." };
    }

    if (checkRateLimit) {
      if (!ip) return { status: "error", message: "Registration could not be prepared. Please try again later." };
      try {
        if (!(await checkRateLimit(ip))) {
          return { status: "error", message: "Too many requests from this connection. Try again later." };
        }
      } catch {
        return { status: "error", message: "Registration could not be prepared. Please try again later." };
      }
    }

    const subject = "BacktoBase community application";
    const body = [
      "BacktoBase community application",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Profession or current role: ${role || "Not provided"}`,
      `Areas of interest: ${interests.length ? interests.map((interest) => interestLabels[interest]).join(", ") : "Not provided"}`,
    ].join("\n");

    return {
      status: "draft",
      draftText: body,
      gmailUrl: createGmailComposeUrl(subject),
      mailtoUrl: createMailtoComposeUrl(subject),
    };
  };
}
