"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Testimonial = {
    quote: string;
    role: string;
    name?: string;
};

type CommunityTestimonialsProps = {
    testimonials: Testimonial[];
    title?: string;
};

export default function CommunityTestimonials({
    testimonials,
    title = "What our community says",
}: CommunityTestimonialsProps) {
    const track = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    const move = (direction: -1 | 1) => {
        const card = track.current?.querySelector<HTMLElement>(".quote-card");
        track.current?.scrollBy({
            left: direction * ((card?.offsetWidth ?? 280) + 18),
            behavior: reduceMotion ? "auto" : "smooth",
        });
    };

    return (
        <section className="quotes" aria-labelledby="quotes-title">
            <div className="quotes__top">
                <div>
                    <p className="quotes__eyebrow"><span /> Voices of the community</p>
                    <h2 id="quotes-title">{title}</h2>
                </div>
                <div className="quotes__controls" aria-label="Testimonial carousel controls">
                    <button type="button" onClick={() => move(-1)} aria-label="Show previous testimonials">←</button>
                    <button type="button" onClick={() => move(1)} aria-label="Show next testimonials">→</button>
                </div>
            </div>
            <div className="quotes__track" ref={track} role="region" aria-label="Community testimonials" tabIndex={0}>
                {testimonials.map((item, index) => (
                    <motion.article
                        className="quote-card"
                        key={`${item.role}-${index}`}
                        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: reduceMotion ? 0 : Math.min(index * 0.07, 0.28) }}
                    >
                        <span className="quote-card__spark" aria-hidden="true">✦</span>
                        <blockquote>“{item.quote}”</blockquote>
                        <footer>
                            {item.name && <strong>{item.name}</strong>}
                            <span>{item.role}</span>
                        </footer>
                    </motion.article>
                ))}
            </div>
            <style jsx>{`
        .quotes{--paper:#f7f2e9;--orange:#fb5416;background:#171716;color:var(--paper);padding:clamp(52px,7vw,88px) max(24px,calc((100vw - 1240px)/2));overflow:hidden}
        .quotes__top{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:32px}.quotes__eyebrow{display:flex;align-items:center;gap:12px;margin:0 0 16px;font:700 11px/1 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(247,242,233,.72)}.quotes__eyebrow span{width:40px;height:1px;background:currentColor}
        h2{max-width:620px;margin:0;font:900 clamp(32px,5vw,62px)/.92 Arial,sans-serif;letter-spacing:-.055em;text-transform:uppercase}.quotes__controls{display:flex;gap:10px;padding-bottom:4px}.quotes__controls button{width:46px;height:46px;border:1px solid rgba(247,242,233,.22);border-radius:50%;background:transparent;color:var(--paper);font-size:20px;cursor:pointer;transition:background .2s,color .2s,transform .2s}.quotes__controls button:last-child{background:var(--paper);color:#171716}.quotes__controls button:hover{transform:translateY(-2px);background:var(--orange);border-color:var(--orange);color:white}.quotes__controls button:focus-visible,.quotes__track:focus-visible{outline:3px solid #ff6b31;outline-offset:4px}
        .quotes__track{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:#595752 transparent;padding:4px 2px 18px;overscroll-behavior-inline:contain}.quote-card{position:relative;flex:0 0 clamp(240px,25vw,306px);min-height:216px;display:flex;flex-direction:column;justify-content:space-between;padding:28px 24px 22px;border:1px solid rgba(247,242,233,.3);border-radius:15px;background:linear-gradient(145deg,#232321,#191918 75%);scroll-snap-align:start}.quote-card__spark{position:absolute;top:17px;left:20px;color:var(--orange);font-size:19px}.quote-card blockquote{margin:22px 0 24px;font:italic 500 16px/1.45 Georgia,serif;color:rgba(247,242,233,.94)}.quote-card footer{display:flex;flex-direction:column;align-items:flex-start;gap:7px}.quote-card footer strong{font:600 11px Arial,sans-serif;color:rgba(247,242,233,.7)}.quote-card footer span{display:inline-block;padding:6px 11px;border:1px solid rgba(255,255,255,.25);border-radius:30px;font:700 10px/1 Arial,sans-serif;color:#fff;text-transform:uppercase;letter-spacing:.07em}
        @media(max-width:600px){.quotes__top{align-items:flex-start}.quotes__controls{gap:6px}.quotes__controls button{width:40px;height:40px}.quotes__eyebrow{font-size:9px}.quote-card{flex-basis:78vw;min-height:200px}}
        @media(prefers-reduced-motion:reduce){.quotes__controls button{transition:none}}
      `}</style>
        </section>
    );
}
