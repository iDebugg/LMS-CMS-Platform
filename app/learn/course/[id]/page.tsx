import { CourseExperience } from "../../../ui/Journeys";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CourseExperience courseId={id} />;
}
