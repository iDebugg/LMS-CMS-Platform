import { LessonExperience } from "../../../../../ui/Journeys";

export default async function LessonPage({ params }: { params: Promise<{ id: string; lesson: string }> }) {
  const { id, lesson } = await params;
  return <LessonExperience courseId={id} initialLesson={Number(lesson) || 1} />;
}
