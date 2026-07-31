import { ModuleQuizExperience } from "../../../../../../ui/Journeys";

export default async function ModuleQuizPage({params}:{params:Promise<{id:string;module:string}>}) {
  const {id,module}=await params;
  return <ModuleQuizExperience courseId={id} moduleNumber={Number(module)||1}/>;
}
