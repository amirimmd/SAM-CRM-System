import { cn } from "@/lib/utils/cn";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(9,14,24,0.7)] px-4 py-2.5 text-sm text-[var(--navy-50)] shadow-sm outline-none transition focus:border-[var(--accent-400)] focus:ring-2 focus:ring-[rgba(62,223,199,0.25)]",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
