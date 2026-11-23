export interface Launch {
  mission: string;
  code: string;
  provider: string;
  date: string;
  location: string;
  status: "Success" | "Failure" | "Go for Launch";
}

export const launchSummary = {
  total: 1428,
  successRate: 94.2,
  successful: 1345,
  payload: 8450,
  averagePayload: 5.9,
};

export const yearlyLaunches = [
  { year: "2022", launches: 186 },
  { year: "2023", launches: 223 },
  { year: "2024", launches: 259 },
  { year: "2025", launches: 312 },
];

export const agencyShare = [
  { name: "SpaceX", value: 62, color: "#c7ff4a" },
  { name: "CASC (China)", value: 22, color: "#38bdf8" },
  { name: "Roscosmos / Otros", value: 16, color: "#8b5cf6" },
];

export const missionOutcome = [
  { name: "Exitosos", value: 1345, color: "#c7ff4a" },
  { name: "Fallidos", value: 83, color: "#fb7185" },
];

export const launches: Launch[] = [
  {
    mission: "Starlink Group 10-2",
    code: "SL-10.2 / F9 B5",
    provider: "SpaceX",
    date: "2026-10-28 14:00Z",
    location: "CCSFS, USA",
    status: "Success",
  },
  {
    mission: "Artemis III",
    code: "ART-03 / SLS",
    provider: "NASA",
    date: "2026-11-15 09:30Z",
    location: "KSC, USA",
    status: "Go for Launch",
  },
  {
    mission: "Long March 2F/P",
    code: "CZ-2F/P Y21",
    provider: "CASC",
    date: "2026-10-12 04:15Z",
    location: "JSLC, China",
    status: "Success",
  },
  {
    mission: "Ariane 6 VA265",
    code: "VA265 / AR6",
    provider: "ESA",
    date: "2026-09-30 18:42Z",
    location: "CSG, Kourou",
    status: "Success",
  },
  {
    mission: "Gaganyaan G1",
    code: "HLVM3-G1",
    provider: "ISRO",
    date: "2026-12-04 06:20Z",
    location: "SDSC, India",
    status: "Go for Launch",
  },
  {
    mission: "Transporter-18",
    code: "TR-18 / F9 B5",
    provider: "SpaceX",
    date: "2026-08-18 21:16Z",
    location: "VSFB, USA",
    status: "Failure",
  },
];