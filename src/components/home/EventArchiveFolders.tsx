"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ArchiveEvent = {
    edition: string;
    title: string;
    href: string;
    image?: string;
};

type EventArchiveProps = {
    events: ArchiveEvent[];
    archiveHref: string;
};

export default function EventArchiveFolders({ events, archiveHref }: EventArchiveProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section className="archive" aria-labelledby="archive-title">
            <div className="archive__inner">
                <div className="archive__intro">
                    <p className="archive__eyebrow"><span /> Our event archive</p>
                    <h2 id="archive-title">Explore the journey so far.</h2>
                    <p className="archive__copy">A growing collection of meetups, ideas, and conversations from the BacktoBase community.</p>
                    <a className="archive__all" href={archiveHref}>Explore all editions <span aria-hidden="true">→</span></a>
                </div>
                <div className="archive__stage" aria-label="Featured event editions">
                    {events.map((event, index) => (
                        <motion.a
                            className="archive-folder"
                            href={event.href}
                            key={`${event.edition}-${event.title}`}
                            style={{ left: `${index * 25}%`, zIndex: events.length - index }}
                            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={reduceMotion ? undefined : { y: -13, rotateZ: index === 1 ? 0 : index === 0 ? -1.5 : 1.5 }}
                            whileFocus={reduceMotion ? undefined : { y: -8 }}
                        >
                            <div className="archive-folder__back">
                                {event.image ? <Image src={event.image} alt="" fill sizes="(max-width: 560px) 75vw, 43vw" /> : <span className={`archive-folder__art art-${index % 3}`} aria-hidden="true" />}
                            </div>
                            <div className="archive-folder__front">
                                <span className="archive-folder__edition">{event.edition}</span>
                                <h3>{event.title}</h3>
                                <span className="archive-folder__open" aria-hidden="true">↗</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
            <style jsx>{`
        .archive{--paper:#f4ead7;--orange:#ef4b13;position:relative;overflow:hidden;background-color:#181817;background-image:radial-gradient(rgba(255,255,255,.14) .8px,transparent .8px);background-size:14px 14px;color:#f8f4eb;padding:clamp(64px,8vw,108px) 24px}
        .archive__inner{width:min(1240px,100%);min-height:350px;margin:auto;display:grid;grid-template-columns:minmax(235px,.78fr) minmax(0,1.5fr);align-items:center;gap:clamp(38px,6vw,88px)}.archive__intro{position:relative;z-index:4}.archive__eyebrow{display:flex;align-items:center;gap:12px;margin:0 0 17px;font:700 11px/1 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:rgba(248,244,235,.72)}.archive__eyebrow span{width:38px;height:1px;background:currentColor}h2{max-width:390px;margin:0;font:900 clamp(39px,5vw,63px)/.9 Arial,sans-serif;letter-spacing:-.055em;text-transform:uppercase}.archive__copy{max-width:330px;margin:20px 0 23px;color:rgba(248,244,235,.76);font:500 14px/1.5 Arial,sans-serif}.archive__all{display:inline-flex;align-items:center;gap:15px;border:1px solid rgba(248,244,235,.72);border-radius:30px;padding:11px 16px;color:#fff;text-decoration:none;font:700 12px Arial,sans-serif;transition:background .2s,border-color .2s}.archive__all:hover{background:var(--orange);border-color:var(--orange)}.archive__all span{font-size:17px}.archive__all:focus-visible,.archive-folder:focus-visible{outline:3px solid #ff6a35;outline-offset:5px}
        .archive__stage{position:relative;height:345px;perspective:1000px}.archive-folder{position:absolute;top:8px;bottom:0;width:43%;min-width:190px;color:#171716;text-decoration:none;transform-style:preserve-3d;filter:drop-shadow(0 18px 16px rgba(0,0,0,.3));transition:filter .2s}.archive-folder:hover{filter:drop-shadow(0 26px 18px rgba(0,0,0,.42))}.archive-folder__back{position:absolute;top:0;left:8%;right:8%;height:56%;overflow:hidden;border:4px solid var(--paper);border-radius:18px 18px 7px 7px;background:#544e43;transform:rotateX(-5deg);transform-origin:bottom}.archive-folder__back img,.archive-folder__art{display:block;width:100%;height:100%;object-fit:cover}.archive-folder__art{background:radial-gradient(ellipse at 50% 90%,rgba(255,255,255,.35),transparent 35%),linear-gradient(140deg,#db6e24,#302e37 62%,#1e5470)}.art-1{background:radial-gradient(ellipse at 30% 90%,rgba(255,255,255,.4),transparent 32%),linear-gradient(145deg,#7896a1,#342c32 58%,#d77b33)}.art-2{background:radial-gradient(ellipse at 70% 86%,rgba(255,255,255,.32),transparent 30%),linear-gradient(145deg,#c7884e,#30252a 60%,#343f4c)}.archive-folder__front{position:absolute;inset:29% 0 0;padding:31px 25px 22px;border:1px solid rgba(255,255,255,.72);border-radius:19px 18px 11px 11px;background:linear-gradient(165deg,#fff8e9,#e8d6b7 96%);box-shadow:inset 0 2px 0 white;clip-path:polygon(0 8%,27% 8%,34% 0,58% 0,65% 8%,100% 8%,100% 100%,0 100%)}.archive-folder__edition{display:inline-block;padding:6px 10px;border-radius:30px;background:var(--orange);color:#fff;font:800 9px/1 Arial,sans-serif;letter-spacing:.06em;text-transform:uppercase}.archive-folder h3{max-width:210px;margin:12px 0 0;font:950 clamp(18px,2.1vw,26px)/.94 Arial,sans-serif;letter-spacing:-.04em;text-transform:uppercase}.archive-folder__open{position:absolute;right:20px;bottom:18px;display:grid;place-items:center;width:37px;height:37px;border-radius:50%;background:#171716;color:white;font-size:18px;transition:background .2s,transform .2s}.archive-folder:hover .archive-folder__open{background:var(--orange);transform:rotate(45deg)}
        @media(max-width:820px){.archive__inner{grid-template-columns:1fr;gap:30px}.archive__intro{max-width:620px}.archive__stage{height:340px;margin:0 -8px}.archive-folder{width:36%;min-width:170px}.archive-folder__front{padding:28px 18px 18px}}
        @media(max-width:560px){.archive{padding:55px 20px 44px}.archive__stage{height:315px;margin:0 -20px;overflow-x:auto;overflow-y:hidden;display:flex;gap:14px;padding:0 20px 14px;perspective:none;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:#716c63 transparent}.archive-folder{position:relative;top:0;left:auto!important;bottom:auto;flex:0 0 75vw;max-width:280px;min-width:0;scroll-snap-align:start}.archive-folder__front{padding:31px 22px 20px}.archive-folder h3{font-size:24px}}
        @media(prefers-reduced-motion:reduce){.archive__all,.archive-folder,.archive-folder__open{transition:none}}
      `}</style>
        </section>
    );
}
