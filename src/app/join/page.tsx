"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { CONTACT_EMAIL, createApplicationGmailUrl } from "@/data/contact";

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
      <main className="flex-grow py-10 sm:py-16">
        <div className="relative isolate mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

            <div className="rounded-3xl bg-white border border-border-subtle p-8 sm:p-12 shadow-card">
              <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Join the Hyderabad community</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight mb-3">
                Be a part of what&apos;s next.
              </h1>
              <p className="text-sm text-charcoal-700 mb-8 font-normal leading-relaxed">
                Join us to attend an edition, volunteer, speak, or mentor. BacktoBase brings students, builders, creators, founders, and professionals together to learn and share what they know.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="join-name" className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="join-name"
                      type="text"
                      required
                      maxLength={120}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Yashwanth Bondapalli"
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="join-email" className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="join-email"
                      type="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="join-role" className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      What best describes you?
                    </label>
                    <select
                      id="join-role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    >
                      <option value="student">Student / Campus Learner</option>
                      <option value="developer">Software Engineer / Builder</option>
                      <option value="founder">Founder / Co-Founder</option>
                      <option value="creator">Content Creator / Strategist</option>
                      <option value="mentor">Working Professional / Mentor</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="join-institution" className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      College / Company Name
                    </label>
                    <input
                      id="join-institution"
                      type="text"
                      maxLength={160}
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. CBIT, EPAM, Microsoft"
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="join-interest" className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    Primary Interest
                  </label>
                  <select
                    id="join-interest"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                  >
                    <option value="attending">Attending Upcoming Editions</option>
                    <option value="volunteering">Volunteering / Organizing Crew</option>
                    <option value="speaking">Proposing a Stage Talk or Panel</option>
                    <option value="partnering">Venue or Community Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="join-message" className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    What drives you to join BacktoBase?
                  </label>
                  <textarea
                    id="join-message"
                    rows={3}
                    maxLength={3000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're building or hoping to learn..."
                    className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                  />
                </div>

                <button
                  type="submit"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-4 font-display text-sm font-extrabold tracking-wide text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                >
                  <span>Continue in Gmail</span>
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
                <p className="text-center text-xs leading-relaxed text-charcoal-600">
                  This opens a Gmail draft addressed to <a className="font-semibold text-charcoal-800 underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Review the details and send the email to reach the BacktoBase team.
                </p>
              </form>
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
