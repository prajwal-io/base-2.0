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

export const PARTNER_CONTACT_URL = createGmailComposeUrl("Partnership inquiry — BacktoBase");
export const CONTACT_US_URL = createGmailComposeUrl("Contact BacktoBase");

export interface JoinApplication {
  name: string;
  email: string;
  role: string;
  institution: string;
  interest: string;
  message: string;
}

export function createApplicationGmailUrl(application: JoinApplication): string {
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
    `Name: ${application.name.trim()}`,
    `Email: ${application.email.trim()}`,
    `Role: ${roles[application.role] ?? application.role}`,
    `College / company: ${application.institution.trim() || "Not provided"}`,
    `Primary interest: ${interests[application.interest] ?? application.interest}`,
    "",
    "What I would like to share:",
    application.message.trim() || "Not provided",
  ].join("\n");

  return createGmailComposeUrl(`Community application from ${subjectName}`, body);
}
