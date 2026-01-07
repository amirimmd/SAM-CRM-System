import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { cn } from "@/lib/utils/cn";
import { LinkButton } from "@/ui/components/LinkButton";
import { Container } from "@/ui/layout/Container";
import { LocaleSwitch } from "@/ui/components/LocaleSwitch";

type MarketingHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  cta: Dictionary["common"];
};

const NAV_ITEMS: Array<keyof Dictionary["nav"]> = [
  "home",
  "services",
  "pricing",
  "tracking",
  "calculator",
  "request",
  "blog",
  "about",
  "contact",
];

export function MarketingHeader({ locale, nav, cta }: MarketingHeaderProps) {
  const isRtl = locale === "fa";

  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(6,9,16,0.8)] backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-5">
        <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse")}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-500)] text-xs font-bold text-white">
            SAM
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">SAM Logistics</p>
            <p className="text-xs text-[var(--navy-200)]">China → Global</p>
          </div>
        </div>
        <nav className="hidden items-center gap-4 text-sm font-semibold text-[var(--navy-100)] lg:flex">
          {NAV_ITEMS.map((item) => {
            const href = item === "home" ? `/${locale}` : `/${locale}/${item}`;
            return (
              <Link
                key={item}
                href={href}
                className="transition hover:text-white"
              >
                {nav[item]}
              </Link>
            );
          })}
        </nav>
        <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse")}>
          <LocaleSwitch />
          <LinkButton
            href={`/${locale}/contact`}
            variant="secondary"
            className="hidden md:inline-flex"
          >
            {cta.ctaSecondary}
          </LinkButton>
          <LinkButton href={`/${locale}/auth/login`} variant="ghost">
            {nav.login}
          </LinkButton>
          <LinkButton href={`/${locale}/request`}>{cta.ctaPrimary}</LinkButton>
        </div>
      </Container>
    </header>
  );
}
