import { CertificateExperience } from "../../../ui/Journeys";

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CertificateExperience certificateId={id} />;
}
