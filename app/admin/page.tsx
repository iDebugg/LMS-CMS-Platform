import { AtlasExperience } from "../ui/AtlasExperience";

export const metadata = {
  title: "Atlas CMS — Von Newman Atlas",
  description: "Create, govern and distribute learning.",
};

export default function Admin() {
  return <AtlasExperience initialView="cms" />;
}
