/**
 * Sattvah Lotus Bud Whisper mark.
 *
 * Three layered petals form a closed lotus bud. Inside the central petal,
 * a tiny engraved curl reads as a whisper, a breath, a thought beginning
 * to form. Petal + speech in one figure.
 *
 * Defs (linearGradient ids) are scoped per-instance with a uid so the
 * mark can render multiple times on a page without colliding.
 */
import { useId } from "react";

type Variant = "full" | "compact" | "favicon";

type Props = {
  size?: number;
  variant?: Variant;
  /** when true, renders monochrome (currentColor) instead of the sunset gradient */
  mono?: boolean;
  className?: string;
};

export function LotusLogo({
  size = 32,
  variant = "compact",
  mono = false,
  className,
}: Props) {
  const id = useId().replace(/:/g, "");
  const gV = `lotusV-${id}`;
  const gDeep = `lotusDeep-${id}`;
  const gOuter = `lotusOuter-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      className={className}
    >
      {!mono && (
        <defs>
          <linearGradient id={gOuter} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A88AFB" />
            <stop offset="55%" stopColor="#C97CD9" />
            <stop offset="100%" stopColor="#F47AA0" />
          </linearGradient>
          <linearGradient id={gDeep} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B5AE8" />
            <stop offset="55%" stopColor="#A148B8" />
            <stop offset="100%" stopColor="#DA5882" />
          </linearGradient>
          <linearGradient id={gV} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#A88AFB" />
            <stop offset="55%" stopColor="#C97CD9" />
            <stop offset="100%" stopColor="#F47AA0" />
          </linearGradient>
        </defs>
      )}

      {variant === "full" && (
        <>
          {/* outer side petals */}
          <path
            d="M40 14 C26 24 18 38 22 56 C28 60 38 60 40 56 Z"
            fill={mono ? "currentColor" : `url(#${gOuter})`}
            opacity={mono ? 0.35 : 0.55}
          />
          <path
            d="M40 14 C54 24 62 38 58 56 C52 60 42 60 40 56 Z"
            fill={mono ? "currentColor" : `url(#${gOuter})`}
            opacity={mono ? 0.35 : 0.55}
          />
          {/* middle petals */}
          <path
            d="M40 10 C30 22 26 38 30 58 C34 62 40 62 40 58 Z"
            fill={mono ? "currentColor" : `url(#${gDeep})`}
            opacity={mono ? 0.55 : 0.75}
          />
          <path
            d="M40 10 C50 22 54 38 50 58 C46 62 40 62 40 58 Z"
            fill={mono ? "currentColor" : `url(#${gDeep})`}
            opacity={mono ? 0.55 : 0.75}
          />
        </>
      )}

      {variant !== "favicon" && (
        <>
          {variant === "compact" && (
            <>
              <path
                d="M40 10 C30 22 26 38 30 58 C34 62 40 62 40 58 Z"
                fill={mono ? "currentColor" : `url(#${gDeep})`}
                opacity={mono ? 0.55 : 0.75}
              />
              <path
                d="M40 10 C50 22 54 38 50 58 C46 62 40 62 40 58 Z"
                fill={mono ? "currentColor" : `url(#${gDeep})`}
                opacity={mono ? 0.55 : 0.75}
              />
            </>
          )}
          {/* central bud petal */}
          <path
            d="M40 8 C34 22 34 40 36 58 C38 62 42 62 44 58 C46 40 46 22 40 8 Z"
            fill={mono ? "currentColor" : `url(#${gV})`}
          />
        </>
      )}

      {variant === "favicon" && (
        <path
          d="M40 8 C30 22 28 40 32 60 C36 64 44 64 48 60 C52 40 50 22 40 8 Z"
          fill={mono ? "currentColor" : `url(#${gV})`}
        />
      )}

      {variant === "full" && (
        <>
          {/* engraved whisper curl inside the central petal */}
          <path
            d="M40 28 C37 34 37 42 40 46 C42 49 39 52 37 51"
            stroke="#FBF8F4"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity={0.85}
          />
          {/* breath dot */}
          <circle cx="40" cy="56" r="1.6" fill="#FBF8F4" />
        </>
      )}

      {variant === "compact" && (
        <circle cx="40" cy="56" r="2.5" fill="#FBF8F4" />
      )}
    </svg>
  );
}
