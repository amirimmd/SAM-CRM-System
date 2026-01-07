import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const VARIANT_STYLES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--navy-900)] text-white hover:bg-[var(--navy-800)] focus-visible:outline-[var(--navy-900)] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.6)]",
  secondary:
    "border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.06)] text-[var(--navy-50)] hover:border-[rgba(255,255,255,0.32)] hover:bg-[rgba(255,255,255,0.14)]",
  ghost: "text-[var(--navy-100)] hover:text-[var(--navy-50)] hover:bg-[rgba(255,255,255,0.05)]",
  danger:
    "bg-[var(--danger-500)] text-white hover:bg-[#d93b61] focus-visible:outline-[var(--danger-500)] shadow-[0_15px_40px_-20px_rgba(239,71,111,0.7)]",
};

const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClasses(
  variant: NonNullable<ButtonProps["variant"]>,
  className?: string
) {
  return cn(BASE_STYLES, VARIANT_STYLES[variant], className);
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  );
}
