"use client";

import { motion } from "framer-motion";

export function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-amber-200/55 via-rose-200/35 to-transparent blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 25, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -top-24 right-[-12rem] h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-rose-200/45 via-orange-200/35 to-transparent blur-3xl"
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.96, 1.04, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        aria-hidden
        className="absolute top-72 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-amber-100/40 via-amber-50/30 to-transparent blur-3xl"
        animate={{
          y: [0, -18, 12, 0],
          scale: [1, 1.06, 0.98, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}

export function BreathingDot() {
  return (
    <motion.div
      aria-hidden
      className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-foreground/30"
      animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0.7, 0.35] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
