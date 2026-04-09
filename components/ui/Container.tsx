import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout container — max-width 1400px, centred, responsive horizontal padding.
 * Use as the inner wrapper for every page section.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("w-full max-w-[1280px] mx-auto px-[clamp(24px,4vw,64px)]", className)}>
      {children}
    </div>
  );
}
