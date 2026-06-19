import Link from "next/link";
import EvidenceBoard from "../components/EvidenceBoard";
import VeritasLogo from "../components/VeritasLogo";

export const metadata = {
  title: "Archived Cases — VERITAS",
  description: "Review archived investigations and uncover the truth.",
};

const cases = [
  {
    id: "001",
    number: "CASE #001",
    title: "The Final Act of Blue Velvet",
    description:
      "A forgotten death.\nA retired detective silenced.\nA truth buried for eight years.",
    status: "BEGINNER",
    location: "Blue Velvet Jazz Club",
    year: "1989",
    classification: "HOMICIDE",
    investigator: "D. Graves",
    pages: 147,
    slug: "/cases/001",
  },
];

export default function CasesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <EvidenceBoard />

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── HEADER ── */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-[var(--color-border)]">
          <VeritasLogo />
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-gold)] rounded-sm bg-black/20 text-[0.6rem] tracking-[0.2em] text-[var(--color-parchment)] uppercase transition duration-300 hover:text-[var(--color-cream)] hover:bg-black/30"
              style={{
                boxShadow: "0 0 18px rgba(184,146,58,0.14)",
              }}
            >
              ← Return to Lobby
            </Link>
          </nav>
        </header>

        {/* ── PAGE HEADER ── */}
        <section className="px-8 pt-16 pb-10 border-b border-[var(--color-border)] animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--color-muted)] uppercase mb-4">
              Archived Investigations
            </p>
            <h1 className="font-display text-5xl sm:text-6xl tracking-[0.1em] text-[var(--color-cream)] mb-4">
              ARCHIVED CASES
            </h1>
            <p className="font-serif text-[var(--color-dim)] text-lg italic">
              Review archived investigations and uncover the truth.
            </p>
            {/* Gold rule */}
            <div className="flex items-center gap-3 mt-6">
              <div className="h-px w-12 bg-[var(--color-gold-dim)] opacity-40" />
              <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-ash)]">
                {cases.length} CASE{cases.length !== 1 ? "S" : ""} ON RECORD
              </span>
            </div>
          </div>
        </section>

        {/* ── CASES LIST ── */}
        <main className="flex-1 px-8 py-14">
          <div className="max-w-4xl mx-auto">
            {cases.map((c, i) => (
              <div
                key={c.id}
                className="animate-fade-in-delay-1"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <CaseCard case_={c} />
              </div>
            ))}

            {/* Coming soon placeholder */}
            <div className="mt-12 animate-fade-in-delay-3">
              <div
                className="relative py-10 px-8 text-center"
                style={{
                  border: "1px dashed var(--color-border-mid)",
                  borderRadius: "2px",
                }}
              >
                <p className="font-mono text-[0.6rem] tracking-[0.25em] text-[var(--color-ash)] uppercase mb-2">
                  Additional Files Pending Declassification
                </p>
                <p className="font-serif text-[var(--color-muted)] italic text-sm">
                  More cases will be added to the archive.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="border-t border-[var(--color-border)] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <VeritasLogo size="small" />
          <p className="font-mono text-[0.55rem] tracking-[0.18em] text-[var(--color-ash)] uppercase">
            Classified Investigation Files · All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] opacity-70" />
            <span className="font-mono text-[0.55rem] tracking-[0.15em] text-[var(--color-ash)] uppercase">
              {cases.length} Active Case
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ── CASE CARD COMPONENT ── */
type CaseData = {
  id: string;
  number: string;
  title: string;
  description: string;
  status: string;
  location: string;
  year: string;
  classification: string;
  investigator: string;
  pages: number;
  slug: string;
};

