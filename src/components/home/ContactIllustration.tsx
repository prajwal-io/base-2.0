interface ContactIllustrationProps {
  visible: boolean;
  sent: boolean;
  titleId: string;
}

const crewArtwork = "/images/footer-community-crew-v3.png";

/** The animated contact sign, greeter, and resting cat. */
export function ContactIllustration({ visible, sent, titleId }: ContactIllustrationProps) {
  return (
    <div className="contact-scene relative mx-auto mt-5 max-w-md pt-[4.7rem] sm:pt-24" data-visible={visible} data-sent={sent}>
      <div className="contact-greeter-wrap absolute left-[8%] top-0 h-24 w-28 sm:left-[9%] sm:h-28 sm:w-32">
        <svg aria-hidden="true" className="contact-greeter h-full w-full overflow-hidden" viewBox="76 25 132 143">
          <image href={crewArtwork} width="2172" height="724" />
        </svg>
      </div>

      <svg aria-hidden="true" className="contact-spark contact-spark-one pointer-events-none absolute left-[3%] top-8 h-5 w-5" viewBox="0 0 24 24">
        <path d="M12 1.5 14.8 9l7.7 3-7.7 2.8-2.8 7.7L9.2 14.8l-7.7-2.8 7.7-3L12 1.5Z" fill="#e9a04d" />
      </svg>
      <svg aria-hidden="true" className="contact-spark contact-spark-two pointer-events-none absolute right-[12%] top-3 h-3.5 w-3.5" viewBox="0 0 24 24">
        <path d="M12 1.5 14.8 9l7.7 3-7.7 2.8-2.8 7.7L9.2 14.8l-7.7-2.8 7.7-3L12 1.5Z" fill="#d98243" />
      </svg>
      <span aria-hidden="true" className="contact-orbit absolute -right-2 top-3 h-12 w-12 rounded-full border border-dashed border-[#d5a274]/70" />

      <div className="contact-board relative z-10 rounded-[1.4rem] border-2 border-[#502f22] bg-[#243d3b] px-5 py-7 text-center shadow-[0_5px_0_#8f624a] sm:px-9 sm:py-9">
        <h2 id={titleId} className="font-display text-[clamp(2rem,7vw,4.5rem)] font-black leading-none tracking-tight text-[#fff5e5]">
          Contact us
        </h2>
        {sent ? (
          <svg aria-hidden="true" className="contact-gesture contact-thumbs pointer-events-none absolute -left-8 top-[38%] h-16 w-20 sm:-left-10 sm:h-[4.5rem] sm:w-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3Zm0 12h9.4a2 2 0 0 0 2-1.6l1.5-8A2 2 0 0 0 18 10h-5l.8-4.2A2.6 2.6 0 0 0 11.3 3L7 10v12Z" fill="#f5ca92" stroke="#502f22" />
          </svg>
        ) : (
          <svg aria-hidden="true" className="contact-gesture pointer-events-none absolute -left-8 top-[38%] h-16 w-20 overflow-hidden sm:-left-10 sm:h-[4.5rem] sm:w-24" viewBox="243 105 96 78">
            <image href={crewArtwork} width="2172" height="724" />
          </svg>
        )}

      </div>
    </div>
  );
}
