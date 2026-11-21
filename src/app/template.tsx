"use client";

import { motion } from "framer-motion";

/**
 * Quick, crisp page-to-page transition: a short fade with a tiny lift.
 * Re-mounts on every route change (Next.js template behaviour).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={{ opacity: 0.35, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
