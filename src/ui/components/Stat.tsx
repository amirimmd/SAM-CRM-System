type StatProps = {
  label: string;
  value: string;
  helper?: string;
  accent?: "accent" | "success" | "warning" | "danger";
};

const ACCENT_BG: Record<NonNullable<StatProps["accent"]>, string> = {
  accent: "from-[rgba(62,223,199,0.2)] to-[rgba(94,75,255,0.15)]",
  success: "from-[rgba(36,196,122,0.25)] to-[rgba(12,18,32,0.1)]",
  warning: "from-[rgba(242,169,59,0.25)] to-[rgba(12,18,32,0.1)]",
  danger: "from-[rgba(239,71,111,0.25)] to-[rgba(12,18,32,0.1)]",
};

export function Stat({ label, value, helper, accent = "accent" }: StatProps) {
  return (
    <div
      className={`rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-br ${ACCENT_BG[accent]} px-5 py-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]`}
    >
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--navy-200)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--navy-50)]">{value}</p>
      {helper ? <p className="mt-1 text-sm text-[var(--navy-200)]">{helper}</p> : null}
    </div>
  );
}
