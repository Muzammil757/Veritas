import Link from "next/link";

export default function VeritasLogo({ size = "default" }: { size?: "small" | "default" }) {
  const iconSize = size === "small" ? 22 : 28;
  const textSize = size === "small" ? "text-lg" : "text-2xl";

  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="VERITAS — Home">
      {/* Logo mark: a V formed from two converging investigation lines, with a small eye at apex */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-opacity duration-300 group-hover:opacity-80"
        aria-hidden="true"
      >
        {/* Outer case-file border */}
        <rect x="1" y="1" width="26" height="26" rx="1" stroke="#b8923a" strokeWidth="0.75" opacity="0.6" />
        {/* Left arm of V */}
        <line x1="4" y1="5" x2="14" y2="21" stroke="#b8923a" strokeWidth="1.5" strokeLinecap="round" />
        {/* Right arm of V */}
        <line x1="24" y1="5" x2="14" y2="21" stroke="#b8923a" strokeWidth="1.5" strokeLinecap="round" />
        {/* Apex eye */}
        <circle cx="14" cy="21" r="2" fill="#b8923a" />
        {/* String from top corners meeting at center */}
        <line x1="4" y1="5" x2="24" y2="5" stroke="#b8923a" strokeWidth="0.5" opacity="0.3" />
        {/* Center mark on top bar */}
        <circle cx="14" cy="5" r="1" fill="#b8923a" opacity="0.4" />
      </svg>

      <span
        className={`font-display ${textSize} tracking-[0.28em] text-[var(--color-cream)] transition-colors duration-300 group-hover:text-[var(--color-gold)]`}
      >
        VERITAS
      </span>
    </Link>
  );
}
