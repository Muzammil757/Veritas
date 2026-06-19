"use client";

import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/cases")}
      className="group relative inline-flex items-center gap-4 cursor-pointer"
      aria-label="Start Investigation — proceed to cases"
    >
      {/* Outer frame */}
      <span
        className="absolute inset-0 border border-[var(--color-gold-dim)] opacity-40 transition-opacity duration-500 group-hover:opacity-80"
        style={{ transform: "translate(4px, 4px)" }}
      />
      {/* Button body */}
      <span
        className="relative z-10 flex items-center gap-4 px-10 py-4 bg-transparent border border-[var(--color-gold)] transition-all duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-black)]"
        style={{ borderColor: "var(--color-gold)" }}
      >
        {/* Arrow indicator */}
        <span className="w-6 h-px bg-[var(--color-gold)] transition-all duration-300 group-hover:w-8" />
        <span className="font-display text-xl tracking-[0.35em] text-[var(--color-cream)] transition-colors duration-300">
          START INVESTIGATION
        </span>
        <span className="w-6 h-px bg-[var(--color-gold)] transition-all duration-300 group-hover:w-8" />
      </span>
    </button>
  );
}
