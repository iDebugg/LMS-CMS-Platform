import { readFile, writeFile } from "node:fs/promises";

const source = process.argv[2];
const destination = process.argv[3] ?? "app/ui/catalogue.generated.ts";

if (!source) {
  throw new Error("Usage: node scripts/generate-catalogue.mjs <catalogue.md> [destination]");
}

const markdown = await readFile(source, "utf8");
const lines = markdown.split(/\r?\n/);
const paths = [];
let currentPath;
let currentCourse;
let currentSection = "";

for (const raw of lines) {
  const line = raw.trim();
  const sectionMatch = line.match(/^\.?#\s+PART\s+[A-C]\s+[—-]\s+(.+)$/);
  if (sectionMatch) {
    currentSection = sectionMatch[1].trim();
    currentPath = undefined;
    currentCourse = undefined;
    continue;
  }
  const pathMatch = line.match(/^##\s+((?:PUB|PRI|X)-\d{2})\s+[—-]\s+(.+)$/);
  if (pathMatch) {
    currentPath = { code: pathMatch[1], title: pathMatch[2].trim(), section: currentSection, audience: "", courses: [] };
    paths.push(currentPath);
    currentCourse = undefined;
    continue;
  }

  const courseMatch = line.match(/^\*\*((?:PUB|PRI|X)-\d{2}\.\d+)\s+[—-]\s+(.+)\*\*$/);
  if (courseMatch && currentPath) {
    currentCourse = { code: courseMatch[1], title: courseMatch[2].trim(), lessons: [] };
    currentPath.courses.push(currentCourse);
    continue;
  }

  const lessonMatch = line.match(/^-\s+((?:\d{2}\.)?\d+\.\d+\.\d+)\s+(.+)$/);
  if (lessonMatch && currentCourse) {
    currentCourse.lessons.push({ code: lessonMatch[1], title: lessonMatch[2].trim() });
    continue;
  }

  if (currentPath && !currentCourse && /^\*[^*].+\*$/.test(line)) {
    currentPath.audience = line.replace(/^\*|\*$/g, "").trim();
  }
}

if (paths.length < 20) {
  throw new Error(`Catalogue parse produced only ${paths.length} paths`);
}

const output = `/* Generated from von-newman-atlas-course-catalogue.md. Do not edit by hand. */
export type CatalogueLesson = { code: string; title: string };
export type CatalogueCourse = { code: string; title: string; lessons: CatalogueLesson[] };
export type CataloguePath = {
  code: string;
  title: string;
  section: string;
  audience: string;
  courses: CatalogueCourse[];
};

export const atlasCatalogue: CataloguePath[] = ${JSON.stringify(paths, null, 2)};
`;

await writeFile(destination, output);
console.log(`Generated ${paths.length} paths, ${paths.reduce((sum, path) => sum + path.courses.length, 0)} courses and ${paths.reduce((sum, path) => sum + path.courses.reduce((count, course) => count + course.lessons.length, 0), 0)} lessons.`);
