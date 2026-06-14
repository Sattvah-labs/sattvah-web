import * as React from "react";
import Image from "next/image";

import { cn, initials } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

/**
 * Minimal RSC-friendly Avatar. Uses next/image for remote URLs, falls back
 * to initials on missing/error. shadcn's official Avatar is Radix-based + client-only,
 * which is unnecessary here (we never need open/close state).
 */
export function Avatar({ src, name, size = 40, className }: AvatarProps) {
  const dim = `${size}px`;
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-secondary",
          className,
        )}
        style={{ width: dim, height: dim }}
      >
        <Image
          src={src}
          alt={name || "avatar"}
          fill
          sizes={dim}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold",
        className,
      )}
      style={{ width: dim, height: dim, fontSize: Math.max(11, size / 2.6) }}
      aria-label={name || "avatar"}
    >
      {initials(name)}
    </div>
  );
}
