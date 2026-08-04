import type { Metadata } from "next";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = { title: "Accessibility | Von Newman Atlas", description: "Atlas accessibility commitments and feedback channel." };

export default function Accessibility() {
  return <PublicPage data={{
    eyebrow: "Accessibility",
    title: "Learning should welcome more people in.",
    intro: "We are building Atlas so learners and administrators can understand, navigate and operate the experience across different abilities, devices and interaction methods.",
    accent: "yellow",
    features: [
      { title: "Keyboard-ready journeys", body: "Core navigation and learning actions are designed to work without requiring a mouse, with visible focus and logical order." },
      { title: "Accessible learning media", body: "Atlas supports captions, transcripts, alternative text and governed accessibility metadata for learning resources." },
      { title: "A direct feedback route", body: "If something prevents you from using Atlas, contact our team so the problem can be investigated and prioritised." },
    ],
    statement: { title: "Accessibility is ongoing work.", body: "We test and improve the product as features evolve. Where a limitation exists, we aim to explain it honestly and provide a practical support route.", points: ["Clear headings and readable type", "Reduced-motion support", "Accessibility issues welcomed at our support email"] },
    cta: { title: "Tell us where Atlas can work better.", body: "Accessibility feedback can be sent through our support and contact channels." },
  }}/>;
}
