import { cn } from "@/lib/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse-slow rounded-xl bg-gradient-to-r from-[rgba(255,255,255,0.06)] via-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.06)]",
        className
      )}
    />
  );
}

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-6 text-center text-[var(--navy-100)]">
      <p className="text-sm font-semibold text-[var(--navy-50)]">{title}</p>
      {description ? (
        <p className="mt-2 text-sm text-[var(--navy-200)]">{description}</p>
      ) : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

type AlertProps = {
  tone?: "info" | "success" | "warning" | "danger";
  title: string;
  description?: string;
};

const TONE_STYLES: Record<NonNullable<AlertProps["tone"]>, string> = {
  info: "border-[rgba(62,223,199,0.4)] bg-[rgba(62,223,199,0.05)] text-[var(--navy-50)]",
  success: "border-[rgba(36,196,122,0.4)] bg-[rgba(36,196,122,0.05)] text-[var(--navy-50)]",
  warning: "border-[rgba(242,169,59,0.5)] bg-[rgba(242,169,59,0.08)] text-[var(--navy-50)]",
  danger: "border-[rgba(239,71,111,0.5)] bg-[rgba(239,71,111,0.08)] text-[var(--navy-50)]",
};

export function Alert({ tone = "info", title, description }: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 shadow-sm backdrop-blur-md",
        TONE_STYLES[tone]
      )}
    >
      <p className="text-sm font-semibold">{title}</p>
      {description ? (
        <p className="mt-1 text-xs text-[rgba(255,255,255,0.75)]">{description}</p>
      ) : null}
    </div>
  );
}
