import { AtlasExperience } from "../ui/AtlasExperience";

export const metadata = {
  title: "My Learning — Von Newman Atlas",
  description: "Your organisation learning workspace.",
};

export default function Learn() {
  return <AtlasExperience initialView="lms" />;
}
