import { createGmailComposeUrl } from "../data/contact";

export type ContactState =
  | { status: "idle" | "sent" }
  | { status: "error"; message: string; draftUrl?: string }
  | { status: "draft"; draftUrl: string };

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
    const draftUrl = createGmailComposeUrl(subject, body);
    if (!isDeliveryConfigured()) return { status: "draft", draftUrl };

    let ip: string | null;
    try {
      ip = await getClientIp();
      if (!ip) {
        return {
          status: "error",
          message: "Direct delivery is temporarily unavailable. Use the Gmail draft instead.",
          draftUrl,
        };
      }
      if (!(await checkRateLimit(ip))) {
        return {
          status: "error",
          message: "Too many messages from this connection. Try again later or use the Gmail draft.",
          draftUrl,
        };
      }
    } catch {
      return {
        status: "error",
        message: "Direct delivery is temporarily unavailable. Use the Gmail draft instead.",
        draftUrl,
      };
    }

    try {
      if (await sendEmail({ name, email, message })) return { status: "sent" };
    } catch {
      // Offer the same message as a draft if direct delivery fails.
    }

    return {
      status: "error",
      message: "Your message could not be sent. Try again or open it in Gmail.",
      draftUrl,
    };
  };
}
