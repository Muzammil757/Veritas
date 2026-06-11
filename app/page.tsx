import EvidenceBoard from "./components/EvidenceBoard";
import VeritasLogo from "./components/VeritasLogo";
import WorkflowBoard from "./components/WorkflowBoard";
import StartButton from "./components/StartButton";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient evidence board background */}
      <EvidenceBoard />

      {/* All content sits above the background (z-10+) */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── HEADER ── */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-[var(--color-border)]">
          <VeritasLogo />

          <nav className="hidden sm:flex items-center gap-8">
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--color-muted)] uppercase">
              Case #001 — Active
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] animate-pulse" />
          </nav>
        </header>

        {/* ── HERO ── */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

          {/* Primary headline */}
          <div className="animate-fade-in-delay-1 mb-4">
            <h1
              className="font-cinzel text-[clamp(4rem,13vw,9.5rem)] tracking-[0.12em] leading-none animate-flicker font-semibold"
              style={{ color: "var(--color-cream)" }}
            >
              VERITAS
            </h1>
          </div>

          {/* Tagline */}
          <div className="animate-fade-in-delay-2 mb-8">
            <p
              className="font-serif text-xl italic tracking-wider"
              style={{ color: "var(--color-gold)" }}
            >
              The Truth Awaits.
            </p>
          </div>

          {/* Thin divider with case number */}
          <div className="animate-fade-in-delay-2 flex items-center gap-5 mb-10">
            <div className="h-px w-20 bg-[var(--color-border-mid)]" />
            <span className="stamp stamp-red text-[0.55rem]">UNSOLVED</span>
            <div className="h-px w-20 bg-[var(--color-border-mid)]" />
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-delay-3 mb-16 max-w-sm">
            <p className="text-[var(--color-dim)] text-sm leading-7 tracking-wide">
              Uncover forgotten truths.
              <br />
              Question the suspects.
              <br />
              Reveal what was hidden.
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-in-delay-4">
            <StartButton />
          </div>

          {/* Small case reference footer */}
          <div className="animate-fade-in-delay-5 mt-12">
            <p className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-ash)] uppercase">
              Case #001 · The Final Act of Blue Velvet · New Orleans, 1989
            </p>
          </div>
        </main>

        {/* ── WORKFLOW SECTION ── */}
        <WorkflowBoard />

        {/* ── FOOTER ── */}
        <footer className="border-t border-[var(--color-border)] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <VeritasLogo size="small" />
          <p className="font-mono text-[0.55rem] tracking-[0.18em] text-[var(--color-ash)] uppercase">
            Classified Investigation Files · All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] opacity-70" />
            <span className="font-mono text-[0.55rem] tracking-[0.15em] text-[var(--color-ash)] uppercase">
              1 Active Case
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
