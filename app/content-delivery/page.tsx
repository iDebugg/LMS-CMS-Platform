import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { PublicPage } from "../ui/PublicSite";

export const metadata: Metadata = {
  title: "Atlas Content Delivery | Von Newman",
  description: "License and deliver Von Newman Atlas courses, modules, videos and assessments through Atlas or your organisation's existing LMS.",
};

export default function ContentDelivery() {
  return <PublicPage data={{
    eyebrow: "Atlas content delivery",
    title: "Already have an LMS? Bring Atlas content into it.",
    intro: "Atlas includes a powerful content-management capability for creating, governing and distributing courses, modules, videos, assessments and learning resources. Organisations can license Von Newman content without replacing the learning environment they already use.",
    accent: "yellow",
    features: [
      { title: "Content APIs", body: "Discuss secure, permissioned access to approved course metadata, structures and learning resources for a tailored system integration." },
      { title: "Hosted delivery", body: "Launch licensed Atlas learning from your environment while Von Newman hosts and governs the underlying learning experience and content." },
      { title: "Portable packages", body: "Where suitable, content may be prepared for standards-based or packaged delivery into compatible learning platforms." },
    ],
    statement: {
      title: "Content freedom, with governance intact.",
      body: "The appropriate delivery model depends on licensing, content type and your organisation’s technical environment. We shape the integration around the outcome—not a one-size-fits-all connector.",
      points: ["Licensed courses and modules", "Videos, transcripts and resources", "Assessments and reporting options"],
    },
    cta: { title: "Tell us how your learning environment works.", body: "We’ll help identify a practical content-delivery route for your organisation." },
  }}>
    <section className="delivery-options public-scroll-reveal">
      <div className="delivery-options-heading"><span>Possible delivery routes</span><h2>Meet your organisation where it already learns.</h2><p>Depending on your requirements and technical environment, a Von Newman content arrangement may include one or more of these approaches.</p></div>
      <div className="delivery-options-list">
        {["Secure content APIs", "Hosted learning delivery", "SCORM-compatible packages", "LTI-based course launches", "xAPI activity reporting", "Licensed video, transcript and resource access"].map(item => <div key={item}><Check/>{item}</div>)}
      </div>
      <aside><ShieldCheck/><div><b>Clear by design</b><p>This page describes integration possibilities, not a promise that every method is available for every content licence or LMS.</p></div></aside>
      <Link className="site-pill dark" href="/contact">Discuss your existing LMS <ArrowRight/></Link>
    </section>
  </PublicPage>;
}
