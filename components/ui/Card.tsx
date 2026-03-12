import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Whether to show a red border glow on hover — default true */
  hover?: boolean;
}

/**
 * Reusable card primitive — dark background, subtle border.
 * Hover state animates the border toward accent red.
 */
export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 border border-white/[0.06] bg-[#0a0a0a]",
        hover && "hover:border-[#78BE20]/25 transition-colors duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
