type BarChartProps = {
  data: { label: string; value: number }[];
  color?: string;
  max?: number;
};

export function BarChart({ data, color = "#1ec7ad", max }: BarChartProps) {
  const maxValue = max ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="grid gap-2">
      {data.map((item) => {
        const width = Math.max((item.value / maxValue) * 100, 6);
        return (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs text-[var(--navy-200)]">
              <span>{item.label}</span>
              <span className="text-[var(--navy-50)] font-semibold">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)]">
              <div
                className="h-full rounded-full shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]"
                style={{
                  width: `${width}%`,
                  background: `linear-gradient(90deg, ${color}, rgba(62,223,199,0.6))`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
