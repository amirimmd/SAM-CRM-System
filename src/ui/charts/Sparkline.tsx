type SparklineProps = {
  points: number[];
  color?: string;
  height?: number;
};

export function Sparkline({ points, color = "#3edfc7", height = 42 }: SparklineProps) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const spread = max - min || 1;
  const step = 100 / Math.max(points.length - 1, 1);

  const path = points
    .map((value, index) => {
      const x = index * step;
      const y = 100 - ((value - min) / spread) * 100;
      return `${index === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" role="presentation" style={{ height }}>
      <defs>
        <linearGradient id="sparklineGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.8} />
          <stop offset="100%" stopColor={color} stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <path d={`${path}`} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path
        d={`${path} L 100 100 L 0 100 Z`}
        fill="url(#sparklineGradient)"
        opacity={0.4}
      />
    </svg>
  );
}
