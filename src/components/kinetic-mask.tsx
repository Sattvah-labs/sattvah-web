"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Kinetic mask reveal — content (typically an image) opens from inside-out
 * via an animated clip-path inset, with a parallel blur clearing. Reads as
 * cinematic and unhurried — fits the calm Sattvah brand.
 *
 * Wrap any block-level content (img, div with bg-image, etc.) and the
 * mask will trigger when it scrolls into view.
 */
export function KineticMask({
  children,
  className,
  rounded = 24,
}: {
  children: ReactNode;
  className?: string;
  rounded?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`kinetic-mask ${className ?? ""}`}
      style={{ ["--km-radius" as string]: `${rounded}px` }}
    >
      {children}
    </div>
  );
}
