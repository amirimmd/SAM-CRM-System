// این فایل فقط باید Children را رندر کند تا تداخلی با لاگین نداشته باشد
export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
