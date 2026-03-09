import { motion } from "framer-motion";

/**
 * Scroll-reveal fade-in wrapper (doubleplay.studio style).
 * Wraps children in a motion.div that fades in from below when it enters the viewport.
 *
 * @param {number}  delay     - Stagger delay in seconds (default 0)
 * @param {number}  y         - Initial vertical offset in px (default 32)
 * @param {string}  className - Extra classes forwarded to the motion.div
 */
export function FadeIn({ children, delay = 0, y = 32, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
