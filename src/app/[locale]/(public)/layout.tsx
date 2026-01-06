import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { CrmTracker } from "@/ui/components/CrmTracker";
import { MarketingHeader } from "@/ui/layout/MarketingHeader";
import { MarketingFooter } from "@/ui/layout/MarketingFooter";

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default async function PublicLayout({ children, params }: LayoutProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="min-h-screen bg-[var(--sand-50)]">
      <CrmTracker />
      <MarketingHeader
        locale={params.locale}
        nav={dictionary.nav}
        cta={dictionary.common}
      />
      {children}
      <MarketingFooter locale={params.locale} nav={dictionary.nav} />
    </div>
  );
}
