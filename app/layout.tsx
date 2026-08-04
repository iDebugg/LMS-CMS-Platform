import type { Metadata } from "next";
import "./globals.css";
import "./landing.css";
import "./platform.css";
import "./journeys.css";
import "./platform-refinements.css";
import "./learning-flows.css";
import "./course-studio.css";
import "./legal.css";
import "./public-pages.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Von Newman Atlas",
  description: "Learning, beautifully connected.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Von Newman Atlas",
    description: "Learning, beautifully connected.",
    images: [{ url: "/og.png", width: 1696, height: 960, alt: "Von Newman Atlas — Learning, beautifully connected." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Von Newman Atlas",
    description: "Learning, beautifully connected.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
