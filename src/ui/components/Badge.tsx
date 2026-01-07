import { cn } from "@/lib/utils/cn";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--navy-200)] shadow-[0_10px_20px_-12px_rgba(0,0,0,0.5)]",
        className
      )}
      {...props}
    />
  );
}
