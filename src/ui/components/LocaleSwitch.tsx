"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

type LocaleSwitchProps = {
  className?: string;
};

export function LocaleSwitch({ className }: LocaleSwitchProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segments = pathname.split("/");
  const current = segments[1];
  const target =
    current === SUPPORTED_LOCALES[0] ? SUPPORTED_LOCALES[1] : SUPPORTED_LOCALES[0];
  const nextPath =
    current && SUPPORTED_LOCALES.includes(current as typeof SUPPORTED_LOCALES[number])
      ? ["", target, ...segments.slice(2)].join("/")
      : `/${target}`;
  const query = searchParams.toString();
  const href = query ? `${nextPath}?${query}` : nextPath;

  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border border-[var(--ink-200)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-700)]",
        className
      )}
    >
      {target.toUpperCase()}
    </Link>
  );
}
