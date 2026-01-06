import { cn } from "@/lib/utils/cn";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--ink-200)] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-500)]",
        className
      )}
      {...props}
    />
  );
}
