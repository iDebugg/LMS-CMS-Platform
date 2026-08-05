import type { Metadata } from "next";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = { title: "Atlas Platform | Von Newman", description: "A connected learning platform for Nigerian organisations." };

export default function Platform() {
  return <PublicPage data={{
    eyebrow: "The Atlas platform",
    title: "From learning need to measurable progress.",
    intro: "Atlas connects discovery, structured learning, assessment, certification and organisation insight in one coherent experience. Organisations can use the complete Atlas LMS or discuss delivery of licensed content into an existing learning environment.",
    features: [
      { title: "A learner experience people understand", body: "Clear pathways, guided lessons, quizzes, progress, achievements and certificates help each person know where they are and what comes next." },
      { title: "Verified outcomes", body: "Lesson checks, module gates and final course assessments create a meaningful path from participation to demonstrated understanding." },
      { title: "Flexible content delivery", body: "Licensed Atlas courses, modules and media can be delivered through the complete Atlas experience or integrated with an organisation’s existing learning environment." },
    ],
    statement: { title: "One content foundation, delivered the right way.", body: "Learners can use Atlas directly, while organisations with established systems can discuss a suitable content-delivery model with Von Newman.", points: ["Complete Atlas LMS", "Licensed content delivery", "Tailored enterprise integration"] },
  }}/>;
}
