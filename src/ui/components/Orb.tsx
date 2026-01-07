/**
 * Decorative orb with layered gradients used for 3D-inspired hero visuals.
 */
type OrbProps = {
  size?: number;
  className?: string;
  blur?: number;
};

export function Orb({ size = 260, className, blur = 40 }: OrbProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        background:
          "radial-gradient(circle at 30% 30%, rgba(62,223,199,0.55), rgba(15,22,45,0.1) 55%), radial-gradient(circle at 80% 70%, rgba(92,132,255,0.6), rgba(6,9,16,0.1) 60%)",
        borderRadius: "50%",
        opacity: 0.9,
      }}
    />
  );
}
