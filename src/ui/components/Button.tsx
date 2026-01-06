import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const VARIANT_STYLES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--ink-900)] text-white hover:bg-[var(--ink-800)] focus-visible:outline-[var(--ink-900)]",
  secondary:
    "border border-[var(--ink-200)] bg-white text-[var(--ink-800)] hover:border-[var(--ink-700)] hover:text-[var(--ink-900)]",
  ghost: "text-[var(--ink-700)] hover:text-[var(--ink-900)] hover:bg-white/60",
};

const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

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
