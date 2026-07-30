import { AssessmentExperience } from "../../../../ui/Journeys";

export default async function AssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AssessmentExperience courseId={id} />;
}
