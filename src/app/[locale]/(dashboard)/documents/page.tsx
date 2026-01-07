// Documents page: upload dropzone and recent items.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";

type PageProps = {
  params: { locale: Locale };
};

export default function DocumentsPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="Documents"
      subtitle="Secure upload and retrieval of shipping documentation."
    >
      <Card className="glass-panel space-y-4">
        <div className="rounded-2xl border border-dashed border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] p-6 text-center">
          <p className="text-sm font-semibold text-white">
            Drag and drop files or upload
          </p>
          <p className="mt-2 text-xs text-[var(--navy-200)]">
            Supported: PDF, XLSX, DOCX, JPG (max 25MB)
          </p>
          <button className="mt-4 rounded-full bg-[var(--navy-900)] px-4 py-2 text-xs font-semibold text-white">
            Upload files
          </button>
        </div>
        <div className="space-y-3 text-sm text-[var(--navy-100)]">
          <p>Commercial invoice · SAM-2043 · Awaiting approval</p>
          <p>Packing list · SAM-1982 · Verified</p>
          <p>Insurance policy · SAM-1901 · Requested</p>
        </div>
      </Card>
    </DashboardShell>
  );
}
