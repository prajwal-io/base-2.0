"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitContact } from "@/app/contact-actions";
import type { ContactState } from "@/lib/contact-submission";
import { EmailDraftActions } from "./EmailDraftActions";

const initialState: ContactState = { status: "idle" };
const fieldClass = "mt-2 w-full rounded-xl border border-border-strong bg-white px-4 py-3 text-base text-charcoal-950 placeholder:text-charcoal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange";

export default function ContactForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState(submitContact, initialState);
  const sent = state.status === "sent";

  if (sent) return <p role="status" className="rounded-2xl border border-border-subtle bg-white p-8 text-center text-lg font-semibold text-charcoal-900">Thanks for reaching out. Your message was sent.</p>;

  return (
    <form action={action} aria-label="Contact BacktoBase" className={`grid gap-5 ${className ?? ""}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="contact-name" className="text-sm font-semibold text-charcoal-900">Full name
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} className={fieldClass} />
        </label>
        <label htmlFor="contact-email" className="text-sm font-semibold text-charcoal-900">Email address
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} />
        </label>
      </div>
      <label htmlFor="contact-category" className="text-sm font-semibold text-charcoal-900">What can we help with?
        <select id="contact-category" name="category" className={fieldClass}>
          <option value="general">General enquiries</option>
          <option value="community">Community support</option>
          <option value="mentor">Mentor enquiries</option>
          <option value="corporate">Corporate partnerships</option>
          <option value="institutional">Institutional collaborations</option>
        </select>
      </label>
      <label htmlFor="contact-message" className="text-sm font-semibold text-charcoal-900">Message
        <textarea id="contact-message" name="message" rows={5} required maxLength={2000} className={`${fieldClass} resize-y`} />
      </label>
      <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-orange-ink px-6 text-sm font-bold text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:opacity-60">
          {pending ? "Submitting…" : "Send enquiry"}<Send aria-hidden="true" className="size-4" />
        </button>
        {state.status === "draft" && <EmailDraftActions draftText={state.draftText} gmailUrl={state.draftUrl} mailtoUrl={state.mobileDraftUrl} />}
        {state.status === "error" && state.draftText && state.draftUrl && state.mobileDraftUrl && <EmailDraftActions draftText={state.draftText} gmailUrl={state.draftUrl} mailtoUrl={state.mobileDraftUrl} />}
      </div>
      <p role="status" aria-live="polite" className="text-sm leading-relaxed text-charcoal-700">
        {state.status === "idle" && "The form will send your enquiry when delivery is configured, or prepare an email draft for you to send."}
        {state.status === "draft" && "Your draft is ready. Open your email app and press Send to deliver your message."}
        {state.status === "error" && state.message}
      </p>
    </form>
  );
}
