"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Word-by-word reveal. Each word fades + lifts + unblurs with a small
 * stagger. IntersectionObserver gates the start so the animation
 * doesn't fire before the element is visible.
 *
 * Two usage modes:
 *
 *   Plain text:
 *     <WordReveal text="Some days, you just need to talk." />
 *
 *   Mixed content (so you can highlight one word with <GradientWord>):
 *     <WordReveal>
 *       Some days, you just need to <GradientWord>talk</GradientWord>.
 *     </WordReveal>
 *
 * In the mixed-content path each whitespace-separated chunk of the
 * string children becomes its own animated word; ReactNode children
 * (like <GradientWord>) are wrapped as a single animated word.
 */

type Tag = "span" | "h1" | "h2" | "h3" | "p" | "div";

type Props = {
  text?: string;
  children?: ReactNode;
  baseDelayMs?: number;
  perWordMs?: number;
  className?: string;
  as?: Tag;
};

export function WordReveal({
  text,
  children,
  baseDelayMs = 0,
  perWordMs = 60,
  className,
  as = "span",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

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
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  // Plain-text mode.
  if (text != null) {
    const words = text.trim().split(/\s+/);
    return (
      <Tag
        ref={ref as unknown as React.RefObject<HTMLElement>}
        className={`word-reveal ${className ?? ""}`}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="w"
            style={{ transitionDelay: `${baseDelayMs + i * perWordMs}ms` }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  // Mixed-content mode — walk children, split string nodes by
  // whitespace, leave React nodes as single words.
  let cursor = 0;
  const pieces: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      const segments = child.split(/(\s+)/); // keep whitespace as separators
      let buffer = "";
      for (const seg of segments) {
        if (/^\s+$/.test(seg)) {
          if (buffer.length > 0) {
            pieces.push(
              <span
                key={cursor}
                className="w"
                style={{ transitionDelay: `${baseDelayMs + cursor * perWordMs}ms` }}
              >
                {buffer}
              </span>,
            );
            cursor++;
            buffer = "";
          }
          pieces.push(seg); // raw whitespace preserves layout
        } else {
          buffer += seg;
        }
      }
      if (buffer.length > 0) {
        pieces.push(
          <span
            key={cursor}
            className="w"
            style={{ transitionDelay: `${baseDelayMs + cursor * perWordMs}ms` }}
          >
            {buffer}
          </span>,
        );
        cursor++;
      }
    } else if (child != null && child !== false) {
      pieces.push(
        <span
          key={cursor}
          className="w"
          style={{ transitionDelay: `${baseDelayMs + cursor * perWordMs}ms` }}
        >
          {child}
        </span>,
      );
      cursor++;
    }
  });

  return (
    <Tag
      ref={ref as unknown as React.RefObject<HTMLElement>}
      className={`word-reveal ${className ?? ""}`}
    >
      {pieces}
    </Tag>
  );
}
