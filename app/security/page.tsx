import type { Metadata } from "next";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = { title: "Security | Von Newman Atlas", description: "How Atlas approaches access, privacy and learning-data protection." };

export default function Security() {
  return <PublicPage data={{
    eyebrow: "Security and trust",
    title: "Learning data deserves deliberate protection.",
    intro: "Atlas is designed around organisation separation, role-controlled access and auditable learning records. This page describes our product direction and does not claim certifications that have not been independently verified.",
    accent: "mint",
    features: [
      { title: "Role-based access", body: "Learners, organisation administrators and Von Newman administrators receive distinct permissions aligned with their responsibilities." },
      { title: "Organisation separation", body: "Workspace information and workforce analytics are scoped to authorised users from the relevant organisation." },
      { title: "Responsible operations", body: "Access, assessment, certificate and administrative events are designed to support traceability and accountable review." },
    ],
    statement: { title: "Trust is a product requirement, not a footer claim.", body: "Detailed hosting, encryption, retention, recovery and incident-response commitments will be published alongside the production infrastructure and customer agreements.", points: ["Nigeria-focused privacy documentation", "Least-privilege product design", "Security questions answered by our team"] },
    cta: { title: "Have a security or data-protection question?", body: "Contact Von Newman for the information your organisation needs to evaluate Atlas." },
  }}/>;
}
