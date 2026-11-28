import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, Hammer, Mic2, MessagesSquare } from "lucide-react";
import { CustomVisualSlot } from "@/components/ui/CustomVisualSlot";
import { FOUNDER_PROFILE } from "@/data/founderData";
import { CONTACT_US_MAILTO_URL, CONTACT_US_URL } from "@/data/contact";
import { ResponsiveEmailLink } from "@/components/ui/ResponsiveEmailLink";
import { EDITIONS, TEAM_MEMBERS } from "@/data/communityData";
import { getEditionPhoto } from "@/data/editionPhotos";

export const metadata = {
  title: "About BacktoBase — Story, Mission & Community",
  description: "Discover the story, purpose, values and people behind BacktoBase, a community connecting campus and industry through learning, connection and building.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-canvas-base">
      <main id="main-content" tabIndex={-1} className="flex-grow py-10 sm:py-16">
        <div className="relative isolate max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-brand-orange-ink mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange-ink">
                A movement beyond campus
              </span>
              <div className="h-[1px] w-12 bg-charcoal-300" />
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-charcoal-950 mb-4">
              More Than An Event.<br />
              <span className="text-brand-cyan">A Movement.</span>
            </h1>
            <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed font-normal">
              BacktoBase brings students, professionals, mentors, creators and industry leaders together through practical learning, meaningful connections and real-world experiences.
            </p>
          </div>

          <section aria-labelledby="purpose-title" className="mb-16">
            <div className="mb-6 max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">Our purpose</p>
              <h2 id="purpose-title" className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-charcoal-950 sm:text-3xl">From learning to building, together.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Purpose", copy: "Bring campus and industry closer through practical conversations and shared experiences." },
                { title: "Mission", copy: "Make room for people to learn from practitioners, connect with one another, and share what they are building." },
                { title: "Vision", copy: "A community where everyone has a place and every journey can move from learning to building." },
              ].map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-border-subtle bg-white p-6 shadow-card">
                  <span className="text-xs font-bold tabular-nums text-brand-orange-ink">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-xl font-bold text-charcoal-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{item.copy}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Philosophy Pillars */}
          <div className="mb-16 grid grid-cols-1 gap-7 border-y border-[#d5c8b9] py-7 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-0 lg:py-8">
            <article className="lg:pr-7">
              <Hammer aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
              <h3 className="font-display text-lg font-bold text-charcoal-950">
                Show Up & Build
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                The best growth happens when we step out of passive attendance into active building and direct conversations.
              </p>
            </article>

            <article className="sm:border-l sm:border-[#d5c8b9] sm:pl-7 lg:px-7">
              <Mic2 aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
              <h3 className="font-display text-lg font-bold text-charcoal-950">
                Students as Speakers
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                You don&apos;t need to wait until you graduate to have a voice. In Edition 05, 16-year-old builders took the stage at EPAM Systems.
              </p>
            </article>

            <article className="sm:col-span-2 sm:border-t sm:border-[#d5c8b9] sm:pt-7 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <MessagesSquare aria-hidden="true" className="mb-4 size-5 text-brand-orange" />
              <h3 className="font-display text-lg font-bold text-charcoal-950">
                High Signal, Zero Fluff
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                One event. One connection. One insight at a time. Every edition is crafted around actionable skills, recruitment truth, and genuine mentorship.
              </p>
            </article>
          </div>

          <section id="journey" aria-labelledby="milestones-title" className="mb-16 scroll-mt-28">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">A journey built one edition at a time</p>
                <h2 id="milestones-title" className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-charcoal-950 sm:text-3xl">Moments that shaped the movement</h2>
              </div>
              <Link href="/editions" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-charcoal-800 underline decoration-brand-orange/50 underline-offset-4 hover:text-brand-orange-ink sm:self-auto">
                Browse all editions <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <ol className="grid gap-4 md:grid-cols-3">
              {EDITIONS.filter(({ editionNumber }) => ["01", "05", "09"].includes(editionNumber)).map((edition) => {
                const photo = getEditionPhoto(edition.editionNumber);
                return (
                  <li key={edition.editionNumber} className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-card">
                    {photo && <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 767px) 100vw, 33vw" className="aspect-[1.75/1] w-full object-cover" />}
                    <div className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-orange-ink">Edition {edition.editionNumber} · {edition.date}</p>
                      <h3 className="mt-2 font-display text-lg font-bold text-charcoal-950">{edition.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-700">{edition.theme} · {edition.venue}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Founder Section */}
          <section id="founder" className="rounded-3xl bg-canvas-dark text-white p-8 sm:p-12 lg:p-16 mb-16 overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <CustomVisualSlot
                src="/images/founder-portrait.jpg"
                alt="Yashwanth Bondapalli, founder of BacktoBase"
                sizes="(max-width: 1024px) 90vw, 520px"
                quality={95}
                className="aspect-square w-full max-w-md rounded-2xl border-2 border-brand-amber/40 shadow-photo lg:col-span-5"
                imgClassName="object-cover object-top"
              />

              <div className="lg:col-span-7 flex flex-col">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-amber mb-2">
                  Why BacktoBase began
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
                  {FOUNDER_PROFILE.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Yashwanth started BacktoBase in Hyderabad to give students more ways to learn alongside people doing the work. The idea was simple: bring students, practitioners, and founders together, then give students a chance to ask questions, share their work, and take the stage themselves.
                </p>
                <div className="mt-6">
                  <Link
                    href="/founder"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-amber hover:bg-amber-400 text-charcoal-950 font-display font-extrabold text-xs sm:text-sm tracking-wide transition-all"
                  >
                    <span>Read Yashwanth’s story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="people-title" className="mb-16 rounded-3xl border border-border-subtle bg-white p-6 shadow-card sm:p-9">
            <div className="mb-5 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">People who make it happen</p>
              <h2 id="people-title" className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-charcoal-950 sm:text-3xl">A founder, a team, a wider community.</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-700">BacktoBase is founded by {FOUNDER_PROFILE.name} and shaped by the people who show up, share their work and help each edition happen.</p>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="BacktoBase team and community contributors">
              {TEAM_MEMBERS.map((member) => <li key={member} className="rounded-full border border-border-strong bg-canvas-subtle px-3.5 py-2 text-xs font-semibold text-charcoal-800">{member}</li>)}
            </ul>
          </section>

          <section aria-labelledby="ecosystem-title" className="mb-12 grid gap-7 rounded-3xl bg-canvas-subtle p-6 sm:p-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange-ink">One community, many journeys</p>
              <h2 id="ecosystem-title" className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-charcoal-950 sm:text-3xl">Everyone has a place.</h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-charcoal-700">Students, professionals, mentors, entrepreneurs, developers, creators, institutions and companies can all take part. Meet people, join a conversation, share an idea, mentor someone or help bring a gathering to life.</p>
              <Link href="/connect" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-orange-ink px-5 text-sm font-semibold text-white hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2">Join the movement <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="text-center py-8">
            <h3 className="font-display font-bold text-2xl text-charcoal-950 mb-3">
              Want to speak, volunteer, or partner with us?
            </h3>
            <ResponsiveEmailLink desktopHref={CONTACT_US_URL} mobileHref={CONTACT_US_MAILTO_URL} className="items-center gap-2 px-6 py-3 rounded-full bg-brand-orange-ink hover:bg-brand-orange-hover text-white text-sm font-semibold tracking-wide transition-all shadow-md">
              <span>Contact us</span>
              <ArrowRight className="w-4 h-4" />
            </ResponsiveEmailLink>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
