"use client";

const artifacts = [
  {
    id: "case-file",
    label: "EXHIBIT A",
    title: "Case File",
    code: "CF-001",
    body: "Review the complete case archive. Examine physical evidence, witness statements, and the sequence of events as recorded.",
    tag: "EVIDENCE REVIEW",
    stamp: "CONFIDENTIAL",
    rotation: "-1.2deg",
  },
  {
    id: "interrogation-dossier",
    label: "EXHIBIT B",
    title: "Interrogation Dossier",
    code: "ID-001",
    body: "Question each suspect. Listen for contradictions. Every alibi has a weakness — find it before the trail goes cold.",
    tag: "SUSPECT ANALYSIS",
    stamp: "RESTRICTED",
    rotation: "0.8deg",
  },
  {
    id: "final-report",
    label: "EXHIBIT C",
    title: "Final Report",
    code: "FR-001",
    body: "Consolidate your findings. Name the perpetrator. Submit your accusation to close the case.",
    tag: "CONCLUSION",
    stamp: "CLASSIFIED",
    rotation: "-0.6deg",
  },
];

export default function WorkflowBoard() {
  return (
    <section className="relative w-full py-20 px-6">
      <style>{`
        .artifact-doc {
          transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .artifact-doc:hover {
          transform: rotate(0deg) translateY(-6px) !important;
        }
      `}</style>

      <div className="text-center mb-16">
        <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--color-muted)] uppercase mb-3">
          Investigation Procedure
        </p>
        <h2 className="font-serif text-[var(--color-parchment)] text-2xl italic tracking-wide">
          How Every Case Is Solved
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-px w-16 bg-[var(--color-gold-dim)] opacity-40" />
          <div className="w-1 h-1 rounded-full bg-[var(--color-gold)] opacity-60" />
          <div className="h-px w-16 bg-[var(--color-gold-dim)] opacity-40" />
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* SVG string connectors */}
        <svg
          className="absolute top-16 left-0 w-full h-6 hidden md:block pointer-events-none"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 16.5 5 Q 33 1 50 5" stroke="#b8923a" strokeWidth="0.4" fill="none" opacity="0.45" strokeDasharray="2 2" />
          <path d="M 50 5 Q 67 9 83.5 5" stroke="#b8923a" strokeWidth="0.4" fill="none" opacity="0.45" strokeDasharray="2 2" />
          <circle cx="16.5" cy="5" r="0.9" fill="#b8923a" opacity="0.7" />
          <circle cx="50" cy="5" r="0.9" fill="#b8923a" opacity="0.7" />
          <circle cx="83.5" cy="5" r="0.9" fill="#b8923a" opacity="0.7" />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artifacts.map((artifact) => (
            <div key={artifact.id}>
              <div
                className="artifact-doc relative group"
                style={{ transform: `rotate(${artifact.rotation})` }}
              >
                {/* Folder tab */}
                <div className="flex">
                  <div
                    className="px-4 py-1"
                    style={{
                      background: "var(--color-paper)",
                      border: "1px solid var(--color-border-mid)",
                      borderBottom: "none",
                      borderRadius: "2px 2px 0 0",
                    }}
                  >
                    <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-muted)]">
                      {artifact.label}
                    </span>
                  </div>
                </div>

                {/* Document body */}
                <div
                  className="relative p-6"
                  style={{
                    background: "var(--color-paper)",
                    border: "1px solid var(--color-border-mid)",
                    borderTop: "1px solid var(--color-ash)",
                    borderRadius: "0 2px 2px 2px",
                  }}
                >
                  {/* Pushpin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-gold)] opacity-80" style={{ boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)" }} />
                    <div className="w-1.5 h-3 bg-[var(--color-gold-dim)] opacity-60" style={{ marginTop: "-3px", borderRadius: "0 0 1px 1px" }} />
                  </div>

                  <p className="font-mono text-[0.5rem] tracking-[0.2em] text-[var(--color-ash)] mb-4 mt-2">
                    {artifact.code} — {artifact.tag}
                  </p>

                  <div className="border-b border-[var(--color-border-mid)] pb-3 mb-4">
                    <h3 className="font-serif text-[var(--color-parchment)] text-xl italic">
                      {artifact.title}
                    </h3>
                  </div>

                  <div className="relative">
                    <p
                      className="text-[var(--color-dim)] text-sm leading-7 relative z-10"
                    >
                      {artifact.body}
                    </p>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(transparent, transparent calc(1.75rem - 1px), var(--color-border) calc(1.75rem - 1px), var(--color-border) 1.75rem)",
                        opacity: 0.3,
                      }}
                    />
                  </div>

                  <div className="mt-6 flex justify-between items-end">
                    <span className="stamp stamp-red" style={{ fontSize: "0.52rem" }}>{artifact.stamp}</span>
                    <span className="font-mono text-[0.5rem] text-[var(--color-ash)] tracking-widest">
                      VRT-1997
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
