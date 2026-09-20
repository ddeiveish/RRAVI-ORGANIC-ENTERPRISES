import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 36, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Eyebrow = ({ children, light = false, className = "" }) => (
  <span
    className={`font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] ${
      light ? "text-amber" : "text-terra"
    } ${className}`}
  >
    {children}
  </span>
);
