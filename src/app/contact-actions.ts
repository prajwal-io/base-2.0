"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/data/contact";
import { checkContactRateLimit } from "@/lib/contact-rate-limit";
import { createContactSubmission, type ContactMessage, type ContactState } from "@/lib/contact-submission";

const sendContactEmail = async ({ name, email, message }: ContactMessage) => {
  const user = process.env.CONTACT_SMTP_USER || CONTACT_EMAIL;
  const pass = process.env.CONTACT_SMTP_APP_PASSWORD?.replace(/\s/g, "");
  if (!pass) return false;

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
  const receipt = await transport.sendMail({
    from: { name: "BacktoBase website", address: user },
    to: CONTACT_EMAIL,
    replyTo: { name, address: email },
    subject: "Website inquiry — BacktoBase",
    text: `Name: ${name}\nReply email: ${email}\n\n${message}`,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  return receipt.accepted.length > 0;
};

const handleContactSubmission = createContactSubmission({
  getClientIp: async () => {
    const requestHeaders = await headers();
    const forwardedIp = requestHeaders.get("x-vercel-forwarded-for");
    return forwardedIp?.split(",")[0]?.trim() || null;
  },
  isDeliveryConfigured: () => Boolean(process.env.CONTACT_SMTP_APP_PASSWORD?.trim()),
  checkRateLimit: checkContactRateLimit,
  sendEmail: sendContactEmail,
});

export async function submitContact(previous: ContactState, form: FormData): Promise<ContactState> {
  return handleContactSubmission(previous, form);
}
