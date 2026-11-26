export const CONTACT_EMAIL = "backtobase2025@gmail.com";

export function createGmailComposeUrl(subject: string, body = ""): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function createMailtoComposeUrl(subject: string, body = ""): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const PARTNER_CONTACT_URL = createGmailComposeUrl("Partnership inquiry — BacktoBase");
export const CONTACT_US_URL = createGmailComposeUrl("Contact BacktoBase");
export const PARTNER_CONTACT_MAILTO_URL = createMailtoComposeUrl("Partnership inquiry — BacktoBase");
export const CONTACT_US_MAILTO_URL = createMailtoComposeUrl("Contact BacktoBase");

export interface JoinApplication {
  name: string;
  email: string;
  role: string;
  institution: string;
  interest: string;
  message: string;
}

function createApplicationDraft(application: JoinApplication) {
  const subjectName = application.name.replace(/[\r\n]+/g, " ").trim();
  const roles: Record<string, string> = {
    student: "Student / Campus Learner",
    developer: "Software Engineer / Builder",
    founder: "Founder / Co-Founder",
    creator: "Content Creator / Strategist",
    mentor: "Working Professional / Mentor",
  };
  const interests: Record<string, string> = {
    attending: "Attending Upcoming Editions",
    volunteering: "Volunteering / Organizing Crew",
    speaking: "Proposing a Stage Talk or Panel",
    partnering: "Venue or Community Partnership",
  };
  const body = [
    "BacktoBase community application",
    "",
    `Name: ${subjectName}`,
    `Email: ${application.email.trim()}`,
    `Role: ${roles[application.role] ?? application.role}`,
    `College / company: ${application.institution.trim() || "Not provided"}`,
    `Primary interest: ${interests[application.interest] ?? application.interest}`,
    "",
    "What I would like to share:",
    application.message.trim() || "Not provided",
  ].join("\n");

  return { subject: `Community application from ${subjectName}`, body };
}

export function createApplicationGmailUrl(application: JoinApplication): string {
  const { subject, body } = createApplicationDraft(application);
  return createGmailComposeUrl(subject, body);
}

export function createApplicationMailtoUrl(application: JoinApplication): string {
  const { subject, body } = createApplicationDraft(application);
  return createMailtoComposeUrl(subject, body);
}
