/**
 * Input component with glassmorphism styling.
 */
import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(9,14,24,0.7)] px-4 py-2.5 text-sm text-[var(--navy-50)] shadow-sm outline-none transition focus:border-[var(--accent-400)] focus:ring-2 focus:ring-[rgba(62,223,199,0.25)] placeholder:text-[var(--navy-200)]",
        className
      )}
      {...props}
    />
  );
}
