"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, CheckCircle2, Send, Sparkles } from "lucide-react";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    institution: "",
    interest: "attending",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instantaneous client-side form registration
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas-base">
      <Navbar />
      <main className="flex-grow py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          {submitted ? (
            <div className="rounded-3xl bg-white border border-border-subtle p-8 sm:p-12 text-center shadow-photo animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="font-display font-black text-3xl text-charcoal-950 uppercase tracking-tight mb-2">
                Welcome to BacktoBase!
              </h2>
              <p className="text-base text-charcoal-700 max-w-md mx-auto mb-6">
                Thank you for joining our community, <strong>{formData.name}</strong>. We have received your registration and will connect you with our Hyderabad cohort updates and next edition details.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/events"
                  className="px-6 py-2.5 rounded-full bg-brand-dark-pill text-white text-xs font-semibold hover:bg-brand-dark-pill-hover transition-colors"
                >
                  Explore Editions
                </Link>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-full bg-canvas-subtle border border-border-strong text-charcoal-900 text-xs font-semibold hover:bg-[#ECE4D8] transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-border-subtle p-8 sm:p-12 shadow-card">
              <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Join The Hyderabad Cohort</span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal-950 uppercase tracking-tight mb-3">
                Be A Part Of What's Next.
              </h1>
              <p className="text-sm text-charcoal-700 mb-8 font-normal leading-relaxed">
                Whether you want to attend upcoming editions, volunteer as an organizer, speak on stage, or mentor student talent — we welcome you!
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Yashwanth Bondapalli"
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      I am a...
                    </label>
                    <select
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                      College / Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. CBIT, EPAM, Microsoft"
                      className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    Primary Interest
                  </label>
                  <select
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-1.5">
                    What drives you to join BacktoBase?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're building or hoping to learn..."
                    className="w-full px-4 py-2.5 rounded-xl bg-canvas-subtle border border-border-strong text-charcoal-950 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white font-display font-extrabold text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
