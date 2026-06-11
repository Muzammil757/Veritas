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

  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<number | null>(null);
  const [reviewedEvidenceIds, setReviewedEvidenceIds] = useState<number[]>([]);

  const [timelineOpen, setTimelineOpen] = useState(false);
  const [selectedTimelineId, setSelectedTimelineId] = useState<number | null>(null);
  const [reviewedTimelineIds, setReviewedTimelineIds] = useState<number[]>([]);

  const [accusationOpen, setAccusationOpen] = useState(false);
  const [reviewedSuspectIds, setReviewedSuspectIds] = useState<number[]>([]);

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
        "Graves wrote that the scene did not match a random break-in. Samuel's belongings remained undisturbed, and the only evidence pointed toward a confrontation with someone he recognized.",
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
  const accusationReady =
    reviewedEvidenceIds.length === evidenceItems.length &&
    reviewedTimelineIds.length === timelineEvents.length &&
    reviewedSuspectIds.length === suspects.length;

  function SuspectsLauncher() {
    return (
      <button
        onClick={() => setSuspectsOpen(true)}
        aria-label="Open Suspects"
        className="group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition transform"
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2">SUSPECTS</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Interview those connected to Samuel's death.</p>
        <div className="mt-auto font-mono text-[0.9rem] text-[var(--color-gold)]">4 persons</div>
      </button>
    );
  }
  function EvidenceLauncher() {
    return (
      <button
        type="button"
        onClick={() => setEvidenceOpen(true)}
        aria-label="Open Evidence"
        className="group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition transform"
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2">EVIDENCE</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Review collected evidence and investigative materials.</p>
        <div className="mt-auto font-mono text-[0.9rem] text-[var(--color-gold)]">{reviewedEvidenceIds.length} / {evidenceItems.length} reviewed</div>
      </button>
    );
  }

  function TimelineLauncher() {
    return (
      <button
        type="button"
        onClick={() => setTimelineOpen(true)}
        aria-label="Open Timeline"
        className="group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition transform"
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2">TIMELINE</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">Reconstruct the events surrounding the night of the murder.</p>
        <div className="mt-auto font-mono text-[0.9rem] text-[var(--color-gold)]">{reviewedTimelineIds.length} / {timelineEvents.length} events reviewed</div>
      </button>
    );
  }

  function AccusationLauncher() {
    return (
      <button
        type="button"
        onClick={() => setAccusationOpen(true)}
        aria-label="Open Accusation"
        className="group relative overflow-hidden cursor-pointer p-6 bg-[var(--color-paper)] border border-[var(--color-gold-dim)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition transform"
        style={{ borderColor: "rgba(184,146,58,0.18)" }}
      >
        <h3 className="font-serif text-xl italic text-[var(--color-cream)] mb-2">ACCUSATION</h3>
        <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] mb-4">A place to lay out leads and theories.</p>
        <div className={"mt-auto font-mono text-[0.9rem] " + (accusationReady ? "text-[var(--color-gold)]" : "text-[var(--color-parchment)]")}>
          {accusationReady ? "Ready to Accuse" : "Locked"}
        </div>
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
                    <EvidenceLauncher />

                  {/* Suspects panel (opens InvestigationPanel) */}
                  <SuspectsLauncher />

                  {/* Timeline panel (placeholder) */}
                    <TimelineLauncher />

                  {/* Accusation Board panel (placeholder) */}
                    <AccusationLauncher />
                </div>
              </section>

            {/* Bottom CTA */}
            <div className="text-center mb-20">
              <button className="group relative inline-flex items-center gap-4 cursor-pointer" aria-label="Begin Investigation">
                <span className="absolute inset-0 border border-[var(--color-gold-dim)] opacity-40 transition-opacity duration-500 group-hover:opacity-80" style={{ transform: "translate(4px, 4px)" }} />
                <span className="relative z-10 flex items-center gap-4 px-10 py-4 bg-transparent border border-[var(--color-gold)] transition-all duration-300 group-hover:bg-[var(--color-gold)] group-hover:bg-opacity-10" style={{ borderColor: "var(--color-gold)" }}>
                  <span className="w-6 h-px bg-[var(--color-gold)] transition-all duration-300 group-hover:w-8" />
                  <span className="font-display text-xl tracking-[0.35em] text-[var(--color-gold)] transition-colors duration-300">BEGIN INVESTIGATION</span>
                  <span className="w-6 h-px bg-[var(--color-gold)] transition-all duration-300 group-hover:w-8" />
                </span>
              </button>
            </div>

            {/* Suspects Investigation Panel */}
            <InvestigationPanel
              open={suspectsOpen}
              onClose={() => {
                setSuspectsOpen(false);
                setSelectedSuspect(null);
                setInterviewNote(null);
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
                        onClick={() => setInterviewNote("Interview System Coming Soon")}
                        className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-ink)] font-mono tracking-[0.15em]"
                      >
                        INTERVIEW
                      </button>
                      {interviewNote && (
                        <div className="mt-3 p-3 bg-[var(--color-surface)] text-[var(--color-parchment)]">{interviewNote}</div>
                      )}
                    </div>
                  </div>
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
              title="ACCUSATION"
              subtitle="Assemble your case before the final charge."
            >
              <div className="space-y-5">
                <div className={"p-5 rounded-sm border " + (accusationReady ? "border-[var(--color-gold)] bg-[rgba(184,146,58,0.12)]" : "border-[rgba(184,146,58,0.12)] bg-[rgba(10,8,6,0.7)]")}>
                  {accusationReady ? (
                    <p className="font-serif text-lg text-[var(--color-cream)]">Ready to Accuse</p>
                  ) : (
                    <>
                      <p className="font-serif text-lg text-[var(--color-cream)] mb-3">Insufficient information.</p>
                      <p className="font-mono text-[0.85rem] text-[var(--color-parchment)] leading-7">
                        Review evidence, suspects, and timeline events before making an accusation. <span className="text-[var(--color-gold)]">🔒</span>
                      </p>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[rgba(10,8,6,0.7)] border border-[rgba(184,146,58,0.12)] rounded-sm">
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-2">Evidence Reviewed</p>
                    <p className="font-display text-2xl text-[var(--color-cream)]">{reviewedEvidenceIds.length} / {evidenceItems.length}</p>
                  </div>
                  <div className="p-4 bg-[rgba(10,8,6,0.7)] border border-[rgba(184,146,58,0.12)] rounded-sm">
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-2">Timeline Reviewed</p>
                    <p className="font-display text-2xl text-[var(--color-cream)]">{reviewedTimelineIds.length} / {timelineEvents.length}</p>
                  </div>
                  <div className="p-4 bg-[rgba(10,8,6,0.7)] border border-[rgba(184,146,58,0.12)] rounded-sm">
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] uppercase mb-2">Suspects Reviewed</p>
                    <p className="font-display text-2xl text-[var(--color-cream)]">{reviewedSuspectIds.length} / {suspects.length}</p>
                  </div>
                </div>

                {accusationReady && (
                  <button
                    type="button"
                    onClick={() => {}}
                    className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-ink)] font-mono tracking-[0.15em] uppercase"
                  >
                    BEGIN FINAL ACCUSATION
                  </button>
                )}

                {!accusationReady && (
                  <p className="font-mono text-[0.85rem] text-[var(--color-parchment)]">
                    Complete the investigation before the final accusation can be made.
                  </p>
                )}
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
