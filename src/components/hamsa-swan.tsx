/**
 * Sattvah Hamsa Swan mark — origami / faceted swan in the sunset palette.
 *
 * "Hamsa" in Sanskrit is the swan, and it's the symbol of sattvic balance
 * (essence, purity). Nine polygon facets give it the same light-on-folded-
 * paper feel as the Freelancer-style mark the user picked.
 *
 * Single SVG, no gradients defs (each facet is solid-filled), so this
 * mark can be inlined anywhere and stays crisp at every size.
 */

type Props = {
  size?: number;
  mono?: boolean;
  className?: string;
};

export function HamsaSwan({ size = 32, mono = false, className }: Props) {
  if (mono) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        aria-hidden
        className={className}
      >
        <polygon points="20,110 80,135 140,110" fill="currentColor" opacity="0.70" />
        <polygon points="20,110 140,110 110,80" fill="currentColor" opacity="0.55" />
        <polygon points="20,110 110,80 60,80" fill="currentColor" opacity="0.65" />
        <polygon points="60,80 110,80 95,55" fill="currentColor" opacity="0.75" />
        <polygon points="95,55 110,80 118,40" fill="currentColor" opacity="0.60" />
        <polygon points="95,55 118,40 105,30" fill="currentColor" opacity="0.85" />
        <polygon points="105,30 118,40 132,28" fill="currentColor" opacity="0.50" />
        <polygon points="118,40 132,28 142,38" fill="currentColor" opacity="0.90" />
        <polygon points="60,80 110,80 90,60" fill="currentColor" opacity="0.55" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden
      className={className}
    >
      <polygon points="20,110 80,135 140,110" fill="#7B5AE8" />
      <polygon points="20,110 140,110 110,80" fill="#A88AFB" />
      <polygon points="20,110 110,80 60,80" fill="#C97CD9" />
      <polygon points="60,80 110,80 95,55" fill="#9B6AE0" />
      <polygon points="95,55 110,80 118,40" fill="#A148B8" />
      <polygon points="95,55 118,40 105,30" fill="#7B5AE8" />
      <polygon points="105,30 118,40 132,28" fill="#F47AA0" />
      <polygon points="118,40 132,28 142,38" fill="#DA5882" />
      <polygon points="60,80 110,80 90,60" fill="#C97CD9" />
    </svg>
  );
}