function CaseCard({ case_: c }: { case_: CaseData }) {
  return (
    <div className="relative group">
      {/* Shadow offset frame — gives depth of a physical folder */}
      <div
        className="absolute inset-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
        style={{
          background: "var(--color-border)",
          transform: "translate(6px, 6px)",
          borderRadius: "2px",
        }}
      />

      {/* Main folder body */}
      <div
        className="relative transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          background: "var(--color-paper)",
          border: "1px solid var(--color-border-mid)",
          borderRadius: "0 2px 2px 2px",
        }}
      >
        {/* Folder tab row */}
        <div className="flex items-end gap-px -mb-px">
          <div
            className="px-5 py-1.5"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border-mid)",
              borderBottom: "none",
              borderRadius: "3px 3px 0 0",
            }}
          >
            <span className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-muted)]">
              {c.number}
            </span>
          </div>
          <div
            className="px-4 py-1.5"
            style={{
              background: "var(--color-paper)",
              border: "1px solid var(--color-border-mid)",
              borderBottom: "1px solid var(--color-paper)",
              borderRadius: "3px 3px 0 0",
            }}
          >
            <span className="font-mono text-[0.5rem] tracking-[0.15em] text-[var(--color-ash)]">
              {c.classification}
            </span>
          </div>
        </div>

        {/* Folder content */}
        <div className="p-8">
          {/* Top row: title + status stamp */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              {/* Case code */}
              <p className="font-mono text-[0.55rem] tracking-[0.22em] text-[var(--color-muted)] mb-3 uppercase">
                {c.number} — {c.location} — {c.year}
              </p>
              {/* Title */}
              <h2 className="font-serif text-[var(--color-cream)] text-2xl sm:text-3xl italic leading-tight">
                {c.title}
              </h2>
            </div>

            {/* Status stamp — rotated, authentic feel */}
            <div className="flex-shrink-0 sm:mt-1">
              <div
                className="stamp stamp-red text-[0.7rem] px-3 py-1"
                style={{ fontSize: "0.65rem" }}
              >
                {c.status}
              </div>
            </div>
          </div>

          {/* Divider line — like a folder separator */}
          <div className="border-t border-[var(--color-border-mid)] mb-6" />

          {/* Description — typewritten feel */}
          <div className="mb-8 relative">
            <p
              className="font-mono text-[var(--color-dim)] text-xs leading-7 whitespace-pre-line"
              style={{ letterSpacing: "0.04em" }}
            >
              {c.description}
            </p>
          </div>

          {/* Meta grid — case file details */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 py-5 px-5"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "1px",
            }}
          >
            {[
              { label: "Level", value: c.status },
              { label: "Location", value: c.location },
              { label: "Year", value: c.year },
              { label: "Lead Investigator", value: c.investigator },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[0.5rem] tracking-[0.2em] text-[var(--color-ash)] uppercase mb-1">
                  {item.label}
                </p>
                <p className="font-mono text-[0.65rem] tracking-[0.06em] text-[var(--color-parchment)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* File size note */}
          <p className="font-mono text-[0.5rem] tracking-[0.15em] text-[var(--color-ash)] mb-6">
            {c.pages} pages archived · Last accessed: unknown
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href={c.slug}
              className="group/btn relative inline-flex items-center gap-4 cursor-pointer"
              aria-label={`Solve the mystery of ${c.title}`}
            >
              {/* Offset shadow */}
              <span
                className="absolute inset-0 border border-[var(--color-red-dim)] opacity-30 transition-opacity duration-500 group-hover/btn:opacity-70"
                style={{ transform: "translate(3px, 3px)" }}
              />
              <span
                className="relative z-10 flex items-center gap-3 px-7 py-3 border border-[var(--color-red)] bg-transparent transition-all duration-300 group-hover/btn:bg-[var(--color-red)] group-hover/btn:bg-opacity-10"
              >
                <span className="font-display text-base tracking-[0.3em] text-[var(--color-red)] transition-colors duration-300">
                  SOLVE THE MYSTERY
                </span>
                {/* Arrow */}
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  className="text-[var(--color-red)] transition-transform duration-300 group-hover/btn:translate-x-1"
                  aria-hidden="true"
                >
                  <line x1="0" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="1" />
                  <polyline points="8,1 13,5 8,9" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
              </span>
            </Link>

            {/* Secondary — view files */}
            <span className="font-mono text-[0.55rem] tracking-[0.18em] text-[var(--color-ash)] hidden sm:block">
              {c.pages} classified documents
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
