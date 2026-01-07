import { cn } from "@/lib/utils/cn";

type DataTableProps = React.TableHTMLAttributes<HTMLTableElement>;

export function DataTable({ className, ...props }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(9,14,24,0.7)] shadow-[0_25px_60px_-35px_rgba(0,0,0,0.8)]">
      <table className={cn("min-w-full text-sm text-[var(--navy-50)]", className)} {...props} />
    </div>
  );
}
