import type { Metadata } from "next";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = { title: "Atlas Platform | Von Newman", description: "A connected learning platform for Nigerian organisations." };

export default function Platform() {
  return <PublicPage data={{
    eyebrow: "The Atlas platform",
    title: "From learning need to measurable progress.",
    intro: "Atlas connects discovery, structured learning, assessment, certification and organisation insight in one coherent experience. Its authoring system remains private to authorised Von Newman administrators.",
    features: [
      { title: "A learner experience people understand", body: "Clear pathways, guided lessons, quizzes, progress, achievements and certificates help each person know where they are and what comes next." },
      { title: "Verified outcomes", body: "Lesson checks, module gates and final course assessments create a meaningful path from participation to demonstrated understanding." },
      { title: "Organisation insight", body: "Authorised workspace administrators can see workforce progress, compliance, learning activity and areas requiring support—inside the LMS." },
    ],
    statement: { title: "One experience, with the right access for every role.", body: "Learners see their own journey. Organisation administrators see their workforce. Only authorised Von Newman administrators access the private content-management environment.", points: ["Role-controlled access", "Organisation-separated data", "Visible progress and auditable completion"] },
  }}/>;
}
