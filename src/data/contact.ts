export const CONTACT_EMAIL = "backtobase2025@gmail.com";

export function createGmailComposeUrl(subject: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: subject,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function createMailtoComposeUrl(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export const PARTNER_CONTACT_URL = createGmailComposeUrl("Partnership inquiry — BacktoBase");
export const CONTACT_US_URL = createGmailComposeUrl("Contact BacktoBase");
export const PARTNER_CONTACT_MAILTO_URL = createMailtoComposeUrl("Partnership inquiry — BacktoBase");
export const CONTACT_US_MAILTO_URL = createMailtoComposeUrl("Contact BacktoBase");
