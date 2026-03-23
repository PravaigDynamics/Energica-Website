import { cn } from "@/lib/utils";

interface FeatureBlockProps {
  /** Decorative step counter e.g. "01" */
  number?: string;
  title: string;
  body: string;
  /** Small red tag label displayed above the title */
  tag?: string;
  className?: string;
}

/**
 * Feature block — numbered, titled row used in tech/feature lists.
 * Stacks a decorative number, optional tag, bold title and body paragraph.
 * Body paragraph is capped at 700px (--prose-max) for readability.
 */
export function FeatureBlock({ number, title, body, tag, className }: FeatureBlockProps) {
  return (
    <div
      className={cn(
        "flex gap-6 py-6 border-b border-white/[0.06] last:border-0",
        className
      )}
    >
      {number && (
        <span className="font-display text-5xl text-white/[0.20] flex-shrink-0 w-14 leading-none select-none">
          {number}
        </span>
      )}
      <div style={{ maxWidth: "var(--prose-max)" }}>
        {tag && (
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#78BE20] mb-1">
            {tag}
          </p>
        )}
        <h3 className="font-display text-2xl text-white mb-2 leading-[1.1]">
          {title}
        </h3>
        <p className="text-white/65 text-[length:var(--text-body)] leading-[1.6]">{body}</p>
      </div>
    </div>
  );
}
