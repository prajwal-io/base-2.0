import { createGmailComposeUrl, createMailtoComposeUrl } from "../data/contact";

const CONTACT_CATEGORIES = new Set(["general", "community", "mentor", "corporate", "institutional"]);
const CONTACT_CATEGORY_LABELS = {
  general: "General enquiry",
  community: "Community support",
  mentor: "Mentor enquiry",
  corporate: "Corporate partnership",
  institutional: "Institutional collaboration",
} as const;

export type ContactState =
  | { status: "idle" | "sent" }
  | { status: "error"; message: string; draftText?: string; draftUrl?: string; mobileDraftUrl?: string }
  | { status: "draft"; draftText: string; draftUrl: string; mobileDraftUrl: string };

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  category?: "general" | "community" | "mentor" | "corporate" | "institutional";
}

interface ContactSubmissionDependencies {
  getClientIp: () => Promise<string | null>;
  isDeliveryConfigured: () => boolean;
  checkRateLimit: (ip: string) => Promise<boolean>;
  sendEmail: (contact: ContactMessage) => Promise<boolean>;
  recordFailure?: (stage: "client_ip" | "rate_limit" | "email_delivery", error?: unknown) => void;
}

export function createContactSubmission({
  getClientIp,
  isDeliveryConfigured,
  checkRateLimit,
  sendEmail,
  recordFailure = () => {},
}: ContactSubmissionDependencies) {
  return async (_previous: ContactState, form: FormData): Promise<ContactState> => {
    const field = (key: string) => {
      const value = form.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const name = field("name");
    const email = field("email");
    const message = field("message");
    const rawCategory = field("category");
    if (field("website") || !name || name.length > 100 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message || message.length > 2000 || (rawCategory && !CONTACT_CATEGORIES.has(rawCategory))) {
      return { status: "error", message: "Check your name, email address and message, then try again." };
    }

    const category = rawCategory ? rawCategory as NonNullable<ContactMessage["category"]> : undefined;
    const categoryLabel = category && CONTACT_CATEGORY_LABELS[category];
    const subject = category && category !== "general"
      ? `Website inquiry — ${categoryLabel} — BacktoBase`
      : "Website inquiry — BacktoBase";
    const body = `${categoryLabel ? `Enquiry type: ${categoryLabel}\n` : ""}Name: ${name}\nReply email: ${email}\n\n${message}`;
    const drafts = {
      draftText: body,
      draftUrl: createGmailComposeUrl(subject),
      mobileDraftUrl: createMailtoComposeUrl(subject),
    };
    if (!isDeliveryConfigured()) return { status: "draft", ...drafts };

    let ip: string | null;
    try {
      ip = await getClientIp();
    } catch (error) {
      recordFailure("client_ip", error);
      return {
        status: "error",
        message: "Direct delivery is temporarily unavailable. Copy the email details, open an email draft, paste them in, then send it.",
        ...drafts,
      };
    }
    if (!ip) {
      recordFailure("client_ip");
      return {
        status: "error",
        message: "Direct delivery is temporarily unavailable. Copy the email details, open an email draft, paste them in, then send it.",
        ...drafts,
      };
    }

    try {
      if (!(await checkRateLimit(ip))) {
        return {
          status: "error",
          message: "Too many messages from this connection. Try again later, or copy the email details into an email draft, paste them in, then send it.",
          ...drafts,
        };
      }
    } catch (error) {
      recordFailure("rate_limit", error);
      return {
        status: "error",
        message: "Direct delivery is temporarily unavailable. Copy the email details, open an email draft, paste them in, then send it.",
        ...drafts,
      };
    }

    try {
      if (await sendEmail({ name, email, message, ...(category ? { category } : {}) })) return { status: "sent" };
      recordFailure("email_delivery");
    } catch (error) {
      recordFailure("email_delivery", error);
      // Offer the same message as a draft if direct delivery fails.
    }

    return {
      status: "error",
      message: "Your message could not be sent. Try again, or copy the email details into an email draft, paste them in, then send it.",
      ...drafts,
    };
  };
}
