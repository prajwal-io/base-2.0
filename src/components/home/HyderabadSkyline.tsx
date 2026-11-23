"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hyderabad landmarks frame the community artwork without sitting behind it. */
export function HyderabadSkyline() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-px z-0 h-[clamp(8rem,18vw,12rem)] overflow-hidden"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.35, ease: EASE }}
    >
      <div className="absolute bottom-0 left-0 h-[92%] w-[22%] overflow-hidden sm:h-full sm:w-[22%]">
        <Image
          src="/images/hyderabad-skyline-v1.png"
          alt=""
          fill
          sizes="22vw"
          className="object-cover object-left-bottom opacity-100"
          priority
        />
      </div>
      <div className="absolute bottom-0 right-0 h-[88%] w-[22%] overflow-hidden sm:h-[94%] sm:w-[22%]">
        <Image
          src="/images/hyderabad-skyline-v1.png"
          alt=""
          fill
          sizes="22vw"
          className="object-cover object-right-bottom opacity-100"
        />
      </div>
    </motion.div>
  );
}
