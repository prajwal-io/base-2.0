import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { Footer } from "@/components/layout/Footer";
import { CONTACT_EMAIL } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact BacktoBase — Community, Mentors & Partnerships",
  description: "Get in touch with BacktoBase for general enquiries, community support, mentoring, corporate partnerships and institutional collaborations.",
};

const ENQUIRY_TYPES = [
  { title: "General enquiries", copy: "Questions, ideas or anything you would like the BacktoBase team to know." },
  { title: "Community support", copy: "Help with joining, attending an edition or finding your next way to take part." },
  { title: "Mentor enquiries", copy: "Share your experience and explore ways to support the community." },
  { title: "Corporate partnerships", copy: "Discuss hosting, collaboration or supporting a community gathering." },
  { title: "Institutional collaborations", copy: "Explore ways for a college or institution to connect with BacktoBase." },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/backtobase_xyz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/backtobasee" },
  { label: "YouTube", href: "https://www.youtube.com/@BacktoBase_xyz" },
  { label: "WhatsApp community", href: "https://chat.whatsapp.com/JLCaNCa00Vv1bP0s7fy6MC" },
];

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <section className="px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">Start a conversation</p>
              <h1 className="mt-3 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-charcoal-950 sm:text-5xl lg:text-6xl">Good things begin with a hello.</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-700 sm:text-lg">Questions, community support, mentor interest or a partnership idea — choose the topic that fits and the BacktoBase team will hear from you.</p>
            </div>

            <div className="mt-10 grid items-start gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div className="space-y-6">
                <section aria-labelledby="enquiry-types-title">
                  <h2 id="enquiry-types-title" className="font-display text-xl font-bold text-charcoal-950">How can we help?</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {ENQUIRY_TYPES.map(({ title, copy }, index) => (
                      <li key={title} className="flex gap-3 rounded-2xl border border-border-subtle bg-white p-4 shadow-card">
                        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-amber-light text-xs font-bold text-brand-orange-ink">0{index + 1}</span>
                        <div><h3 className="font-semibold text-charcoal-950">{title}</h3><p className="mt-1 text-sm leading-relaxed text-charcoal-700">{copy}</p></div>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="rounded-2xl bg-canvas-subtle p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal-500">Direct email</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 break-all font-semibold text-charcoal-950 underline decoration-brand-orange/50 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">
                    <Mail aria-hidden="true" className="size-4 shrink-0 text-brand-orange-ink" />{CONTACT_EMAIL}
                  </a>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal-700">Use the form or write directly. Your email app will open with a new message.</p>
                </div>

                <nav aria-label="Official BacktoBase social links" className="flex flex-wrap gap-2">
                  {SOCIALS.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong bg-white px-4 text-sm font-semibold text-charcoal-800 transition-colors hover:border-brand-orange/50 hover:text-charcoal-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">
                      {label}<ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  ))}
                </nav>
              </div>

              <section id="contact-form" aria-labelledby="contact-form-title" className="scroll-mt-28 rounded-3xl border border-border-subtle bg-white p-5 shadow-card sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange-ink">We’ll get back to you</p>
                <h2 id="contact-form-title" className="mt-2 font-display text-2xl font-bold text-charcoal-950 sm:text-3xl">Send a message</h2>
                <p className="mb-6 mt-2 text-sm leading-relaxed text-charcoal-700">Choose your enquiry type in the form and tell us what you have in mind.</p>
                <ContactForm />
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
