import Link from "next/link";
import { buttonClasses } from "@/ui/components/Button";

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function LinkButton({
  href,
  variant = "primary",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...props} />
  );
}
