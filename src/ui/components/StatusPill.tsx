type Status = "success" | "warning" | "danger" | "info";

const STATUS_COLORS: Record<Status, { bg: string; dot: string }> = {
  success: { bg: "rgba(36,196,122,0.12)", dot: "#24c47a" },
  warning: { bg: "rgba(242,169,59,0.14)", dot: "#f2a93b" },
  danger: { bg: "rgba(239,71,111,0.14)", dot: "#ef476f" },
  info: { bg: "rgba(62,223,199,0.14)", dot: "#3edfc7" },
};

type StatusPillProps = {
  label: string;
  tone?: Status;
};

export function StatusPill({ label, tone = "info" }: StatusPillProps) {
  const { bg, dot } = STATUS_COLORS[tone];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: bg, color: dot }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: dot, boxShadow: `0 0 0 4px ${bg}` }}
      />
      {label}
    </span>
  );
}
