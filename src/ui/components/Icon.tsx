/**
 * Simple logistics-inspired icon set using inline SVG.
 * Icons are optimized for monochrome and accent overlays.
 */
type IconName =
  | "plane"
  | "ship"
  | "shield"
  | "radar"
  | "globe"
  | "chat"
  | "pulse";

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

export function Icon({ name, className, size = 20 }: IconProps) {
  const common = {
    width: size,
    height: size,
    className,
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  switch (name) {
    case "plane":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M2 12l20-6-6 6 6 6-20-6" />
          <path d="M8 12l2 8" />
        </svg>
      );
    case "ship":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 10h18l-2 8H5z" />
          <path d="M7 6h10l1 4H6z" />
          <path d="M9 6V4h6v2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
          <path d="M12 9v6" />
          <path d="M9.5 11h5" />
        </svg>
      );
    case "radar":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 12l7-7" />
          <path d="M12 5v7h7" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 3 2.5 15 0 18" />
          <path d="M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 5h16v9H7l-3 3z" />
          <path d="M8 10h8" />
          <path d="M8 7h5" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M3 12h4l2-5 4 10 2-5h6" />
        </svg>
      );
    default:
      return null;
  }
}
