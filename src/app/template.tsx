"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A short cross-route fade that keeps the page in its final position.
 * Re-mounts on every route change (Next.js template behaviour).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={reduceMotion ? false : { opacity: 0.85 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
