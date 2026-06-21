/**
 * Comparison table, Sattvah vs TagMango (and friends). Server-rendered.
 * Rows are intentionally human ("Coach Brief: weekly client summaries")
 * not feature-spec.
 */
import { Check, Minus } from "lucide-react";

export type ComparisonRow = {
  capability: string;
  sattvah: boolean | string;
  tagmango: boolean | string;
  exly?: boolean | string;
};

export const DEFAULT_ROWS: ComparisonRow[] = [
  { capability: "Community + memory + payments in one app", sattvah: true, tagmango: false },
  { capability: "AI co-pilot built in (no extra ChatGPT tab)", sattvah: true, tagmango: false },
  { capability: "Coach Brief: weekly summaries of every client", sattvah: true, tagmango: false },
  { capability: "WhatsApp Cloud API broadcasts and reminders", sattvah: true, tagmango: "Add-on" },
  { capability: "Daily check-in + diary baked into the client app", sattvah: true, tagmango: false },
  { capability: "Razorpay Route weekly payouts", sattvah: true, tagmango: true },
  { capability: "Live Zoom sessions inside the app", sattvah: true, tagmango: true },
  { capability: "10 Indian languages on the client side", sattvah: true, tagmango: "English only" },
  { capability: "White-label landing at your.sattvah handle", sattvah: true, tagmango: true },
  { capability: "Setup fee", sattvah: "Rs 0", tagmango: "Rs 25,000+" },
  { capability: "Monthly platform fee", sattvah: "From Rs 0", tagmango: "Rs 5,000+" },
  { capability: "Commission on revenue", sattvah: "2-12%", tagmango: "10%" },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="h-5 w-5 text-accent inline-block" aria-label="yes" />;
  if (v === false) return <Minus className="h-5 w-5 text-foreground/30 inline-block" aria-label="no" />;
  return <span className="text-sm text-foreground/80">{v}</span>;
}

export function ComparisonTable({ rows = DEFAULT_ROWS }: { rows?: ComparisonRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/80 backdrop-blur">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border/60">
            <th className="px-5 md:px-7 py-5 text-sm font-semibold text-foreground/80">Capability</th>
            <th className="px-5 md:px-7 py-5 text-sm font-semibold text-foreground text-center">
              Sattvah Labs
            </th>
            <th className="px-5 md:px-7 py-5 text-sm font-semibold text-foreground/70 text-center">
              TagMango
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.capability}
              className={i % 2 === 0 ? "bg-foreground/[0.015]" : ""}
            >
              <td className="px-5 md:px-7 py-4 text-sm md:text-[15px] text-foreground/85 leading-relaxed">
                {r.capability}
              </td>
              <td className="px-5 md:px-7 py-4 text-center">
                <Cell v={r.sattvah} />
              </td>
              <td className="px-5 md:px-7 py-4 text-center">
                <Cell v={r.tagmango} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
