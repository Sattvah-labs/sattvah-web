import Image from "next/image";

type Props = {
  size?: number;
  mono?: boolean;
  className?: string;
};

export function SattvahMark({ size = 32, mono = false, className }: Props) {
  const src = mono ? "/sattvah-mark-mono.svg" : "/favicon.svg";
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
