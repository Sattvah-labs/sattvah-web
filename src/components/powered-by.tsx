/**
 * "Powered by Sattvah Labs" footer block. Rendered on every coach
 * tenant's surfaces, never on Sattvah's own pages.
 *
 * Usage: pass `tenant.parentLabsAttribution` from the API response
 * (CoachProfile.parentLabsAttribution in this codebase). If true,
 * render the block; if false, render nothing.
 */
import Link from "next/link";

export function PoweredBy({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="border-t border-border/40 bg-background/60">
      <div className="container py-5 flex flex-col-reverse gap-2 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
        <p>
          This space is run by an independent coach. Sattvah Labs hosts the
          tech, not the practice.
        </p>
        <p>
          Powered by{" "}
          <Link
            href="/labs"
            className="text-foreground/80 underline underline-offset-4 hover:text-foreground"
          >
            Sattvah Labs
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
