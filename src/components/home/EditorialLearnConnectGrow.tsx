"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function EditorialLearnConnectGrow() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="lcg" aria-labelledby="lcg-title">
            <div className="lcg__wash" aria-hidden="true" />
            <div className="lcg__inner">
                <motion.div
                    className="lcg__headline"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="lcg__eyebrow">A community in motion</p>
                    <h2 id="lcg-title">LEARN.<br />CONNECT.<br />GROW.</h2>
                    <svg className="lcg__arrow" viewBox="0 0 80 80" aria-hidden="true">
                        <path d="M12 66 66 12M30 12h36v36" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
                    </svg>
                </motion.div>
                <motion.div
                    className="lcg__story"
                    initial={reduceMotion ? false : { opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="lcg__eyebrow">Beyond the campus</p>
                    <h3>A student community that turns curiosity into opportunity.</h3>
                    <p className="lcg__copy">Work on real ideas, meet industry professionals, and build alongside ambitious peers. Take your learning beyond the classroom.</p>
                    <a className="lcg__link" href="/community">Find your people <span aria-hidden="true">↗</span></a>
                </motion.div>
            </div>
            <style jsx>{`
        .lcg{--orange:#f2490b;--blue:#173bd4;position:relative;isolation:isolate;overflow:hidden;background:var(--blue);color:#fff;min-height:390px}
        .lcg__wash{position:absolute;z-index:-1;inset:0 44% 0 0;background:var(--orange);clip-path:polygon(0 0,100% 0,86% 100%,0 100%)}
        .lcg__inner{width:min(1240px,100%);min-height:390px;margin:auto;padding:54px clamp(24px,6vw,84px);display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:clamp(36px,7vw,112px)}
        .lcg__headline{position:relative}.lcg__eyebrow{margin:0 0 18px;font:700 11px/1.2 Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;opacity:.78}
        h2{margin:0;font:950 clamp(56px,8.3vw,112px)/.79 Arial,sans-serif;letter-spacing:-.075em;transform:rotate(-3deg);text-wrap:nowrap}
        .lcg__arrow{position:absolute;width:58px;right:2%;top:2%;transform:rotate(7deg)}
        .lcg__story{max-width:490px;padding:16px 0 12px}.lcg__story h3{max-width:510px;margin:0 0 20px;font:850 clamp(26px,3.2vw,43px)/.98 Arial,sans-serif;letter-spacing:-.04em;text-transform:uppercase}.lcg__copy{max-width:420px;margin:0;color:rgba(255,255,255,.82);font:500 16px/1.55 Arial,sans-serif}.lcg__link{display:inline-flex;gap:18px;align-items:center;margin-top:25px;color:#fff;text-decoration:none;font:700 13px/1 Arial,sans-serif;border-bottom:1px solid rgba(255,255,255,.55);padding:0 0 8px}.lcg__link span{font-size:18px;transition:transform .2s}.lcg__link:hover span{transform:translate(3px,-3px)}.lcg__link:focus-visible{outline:3px solid #fff;outline-offset:5px}
        @media(max-width:760px){.lcg,.lcg__inner{min-height:unset}.lcg__wash{inset:0 0 48% 0;clip-path:polygon(0 0,100% 0,100% 82%,0 100%)}.lcg__inner{grid-template-columns:1fr;gap:42px;padding:54px 24px 44px}.lcg__headline h2{font-size:clamp(58px,16vw,90px)}.lcg__arrow{width:44px;right:3%;top:0}.lcg__story{padding:0}.lcg__story h3{max-width:560px}.lcg__copy{font-size:15px}}
        @media(prefers-reduced-motion:reduce){.lcg__link span{transition:none}}
      `}</style>
        </section>
    );
}
