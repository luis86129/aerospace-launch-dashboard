// Datos de uso de Internet por edad
// Modifica estos datos fácilmente para actualizar las estadísticas

export interface InternetUsageData {
  ageGroup: string;
  usagePercentage: number;
  dailyHours: number;
  mobileUsers: number;
  desktopUsers: number;
}

export const internetUsageByAge: InternetUsageData[] = [
  {
    ageGroup: "16-24",
    usagePercentage: 98,
    dailyHours: 6.5,
    mobileUsers: 95,
    desktopUsers: 65,
  },
  {
    ageGroup: "25-34",
    usagePercentage: 96,
    dailyHours: 5.8,
    mobileUsers: 92,
    desktopUsers: 78,
  },
  {
    ageGroup: "35-44",
    usagePercentage: 92,
    dailyHours: 4.9,
    mobileUsers: 88,
    desktopUsers: 82,
  },
  {
    ageGroup: "45-54",
    usagePercentage: 85,
    dailyHours: 4.2,
    mobileUsers: 80,
    desktopUsers: 75,
  },
  {
    ageGroup: "55-64",
    usagePercentage: 75,
    dailyHours: 3.5,
    mobileUsers: 68,
    desktopUsers: 65,
  },
  {
    ageGroup: "65+",
    usagePercentage: 58,
    dailyHours: 2.8,
    mobileUsers: 48,
    desktopUsers: 52,
  },
];

export const platformDistribution = [
  { name: "Móvil", value: 68, color: "#8b5cf6" },
  { name: "Escritorio", value: 25, color: "#06b6d4" },
  { name: "Tablet", value: 7, color: "#10b981" },
];

export const activityTypes = [
  { activity: "Redes Sociales", percentage: 85 },
  { activity: "Mensajería", percentage: 78 },
  { activity: "Streaming", percentage: 72 },
  { activity: "Compras", percentage: 58 },
  { activity: "Trabajo", percentage: 52 },
  { activity: "Educación", percentage: 45 },
];

// Dashboard de lanzamientos espaciales
// Todos los indicadores y gráficos se actualizan editando únicamente este archivo.

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

export interface Launch {
  mission: string;
  code: string;
  provider: string;
  date: string;
  location: string;
  status: "Success" | "Failure" | "Go for Launch";
}

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
