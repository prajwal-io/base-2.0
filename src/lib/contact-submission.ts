import { createGmailComposeUrl, createMailtoComposeUrl } from "../data/contact";

export type ContactState =
  | { status: "idle" | "sent" }
  | { status: "error"; message: string; draftUrl?: string; mobileDraftUrl?: string }
  | { status: "draft"; draftUrl: string; mobileDraftUrl: string };

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

interface ContactSubmissionDependencies {
  getClientIp: () => Promise<string | null>;
  isDeliveryConfigured: () => boolean;
  checkRateLimit: (ip: string) => Promise<boolean>;
  sendEmail: (contact: ContactMessage) => Promise<boolean>;
}

export function createContactSubmission({
  getClientIp,
  isDeliveryConfigured,
  checkRateLimit,
  sendEmail,
}: ContactSubmissionDependencies) {
  return async (_previous: ContactState, form: FormData): Promise<ContactState> => {
    const field = (key: string) => {
      const value = form.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const name = field("name");
    const email = field("email");
    const message = field("message");
    if (field("website") || !name || name.length > 100 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message || message.length > 2000) {
      return { status: "error", message: "Check your name, email address and message, then try again." };
    }

    const subject = "Website inquiry — BacktoBase";
    const body = `Name: ${name}\nReply email: ${email}\n\n${message}`;
    const drafts = {
      draftUrl: createGmailComposeUrl(subject, body),
      mobileDraftUrl: createMailtoComposeUrl(subject, body),
    };
    if (!isDeliveryConfigured()) return { status: "draft", ...drafts };

    let ip: string | null;
    try {
      ip = await getClientIp();
      if (!ip) {
        return {
          status: "error",
          message: "Direct delivery is temporarily unavailable. Use the email draft instead.",
          ...drafts,
        };
      }
      if (!(await checkRateLimit(ip))) {
        return {
          status: "error",
          message: "Too many messages from this connection. Try again later or use the email draft.",
          ...drafts,
        };
      }
    } catch {
      return {
        status: "error",
        message: "Direct delivery is temporarily unavailable. Use the email draft instead.",
        ...drafts,
      };
    }

    try {
      if (await sendEmail({ name, email, message })) return { status: "sent" };
    } catch {
      // Offer the same message as a draft if direct delivery fails.
    }

    return {
      status: "error",
      message: "Your message could not be sent. Try again or open the email draft.",
      ...drafts,
    };
  };
}
