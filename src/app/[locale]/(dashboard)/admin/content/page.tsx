// Admin content: pages and media summary.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale };
};

export default function AdminContentPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Content management"
      subtitle="Marketing pages, media, and SEO assets."
      variant="admin"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="glass-panel space-y-3">
          <p className="text-sm font-semibold text-white">Pages</p>
          <p className="text-sm text-[var(--navy-100)]">
            Home · Services · Blog · Contact
          </p>
        </Card>
        <Card className="glass-panel space-y-3">
          <p className="text-sm font-semibold text-white">
            Media library
          </p>
          <p className="text-sm text-[var(--navy-100)]">
            128 images · 42 videos · 12 documents
          </p>
        </Card>
      </div>
    </DashboardShell>
  );
}
