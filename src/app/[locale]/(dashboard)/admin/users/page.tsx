// Admin users: role management table with filters.
import type { Locale } from "@/lib/i18n/config";
import { Card } from "@/ui/components/Card";
import { DashboardShell } from "@/ui/layout/DashboardShell";
import { DataTable } from "@/ui/tables/DataTable";
import { Input } from "@/ui/forms/Input";
import { Select } from "@/ui/forms/Select";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function AdminUsersPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <DashboardShell
      locale={locale}
      title="User management"
      subtitle="Roles, access levels, and active sessions."
      variant="admin"
    >
      <Card className="p-0 glass-panel">
        <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
          <h2 className="text-sm font-semibold text-white">Users</h2>
        </div>
        <div className="flex flex-wrap gap-3 border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
          <Input placeholder="Search user" className="w-full max-w-xs" />
          <Select className="w-full max-w-xs">
            <option>All roles</option>
            <option>Admin</option>
            <option>Coordinator</option>
            <option>Customer</option>
          </Select>
        </div>
        <DataTable>
          <thead className="bg-[rgba(255,255,255,0.02)] text-xs uppercase tracking-[0.2em] text-[var(--navy-200)]">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[var(--navy-50)]">
            {[
              ["Mostafa Rahimi", "Admin", "SAM Logistics", "Active"],
              ["Li Chen", "Coordinator", "SAM Logistics", "Active"],
              ["Sara Noor", "Customer", "Mira Home", "Invited"],
            ].map((row) => (
              <tr key={row[0]} className="border-t border-[rgba(255,255,255,0.06)]">
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
