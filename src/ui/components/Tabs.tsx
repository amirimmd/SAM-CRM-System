import { cn } from "@/lib/utils/cn";

type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  items: TabItem[];
  active: string;
  onChange?: (id: string) => void;
  className?: string;
};

export function Tabs({ items, active, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-1",
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            onClick={() => onChange?.(item.id)}
            className={cn(
              "min-w-[96px] rounded-full px-4 py-2 text-sm font-semibold transition",
              isActive
                ? "bg-[var(--accent-600)] text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]"
                : "text-[var(--navy-200)] hover:text-[var(--navy-50)]"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
