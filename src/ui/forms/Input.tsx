import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-[var(--ink-200)] bg-white px-4 py-2.5 text-sm text-[var(--ink-900)] shadow-sm outline-none transition focus:border-[var(--accent-500)] focus:ring-2 focus:ring-[var(--accent-200)]",
        className
      )}
      {...props}
    />
  );
}
