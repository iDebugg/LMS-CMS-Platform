import type { Metadata } from "next";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = { title: "Support | Von Newman Atlas", description: "Help for Atlas learners and organisation administrators." };

export default function Support() {
  return <PublicPage data={{
    eyebrow: "Atlas support",
    title: "Get back to learning with a clear next step.",
    intro: "Whether you are signing in, completing a course or administering an organisation workspace, our team can help identify the right route.",
    accent: "blue",
    features: [
      { title: "Sign-in and access help", body: "Get help with organisation codes, account invitations, passwords and the workspace you should be using." },
      { title: "Learner support", body: "Report problems with lessons, quizzes, progression, certificates or the accessibility of learning material." },
      { title: "Administrator support", body: "Workspace administrators can ask about staff imports, assignments, analytics, invitations and organisation access." },
    ],
    statement: { title: "Include enough detail for us to help safely.", body: "Tell us your organisation, the page or course involved, what you expected and what happened. Do not email passwords or sensitive assessment answers.", points: ["Email: info@vonnewmanconsulting.com", "Response targeted within two business days", "Urgent security matters clearly identified"] },
    cta: { title: "Still need help? Talk to our team.", body: "Use the contact page or email info@vonnewmanconsulting.com." },
  }}/>;
}
