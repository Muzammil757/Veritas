import Link from "next/link";
import VeritasLogo from "./components/VeritasLogo";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="flex items-center px-8 py-6 border-b border-[var(--color-border)]">
        <VeritasLogo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20">
        <p className="font-mono text-[0.55rem] tracking-[0.3em] text-[var(--color-muted)] uppercase mb-6">
          File Not Found
        </p>
        <h1 className="font-display text-8xl tracking-[0.1em] text-[var(--color-cream)] mb-4 opacity-20">
          404
        </h1>
        <p className="font-serif text-[var(--color-dim)] text-xl italic mb-10">
          This file has been redacted or does not exist.
        </p>
        <Link
          href="/"
          className="font-mono text-[0.6rem] tracking-[0.25em] text-[var(--color-muted)] hover:text-[var(--color-parchment)] transition-colors uppercase"
        >
          ← Return to Lobby
        </Link>
      </main>
    </div>
  );
}
