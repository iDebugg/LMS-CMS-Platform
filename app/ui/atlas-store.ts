"use client";

import { useEffect, useState } from "react";
import type { Course } from "./data";
import { atlasCatalogue, type CatalogueLesson } from "./catalogue.generated";

export type AtlasLesson = CatalogueLesson & {
  type?: "Video" | "Text" | "Document" | "Audio" | "Scenario" | "Activity";
  mediaId?: string;
  duration?: string;
  objective?: string;
  completionRule?: string;
  required?: boolean;
};

export type AtlasModule = {
  code: string;
  title: string;
  description?: string;
  objective?: string;
  required?: boolean;
  lessons: AtlasLesson[];
};

export type AtlasCourse = Course & {
  code: string;
  collection: "Public sector" | "Private sector" | "Cross-cutting";
  level: "Foundation" | "Intermediate" | "Advanced";
  description: string;
  instructor: string;
  organisation: string;
  published: boolean;
  learners: number;
  pathCode: string;
  pathTitle: string;
  audience: string;
  curriculum: AtlasModule[];
  lifecycle: "Draft" | "In review" | "Published" | "Archived";
  updatedAt: string;
  fullDescription?: string;
  secondaryCategories?: string[];
  skills?: string[];
  objectives?: string[];
  language?: string;
  introMediaId?: string;
  thumbnail?: string;
  completionRule?: string;
  certificateEnabled?: boolean;
  version?: string;
};

export type AtlasAssignment = {
  id: string;
  courseId: string;
  audience: string;
  access: Course["status"];
  due: string;
  learners: number;
  createdAt: string;
};

export type AtlasNotice = {
  id: string;
  title: string;
  message: string;
  audience: string;
  createdAt: string;
  read: boolean;
};

export type AtlasCredential = {
  id: string;
  courseId: string;
  title: string;
  issued: string;
  status: "Active" | "Renewal due";
};

export type AtlasState = {
  courses: AtlasCourse[];
  assignments: AtlasAssignment[];
  notices: AtlasNotice[];
  credentials: AtlasCredential[];
  points: number;
};

const palette = [
  ["#dcd5ff", "#5b43d6", "✦"], ["#cceffc", "#087ca7", "◒"],
  ["#ffe6ad", "#b65b00", "⌁"], ["#ffd9e8", "#a92c62", "↑"],
  ["#d5f7d9", "#238d4c", "◎"], ["#d9e4ff", "#2d56ba", "₦"],
  ["#ffe1ba", "#9a4b00", "§"], ["#d9f4e5", "#176b49", "◆"],
  ["#f2dcff", "#7b35ae", "◈"], ["#fff0bc", "#8f6a00", "☼"],
  ["#d9f4f4", "#176b6b", "≈"], ["#f7ded8", "#9f4432", "◇"],
] as const;

const instructors = [
  "Dr. Nkiru Ibrahim", "Kelechi Nwosu", "Zainab Lawal", "Femi Akinyemi",
  "Adaeze Obi", "Bola Onifade", "Barr. Imani Edet", "Hauwa Abdullahi",
  "Morenike Salami", "Tosin Balogun", "Chisom Eze", "David Mensah",
];

export const cataloguePaths = atlasCatalogue;

const catalogueCourses: AtlasCourse[] = atlasCatalogue.flatMap((path, pathIndex) =>
  path.courses.map((course, courseIndex) => {
    const index = pathIndex * 7 + courseIndex;
    const [color, accent, art] = palette[index % palette.length];
    const collection: AtlasCourse["collection"] = path.code.startsWith("PUB")
      ? "Public sector"
      : path.code.startsWith("PRI") ? "Private sector" : "Cross-cutting";
    const lessonCount = course.lessons.length;
    const status: Course["status"] = index % 13 === 0
      ? "Mandatory"
      : index % 9 === 0 ? "Assigned" : index % 5 === 0 ? "Recommended" : "Available";
    const progress = index % 17 === 0 ? 68 : index % 23 === 0 ? 34 : index % 29 === 0 ? 100 : 0;
    const level: AtlasCourse["level"] = path.audience.startsWith("L1")
      ? "Foundation"
      : path.audience.includes("L3") ? "Advanced" : "Intermediate";
    return {
      id: course.code.toLowerCase().replace(".", "-"),
      code: course.code,
      title: course.title,
      category: path.title,
      collection,
      level,
      color,
      accent,
      progress,
      duration: `${Math.max(1, Math.floor(lessonCount * 0.7))}h ${String((lessonCount * 13) % 60).padStart(2, "0")}m`,
      modules: 1,
      status,
      art,
      due: status === "Mandatory" ? `Due Aug ${String(8 + (index % 18)).padStart(2, "0")}` : undefined,
      description: `Build practical capability in ${course.title.toLowerCase()} through ${lessonCount} applied lessons grounded in the ${path.title} pathway.`,
      instructor: instructors[index % instructors.length],
      organisation: collection === "Public sector" ? "Federal Service" : collection === "Private sector" ? "Atlas Professional Academy" : "All organisations",
      published: index % 19 !== 0,
      learners: 180 + ((index * 173) % 4100),
      pathCode: path.code,
      pathTitle: path.title,
      audience: path.audience,
      curriculum: [{ code: course.code, title: course.title, lessons: course.lessons }],
      lifecycle: index % 19 === 0 ? "Draft" : "Published",
      updatedAt: `2026-07-${String(6 + (index % 24)).padStart(2, "0")}`,
    };
  }),
);

