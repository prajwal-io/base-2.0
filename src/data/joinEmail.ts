export type JoinApplication = {
  name: string;
  email: string;
  role: string;
  institution: string;
  interest: string;
  message: string;
};

export function createJoinEmailHref(application: JoinApplication) {
  const body = [
    `Name: ${application.name}`,
    `Email: ${application.email}`,
    `Role: ${application.role}`,
    `College / Company: ${application.institution}`,
    `Interest: ${application.interest}`,
    `Message: ${application.message}`,
  ].join("\n");
  const params = new URLSearchParams({
    subject: `BacktoBase application from ${application.name}`,
    body,
  });

  return `mailto:backtobase2025@gmail.com?${params.toString()}`;
}
