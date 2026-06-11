"use client";

type EvidenceBoardProps = {
  image?: string;
  brightness?: number; // 0-1
  blurPx?: number; // px
  contrast?: number; // multiplier
  saturate?: number; // multiplier
  overlayOpacity?: number; // 0-1
  vignette?: boolean;
};

export default function EvidenceBoard({
  image = "/images/detective-office.jpg",
  brightness = 0.81,
  blurPx = 0,
  contrast = 1.1,
  saturate = 0.99,
  overlayOpacity = 0.5,
  vignette = true,
}: EvidenceBoardProps) {
  const filter = `brightness(${brightness}) saturate(${saturate}) blur(${blurPx}px) contrast(${contrast})`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter,
          transform: "scale(1.02)",
        }}
      />

      {/* Dark overlay to keep content readable; opacity adjustable per page */}
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />

      {/* Subtle screen grain / lamp speculars */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.04), transparent 18%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02), transparent 20%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vertical ambient gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/95" />

      {/* Optional vignette around edges */}
      {vignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      )}
    </div>
  );
}
