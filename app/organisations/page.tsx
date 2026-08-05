import type { Metadata } from "next";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = { title: "Atlas for Organisations | Von Newman", description: "Manage workforce learning without exposing private content administration." };

export default function Organisations() {
  return <PublicPage data={{
    eyebrow: "For organisations",
    title: "Give every team the right learning—and see how they are doing.",
    intro: "Each organisation receives a separated Atlas workspace with its own learners, administrators, access rules, assignments and private workforce analytics.",
    accent: "mint",
    features: [
      { title: "Bring your people in clearly", body: "Add staff individually or import structured workforce records by CSV, with validation before invitations are issued." },
      { title: "Private administrator analytics", body: "Multiple authorised workspace administrators can review staff progress, departments, overdue learning and credentials within the LMS." },
      { title: "Use Atlas—or keep your LMS", body: "Adopt the complete Atlas learner experience or discuss secure delivery of licensed Von Newman content into your current learning environment." },
    ],
    statement: { title: "Organisation control without unnecessary complexity.", body: "Atlas separates learner activity, workspace administration and private platform administration so every role gets the tools it genuinely needs.", points: ["Multiple workspace administrators", "CSV staff onboarding", "Department and individual learning records"] },
  }}/>;
}
