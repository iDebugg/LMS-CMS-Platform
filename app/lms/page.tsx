import type { Metadata } from "next";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = { title: "Atlas LMS | Von Newman", description: "An immersive learning experience for people and organisations." };

export default function LMS() {
  return <PublicPage data={{
    eyebrow: "Atlas learning experience",
    title: "Learning that shows people what comes next.",
    intro: "Atlas gives learners an immersive, guided experience—from onboarding and pathway discovery through lessons, knowledge checks, final assessments and verified certificates.",
    accent: "blue",
    features: [
      { title: "Guided pathways", body: "Role-relevant programmes arrange courses in a clear recommended sequence with prerequisites and visible progress." },
      { title: "Assessment at the right moments", body: "Lesson quizzes confirm immediate understanding, module quizzes unlock progression and course-level assessments validate completion." },
      { title: "Trusted credentials", body: "Certificates connect learner identity, completed learning, final scores and verification details in one consistent record." },
    ],
    statement: { title: "Designed to feel like a journey—not a dashboard.", body: "Every interaction should help the learner understand the purpose of the learning, complete the next meaningful action and see the progress they have earned.", points: ["Accessible lesson navigation", "Automatic progression after passing", "Certificates and achievements learners can revisit"] },
  }}/>;
}
