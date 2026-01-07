type TimelineItem = {
  title: string;
  description?: string;
  status?: "pending" | "active" | "done";
  timestamp?: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-4">
      <div className="absolute left-1 top-1 bottom-1 w-px bg-[rgba(255,255,255,0.1)]" />
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.title} className="relative flex gap-3">
            <div className="absolute left-[-1.1rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.08)] text-[10px] font-bold text-white">
              {index + 1}
            </div>
            <div className="rounded-xl bg-[rgba(255,255,255,0.04)] px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[var(--navy-50)]">{item.title}</p>
                {item.timestamp ? (
                  <span className="text-[11px] text-[var(--navy-200)]">{item.timestamp}</span>
                ) : null}
              </div>
              {item.description ? (
                <p className="mt-1 text-xs text-[var(--navy-200)]">{item.description}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
