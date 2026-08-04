import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    rules: [
      { userAgent: "*", allow: ["/", "/about", "/platform", "/lms", "/organisations", "/catalogue", "/contact", "/security", "/accessibility", "/support", "/privacy", "/terms"], disallow: ["/admin", "/auth", "/learn", "/onboarding"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
