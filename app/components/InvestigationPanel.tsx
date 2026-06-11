"use client";

import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function InvestigationPanel({ open, onClose, title, subtitle, children }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop: subtle dark + blur */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(6,6,6,0.35)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 mx-6"
        style={{ width: "75vw", height: "75vh", maxWidth: "1100px", maxHeight: "920px" }}
      >
        <div
          className="h-full w-full overflow-auto"
          style={{
            background: "rgba(12,10,8,0.88)",
            border: "1px solid rgba(184,146,58,0.9)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            borderRadius: "4px",
            transform: "translateZ(0)",
            transition: "transform 240ms ease, opacity 240ms ease",
            padding: "22px",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl tracking-[0.08em] text-[var(--color-cream)]">{title}</h2>
              {subtitle && (
                <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mt-1">{subtitle}</p>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Close panel"
              className="ml-auto text-[var(--color-parchment)] hover:text-[var(--color-cream)]"
              style={{ background: 'transparent', border: 'none', fontSize: '1.1rem' }}
            >
              ✕
            </button>
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
