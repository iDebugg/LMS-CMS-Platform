export type Course = {
  id: string;
  title: string;
  category: string;
  color: string;
  accent: string;
  progress: number;
  duration: string;
  modules: number;
  status: "Mandatory" | "Assigned" | "Recommended" | "Available";
  art: string;
  due?: string;
};

export const courses: Course[] = [
  {
    id: "ai-work",
    title: "AI for Smarter Public Service",
    category: "Artificial Intelligence",
    color: "#dcd5ff",
    accent: "#5b43d6",
    progress: 68,
    duration: "4h 20m",
    modules: 6,
    status: "Mandatory",
    art: "✦",
    due: "Due Aug 08",
  },
  {
    id: "data-stories",
    title: "Data Stories That Drive Decisions",
    category: "Data & Analytics",
    color: "#cceffc",
    accent: "#087ca7",
    progress: 34,
    duration: "3h 45m",
    modules: 5,
    status: "Assigned",
    art: "◒",
  },
  {
    id: "cyber",
    title: "Cybersecurity Starts With You",
    category: "Cybersecurity",
    color: "#ffe6ad",
    accent: "#d46b00",
    progress: 0,
    duration: "2h 10m",
    modules: 4,
    status: "Mandatory",
    art: "⌁",
    due: "Due Aug 14",
  },
  {
    id: "leadership",
    title: "Lead With Clarity",
    category: "Leadership",
    color: "#ffd9e8",
    accent: "#b62964",
    progress: 0,
    duration: "5h 30m",
    modules: 7,
    status: "Recommended",
    art: "↑",
  },
  {
    id: "service",
    title: "Human-Centred Public Service",
    category: "Public Service",
    color: "#d5f7d9",
    accent: "#238d4c",
    progress: 100,
    duration: "3h 15m",
    modules: 5,
    status: "Available",
    art: "◎",
  },
  {
    id: "finance",
    title: "Finance Essentials for Managers",
    category: "Business & Finance",
    color: "#d9e4ff",
    accent: "#2d56ba",
    progress: 0,
    duration: "4h 05m",
    modules: 6,
    status: "Available",
    art: "₦",
  },
];

export const activity = [
  { name: "Amina Bello", action: "completed", item: "AI for Smarter Public Service", time: "12 min ago", initials: "AB" },
  { name: "Chinedu Okafor", action: "passed", item: "Module 4 assessment", time: "28 min ago", initials: "CO" },
  { name: "Nneka Eze", action: "earned", item: "Data Pathfinder badge", time: "44 min ago", initials: "NE" },
  { name: "Tunde Adebayo", action: "started", item: "Cybersecurity Starts With You", time: "1 hr ago", initials: "TA" },
];

export const departments = [
  { name: "Digital Services", value: 91, color: "#6552df" },
  { name: "Operations", value: 78, color: "#24ad8b" },
  { name: "Finance", value: 74, color: "#f7a843" },
  { name: "People & Culture", value: 68, color: "#ee7198" },
];
