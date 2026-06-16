export interface SuspectProfile {
  id: string;
  name: string;

  role: string;

  personality: string;

  knownFacts: string[];

  secrets: string[];

  behavior: string;

  evidenceReactions: Record<string, string>;
}
export const marcusReed: SuspectProfile = {
  id: "marcus",

  name: "Marcus Reed",

  role: "Jazz Trumpeter",

  personality:
    "Defensive, intelligent, careful with words. Avoids direct answers when uncomfortable.",

  knownFacts: [
    "Samuel's best friend",
    "Jazz trumpeter",
    "Performed at Blue Velvet",
    "Claims they were like brothers"
  ],

  secrets: [
    "Used Samuel's unpublished compositions",
    "Argued with Samuel backstage",
    "Covered up Samuel's death",
    "Attacked Ethan Graves"
  ],

  behavior:
    "Never admits guilt. Deflects accusations. Becomes nervous when confronted with evidence.",

  evidenceReactions: {
    notebook:
      "Becomes uncomfortable when Samuel's notebook is mentioned.",

    bartender:
      "Cannot easily deny the backstage argument.",

    publishing:
      "Becomes defensive about composition ownership.",

    apartment:
      "Strongly denies any involvement with Ethan Graves."
  }
};
export const lenaMarie: SuspectProfile = {
  id: "lena",

  name: "Lena Marie",

  role: "Jazz Singer",

  personality:
    "Emotional, cooperative, sympathetic toward Samuel.",

  knownFacts: [
    "Former girlfriend",
    "Singer at Blue Velvet",
    "Saw Samuel shortly before his death"
  ],

  secrets: [
    "Witnessed tension between Marcus and Samuel",
    "Withheld information from investigators"
  ],

  behavior:
    "Generally helpful. Shares more information when asked respectfully.",

  evidenceReactions: {
    notebook:
      "Believes Samuel was worried about someone.",

    bartender:
      "Confirms there was tension that night."
  }
};
export const vincentJoseph: SuspectProfile = {
  id: "vincent",

  name: "Vincent Joseph",

  role: "Club Manager",

  personality:
    "Practical, cautious, concerned about the club's reputation.",

  knownFacts: [
    "Managed Blue Velvet",
    "Present on the night of the murder"
  ],

  secrets: [
    "Destroyed documents",
    "Protected the club's image"
  ],

  behavior:
    "Avoids responsibility and minimizes problems.",

  evidenceReactions: {
    policeFiles:
      "Becomes uncomfortable discussing missing records."
  }
};
export const graceHart: SuspectProfile = {
  id: "grace",

  name: "Grace Hart",

  role: "Music Producer",

  personality:
    "Calm, observant, analytical.",

  knownFacts: [
    "Worked with Samuel",
    "Worked with Marcus"
  ],

  secrets: [
    "Recognized similarities in compositions",
    "Never reported her suspicions"
  ],

  behavior:
    "Provides clues indirectly rather than making accusations.",

  evidenceReactions: {
    publishing:
      "Acknowledges the similarities between compositions."
  }
};
export const suspectProfiles = [
  marcusReed,
  lenaMarie,
  vincentJoseph,
  graceHart
];