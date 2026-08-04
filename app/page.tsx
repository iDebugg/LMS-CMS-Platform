import { AtlasExperience } from "./ui/AtlasExperience";

export const metadata = {
  title: "Von Newman Atlas — Learning, beautifully connected",
  description:
    "Create, distribute and measure professional learning from one connected platform.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "Von Newman Technology Consultant Limited", url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000", email: "info@vonnewmanconsulting.com", address: { "@type": "PostalAddress", streetAddress: "No. 3 Jasmine Road, Ikota", addressLocality: "Ikota GRA–Lekki", addressRegion: "Lagos", addressCountry: "NG" } },
      { "@type": "WebSite", name: "Von Newman Atlas", url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000" },
      { "@type": "SoftwareApplication", name: "Atlas", applicationCategory: "EducationalApplication", operatingSystem: "Web", description: "A connected learning platform for Nigerian organisations." },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/><AtlasExperience initialView="landing" /></>;
}