const seed: AtlasState = {
  courses: catalogueCourses,
  assignments: [
    { id: "asg-ai", courseId: "x-03-2", audience: "All Federal Service staff", access: "Mandatory", due: "2026-08-08", learners: 2480, createdAt: "2026-07-20" },
    { id: "asg-policy", courseId: "pub-06-2", audience: "Policy and planning roles", access: "Assigned", due: "2026-08-18", learners: 428, createdAt: "2026-07-24" },
    { id: "asg-cyber", courseId: "pri-10-1", audience: "All active accounts", access: "Mandatory", due: "2026-08-14", learners: 3120, createdAt: "2026-07-15" },
  ],
  notices: [
    { id: "notice-1", title: "August learning priorities", message: "Complete your mandatory AI and cybersecurity learning before their published deadlines.", audience: "Entire Federal Service workspace", createdAt: "30 Jul · 09:10", read: false },
    { id: "notice-2", title: "You earned Consistency Champion", message: "You reached your weekly goal for seven consecutive weeks.", audience: "Amara Okafor", createdAt: "29 Jul · 16:42", read: false },
  ],
  credentials: [
    { id: "VN-ATL-2026-07128", courseId: "pub-05-2", title: "Frontline Excellence", issued: "14 June 2026", status: "Active" },
    { id: "VN-ATL-2025-04119", courseId: "pri-10-4", title: "Data Protection", issued: "22 August 2025", status: "Renewal due" },
    { id: "VN-ATL-2026-02102", courseId: "pub-04-3", title: "Ethics in Practice", issued: "18 February 2026", status: "Active" },
  ],
  points: 2840,
};

const KEY = "atlas-platform-state-v3";
const EVENT = "atlas-state-change";

export function readAtlasState(): AtlasState {
  if (typeof window === "undefined") return seed;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) {
    window.localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    const stored = JSON.parse(raw) as AtlasState;
    const storedById = new Map((stored.courses ?? []).map(course => [course.id, course]));
    const canonicalCourses = seed.courses.map(course => ({ ...course, ...storedById.get(course.id), curriculum: course.curriculum }));
    const authoredCourses = (stored.courses ?? []).filter(course => !seed.courses.some(canonical => canonical.id === course.id));
    const merged = { ...seed, ...stored, courses: [...canonicalCourses, ...authoredCourses] };
    const courses = merged.courses.map(course => {
      const persistedProgress = window.localStorage.getItem(`atlas-progress-${course.id}`);
      return persistedProgress === null ? course : { ...course, progress: Number(persistedProgress) };
    });
    const generatedCredentials = courses.flatMap(course => {
      const id = window.localStorage.getItem(`atlas-certificate-${course.id}`);
      if (!id || merged.credentials.some(item => item.id === id)) return [];
      return [{ id, courseId: course.id, title: course.title, issued: "30 July 2026", status: "Active" as const }];
    });
    return { ...merged, courses, credentials: [...generatedCredentials, ...merged.credentials] };
  } catch {
    return seed;
  }
}

export function updateAtlasState(update: (current: AtlasState) => AtlasState) {
  const next = update(readAtlasState());
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  return next;
}

export function useAtlasState() {
  const [state, setState] = useState<AtlasState>(seed);
  useEffect(() => {
    // Hydrate the browser-only demo store after the server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readAtlasState());
    const sync = (event: Event) => setState((event as CustomEvent<AtlasState>).detail || readAtlasState());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return state;
}

export function publishCourse(course: AtlasCourse) {
  return updateAtlasState(state => ({
    ...state,
    courses: [...state.courses.filter(item => item.id !== course.id), { ...course, published: true }],
  }));
}

export function saveCourse(course: AtlasCourse) {
  return updateAtlasState(state => ({
    ...state,
    courses: [...state.courses.filter(item => item.id !== course.id), course],
  }));
}

export function createAssignment(assignment: AtlasAssignment) {
  return updateAtlasState(state => ({
    ...state,
    assignments: [assignment, ...state.assignments],
    courses: state.courses.map(course => course.id === assignment.courseId
      ? { ...course, status: assignment.access, due: `Due ${new Date(`${assignment.due}T00:00:00`).toLocaleDateString("en-NG", { month: "short", day: "2-digit" })}` }
      : course),
    notices: [{
      id: `notice-${Date.now()}`,
      title: `New ${assignment.access.toLowerCase()} learning`,
      message: `${state.courses.find(course => course.id === assignment.courseId)?.title} was assigned to ${assignment.audience}.`,
      audience: assignment.audience,
      createdAt: "Just now",
      read: false,
    }, ...state.notices],
  }));
}

export function sendAnnouncement(notice: Omit<AtlasNotice, "id" | "createdAt" | "read">) {
  return updateAtlasState(state => ({
    ...state,
    notices: [{ ...notice, id: `notice-${Date.now()}`, createdAt: "Just now", read: false }, ...state.notices],
  }));
}

export function markNoticesRead() {
  return updateAtlasState(state => ({ ...state, notices: state.notices.map(notice => ({ ...notice, read: true })) }));
}
