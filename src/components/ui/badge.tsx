import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-fg",
        className,
      )}
      {...props}
    />
  );
}
