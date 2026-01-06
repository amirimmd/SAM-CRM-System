import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";

type PageProps = {
  params: { locale: Locale };
};

export default function AdminUsersPage({ params }: PageProps) {
  return (
    <DashboardShell
      locale={params.locale}
      title="User management"
      subtitle="Roles, access levels, and active sessions."
      variant="admin"
    >
      <Card className="p-0">
        <div className="border-b border-[var(--ink-200)] px-6 py-4">
          <h2 className="text-sm font-semibold text-[var(--ink-900)]">Users</h2>
        </div>
        <DataTable>
          <thead className="bg-[var(--mist-100)] text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--ink-700)]">
            {[
              ["Mostafa Rahimi", "Admin", "SAM Logistics", "Active"],
              ["Li Chen", "Coordinator", "SAM Logistics", "Active"],
              ["Sara Noor", "Customer", "Mira Home", "Invited"],
            ].map((row) => (
              <tr key={row[0]} className="border-t border-[var(--ink-200)]">
                {row.map((cell) => (
                  <td key={cell} className="px-6 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Card>
    </DashboardShell>
  );
}
