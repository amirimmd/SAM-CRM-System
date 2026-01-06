import { cn } from "@/lib/utils/cn";

type DataTableProps = React.TableHTMLAttributes<HTMLTableElement>;

export function DataTable({ className, ...props }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--ink-200)] bg-white">
      <table className={cn("min-w-full text-sm", className)} {...props} />
    </div>
  );
}
