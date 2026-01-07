// Dashboard shell used by user and admin areas.
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";
import { LocaleSwitch } from "@/ui/components/LocaleSwitch";

type DashboardShellProps = {
  locale: Locale;
  title: string;
  subtitle?: string;
  variant?: "user" | "admin";
  children: React.ReactNode;
};

const USER_NAV = [
  { label: "Overview", href: "dashboard" },
  { label: "Shipments", href: "shipments" },
  { label: "Orders", href: "orders" },
  { label: "Messages", href: "messages" },
  { label: "Documents", href: "documents" },
  { label: "Settings", href: "settings" },
];

const ADMIN_NAV = [
  { label: "Admin overview", href: "admin" },
  { label: "Users", href: "admin/users" },
  { label: "Shipments", href: "admin/shipments" },
  { label: "Content", href: "admin/content" },
  { label: "Analytics", href: "admin/analytics" },
  { label: "CRM", href: "admin/crm" },
  { label: "Messages", href: "admin/messages" },
  { label: "System", href: "admin/system" },
];

export function DashboardShell({
  locale,
  title,
  subtitle,
  variant = "user",
  children,
}: DashboardShellProps) {
  const navItems = variant === "admin" ? ADMIN_NAV : USER_NAV;
  const isRtl = locale === "fa";

  return (
    <div className="min-h-screen bg-[var(--navy-1000)] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="glass-panel h-fit rounded-2xl p-5">
          <div className={cn("flex items-center gap-3", isRtl && "flex-row-reverse")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--navy-900)] text-xs font-bold text-white">
              {variant === "admin" ? "ADM" : "SAM"}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {variant === "admin" ? "Admin Center" : "Customer Portal"}
              </p>
              <p className="text-xs text-[var(--navy-200)]">Role-based access</p>
            </div>
          </div>
          <nav className="mt-6 space-y-2 text-sm font-semibold text-[var(--navy-100)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="block rounded-xl px-3 py-2 transition hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-6">
          <header className="glass-panel rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="mt-1 text-sm text-[var(--navy-200)]">{subtitle}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <LocaleSwitch />
                <button className="rounded-full border border-[rgba(255,255,255,0.12)] px-3 py-1 text-xs font-semibold text-[var(--navy-100)]">
                  Secure session
                </button>
              </div>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
