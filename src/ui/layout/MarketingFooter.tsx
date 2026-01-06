import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import { Container } from "@/ui/layout/Container";
import { cn } from "@/lib/utils/cn";

type MarketingFooterProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

const FOOTER_LINKS: Array<keyof Dictionary["nav"]> = [
  "services",
  "calculator",
  "request",
  "updates",
  "brands",
  "blog",
  "contact",
];

export function MarketingFooter({ locale, nav }: MarketingFooterProps) {
  const isRtl = locale === "fa";

  return (
    <footer className="border-t border-[var(--ink-200)] bg-white">
      <Container className="grid gap-8 py-10 md:grid-cols-[2fr_3fr]">
        <div className={cn("space-y-3", isRtl && "text-right")}>
          <p className="text-lg font-semibold text-[var(--ink-900)]">
            SAM Logistics & CRM
          </p>
          <p className="text-sm text-[var(--ink-500)]">
            Enterprise logistics, CRM visibility, and shipment intelligence for
            global trade teams.
          </p>
          <p className="text-xs text-[var(--ink-500)]">
            Guangzhou, China · 24/7 operations hub
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3 text-sm font-semibold text-[var(--ink-700)]">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item}
                href={`/${locale}/${item}`}
                className="block transition hover:text-[var(--ink-900)]"
              >
                {nav[item]}
              </Link>
            ))}
          </div>
          <div className="rounded-2xl border border-[var(--ink-200)] bg-[var(--mist-100)] p-5 text-sm text-[var(--ink-700)]">
            <p className="font-semibold text-[var(--ink-900)]">Operations desk</p>
            <p className="mt-2">ops@samlogistics.com</p>
            <p>+86 20 0000 0000</p>
            <p className="mt-4 text-xs text-[var(--ink-500)]">
              Secure communication and SLA-backed response times.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
