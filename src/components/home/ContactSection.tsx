"use client";

import { useActionState, useRef, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { useInView } from "framer-motion";
import { submitContact } from "@/app/contact-actions";
import { ContactIllustration } from "@/components/home/ContactIllustration";
import { CONTACT_EMAIL, CONTACT_US_URL } from "@/data/contact";
import type { ContactState } from "@/lib/contact-submission";

const initialState: ContactState = { status: "idle" };
const fieldStyle = "mt-2 w-full rounded-xl border border-border-strong bg-canvas-base px-3.5 py-2.5 text-base font-normal text-charcoal-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-orange";

export function ContactSection() {
  const [state, submit, pending] = useActionState(submitContact, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.12 });
  const sent = state.status === "sent";
  const draft = "draftUrl" in state ? state.draftUrl : undefined;

  return (
    <section ref={sectionRef} id="contact-us" aria-labelledby="contact-title" data-visible={sectionInView} className="contact-section scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl border border-border-subtle bg-[#f3e9db] p-5 sm:gap-10 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div className="min-w-0">
          <ContactIllustration visible={sectionInView} sent={sent} titleId="contact-title" />
          <div className="mx-auto mt-6 max-w-sm text-center">
            <p className="text-sm leading-relaxed text-charcoal-700 sm:text-base">Have a question, an idea, or a partnership in mind? We’d love to hear from you.</p>
            <a href={CONTACT_US_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 max-w-full items-center gap-1 text-sm font-semibold text-[#803b21] underline underline-offset-4">
              <span className="break-all">{CONTACT_EMAIL}</span><ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="contact-form-card min-w-0 rounded-2xl border border-border-subtle bg-white p-4 sm:p-7">
          {sent ? (
            <p role="status" className="py-10 text-center text-lg font-semibold text-[#243d3b]">Thanks for reaching out. Your message was sent.</p>
          ) : (
            <form action={submit} className="grid gap-4" aria-label="Contact BacktoBase">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="min-w-0 text-sm font-semibold text-charcoal-900">
                  Name
                  <input name="name" autoComplete="name" required maxLength={100} className={fieldStyle} value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label className="min-w-0 text-sm font-semibold text-charcoal-900">
                  Email
                  <input name="email" type="email" autoComplete="email" required maxLength={254} className={fieldStyle} value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
              </div>
              <label className="text-sm font-semibold text-charcoal-900">
                Message
                <textarea name="message" required maxLength={2000} rows={5} className={fieldStyle} value={message} onChange={(event) => setMessage(event.target.value)} />
              </label>
              <div hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <button type="submit" disabled={pending} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#243d3b] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#36534e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70">
                  {pending ? "Submitting…" : "Submit message"}
                  <Send className="size-4" aria-hidden="true" />
                </button>
                {draft && (
                  <a href={draft} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#803b21] underline underline-offset-4">
                    Open Gmail draft <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
              <div role="status" className="text-sm leading-relaxed text-charcoal-700">
                {state.status === "error" && state.message}
                {state.status === "draft" && "Your draft is ready. Open Gmail and press Send to deliver your message."}
                {state.status === "idle" && "We’ll send it directly when delivery is available, or prepare a Gmail draft for you to send."}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
