"use client";

import { useState } from "react";
import Link from "next/link";
import EvidenceBoard from "../../components/EvidenceBoard";
import VeritasLogo from "../../components/VeritasLogo";
import InvestigationPanel from "../../components/InvestigationPanel";

export default function CasePage() {
  // Suspects / panel state lives inside page so it can control nested profile views
  const [suspectsOpen, setSuspectsOpen] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState<any | null>(null);
  const [interviewNote, setInterviewNote] = useState<string | null>(null);
  const [interrogationOpen, setInterrogationOpen] = useState(false);
  const [interrogationLoading, setInterrogationLoading] = useState(false);
  const [interrogationHistory, setInterrogationHistory] = useState<Array<{ speaker: "PLAYER" | "MARCUS"; message: string }>>([]);
  const [interrogationQuestion, setInterrogationQuestion] = useState("");
  const [interrogationError, setInterrogationError] = useState<string | null>(null);

  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<number | null>(null);
  const [reviewedEvidenceIds, setReviewedEvidenceIds] = useState<number[]>([]);

  const [timelineOpen, setTimelineOpen] = useState(false);
  const [selectedTimelineId, setSelectedTimelineId] = useState<number | null>(null);
  const [reviewedTimelineIds, setReviewedTimelineIds] = useState<number[]>([]);

  const [accusationOpen, setAccusationOpen] = useState(false);
  const [reviewedSuspectIds, setReviewedSuspectIds] = useState<number[]>([]);

  const [accusationFormOpen, setAccusationFormOpen] = useState(false);
  const [selectedAccusedSuspectId, setSelectedAccusedSuspectId] = useState<number | null>(null);
  const [accusationReasoning, setAccusationReasoning] = useState("");
  const [accusationResultOpen, setAccusationResultOpen] = useState(false);
  const [accusationResultCorrect, setAccusationResultCorrect] = useState(false);

  type Suspect = {
    id: number;
    name: string;
    role: string;
    relationship: string;
    facts: string[];
    status?: string;
  };

  const suspects: Suspect[] = [
    {
      id: 1,
      name: "Marcus Reed",
      role: "Jazz Trumpeter",
      relationship: "Samuel's longtime bandmate and closest friend.",
      facts: [
        "Last person seen speaking with Samuel.",
        "Claims he left after the final set.",
        "Worked with Samuel for over ten years.",
      ],
      status: "Available for Interview",
    },
    {
      id: 2,
      name: "Lena Marie",
      role: "Jazz Singer",
      relationship: "Regular performer at Blue Velvet Jazz Club.",
      facts: [
        "Performed on stage with Samuel that night.",
        "Heard an argument backstage.",
        "Provided an incomplete witness statement.",
      ],
      status: "Available for Interview",
    },
    {
      id: 3,
      name: "Vincent Joseph",
      role: "Club Manager",
      relationship: "Managed the club where Samuel performed.",
      facts: [
        "Closed the venue after the incident.",
        "Handled security reports.",
        "Claims nothing unusual happened that evening.",
      ],
      status: "Available for Interview",
    },
    {
      id: 4,
      name: "Grace Hart",
      role: "Music Producer",
      relationship: "Worked with Samuel on an upcoming album.",
      facts: [
        "Had financial disagreements with Samuel.",
        "Met him earlier that day.",
        "Was expected to attend the performance.",
      ],
      status: "Available for Interview",
    },
  ];

  type EvidenceItem = {
    id: number;
    title: string;
    summary: string;
    details: string;
  };

  const evidenceItems: EvidenceItem[] = [
    {
      id: 1,
      title: "Crime Scene Photograph",
      summary: "Samuel was found behind the Blue Velvet Jazz Club. No signs of forced robbery. Wallet still present.",
      details:
        "The photograph captures the alley behind the club. Samuel is alone, his coat draped over the cobblestone. There are no forced entry marks, and his wallet sits near his hand, suggesting something other than a simple robbery.",
    },
    {
      id: 2,
      title: "Witness Statement",
      summary: "A witness heard a heated argument after the performance. Voices belonged to Samuel and an unknown person.",
      details:
        "The witness describes two voices in the backstage corridor. One was Samuel's, the other calm and unfamiliar. The argument faded before anyone could see the second person in the crowd.",
    },
    {
      id: 3,
      title: "Detective Graves Notes",
      summary: "Graves doubted the robbery theory. He believed Samuel knew his attacker.",
      details:
        "Graves wrote that the scene where Samuel was found dead did not match a random break-in. In the margin, he wrote: “Someone close to him wanted the music before the contract was signed.”",
    },
  ];

  type TimelineEvent = {
    id: number;
    time: string;
    title: string;
    summary: string;
    details: string;
  };

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      time: "6:30 PM",
      title: "Samuel arrives at Blue Velvet Jazz Club.",
      summary: "Samuel arrives and prepares for the evening.",
      details:
        "The club was busy, and Samuel moved through the crowd with his usual calm. Staff noted he seemed focused on his set list and was not accompanied by anyone unusual.",
    },
    {
      id: 2,
      time: "8:00 PM",
      title: "Performance begins.",
      summary: "The show starts and the club is at peak capacity.",
      details:
        "Samuel opened with a slow ballad. The audience responded well, and security logs show no disturbances during the first half of the evening.",
    },
    {
      id: 3,
      time: "10:15 PM",
      title: "Performance ends.",
      summary: "The set concludes and the crowd begins to thin.",
      details:
        "After the final song, Samuel thanked the audience. Several band members reported he left the stage in good spirits and went backstage to retrieve his coat.",
    },
    {
      id: 4,
      time: "10:30 PM",
      title: "Witness hears argument backstage.",
      summary: "A witness hears voices arguing behind the stage.",
      details:
        "The voice of Samuel could be identified. The second speaker was not seen clearly, but the tone was tense and the words sounded personal rather than random.",
    },
    {
      id: 5,
      time: "11:05 PM",
      title: "Samuel leaves club.",
      summary: "Samuel departs the club in the late hour.",
      details:
        "He was seen leaving alone, walking toward the alley. No one followed him openly, and he did not appear injured at that time.",
    },
    {
      id: 6,
      time: "11:20 PM",
      title: "Body discovered.",
      summary: "Samuel is found behind the club.",
      details:
        "A passerby discovered Samuel and alerted the authorities. The scene was secured, and the first responders noted the lack of disturbance around his body.",
    },
  ];

  const selectedEvidence = evidenceItems.find((item) => item.id === selectedEvidenceId) ?? null;
  const selectedTimelineEvent = timelineEvents.find((event) => event.id === selectedTimelineId) ?? null;

  const suggestedQuestions = [
    "Did you and Samuel have any disagreements?",
    "Where were you after the performance?",
    "What was Samuel working on before he died?",
  ];

  async function submitInterrogationQuestion(question: string) {
    if (!question.trim()) {
      return;
    }

    setInterrogationError(null);
    setInterrogationLoading(true);
    setInterrogationHistory((prev) => [...prev, { speaker: "PLAYER", message: question }] );
    setInterrogationQuestion("");

    try {
      const response = await fetch("/api/interrogate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Interrogation request failed (${response.status})`);
      }

      const data = await response.json();
      const message = typeof data.response === "string" ? data.response : JSON.stringify(data.response);

      setInterrogationHistory((prev) => [...prev, { speaker: "MARCUS", message }] );
    } catch (error: any) {
      setInterrogationError(error?.message ?? "Interrogation failed.");
      setInterrogationHistory((prev) => [...prev, { speaker: "MARCUS", message: "Marcus remained silent." }]);
    } finally {
      setInterrogationLoading(false);
    }
  }

  const accusationReady =
    reviewedEvidenceIds.length === evidenceItems.length &&
    reviewedTimelineIds.length === timelineEvents.length &&
    reviewedSuspectIds.length === suspects.length;

  function SuspectsLauncher() {
    return (
      <button
        onClick={() => setSuspectsOpen(true)}
        aria-label="Open Suspects"
        className="group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition transform h-full flex flex-col"
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2 transition-colors duration-300 group-hover:text-[var(--color-gold)]">SUSPECTS</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Question those connected to the victim.</p>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Their statements contain inconsistencies. Click to review.</p>
        <div className="mt-auto">
          <div className="font-mono text-[0.9rem] text-[var(--color-gold)]">4 persons</div>
          <div className="mt-4 text-[0.8rem] text-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">Click to review →</div>
        </div>
      </button>
    );
  }
  function EvidenceLauncher() {
    return (
      <button
        type="button"
        onClick={() => setEvidenceOpen(true)}
        aria-label="Open Evidence"
        className="group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition transform h-full flex flex-col"
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2 transition-colors duration-300 group-hover:text-[var(--color-gold)]">EVIDENCE</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Review recovered evidence and investigative materials.</p>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Click to inspect several items recovered from Ethan Graves files.</p>
        <div className="mt-auto font-mono text-[0.9rem] text-[var(--color-gold)]">{reviewedEvidenceIds.length} / {evidenceItems.length} reviewed</div>
        <div className="mt-4 text-[0.8rem] text-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">Click to inspect →</div>
      </button>
    );
  }

  function TimelineLauncher() {
    return (
      <button
        type="button"
        onClick={() => setTimelineOpen(true)}
        aria-label="Open Timeline"
        className="group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition transform h-full flex flex-col"
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2 transition-colors duration-300 group-hover:text-[var(--color-gold)]">TIMELINE</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Reconstruct the events of September 14, 1989.</p>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Piece together what happened on the night Samuel King died.</p>
        <div className="mt-auto font-mono text-[0.9rem] text-[var(--color-gold)]">{reviewedTimelineIds.length} / {timelineEvents.length} events reviewed</div>
        <div className="mt-4 text-[0.8rem] text-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">Click to reconstruct →</div>
      </button>
    );
  }

  function AccusationLauncher() {
    return (
      <button
        type="button"
        onClick={() => {
          if (accusationReady) {
            setAccusationFormOpen(true);
          } else {
            setAccusationOpen(true);
          }
        }}
        aria-label="Make Accusation"
        className={"group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] transition transform h-full flex flex-col"}
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2 transition-colors duration-300 group-hover:text-[var(--color-gold)]">MAKE ACCUSATION</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Finalize your suspicion and press to accuse.</p>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">The truth remains hidden. Review the evidence, examine the suspects, and determine who is responsible.</p>
        <div className={"mt-auto font-mono text-[0.9rem] " + (accusationReady ? "text-[var(--color-gold)]" : "text-[var(--color-parchment)]")}>
          {accusationReady ? "Ready" : "Locked"}
        </div>
        <div className="mt-4 text-[0.8rem] text-[var(--color-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">{accusationReady ? "Click to accuse →" : "Investigation incomplete"}</div>
      </button>

    );
  }
  return (
    <div className="relative min-h-screen overflow-hidden">
      <EvidenceBoard
        image={'/images/blue-velvet-bg.jpg'}
        brightness={0.9}
        blurPx={1}
        contrast={1.12}
        saturate={1.05}
        overlayOpacity={0.28}
        vignette={false}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Center darkening + subtle vignette (keeps edges visible while improving text contrast) */}
        <div className="absolute inset-0 z-0 pointer-events-none case-center-overlay" />

        <div className="relative z-10 w-full">
          <header className="flex items-center justify-between px-8 py-6 border-b border-[var(--color-border)]">
            <VeritasLogo />
            <nav className="hidden sm:flex items-center gap-6">
              <Link
                href="/cases"
                className="font-mono text-[0.6rem] tracking-[0.2em] text-[var(--color-muted)] uppercase hover:text-[var(--color-parchment)] transition-colors"
              >
                ← Return to Archives
              </Link>
            </nav>
          </header>

          <main className="flex-1 px-8 py-12">
            <div className="max-w-5xl mx-auto">
            {/* Page title */}
            <div className="animate-fade-in mb-6">
              <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[var(--color-gold)] uppercase mb-2">THE BLUE VELVET ARCHIVES</p>
              <div className="flex items-center gap-4">
                <h1 className="font-display text-4xl sm:text-5xl tracking-[0.08em] text-[var(--color-cream)]">THE BLUE VELVET ARCHIVES</h1>
                <span className="stamp stamp-red">UNSOLVED</span>
              </div>
              <p className="font-mono text-[0.65rem] tracking-[0.12em] text-[var(--color-parchment)] mt-2">Case #001 — The Final Act of Blue Velvet</p>
            </div>

            {/* Top information panel */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 py-6 px-6" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "2px" }}>
              <div>
                <p className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-1">Location</p>
                <p className="font-mono text-[0.75rem] text-[var(--color-parchment)]">Blue Velvet Jazz Club<br/>New Orleans</p>
              </div>
              <div>
                <p className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-1">Year</p>
                <p className="font-mono text-[0.75rem] text-[var(--color-parchment)]">1989</p>
              </div>
              <div>
                <p className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-1">Victim</p>
                <p className="font-mono text-[0.75rem] text-[var(--color-parchment)]">Samuel Alexander</p>
              </div>
              <div>
                <p className="font-mono text-[0.55rem] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-1">Status</p>
                <p className="font-mono text-[0.75rem] text-[var(--color-parchment)]">Unsolved</p>
              </div>
            </section>

            {/* Case summary card */}
            <section className="mb-8">
              <div className="p-8" style={{ background: "var(--color-paper)", border: "1px solid var(--color-border-mid)", borderRadius: "2px" }}>
                <p className="font-mono text-[0.7rem] text-[var(--color-ash)] mb-4">September 14, 1989.</p>
                <h2 className="font-serif text-2xl italic text-[var(--color-cream)] mb-4">Samuel Alexander</h2>
                <p className="text-[var(--color-dim)] leading-7">Samuel Alexander, a gifted jazz pianist and composer, was found dead shortly after a performance at Blue Velvet Jazz Club. The death was ruled a robbery gone wrong. Retired Detective Ethan Graves spent eight years privately investigating the case. Before he could reveal his findings, an attack left him with Locked-in Syndrome . His investigation records have now been recovered.</p>
              </div>
            </section>

              {/* Investigation workspace panels */}
              <section className="mb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="h-56">
                    <EvidenceLauncher />
                  </div>
                  <div className="h-56">
                    <SuspectsLauncher />
                  </div>
                  <div className="h-56">
                    <TimelineLauncher />
                  </div>
                  <div className="h-56">
                    <AccusationLauncher />
                  </div>
                </div>
              </section>

            {/* Bottom CTA removed per redesign (Begin Investigation) */}

            {/* Suspects Investigation Panel */}
            <InvestigationPanel
              open={suspectsOpen}
              onClose={() => {
                setSuspectsOpen(false);
                setSelectedSuspect(null);
                setInterviewNote(null);
                setInterrogationOpen(false);
              }}
              title="SUSPECTS"
              subtitle="Individuals connected to Samuel's death."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suspects.map((s) => (
                  <div key={s.id} className="p-4 bg-[rgba(10,8,6,0.7)] border border-[rgba(184,146,58,0.12)] rounded-sm hover:-translate-y-1 transition">
                    <h4 className="font-serif text-lg text-[var(--color-cream)]">{s.name}</h4>
                    <p className="font-mono text-[0.8rem] text-[var(--color-parchment)]">{s.role}</p>
                    <p className="font-mono text-[0.8rem] text-[var(--color-parchment)] mb-3">{s.status}</p>
                    <button
                      onClick={() => {
                        setSelectedSuspect(s);
                        setInterviewNote(null);
                        setInterrogationOpen(false);
                        setInterrogationHistory([]);
                        setInterrogationQuestion("");
                        setInterrogationError(null);
                        setReviewedSuspectIds((prev) =>
                          prev.includes(s.id) ? prev : [...prev, s.id]
                        );
                      }}
                      className="px-3 py-2 bg-transparent border border-[var(--color-gold)] text-[var(--color-gold)] font-mono text-sm tracking-[0.18em]"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>

              {/* Nested profile panel inside investigation panel */}
              {selectedSuspect && (
                <div className="mt-6 p-6 bg-[rgba(12,10,8,0.9)] border border-[rgba(184,146,58,0.12)] rounded-sm">
                  {!interrogationOpen ? (
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-xl text-[var(--color-cream)]">{selectedSuspect.name}</h3>
                          <p className="font-mono text-[0.85rem] text-[var(--color-parchment)]">Role: {selectedSuspect.role}</p>
                          <p className="font-mono text-[0.85rem] text-[var(--color-parchment)]">Relationship: {selectedSuspect.relationship}</p>
                        </div>
                        <button onClick={() => setSelectedSuspect(null)} className="text-[var(--color-parchment)]">✕</button>
                      </div>

                      <div className="mt-4 text-[var(--color-parchment)]">
                        <p className="mb-2 font-mono">Known Facts:</p>
                        <ul className="list-disc ml-5 font-mono text-[var(--color-parchment)]">
                          {selectedSuspect.facts.map((f: string, i: number) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                        <div className="mt-6">
                          <button
                            onClick={() => {
                              if (selectedSuspect?.id === 1) {
                                setInterrogationOpen(true);
                                setInterviewNote(null);
                              } else {
                                setInterrogationOpen(false);
                                setInterviewNote("Interrogation coming soon");
                              }
                            }}
                            className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-ink)] font-mono tracking-[0.15em]"
                          >
                            INTERROGATE
                          </button>
                          {interviewNote && (
                            <div className="mt-3 p-3 bg-[var(--color-surface)] text-[var(--color-parchment)]">{interviewNote}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-display text-xl text-[var(--color-cream)]">INTERROGATION: {selectedSuspect.name}</h4>
                          <p className="font-mono text-[0.8rem] text-[var(--color-parchment)] mt-2">Terminal transcript. Ask Marcus questions and review his answers.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setInterrogationOpen(false)}
                          className="px-3 py-2 border border-[var(--color-gold)] text-[var(--color-gold)] font-mono text-sm uppercase tracking-[0.15em]"
                        >
                          Back to Profile
                        </button>
                      </div>

                      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
                        <div className="space-y-3 bg-[rgba(10,8,6,0.95)] border border-[rgba(184,146,58,0.12)] rounded-sm p-4">
                          <p className="font-mono uppercase tracking-[0.24em] text-[var(--color-gold)] mb-3">Suggested Questions</p>
                          <div className="space-y-2">
                            {suggestedQuestions.map((question) => (
                              <button
                                key={question}
                                type="button"
                                onClick={() => submitInterrogationQuestion(question)}
                                className="w-full text-left px-3 py-2 rounded-sm border border-[rgba(184,146,58,0.12)] bg-[rgba(14,10,8,0.9)] text-[var(--color-parchment)] font-mono text-[0.82rem] hover:border-[var(--color-gold)]"
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col h-full">
                          <p className="font-mono uppercase tracking-[0.24em] text-[var(--color-gold)] mb-3">Transcript</p>
                          <div className="overflow-y-auto rounded-sm border border-[rgba(184,146,58,0.12)] bg-[rgba(8,6,4,0.95)] p-4 h-[34rem] sm:h-[36rem] space-y-3">
                            {interrogationHistory.length === 0 && (
                              <div className="rounded-sm border border-[rgba(184,146,58,0.12)] bg-[rgba(14,10,8,0.85)] p-4">
                                <p className="font-mono text-[0.85rem] text-[var(--color-parchment)]">Marcus is waiting for your first question.</p>
                              </div>
                            )}

                            {interrogationHistory.map((item, index) => (
                              <div
                                key={index}
                                className={
                                  "rounded-sm p-3 border " +
                                  (item.speaker === "PLAYER"
                                    ? "border-[rgba(124,103,29,0.2)] bg-[rgba(30,24,18,0.9)]"
                                    : "border-[rgba(184,146,58,0.18)] bg-[rgba(18,14,10,0.95)]")
                                }
                              >
                                <p className="font-mono text-[0.75rem] uppercase tracking-[0.22em] text-[var(--color-gold)] mb-2">{item.speaker === "PLAYER" ? "You" : "Marcus"}</p>
                                <p className="font-mono text-[0.9rem] text-[var(--color-parchment)] whitespace-pre-line">{item.message}</p>
                              </div>
                            ))}

                            {interrogationLoading && (
                              <div className="rounded-sm border border-[rgba(184,146,58,0.18)] bg-[rgba(18,14,10,0.95)] p-3">
                                <p className="font-mono text-[0.85rem] text-[var(--color-parchment)]">Marcus is thinking...</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <textarea
                          value={interrogationQuestion}
                          onChange={(e) => setInterrogationQuestion(e.target.value)}
                          rows={4}
                          className="w-full resize-none rounded-sm border border-[rgba(184,146,58,0.12)] bg-[rgba(10,8,6,0.9)] p-3 text-[var(--color-parchment)] font-mono"
                          placeholder="Ask a custom question..."
                        />
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => submitInterrogationQuestion(interrogationQuestion)}
                            disabled={!interrogationQuestion.trim() || interrogationLoading}
                            className="w-full sm:w-auto px-5 py-3 bg-[var(--color-gold)] text-[var(--color-ink)] font-mono text-sm uppercase rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ASK
                          </button>
                          {interrogationError && (
                            <p className="text-[var(--color-parchment)] text-[0.8rem]">{interrogationError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </InvestigationPanel>

            <InvestigationPanel
              open={evidenceOpen}
              onClose={() => {
                setEvidenceOpen(false);
                setSelectedEvidenceId(null);
              }}
              title="EVIDENCE"
              subtitle="Collected case items to inspect."
            >
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="grid grid-cols-1 gap-4 flex-1">
                  {evidenceItems.map((item) => (
                    <div key={item.id} className="p-4 bg-[rgba(10,8,6,0.7)] border border-[rgba(184,146,58,0.12)] rounded-sm">
                      <h4 className="font-serif text-lg text-[var(--color-cream)]">{item.title}</h4>
                      <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">{item.summary}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEvidenceId(item.id);
                          setReviewedEvidenceIds((prev) =>
                            prev.includes(item.id) ? prev : [...prev, item.id]
                          );
                        }}
                        className="px-3 py-2 bg-transparent border border-[var(--color-gold)] text-[var(--color-gold)] font-mono text-sm tracking-[0.18em]"
                      >
                        Inspect
                      </button>
                    </div>
                  ))}
                </div>

                <div className="w-full xl:w-96 p-5 bg-[rgba(12,10,8,0.9)] border border-[rgba(184,146,58,0.12)] rounded-sm">
                  <h3 className="font-display text-xl text-[var(--color-cream)] mb-3">Inspection Detail</h3>
                  {selectedEvidence ? (
                    <>
                      <p className="font-mono text-[0.75rem] text-[var(--color-gold)] uppercase tracking-[0.22em] mb-3">{selectedEvidence.title}</p>
                      <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] leading-7">{selectedEvidence.details}</p>
                    </>
                  ) : (
                    <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] leading-7">Select an evidence item to see its full details.</p>
                  )}
                </div>
              </div>

              <div className="mt-6 font-mono text-[0.85rem] text-[var(--color-parchment)]">Evidence Reviewed: {reviewedEvidenceIds.length} / {evidenceItems.length}</div>
            </InvestigationPanel>

            <InvestigationPanel
              open={timelineOpen}
              onClose={() => {
                setTimelineOpen(false);
                setSelectedTimelineId(null);
              }}
              title="TIMELINE"
              subtitle="Walk through the evening in order."
            >
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="grid grid-cols-1 gap-4 flex-1">
                  {timelineEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => {
                        setSelectedTimelineId(event.id);
                        setReviewedTimelineIds((prev) =>
                          prev.includes(event.id) ? prev : [...prev, event.id]
                        );
                      }}
                      className="text-left p-4 bg-[rgba(10,8,6,0.7)] border border-[rgba(184,146,58,0.12)] rounded-sm hover:border-[var(--color-gold)] transition"
                    >
                      <p className="font-mono text-[0.7rem] tracking-[0.22em] text-[var(--color-gold)] uppercase mb-2">{event.time}</p>
                      <h4 className="font-serif text-lg text-[var(--color-cream)] mb-2">{event.title}</h4>
                      <p className="font-mono text-[0.85rem] text-[var(--color-parchment)]">{event.summary}</p>
                    </button>
                  ))}
                </div>

                <div className="w-full xl:w-96 p-5 bg-[rgba(12,10,8,0.9)] border border-[rgba(184,146,58,0.12)] rounded-sm">
                  <h3 className="font-display text-xl text-[var(--color-cream)] mb-3">Event Details</h3>
                  {selectedTimelineEvent ? (
                    <>
                      <p className="font-mono text-[0.75rem] text-[var(--color-gold)] uppercase tracking-[0.22em] mb-3">{selectedTimelineEvent.time}</p>
                      <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] leading-7">{selectedTimelineEvent.details}</p>
                    </>
                  ) : (
                    <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] leading-7">Click an event to inspect more details from the night.</p>
                  )}
                </div>
              </div>

              <div className="mt-6 font-mono text-[0.85rem] text-[var(--color-parchment)]">Timeline Events Reviewed: {reviewedTimelineIds.length} / {timelineEvents.length}</div>
            </InvestigationPanel>

            <InvestigationPanel
              open={accusationOpen}
              onClose={() => setAccusationOpen(false)}
              title="ACCUSATION LOCKED"
              subtitle=""
            >
              <div>
                <p className="font-mono text-[0.9rem] text-[var(--color-parchment)]">Review all evidence, suspects, and timeline events before making an accusation.</p>
              </div>
            </InvestigationPanel>

            <InvestigationPanel
              open={accusationFormOpen}
              onClose={() => setAccusationFormOpen(false)}
              title="FINAL ACCUSATION"
              subtitle=""
            >
              <div className="space-y-5">
                <p className="font-mono text-[0.9rem] text-[var(--color-parchment)]">Select the person responsible for Samuel Alexander's death.</p>

                <div className="space-y-3">
                  {suspects.map((s) => (
                    <label key={s.id} className="flex items-center gap-3 p-3 bg-[rgba(10,8,6,0.7)] border border-[rgba(184,146,58,0.06)] rounded-sm cursor-pointer">
                      <input
                        type="radio"
                        name="accused"
                        value={s.id}
                        checked={selectedAccusedSuspectId === s.id}
                        onChange={() => setSelectedAccusedSuspectId(s.id)}
                        className="w-4 h-4"
                      />
                      <span className="font-display text-[var(--color-cream)]">{s.name}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <p className="font-mono mb-2 text-[var(--color-parchment)]">Reasoning (Optional)</p>
                  <textarea
                    value={accusationReasoning}
                    onChange={(e) => setAccusationReasoning(e.target.value)}
                    rows={5}
                    className="w-full p-3 bg-[var(--color-surface)] text-[var(--color-parchment)] border border-[var(--color-border)] rounded-sm"
                    placeholder="Explain your reasoning (optional)"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAccusationFormOpen(false);
                      setAccusationResultCorrect(selectedAccusedSuspectId === 1);
                      setAccusationResultOpen(true);
                    }}
                    className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-ink)] font-mono tracking-[0.15em] uppercase"
                  >
                    SUBMIT ACCUSATION
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccusationFormOpen(false)}
                    className="px-4 py-2 bg-transparent border border-[var(--color-border)] text-[var(--color-parchment)] font-mono"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </InvestigationPanel>

            <InvestigationPanel
              open={accusationResultOpen}
              onClose={() => setAccusationResultOpen(false)}
              title={accusationResultCorrect ? "CASE CLOSED" : "Wrongly Accused"}
              subtitle={accusationResultCorrect ? "" : ""}
            >
              <div className="space-y-4">
                {accusationResultCorrect ? (
                  <div>
                    <p className="font-serif text-lg text-[var(--color-cream)] mb-2">You correctly identified the killer.</p>
                    <p className="font-mono text-[var(--color-parchment)]">The investigation revealed that Samuel confronted Marcus Reed on the night of September 14, 1989 after discovering Marcus had been using portions of his unpublished compositions.

Witness statements confirmed a heated argument backstage. Timeline evidence placed Marcus at Blue Velvet later than he claimed. Publishing records proved Samuel's ownership of the disputed music.

The confrontation turned physical. Samuel struck his head during the struggle and died. Marcus then altered the scene to support a robbery narrative and, years later, attacked Ethan Graves to prevent the truth from being exposed.

The evidence ultimately pointed to Marcus Reed.</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-serif text-lg text-[var(--color-cream)] mb-2">Wrongly Accused.</p>

                    
                    <p className="font-mono text-[var(--color-parchment)]">Review the investigation and try again.</p>
                  </div>
                )}

                <div>
                  <button
                    onClick={() => setAccusationResultOpen(false)}
                    className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-ink)] font-mono tracking-[0.15em] uppercase"
                  >
                    RETURN TO CASE
                  </button>
                </div>
              </div>
            </InvestigationPanel>

          </div>
        </main>

        <footer className="border-t border-[var(--color-border)] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <VeritasLogo size="small" />
          <p className="font-mono text-[0.55rem] tracking-[0.18em] text-[var(--color-ash)] uppercase">Classified Investigation Files · All Rights Reserved</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] opacity-70" />
            <span className="font-mono text-[0.55rem] tracking-[0.15em] text-[var(--color-ash)] uppercase">1 Active Case</span>
          </div>
        </footer>
      </div>
    </div>
  </div>
  );
}
