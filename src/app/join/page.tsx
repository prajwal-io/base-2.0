"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { CONTACT_EMAIL, createApplicationGmailUrl } from "@/data/contact";

const labelClassName = "block text-[11px] font-bold uppercase tracking-[0.12em] text-charcoal-700";
const controlClassName =
  "mt-1.5 min-h-12 w-full rounded-xl border border-border-strong bg-canvas-subtle px-4 text-base text-charcoal-950 placeholder:text-charcoal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange-ink sm:text-sm";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    institution: "",
    interest: "attending",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.assign(createApplicationGmailUrl(formData));
  };

  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main id="main-content" tabIndex={-1} className="flex-grow py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-charcoal-700 transition-colors hover:text-brand-orange-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange-ink focus-visible:ring-offset-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Home
          </Link>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-12">
            <section aria-labelledby="join-title" className="lg:sticky lg:top-28">
              <h1
                id="join-title"
                className="max-w-xl font-display text-4xl font-black uppercase leading-[0.98] tracking-[-0.03em] text-charcoal-950 sm:text-5xl lg:text-[3.25rem]"
              >
                Be a part of <span className="text-brand-orange-ink">what&apos;s next.</span>
              </h1>
              <p className="mt-5 max-w-[52ch] text-base leading-7 text-charcoal-700">
                Join us to attend an edition, volunteer, speak, or mentor. BacktoBase brings students,
                builders, creators, founders, and professionals together to learn and share what they know.
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-charcoal-800">
                {["Attend an edition", "Volunteer", "Speak or partner"].map((way) => (
                  <li key={way} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
                    {way}
                  </li>
                ))}
              </ul>

              <figure className="mt-7 overflow-hidden rounded-2xl">
                <Image
                  src="/images/editions/07/photo.png"
                  alt="BacktoBase members gathered together at an edition"
                  width={1531}
                  height={862}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  priority
                  className="aspect-[2.4/1] w-full object-cover object-center sm:aspect-[16/9]"
                />
                <figcaption className="mt-2 text-xs text-charcoal-600">A BacktoBase community gathering</figcaption>
              </figure>
            </section>

            <section
              aria-labelledby="application-title"
              className="rounded-2xl border border-border-subtle bg-white p-5 sm:p-7 lg:p-8"
            >
              <header className="mb-6">
                <h2 id="application-title" className="font-display text-2xl font-extrabold text-charcoal-950">
                  Tell us about you
                </h2>
                <p className="mt-2 text-sm leading-6 text-charcoal-700">
                  Choose a starting point and share anything you&apos;d like us to know.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="join-name" className={labelClassName}>
                      Full name <span aria-hidden="true" className="text-brand-orange-ink">*</span>
                    </label>
                    <input
                      id="join-name"
                      type="text"
                      autoComplete="name"
                      required
                      pattern=".*\S.*"
                      title="Enter at least one non-space character."
                      maxLength={120}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Yashwanth Bondapalli"
                      className={controlClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="join-email" className={labelClassName}>
                      Email address <span aria-hidden="true" className="text-brand-orange-ink">*</span>
                    </label>
                    <input
                      id="join-email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className={controlClassName}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="join-role" className={labelClassName}>
                      What best describes you?
                    </label>
                    <select
                      id="join-role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className={controlClassName}
                    >
                      <option value="student">Student / Campus Learner</option>
                      <option value="developer">Software Engineer / Builder</option>
                      <option value="founder">Founder / Co-Founder</option>
                      <option value="creator">Content Creator / Strategist</option>
                      <option value="mentor">Working Professional / Mentor</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="join-institution" className={labelClassName}>
                      College / company name
                    </label>
                    <input
                      id="join-institution"
                      type="text"
                      autoComplete="organization"
                      maxLength={160}
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. CBIT, EPAM, Microsoft"
                      className={controlClassName}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="join-interest" className={labelClassName}>
                    Primary interest
                  </label>
                  <select
                    id="join-interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className={controlClassName}
                  >
                    <option value="attending">Attending Upcoming Editions</option>
                    <option value="volunteering">Volunteering / Organizing Crew</option>
                    <option value="speaking">Proposing a Stage Talk or Panel</option>
                    <option value="partnering">Venue or Community Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="join-message" className={labelClassName}>
                    What drives you to join BacktoBase?
                  </label>
                  <textarea
                    id="join-message"
                    rows={4}
                    maxLength={3000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're building or hoping to learn..."
                    className={`${controlClassName} min-h-32 resize-y py-3`}
                  />
                </div>

                <button
                  type="submit"
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-orange-ink px-5 py-3 font-display text-sm font-extrabold tracking-wide text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange-ink focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  Continue in Gmail
                  <Send aria-hidden="true" className="size-4" />
                </button>

                <p className="text-center text-xs leading-relaxed text-charcoal-700">
                  Your answers open in a Gmail draft. Nothing is sent until you review and send it. For help, email{" "}
                  <a
                    className="break-words font-semibold text-charcoal-900 underline underline-offset-2 decoration-brand-orange-ink/60"
                    href={`mailto:${CONTACT_EMAIL}`}
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
