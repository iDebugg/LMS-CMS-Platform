"use client";

import { useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, Download, FileSpreadsheet, Sparkles, Upload, X } from "lucide-react";
import { makeAssessment, type AtlasAssessment, type AtlasCourse, type AtlasQuestion } from "./atlas-store";

type Placement="lesson"|"module"|"final";
export type QuizImportTarget={placement:Placement;code:string;title:string};
type ImportRow={
  row:number; questionId:string; placement:Placement; placementCode:string; questionType:string;
  prompt:string; options:string[]; answer:number; explanation:string; objective:string;
  points:number; required:boolean; passMark:number; attempts:number; timeLimit:number; randomise:boolean;
  errors:string[];
};

const columns=["question_id","placement_type","placement_code","question_type","question_text","option_a","option_b","option_c","option_d","correct_answers","explanation","objective","points","required","pass_mark","attempts","time_limit","randomise"];

function csvCell(value:string|number|boolean){const text=String(value);return /[",\n]/.test(text)?`"${text.replaceAll('"','""')}"`:text}
function toCsv(rows:(string|number|boolean)[][]){return rows.map(row=>row.map(csvCell).join(",")).join("\n")}
function download(name:string,content:string,type="text/csv;charset=utf-8"){
  const url=URL.createObjectURL(new Blob([content],{type}));const link=document.createElement("a");link.href=url;link.download=name;link.click();URL.revokeObjectURL(url);
}

function parseCsv(text:string){
  const rows:string[][]=[];let row:string[]=[];let cell="";let quoted=false;
  for(let i=0;i<text.length;i++){const char=text[i];const next=text[i+1];if(char==='"'&&quoted&&next==='"'){cell+='"';i++;continue}if(char==='"'){quoted=!quoted;continue}if(char===","&&!quoted){row.push(cell.trim());cell="";continue}if((char==="\n"||char==="\r")&&!quoted){if(char==="\r"&&next==="\n")i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell="";continue}cell+=char}
  row.push(cell.trim());if(row.some(Boolean))rows.push(row);return rows;
}

function bool(value:string,fallback=false){if(!value)return fallback;return ["true","yes","1","required"].includes(value.toLowerCase())}
function number(value:string,fallback:number){const parsed=Number(value);return Number.isFinite(parsed)?parsed:fallback}

function validateCsv(text:string,course:AtlasCourse):ImportRow[] {
  const parsed=parseCsv(text);if(!parsed.length)return [];
  const headers=parsed[0].map(item=>item.toLowerCase().trim());const index=(name:string)=>headers.indexOf(name);
  const duplicateIds=new Set<string>();const seen=new Set<string>();
  for(const values of parsed.slice(1)){const id=values[index("question_id")]||"";if(seen.has(id))duplicateIds.add(id);seen.add(id)}
  return parsed.slice(1).map((values,rowIndex)=>{
    const get=(name:string)=>values[index(name)]||"";const errors:string[]=[];
    const placement=(get("placement_type").toLowerCase()||"final") as Placement;const placementCode=get("placement_code")||course.code;
    const questionId=get("question_id");const questionType=get("question_type").toLowerCase()||"single_choice";
    const options=[get("option_a"),get("option_b"),get("option_c"),get("option_d")].filter(Boolean);
    const letter=get("correct_answers").trim().toUpperCase();const answer=letter.charCodeAt(0)-65;
    const lesson=course.curriculum.flatMap(module=>module.lessons).find(item=>item.code.toLowerCase()===placementCode.toLowerCase());
    const targetModule=course.curriculum.find(item=>item.code.toLowerCase()===placementCode.toLowerCase());
    if(!questionId)errors.push("Missing question_id");if(duplicateIds.has(questionId))errors.push("Duplicate question_id");
    if(!["lesson","module","final"].includes(placement))errors.push("Invalid placement_type");
    if(placement==="lesson"&&!lesson)errors.push(`Lesson ${placementCode} was not found`);
    if(placement==="module"&&!targetModule)errors.push(`Module ${placementCode} was not found`);
    if(!["single_choice","true_false"].includes(questionType))errors.push("Use single_choice or true_false");
    if(!get("question_text"))errors.push("Missing question_text");if(options.length<2)errors.push("At least two options are required");
    if(answer<0||answer>=options.length)errors.push("correct_answers must identify an existing option");
    const passMark=number(get("pass_mark"),80);if(passMark<0||passMark>100)errors.push("pass_mark must be 0–100");
    return {row:rowIndex+2,questionId,placement,placementCode,questionType,prompt:get("question_text"),options,answer,explanation:get("explanation"),objective:get("objective"),points:number(get("points"),1),required:bool(get("required"),true),passMark,attempts:number(get("attempts"),2),timeLimit:number(get("time_limit"),placement==="lesson"?5:placement==="module"?10:20),randomise:bool(get("randomise")),errors};
  });
}

function assessmentWithRows(existing:AtlasAssessment|undefined,kind:AtlasAssessment["kind"],subject:string,code:string,rows:ImportRow[],mode:"replace"|"append"){
  const base=existing??makeAssessment(kind,subject,code);const imported:AtlasQuestion[]=rows.map(row=>({id:row.questionId,prompt:row.prompt,options:row.options,answer:row.answer,feedback:row.explanation}));
  const questions=mode==="replace"?imported:[...base.questions.filter(question=>!imported.some(item=>item.id===question.id)),...imported];
  return {...base,questions,questionsShown:questions.length,passMark:rows[0]?.passMark??base.passMark,attempts:rows[0]?.attempts??base.attempts,timeLimit:rows[0]?.timeLimit??base.timeLimit,randomise:rows[0]?.randomise??base.randomise,required:rows[0]?.required??base.required};
}

export function applyQuizImport(course:AtlasCourse,rows:ImportRow[],mode:"replace"|"append"):AtlasCourse {
  const valid=rows.filter(row=>!row.errors.length);const finalRows=valid.filter(row=>row.placement==="final");
  return {...course,
    curriculum:course.curriculum.map(module=>{
      const moduleRows=valid.filter(row=>row.placement==="module"&&row.placementCode.toLowerCase()===module.code.toLowerCase());
      return {...module,quiz:moduleRows.length?assessmentWithRows(module.quiz,"Module quiz",module.title,module.code,moduleRows,mode):module.quiz,lessons:module.lessons.map(lesson=>{
        const lessonRows=valid.filter(row=>row.placement==="lesson"&&row.placementCode.toLowerCase()===lesson.code.toLowerCase());
        return {...lesson,knowledgeCheck:lessonRows.length?assessmentWithRows(lesson.knowledgeCheck,"Knowledge check",lesson.title,lesson.code,lessonRows,mode):lesson.knowledgeCheck};
      })};
    }),
    finalAssessment:finalRows.length?assessmentWithRows(course.finalAssessment,"Final assessment",course.title,course.code,finalRows,mode):course.finalAssessment,
  };
}

export function QuizImport({course,target,onClose,onImport}:{course:AtlasCourse;target?:QuizImportTarget;onClose:()=>void;onImport:(course:AtlasCourse,count:number)=>void}) {
  const input=useRef<HTMLInputElement>(null);const [step,setStep]=useState<"start"|"review">("start");const [filename,setFilename]=useState("");const [rows,setRows]=useState<ImportRow[]>([]);const [mode,setMode]=useState<"replace"|"append">("replace");
  const valid=rows.filter(row=>!row.errors.length);const invalid=rows.filter(row=>row.errors.length);const groups=useMemo(()=>new Set(valid.map(row=>`${row.placement}:${row.placementCode}`)).size,[valid]);
  const targetRow=(questionId="Q-001")=>[questionId,target?.placement||"final",target?.code||course.code,"single_choice",`What best demonstrates practical capability in ${target?.title||course.title}?`,"Apply the method and explain the result","Open every page","Repeat the title","Choose the fastest option","A","The correct response transfers learning into accountable practice.",course.objectives?.[0]||"Demonstrate practical capability",1,true,80,2,target?.placement==="lesson"?5:target?.placement==="module"?10:20,true];
  const template=()=>download(`atlas-${target?.placement||"course"}-quiz-template.csv`,toCsv([columns,targetRow("")]));
  const example=()=>{const firstModule=course.curriculum[0];const firstLesson=firstModule?.lessons[0];download(`atlas-${target?.placement||"course"}-quiz-example.csv`,toCsv(target?[columns,targetRow()]:[columns,
    ["Q-LESSON-001","lesson",firstLesson?.code||"LESSON-01","single_choice","Which action should happen first?","Clarify the intended outcome","Choose the quickest option","Skip documentation","Act without evidence","A","Begin with context and a clear outcome.",firstLesson?.objective||"Apply the lesson principle",1,true,80,2,5,false],
    ["Q-MODULE-001","module",firstModule?.code||"M1","single_choice","Which response demonstrates sound professional judgement?","Use evidence and record the rationale","Assume one approach fits all cases","Avoid checking authority","Escalate every routine task","A","Evidence and accountability support defensible decisions.",firstModule?.objective||"Apply the module capability",1,true,80,2,10,true],
    ["Q-FINAL-001","final",course.code,"single_choice",`What best demonstrates practical capability in ${course.title}?`,"Apply the method and explain the result","Open every page","Repeat the course title","Complete faster than others","A","Transfer into practice is the strongest evidence of learning.",course.objectives?.[0]||"Demonstrate course capability",1,true,80,2,20,true],
  ]))};
  const prompt=()=>download("atlas-question-import-ai-prompt.txt",`Create assessment questions for the Atlas course “${course.title}” (${course.code}).\n\nReturn ONLY a valid CSV using the attached Atlas template. Keep the exact header order. Use single_choice questions with four plausible options and one correct answer letter (A-D). Write clear workplace scenarios, inclusive language, useful explanations, and map every question to one of these valid targets:\n\n${course.curriculum.map(module=>`MODULE: ${module.code} — ${module.title}\n${module.lessons.map(lesson=>`  LESSON: ${lesson.code} — ${lesson.title}`).join("\n")}`).join("\n")}\nFINAL: ${course.code}\n\nGenerate a balanced mix of lesson checks, module quizzes, and final assessment questions. Do not use commas in unquoted fields. Quote any field containing a comma.`,"text/plain;charset=utf-8");
  const upload=async(file?:File)=>{if(!file)return;const text=await file.text();setFilename(file.name);setRows(validateCsv(text,course).map(row=>target&&(row.placement!==target.placement||row.placementCode.toLowerCase()!==target.code.toLowerCase())?{...row,errors:[...row.errors,`This importer only accepts ${target.placement} questions for ${target.code}`]}:row));setStep("review")};
  return <div className="quiz-import-backdrop" onMouseDown={onClose}><section className="quiz-import" onMouseDown={event=>event.stopPropagation()}><header><div><span><FileSpreadsheet/></span><div><small>ATLAS ASSESSMENT IMPORTER</small><h2>{step==="start"?"Import structured quizzes":"Review before importing"}</h2></div></div><button onClick={onClose}><X/></button></header>{step==="start"?<div className="quiz-import-start"><section className="import-intro"><Sparkles/><h3>Build once. Place every question correctly.</h3><p>Use the Atlas CSV format to create lesson checks, module quizzes and the final assessment in one controlled import.</p><ol><li><b>Download</b><span>Use the example or empty template.</span></li><li><b>Create</b><span>Edit it in Excel, Sheets, or give it to an AI.</span></li><li><b>Validate</b><span>Atlas checks targets, answers and settings before changing the course.</span></li></ol></section><section className="import-actions"><button onClick={example}><span><Download/></span><div><b>Download populated example</b><small>Recommended · Uses this course’s real module and lesson codes</small></div><ArrowRight/></button><button onClick={template}><span><FileSpreadsheet/></span><div><b>Download empty CSV template</b><small>Exact column structure for bulk authoring</small></div><ArrowRight/></button><button onClick={prompt}><span><Sparkles/></span><div><b>Download AI generation prompt</b><small>Ready to attach alongside the template</small></div><ArrowRight/></button><div className="import-drop"><input ref={input} hidden type="file" accept=".csv,text/csv" onChange={event=>upload(event.target.files?.[0])}/><Upload/><h3>Upload completed CSV</h3><p>CSV files up to 5 MB</p><button onClick={()=>input.current?.click()}>Choose file</button></div></section></div>:<div className="quiz-import-review"><div className="import-summary"><button onClick={()=>setStep("start")}><ArrowLeft/> Choose another file</button><div><span><FileSpreadsheet/></span><p><b>{filename}</b><small>{rows.length} rows · {groups} assessment placements</small></p></div><article className="valid"><b>{valid.length}</b><span>Ready</span></article><article className={invalid.length?"invalid":"valid"}><b>{invalid.length}</b><span>Need attention</span></article></div><div className="import-mode"><span><b>Import behaviour</b><small>Choose how questions are applied to each matching assessment.</small></span><label><input type="radio" checked={mode==="replace"} onChange={()=>setMode("replace")}/><b>Replace questions</b><small>Recommended for controlled bulk updates</small></label><label><input type="radio" checked={mode==="append"} onChange={()=>setMode("append")}/><b>Append and update IDs</b><small>Keep existing questions and add new ones</small></label></div><div className="import-table"><div className="import-table-head"><span>Row</span><span>Placement</span><span>Question</span><span>Settings</span><span>Status</span></div>{rows.map(row=><article className={row.errors.length?"has-error":""} key={`${row.row}-${row.questionId}`}><span>{row.row}</span><span><b>{row.placement}</b><small>{row.placementCode}</small></span><span><b>{row.prompt||"Untitled question"}</b><small>{row.questionId||"Missing ID"} · {row.options.length} options</small></span><span><b>{row.passMark}% pass</b><small>{row.attempts} attempts · {row.timeLimit} min</small></span><span>{row.errors.length?<><AlertTriangle/><small>{row.errors.join(" · ")}</small></>:<><CheckCircle2/><small>Ready to import</small></>}</span></article>)}</div>{!rows.length&&<div className="import-empty"><AlertTriangle/><h3>No question rows were found</h3><p>Check that the file contains the Atlas header and at least one data row.</p></div>}</div>}<footer><span>{step==="review"?<>{invalid.length?<AlertTriangle/>:<CheckCircle2/>}{invalid.length?`${invalid.length} row${invalid.length===1?"":"s"} will be skipped`:`All ${valid.length} rows passed validation`}</>:<>Nothing changes until you confirm the reviewed import.</>}</span>{step==="review"&&<button disabled={!valid.length} onClick={()=>onImport(applyQuizImport(course,rows,mode),valid.length)}>Import {valid.length} questions <Check/></button>}</footer></section></div>;
}
