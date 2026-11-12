import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors disabled:pointer-events-none",
  {
    variants: {
      variant: {
        signal: "bg-signal text-signal-ink hover:bg-[#ffd866]",
        outline: "border border-line bg-panel/60 text-fg hover:border-muted",
        ghost: "text-muted hover:text-fg",
      },
      size: { lg: "h-14 px-7 text-[17px]", md: "h-11 px-5 text-[15px]", sm: "h-9 px-4 text-sm" },
    },
    defaultVariants: { variant: "signal", size: "md" },
  },
);

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {}

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
