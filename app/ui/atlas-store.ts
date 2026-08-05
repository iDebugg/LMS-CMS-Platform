"use client";

import { useEffect, useState } from "react";
import type { Course } from "./data";
import { atlasCatalogue, type CatalogueLesson } from "./catalogue.generated";

export type AtlasQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  feedback?: string;
};

export type AtlasAssessment = {
  id: string;
  title: string;
  kind: "Knowledge check" | "Module quiz" | "Final assessment";
  instructions: string;
  questions: AtlasQuestion[];
  questionsShown: number;
  passMark: number;
  attempts: number;
  timeLimit: number;
  randomise: boolean;
  required: boolean;
  feedbackMode: "Immediate" | "After submission";
};

export type AtlasLesson = CatalogueLesson & {
  type?: "Video" | "Text" | "Document" | "Audio" | "Scenario" | "Activity";
  mediaId?: string;
  duration?: string;
  objective?: string;
  completionRule?: string;
  required?: boolean;
  description?: string;
  resources?: string[];
  knowledgeCheck?: AtlasAssessment;
};

export type AtlasModule = {
  code: string;
  title: string;
  description?: string;
  objective?: string;
  required?: boolean;
  lessons: AtlasLesson[];
  unlockRule?: "Previous module" | "Always available";
  quiz?: AtlasAssessment;
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
  lifecycle: "Draft" | "In review" | "Scheduled" | "Published" | "Archived";
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
  finalAssessment?: AtlasAssessment;
  completionPolicy?: {
    requiredLessons: boolean;
    videoThreshold: number;
    requireKnowledgeChecks: boolean;
    requireModuleQuizzes: boolean;
    requireFinalAssessment: boolean;
  };
  certificatePolicy?: {
    enabled: boolean;
    template: string;
    issuer: string;
    validityMonths: number;
    signatories: string[];
    verificationEnabled: boolean;
    renewalReminder: boolean;
  };
  accessPolicy?: {
    audience: string;
    availability: "Immediately after publication" | "Scheduled";
    scheduledAt?: string;
  };
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

function questionSet(subject:string,code:string):AtlasQuestion[] {
  return [
    {id:`${code}-q1`,prompt:`What should happen before applying ${subject.toLowerCase()} in a real workplace decision?`,options:["Clarify the outcome, evidence and people affected","Choose the fastest available option","Copy the previous response","Avoid documenting the decision"],answer:0,feedback:"Sound practice begins with context, evidence and accountability."},
    {id:`${code}-q2`,prompt:"Which response demonstrates the strongest professional judgement?",options:["Act before checking authority","Use evidence, follow the relevant rule and record the rationale","Assume one approach fits every case","Escalate every routine decision"],answer:1,feedback:"Professional judgement combines evidence, rules and a defensible rationale."},
    {id:`${code}-q3`,prompt:"Important information is missing from a scenario. What should you do?",options:["Invent a reasonable detail","Ignore the gap","Identify the gap and seek reliable evidence","Stop all work indefinitely"],answer:2,feedback:"Uncertainty should be identified and reduced with reliable evidence."},
  ];
}

export function makeAssessment(kind:AtlasAssessment["kind"],subject:string,code:string):AtlasAssessment {
  const questions=questionSet(subject,code);
  return {
    id:`${code}-${kind.toLowerCase().replaceAll(" ","-")}`,
    title:kind==="Final assessment"?`${subject} final assessment`:`${subject} ${kind.toLowerCase()}`,
    kind,
    instructions:kind==="Knowledge check"?"Answer the short checkpoint before completing this lesson.":"Apply what you learned to realistic workplace situations.",
    questions,
    questionsShown:questions.length,
    passMark:80,
    attempts:2,
    timeLimit:kind==="Knowledge check"?5:kind==="Module quiz"?10:20,
    randomise:false,
    required:true,
    feedbackMode:"After submission",
  };
}

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
      curriculum: [{
        code: course.code,
        title: course.title,
        description:`Apply ${course.title.toLowerCase()} through a guided sequence of practice.`,
        objective:`Use ${course.title.toLowerCase()} confidently in a relevant workplace situation.`,
        required:true,
        unlockRule:"Previous module",
        lessons:course.lessons.map((lesson,lessonIndex)=>({
          ...lesson,
          type:lessonIndex===0?"Video":lessonIndex===1?"Text":"Activity",
          duration:lessonIndex===0?"08:42":lessonIndex===1?"12 min":"15 min",
          required:true,
          completionRule:lessonIndex===0?"Watch 80% of the video":lessonIndex===1?"Open required resource":"Pass lesson activity",
          objective:`Apply the principle covered in ${lesson.title.toLowerCase()}.`,
          knowledgeCheck:lessonIndex===0?makeAssessment("Knowledge check",lesson.title,lesson.code):undefined,
        })),
        quiz:makeAssessment("Module quiz",course.title,course.code),
      }],
      lifecycle: index % 19 === 0 ? "Draft" : "Published",
      updatedAt: `2026-07-${String(6 + (index % 24)).padStart(2, "0")}`,
      finalAssessment:makeAssessment("Final assessment",course.title,course.code),
      completionPolicy:{requiredLessons:true,videoThreshold:80,requireKnowledgeChecks:true,requireModuleQuizzes:true,requireFinalAssessment:true},
      certificatePolicy:{enabled:true,template:"Federal Service completion certificate",issuer:"Federal Service Learning Directorate",validityMonths:12,signatories:["Course instructor","Learning director"],verificationEnabled:true,renewalReminder:true},
      accessPolicy:{audience:"Entire organisation",availability:"Immediately after publication"},
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
    const canonicalCourses = seed.courses.map(course => {
      const saved=storedById.get(course.id);
      if(!saved)return course;
      const migratedCurriculum=(saved.curriculum?.length?saved.curriculum:course.curriculum).map((savedModule,moduleIndex)=>{
        const canonicalModule=course.curriculum[moduleIndex];
        if(!canonicalModule)return savedModule;
        return {
          ...canonicalModule,
          ...savedModule,
          lessons:savedModule.lessons.map((savedLesson,lessonIndex)=>({
            ...canonicalModule.lessons[lessonIndex],
            ...savedLesson,
            knowledgeCheck:savedLesson.knowledgeCheck??canonicalModule.lessons[lessonIndex]?.knowledgeCheck,
          })),
          quiz:savedModule.quiz??canonicalModule.quiz,
        };
      });
      return {
        ...course,
        ...saved,
        curriculum:migratedCurriculum,
        finalAssessment:saved.finalAssessment??course.finalAssessment,
        completionPolicy:saved.completionPolicy ?? course.completionPolicy,
        certificatePolicy:saved.certificatePolicy ?? course.certificatePolicy,
        accessPolicy:saved.accessPolicy ?? course.accessPolicy,
      };
    });
    const authoredCourses = (stored.courses ?? []).filter(course => !seed.courses.some(canonical => canonical.id === course.id));
    const merged = { ...seed, ...stored, courses: [...canonicalCourses, ...authoredCourses] };
    const courses = merged.courses.map(course => {
      const releaseAt=course.accessPolicy?.scheduledAt ? new Date(course.accessPolicy.scheduledAt).getTime() : 0;
      const released=course.lifecycle==="Scheduled"&&releaseAt>0&&releaseAt<=Date.now();
      const current=released?{...course,published:true,lifecycle:"Published" as const}:course;
      const persistedProgress = window.localStorage.getItem(`atlas-progress-${course.id}`);
      return persistedProgress === null ? current : { ...current, progress: Number(persistedProgress) };
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
    courses: [...state.courses.filter(item => item.id !== course.id), course],
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
