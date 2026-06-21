"use client";

/**
 * Generate a wa.me deep link for the given content and render a tap
 * target. The wa.me scheme opens WhatsApp (mobile + desktop) with the
 * message pre-filled, including a Sattvah deep-link back into /talk so
 * the receiver lands in context.
 *
 * Usage:
 *   <ShareToWa contentId="post_42" text="Have a look when you can." />
 */
export function ShareToWa({
  contentId,
  text,
  label = "Share on WhatsApp",
}: {
  contentId: string;
  text: string;
  label?: string;
}) {
  const url = buildWaShareUrl(contentId, text);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="share-to-wa"
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full",
        "bg-[#25D366] text-white h-12 px-6 text-base font-medium",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40",
        "shadow-[0_10px_30px_-10px_rgba(37,211,102,0.55)]",
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M20.52 3.48A11.78 11.78 0 0 0 12.05 0C5.51 0 .2 5.3.2 11.84a11.7 11.7 0 0 0 1.62 5.94L0 24l6.4-1.68a11.84 11.84 0 0 0 5.64 1.43h.01c6.54 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.13-3.38-8.43Zm-8.47 18.21h-.01a9.85 9.85 0 0 1-5.02-1.37l-.36-.21-3.8 1 1.01-3.7-.23-.38a9.84 9.84 0 0 1-1.51-5.19c0-5.43 4.42-9.86 9.86-9.86 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.89 6.97c0 5.44-4.43 9.85-9.79 9.85Zm5.4-7.37c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.94 1.15-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.27.17-1.4-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      {label}
    </a>
  );
}

export function buildWaShareUrl(contentId: string, text: string): string {
  const base =
    (typeof window !== "undefined" && window.location.origin) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://sattvah.ai";
  const deepLink = `${base}/talk?source=wa&content=${encodeURIComponent(contentId)}`;
  const msg = `${text} ${deepLink}`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}
