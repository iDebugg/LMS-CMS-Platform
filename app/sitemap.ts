import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/about", "/platform", "/lms", "/content-delivery", "/organisations", "/catalogue", "/contact", "/security", "/accessibility", "/support", "/privacy", "/terms"];
  return routes.map((route, index) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-08-04"),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/contact" ? .9 : .7,
  }));
}
