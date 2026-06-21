/**
 * GradientWord — wraps text in the brand sunset gradient (lavender →
 * magenta → rose), background-clipped to the text itself. Used to give
 * one or two words in a headline visual weight without color flooding
 * the whole sentence.
 *
 * Pattern mirrors Google's hero headlines where a single emotional word
 * is colored to lead the eye.
 */
import type { ReactNode } from "react";

export function GradientWord({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-[#A88AFB] via-[#C97CD9] to-[#F47AA0] bg-clip-text text-transparent ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
