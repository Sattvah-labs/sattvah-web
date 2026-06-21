/**
 * Brand mark renderer.
 *
 * All brand assets live under public/brand/. To rebrand: replace the
 * files in that directory (same filenames, same sizes) - no code change.
 */
import Image from "next/image";

type Props = {
  size?: number;
  mono?: boolean;
  className?: string;
};

export function BrandMark({ size = 32, mono = false, className }: Props) {
  const src = mono ? "/brand/mark-mono.svg" : "/brand/mark.svg";
  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt=""
      aria-hidden
      className={className}
      priority
    />
  );
}
