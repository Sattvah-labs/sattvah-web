"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (d: Direction) => {
  switch (d) {
    case "up": return { y: 28 };
    case "down": return { y: -28 };
    case "left": return { x: 28 };
    case "right": return { x: -28 };
    default: return {};
  }
};

const variants = (direction: Direction): Variants => ({
  hidden: { opacity: 0, ...offsetFor(direction) },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
});

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  as?: "div" | "section" | "span" | "p" | "h1" | "h2" | "h3";
}) {
  const MotionTag = motion[As as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren, staggerChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1, y: 0,
          transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
