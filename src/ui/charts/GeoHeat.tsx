type GeoHeatProps = {
  regions: { name: string; value: number }[];
};

export function GeoHeat({ regions }: GeoHeatProps) {
  const max = Math.max(...regions.map((r) => r.value), 1);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[radial-gradient(120%_140%_at_20%_20%,rgba(62,223,199,0.18),rgba(12,18,32,0.9))] p-4">
      <div className="absolute inset-0 opacity-30 mix-blend-screen">
        <svg viewBox="0 0 200 100" className="h-full w-full text-[rgba(255,255,255,0.3)]">
          <path
            d="M20 40c15-12 32-18 47-18 18 0 32 14 48 14 14 0 30-9 46-9 14 0 27 6 40 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <circle cx="32" cy="42" r="2" fill="currentColor" />
          <circle cx="80" cy="36" r="2" fill="currentColor" />
          <circle cx="120" cy="52" r="2" fill="currentColor" />
          <circle cx="170" cy="48" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="relative grid gap-2 text-sm text-[var(--navy-50)]">
        {regions.map((region) => {
          const intensity = Math.max(region.value / max, 0.12);
          return (
            <div
              key={region.name}
              className="flex items-center justify-between rounded-xl bg-[rgba(255,255,255,0.04)] px-3 py-2"
              style={{
                boxShadow: `0 0 0 1px rgba(62,223,199,${0.3 * intensity})`,
              }}
            >
              <span>{region.name}</span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-12 rounded-full bg-[rgba(255,255,255,0.06)]">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${Math.min(intensity * 100, 100)}%`,
                      background: "linear-gradient(90deg, #1ec7ad, #5e4bff)",
                    }}
                  />
                </span>
                <strong>{region.value}</strong>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
