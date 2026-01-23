"use client";

/**
 * Responsive navigation with mobile drawer menu and locale switch.
 */
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/ui/components/Button";
import { LinkButton } from "@/ui/components/LinkButton";
import { LocaleSwitch } from "@/ui/components/LocaleSwitch";

type NavigationProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  cta: Dictionary["common"];
};

const NAV_ITEMS: Array<keyof Dictionary["nav"]> = [
  "home",
  "services",
  "pricing",
  "tracking",
  "blog",
  "about",
  "contact",
];

export function Navigation({ locale, nav, cta }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const isRtl = locale === "fa";

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(6,9,16,0.85)] backdrop-blur">
      <div className="grid-shell flex items-center justify-between py-4">
        <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse")}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-500)] text-xs font-bold text-white">
            SAM
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">SAM Logistics</p>
            <p className="text-xs text-[var(--navy-200)]">China -> Global</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--navy-100)] lg:flex">
          {NAV_ITEMS.map((item) => {
            const href = item === "home" ? `/${locale}` : `/${locale}/${item}`;
            return (
              <Link key={item} href={href} className="transition hover:text-white">
                {nav[item]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitch />
          <LinkButton variant="ghost" href={`/${locale}/auth/login`}>
            {nav.login}
          </LinkButton>
          <LinkButton href={`/${locale}/request`}>{cta.ctaPrimary}</LinkButton>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-white transition hover:bg-[rgba(255,255,255,0.08)] lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 rounded-full bg-white" />
            <span className="h-0.5 w-5 rounded-full bg-white" />
            <span className="h-0.5 w-5 rounded-full bg-white" />
          </div>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-[rgba(6,9,16,0.7)] backdrop-blur transition",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-0 z-50 flex",
          isRtl ? "justify-start" : "justify-end"
        )}
      >
        <div
          className={cn(
            "h-full w-full max-w-sm bg-[rgba(6,9,16,0.95)] p-6 text-white shadow-2xl transition",
            open ? "translate-x-0" : isRtl ? "-translate-x-full" : "translate-x-full"
          )}
        >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Navigation</p>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <div className="mt-6 space-y-4 text-sm font-semibold">
          {NAV_ITEMS.map((item) => {
            const href = item === "home" ? `/${locale}` : `/${locale}/${item}`;
            return (
              <Link
                key={item}
                href={href}
                className="block rounded-xl px-3 py-2 text-[var(--navy-100)] transition hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {nav[item]}
              </Link>
            );
          })}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <LocaleSwitch />
          <LinkButton
            variant="ghost"
            href={`/${locale}/auth/login`}
            onClick={() => setOpen(false)}
          >
            {nav.login}
          </LinkButton>
          <LinkButton href={`/${locale}/request`} onClick={() => setOpen(false)}>
            {cta.ctaPrimary}
          </LinkButton>
        </div>
        </div>
      </div>
    </header>
  );
}
