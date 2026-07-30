import { AtlasExperience } from "./ui/AtlasExperience";

export const metadata = {
  title: "Von Newman Atlas — Learning, beautifully connected",
  description:
    "Create, distribute and measure professional learning from one connected platform.",
};

export default function Home() {
  return <AtlasExperience initialView="landing" />;
}
