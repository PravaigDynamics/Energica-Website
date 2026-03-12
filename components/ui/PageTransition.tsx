"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Page transition:
 * - Exit: compress (scaleY 0.97) + blur (4px) + fade
 * - Enter: slides from direction-based x offset + blur → resolved
 * - Tracks navigation direction (forward/back) via path history
 */

const PATH_HISTORY: string[] = [];

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Track direction: forward (+1) or back (-1)
  let direction = 1;
  const historyIdx = PATH_HISTORY.lastIndexOf(pathname);
  if (historyIdx !== -1 && historyIdx === PATH_HISTORY.length - 2) {
    direction = -1; // going back
  }
  if (!PATH_HISTORY.length || PATH_HISTORY[PATH_HISTORY.length - 1] !== pathname) {
    PATH_HISTORY.push(pathname);
    if (PATH_HISTORY.length > 20) PATH_HISTORY.shift();
  }

  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir * 32,
      filter: "blur(3px)",
    }),
    animate: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      scaleY: 0.97,
      filter: "blur(4px)",
    },
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center top" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
