import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Handshake, Lightbulb, UsersRound } from "lucide-react";
import JoinForm from "@/components/forms/JoinForm";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Connect with BacktoBase — Everyone Has a Place",
  description: "Join a welcoming community of students, professionals, mentors, entrepreneurs, creators and people who want to connect and grow.",
};

const FAQS = [
  { question: "Do I need to be a student to join?", answer: "No. Students, working professionals, founders, engineers, creators and mentors are welcome." },
  { question: "What can I do as a member?", answer: "Attend an edition, learn from people doing the work, volunteer, share a talk, mentor someone or help build community initiatives." },
  { question: "How does the community work?", answer: "BacktoBase brings people together through in-person editions, talks and community initiatives. Each edition has its own theme and activities." },
  { question: "Can I mentor or explore a partnership?", answer: "Yes. Share your interest through the contact page and the BacktoBase team can follow up." },
];

export default function ConnectPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <section className="px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pt-20">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">One community. Different journeys.</p>
              <h1 className="mt-3 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-charcoal-950 sm:text-5xl lg:text-6xl">Everyone has a place at BacktoBase.</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-700 sm:text-lg">Whether you are a student, working professional, mentor, entrepreneur, creator or someone who simply wants to connect and grow, you belong here.</p>
              <div className="relative mt-7 overflow-hidden rounded-2xl border border-border-subtle shadow-photo">
                <Image src="/images/community-panoramic.jpg" alt="BacktoBase members gathered together" width={1024} height={229} sizes="(max-width: 1023px) 100vw, 45vw" priority className="aspect-[2.1/1] w-full object-cover" />
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950/85 to-transparent px-4 pb-4 pt-10 text-sm font-semibold text-white">Everyone has a place. Every journey matters.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Welcomed community members">
                {["Students", "Professionals", "Mentors", "Entrepreneurs", "Developers", "Creators", "Institutions", "Companies", "Volunteers"].map((role) => <span key={role} className="rounded-full border border-border-strong bg-white px-3 py-1.5 text-xs font-semibold text-charcoal-800">{role}</span>)}
              </div>
            </div>
            <section aria-labelledby="join-form-title" className="rounded-3xl border border-border-subtle bg-white p-5 shadow-card sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange-ink">Start with a hello</p>
              <h2 id="join-form-title" className="mt-2 font-display text-2xl font-bold text-charcoal-950 sm:text-3xl">Join BacktoBase</h2>
              <p className="mb-6 mt-2 text-sm leading-relaxed text-charcoal-700">Tell us a little about yourself and what you would like to explore.</p>
              <JoinForm />
            </section>
          </div>
        </section>

        <section className="border-y border-border-subtle bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">Make it your own</p>
              <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-charcoal-950 sm:text-4xl">Bring what you know. Leave room to grow.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Learn", copy: "Hear directly from practitioners and people who are building.", icon: Lightbulb },
                { title: "Connect", copy: "Meet peers, mentors and collaborators across different journeys.", icon: UsersRound },
                { title: "Build", copy: "Share an idea, get feedback and find your next step.", icon: Compass },
                { title: "Contribute", copy: "Volunteer, mentor, speak or help create a welcoming space.", icon: Handshake },
              ].map(({ title, copy, icon: Icon }, index) => (
                <article key={title} className="rounded-2xl border border-border-subtle bg-canvas-base p-5">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-amber-light text-brand-orange-ink"><Icon aria-hidden="true" className="size-5" /></span>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-charcoal-500">0{index + 1}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-charcoal-950">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">A simple way in</p>
              <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-charcoal-950 sm:text-4xl">How the community works</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal-700">Start wherever you are. Join a gathering, meet people, and decide how you want to take part.</p>
              <ol className="mt-6 space-y-4">
                {["Say hello and tell us what you are curious about.", "Join an edition or community initiative that interests you.", "Share what you know, build alongside others or help the next person feel welcome."].map((step, index) => <li key={step} className="flex gap-3 text-sm leading-relaxed text-charcoal-800"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-amber-light text-xs font-bold text-charcoal-950">0{index + 1}</span><span className="pt-1">{step}</span></li>)}
              </ol>
              <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-orange-ink underline decoration-brand-orange/50 underline-offset-4">Mentor or partnership enquiries <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </div>
            <section aria-labelledby="connect-faq-title" className="rounded-3xl border border-border-subtle bg-white p-5 shadow-card sm:p-8">
              <h2 id="connect-faq-title" className="font-display text-2xl font-bold text-charcoal-950">A few things to know</h2>
              <div className="mt-4 divide-y divide-border-subtle">
                {FAQS.map(({ question, answer }) => <details key={question} className="group py-4 first:pt-0 last:pb-0"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-charcoal-900 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"><span>{question}</span><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-border-strong text-lg text-brand-orange-ink transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span></summary><p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-charcoal-700">{answer}</p></details>)}
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
