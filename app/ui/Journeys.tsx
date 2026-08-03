"use client";

import {
  ArrowLeft, ArrowRight, Award, BookOpen, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Clock3, Eye, EyeOff, FileText,
  GraduationCap, Headphones, Lightbulb, LockKeyhole, Menu, MessageSquare,
  Pause, Play, RotateCcw, Search, Settings2, ShieldCheck, Sparkles, Star, Target, Trophy,
  Volume2, X, Zap
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { makeAssessment, useAtlasState, updateAtlasState, type AtlasAssessment, type AtlasCourse, type AtlasModule } from "./atlas-store";
import { CertificateDesign } from "./CertificateDesign";

gsap.registerPlugin(ScrollTrigger,useGSAP);

const demoUsers = [
  { initials: "AO", name: "Amara Okafor", role: "Learner", email: "amara.okafor@federalservice.demo", color: "#ffd5c7" },
  { initials: "IK", name: "Ifeoma Kalu", role: "Organisation administrator", email: "ifeoma.kalu@federalservice.demo", color: "#dcd5ff" },
  { initials: "DM", name: "David Mensah", role: "Course author", email: "david.mensah@atlas.demo", color: "#cef2e5" },
];

const courseModules = [
  { title: "Understanding AI at work", lessons: ["Welcome to your AI journey", "What AI can—and cannot—do", "A day with AI in public service"], duration: "38 min" },
  { title: "Prompting for better outcomes", lessons: ["The anatomy of a useful prompt", "Context changes everything", "Practice: rewrite the request"], duration: "46 min" },
  { title: "Responsible use and judgement", lessons: ["Bias, fairness and accountability", "Protecting citizen information", "When a human must decide"], duration: "51 min" },
  { title: "AI in decision-making", lessons: ["From evidence to insight", "Reading AI output critically", "Scenario: the funding recommendation"], duration: "44 min" },
  { title: "Designing your AI workflow", lessons: ["Map your current process", "Choose where AI helps", "Build your personal playbook"], duration: "39 min" },
  { title: "Assessment and reflection", lessons: ["Knowledge check", "Applied scenario", "Your next commitment"], duration: "32 min" },
];

const curricula:Record<string,{description:string;skill:string;modules:typeof courseModules}>={
  "data-stories":{description:"Turn complex evidence into clear narratives, useful visual choices and confident public decisions.",skill:"Evidence-led storytelling",modules:[
    {title:"Finding the decision inside the data",lessons:["Why data stories matter","Start with the decision","Activity: define your audience"],duration:"41 min"},
    {title:"Questioning the evidence",lessons:["Source quality and bias","Patterns are not explanations","Practice: challenge the chart"],duration:"47 min"},
    {title:"Designing clear visual stories",lessons:["Choose the right visual","Direct attention responsibly","Build a one-page briefing"],duration:"55 min"},
    {title:"Presenting with confidence",lessons:["Structure the narrative","Explain uncertainty","Scenario: the executive room"],duration:"49 min"},
    {title:"Assessment and action",lessons:["Knowledge check","Create your data story","Reflection and next step"],duration:"38 min"}
  ]},
  cyber:{description:"Build practical habits that protect public information, systems and colleagues from everyday security threats.",skill:"Security-aware judgement",modules:[
    {title:"Your role in cyber safety",lessons:["Security is everyone's work","Recognise valuable information","Your personal risk surface"],duration:"30 min"},
    {title:"Phishing and social engineering",lessons:["Read the warning signs","Verify before you trust","Scenario: urgent director request"],duration:"36 min"},
    {title:"Passwords, devices and access",lessons:["Strong access habits","Safe remote work","Report a lost device"],duration:"31 min"},
    {title:"Respond and recover",lessons:["What to report","Contain without panic","Final security check"],duration:"33 min"}
  ]},
  leadership:{description:"Lead teams with clear expectations, thoughtful feedback and decisions people can understand.",skill:"Clear, human leadership",modules:[
    {title:"Clarity begins with you",lessons:["The work of a leader","Turn priorities into direction","Reflection: your leadership signal"],duration:"44 min"},
    {title:"Conversations that move work",lessons:["Listen for meaning","Give useful feedback","Practice: the difficult conversation"],duration:"52 min"},
    {title:"Decisions and accountability",lessons:["Name the decision","Invite challenge","Communicate the why"],duration:"45 min"},
    {title:"Teams that learn",lessons:["Create psychological safety","Run useful retrospectives","Coach through questions"],duration:"48 min"},
    {title:"Leading change",lessons:["Understand resistance","Build credible momentum","Scenario: a new operating model"],duration:"51 min"},
    {title:"Performance in practice",lessons:["Set fair expectations","Support and intervene","Manager action plan"],duration:"49 min"},
    {title:"Leadership assessment",lessons:["Knowledge check","Applied leadership scenario","Your 30-day commitment"],duration:"41 min"}
  ]},
  service:{description:"Design services around real citizen needs and turn insight into practical improvements.",skill:"Human-centred service design",modules:[
    {title:"See through citizen eyes",lessons:["Services are experiences","Listen without assuming","Observation exercise"],duration:"37 min"},
    {title:"Map the journey",lessons:["Moments that matter","Pain points and root causes","Build a journey map"],duration:"43 min"},
    {title:"Create better possibilities",lessons:["Frame the opportunity","Generate practical ideas","Prioritise with evidence"],duration:"39 min"},
    {title:"Prototype and learn",lessons:["Start small","Test with real people","Capture what changed"],duration:"42 min"},
    {title:"Service improvement plan",lessons:["Measure better outcomes","Build your improvement brief","Final reflection"],duration:"35 min"}
  ]},
  finance:{description:"Read budgets, evaluate trade-offs and make financially responsible management decisions.",skill:"Financial decision confidence",modules:[
    {title:"Finance in everyday management",lessons:["Your financial responsibility","Read the basic statements","Translate numbers into questions"],duration:"42 min"},
    {title:"Planning and budgeting",lessons:["Build from priorities","Fixed and variable costs","Create a simple budget"],duration:"46 min"},
    {title:"Monitoring performance",lessons:["Variance explained","Forecast with evidence","Spot risk early"],duration:"39 min"},
    {title:"Making investment decisions",lessons:["Costs, benefits and trade-offs","Whole-life value","Scenario: fund the programme"],duration:"44 min"},
    {title:"Controls and accountability",lessons:["Approval and separation","Document the decision","Respond to an exception"],duration:"36 min"},
    {title:"Finance assessment",lessons:["Knowledge check","Manager case study","Your financial action plan"],duration:"38 min"}
  ]}
};

type LearnerModule=AtlasModule&{duration:string};
function getCurriculum(course:AtlasCourse):{description:string;skill:string;modules:LearnerModule[]} {
  if(course.curriculum?.length) {
    return {
      description:course.fullDescription||course.description,
      skill:`Applied ${course.pathTitle.toLowerCase()} capability`,
      modules:course.curriculum.map(module=>({
        ...module,
        duration:`${Math.max(24,module.lessons.length*11)} min`,
      })),
    };
  }
  const legacy=curricula[course.id];
  if(legacy) return {...legacy,modules:legacy.modules.map((module,mi)=>({
    code:`${course.code}-M${mi+1}`,title:module.title,duration:module.duration,required:true,unlockRule:mi?"Previous module":"Always available",
    lessons:module.lessons.map((title,li)=>({code:`${course.code}-${mi+1}-${li+1}`,title,type:li===0?"Video":"Activity",duration:li===0?"08:42":"12 min",required:true,completionRule:li===0?"Watch 80% of the video":"Mark complete manually"})),
    quiz:makeAssessment("Module quiz",module.title,`${course.code}-M${mi+1}`),
  }))};
  const subject=course.title;
  const category=course.category;
  return {
    description:course.description,
    skill:`Applied ${category.toLowerCase()} capability`,
    modules:[
      {title:`Orientation: ${subject}`,lessons:[`Why ${subject.toLowerCase()} matters`,`The Nigerian workplace context`,`Set your practical learning goal`],duration:"34 min"},
      {title:`Core principles of ${category}`,lessons:["Recognise the essential concepts","Distinguish good practice from common errors","Knowledge check: choose the sound approach"],duration:"46 min"},
      {title:"Practise with a realistic scenario",lessons:["Read the workplace brief","Make and defend your decision","Compare your approach with expert guidance"],duration:"58 min"},
    ].map((module,mi)=>({code:`${course.code}-M${mi+1}`,title:module.title,duration:module.duration,required:true,unlockRule:mi?"Previous module" as const:"Always available" as const,lessons:module.lessons.map((title,li)=>({code:`${course.code}-${mi+1}-${li+1}`,title,type:li===0?"Video" as const:"Activity" as const,duration:li===0?"08:42":"12 min",required:true,completionRule:li===0?"Watch 80% of the video":"Mark complete manually"})),quiz:makeAssessment("Module quiz",module.title,`${course.code}-M${mi+1}`)}))
  };
}

type LearnerProgress={
  ready:boolean; completed:Set<number>; lessonPassed:(lesson:AtlasModule["lessons"][number])=>boolean;
  moduleReady:(index:number)=>boolean; modulePassed:(index:number)=>boolean; moduleUnlocked:(index:number)=>boolean;
  lessonUnlocked:(moduleIndex:number,lessonIndex:number)=>boolean; finalReady:boolean;
};

function readLearnerProgress(course:AtlasCourse,modules:LearnerModule[],completedOverride?:number[]):LearnerProgress {
  if(typeof window==="undefined")return {ready:false,completed:new Set(),lessonPassed:()=>false,moduleReady:()=>false,modulePassed:()=>false,moduleUnlocked:index=>index===0,lessonUnlocked:(moduleIndex,lessonIndex)=>moduleIndex===0&&lessonIndex===0,finalReady:false};
  const completed=new Set(completedOverride??JSON.parse(localStorage.getItem(`atlas-complete-${course.id}`)||"[]") as number[]);
  const lessonNumber=(moduleIndex:number,lessonIndex:number)=>modules.slice(0,moduleIndex).reduce((sum,module)=>sum+module.lessons.length,0)+lessonIndex+1;
  const lessonPassed=(lesson:AtlasModule["lessons"][number])=>!lesson.knowledgeCheck||lesson.knowledgeCheck.required===false||localStorage.getItem(`atlas-check-${course.id}-${lesson.code}`)==="passed";
  const moduleReady=(index:number)=>modules[index].lessons.every((lesson,lessonIndex)=>lesson.required===false||(completed.has(lessonNumber(index,lessonIndex))&&lessonPassed(lesson)));
  const modulePassed=(index:number)=>{const assessment=modules[index].quiz;if(!moduleReady(index))return false;if(!assessment||assessment.required===false||course.completionPolicy?.requireModuleQuizzes===false)return true;return Number(localStorage.getItem(`atlas-module-quiz-${course.id}-${index+1}`)||0)>=assessment.passMark};
  const moduleUnlocked=(index:number)=>index===0||modules.slice(0,index).every((_,previous)=>modulePassed(previous));
  const lessonUnlocked=(moduleIndex:number,lessonIndex:number)=>moduleUnlocked(moduleIndex)&&modules[moduleIndex].lessons.slice(0,lessonIndex).every((lesson,index)=>lesson.required===false||(completed.has(lessonNumber(moduleIndex,index))&&lessonPassed(lesson)));
  return {ready:true,completed,lessonPassed,moduleReady,modulePassed,moduleUnlocked,lessonUnlocked,finalReady:modules.every((_,index)=>modulePassed(index))};
}

function useLearnerProgress(course:AtlasCourse,modules:LearnerModule[],completedOverride?:number[]) {
  const ready=useSyncExternalStore(emptySubscribe,()=>true,()=>false);
  const progress=ready?readLearnerProgress(course,modules,completedOverride):readLearnerProgressServer();
  return {...progress,ready};
}

const emptySubscribe=()=>()=>{};
const readLearnerProgressServer=():LearnerProgress=>({ready:false,completed:new Set(),lessonPassed:()=>false,moduleReady:()=>false,modulePassed:()=>false,moduleUnlocked:index=>index===0,lessonUnlocked:(moduleIndex,lessonIndex)=>moduleIndex===0&&lessonIndex===0,finalReady:false});

function AtlasMark({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`journey-brand ${light ? "light" : ""}`}><span><i/><i/><i/></span><strong>von newman <b>atlas</b></strong></Link>;
}

export function AuthExperience() {
  const root=useRef<HTMLElement>(null);
  const [mode, setMode] = useState<"login"|"accounts"|"organisation">("login");
  const [email, setEmail] = useState("amara.okafor@federalservice.demo");
  const [password, setPassword] = useState("atlasdemo");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      gsap.timeline({defaults:{duration:.65,ease:"power3.out"}})
        .from(".auth-story-copy > *",{y:30,autoAlpha:0,stagger:.08})
        .from(".auth-art > *",{scale:.88,y:25,autoAlpha:0,stagger:.08},"<.15")
        .from(".auth-panel-inner > *",{x:28,autoAlpha:0,stagger:.045},"<");
    });
    return()=>mm.revert();
  },{scope:root,dependencies:[mode],revertOnUpdate:true});

  const signIn = () => {
    setError("");
    if (!email || !password) { setError("Enter your email and password to continue."); return; }
    setLoading(true);
    window.setTimeout(() => {
      localStorage.setItem("atlas-session", JSON.stringify({ email, name: email.includes("ifeoma") ? "Ifeoma Kalu" : "Amara Okafor", organisation: "Federal Service Learning Directorate" }));
      if (email.includes("ifeoma") || email.includes("david")) window.location.href = "/admin";
      else window.location.href = localStorage.getItem("atlas-onboarded") ? "/learn" : "/onboarding";
    }, 850);
  };

  return <main ref={root} className="auth-page">
    <section className="auth-story">
      <AtlasMark light />
      <div className="auth-story-copy">
        <span className="journey-kicker"><Sparkles/> Your learning, your momentum</span>
        <h1>Come back to<br/>what you’re<br/><em>becoming.</em></h1>
        <p>One workspace for the skills, achievements and professional growth that move your career forward.</p>
      </div>
      <div className="auth-art">
        <div className="auth-person"><span>AO</span><i/><i/></div>
        <article className="auth-float float-course"><small>Continue learning · X-03.2</small><b>Using AI at Work</b><div><span style={{width:"68%"}}/></div><em>68%</em></article>
        <article className="auth-float float-award"><Award/><span><small>New achievement</small><b>Consistency champion</b></span></article>
        <article className="auth-float float-points"><Zap/><b>+120</b><small>points today</small></article>
      </div>
      <small className="auth-quote">“Learning is not preparation for the future. Learning is the future.”</small>
    </section>
    <section className="auth-panel">
      <div className="auth-panel-inner">
        <div className="mobile-auth-brand"><AtlasMark/></div>
        {mode==="login"&&<>
          <span className="journey-kicker">Welcome back</span>
          <h2>Sign in to Atlas</h2>
          <p className="auth-intro">Enter your organisation credentials, or choose a demo profile.</p>
          <button className="demo-picker" onClick={()=>setMode("accounts")}><span className="demo-avatars">{demoUsers.map(u=><i key={u.email} style={{background:u.color}}>{u.initials}</i>)}</span><span><b>Explore with a demo account</b><small>Learner, administrator or author</small></span><ChevronRight/></button>
          <div className="auth-divider"><span>or use your credentials</span></div>
          <label className="auth-field"><span>Email address</span><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@organisation.org"/></label>
          <label className="auth-field"><span>Password <button>Forgot password?</button></span><div><input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}/><button aria-label="Show password" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeOff/>:<Eye/>}</button></div></label>
          {error&&<p className="auth-error">{error}</p>}
          <label className="remember"><input type="checkbox" defaultChecked/><span>Keep me signed in on this device</span></label>
          <button className="journey-primary" onClick={signIn} disabled={loading}>{loading?"Preparing your workspace…":<>Sign in <ArrowRight/></>}</button>
          <button className="organisation-link" onClick={()=>setMode("organisation")}>Use an organisation code</button>
          <p className="auth-legal">By continuing, you agree to Atlas’s <a>Terms</a> and <a>Privacy Policy</a>.</p>
        </>}
        {mode==="accounts"&&<>
          <button className="back-link" onClick={()=>setMode("login")}><ArrowLeft/> Back to sign in</button>
          <span className="journey-kicker">Demo environment</span><h2>Choose your perspective</h2>
          <p className="auth-intro">Every profile opens a different, fully populated Atlas workspace.</p>
          <div className="account-list">{demoUsers.map(u=><button key={u.email} onClick={()=>{setEmail(u.email);setPassword("atlasdemo");setMode("login")}}><i style={{background:u.color}}>{u.initials}</i><span><b>{u.name}</b><small>{u.role}<br/>{u.email}</small></span><ArrowRight/></button>)}</div>
        </>}
        {mode==="organisation"&&<>
          <button className="back-link" onClick={()=>setMode("login")}><ArrowLeft/> Back to sign in</button>
          <span className="journey-kicker">Find your workspace</span><h2>Organisation access</h2><p className="auth-intro">Enter the code provided by your learning administrator.</p>
          <label className="auth-field"><span>Organisation code</span><input defaultValue="FSLD-2026" /></label>
          <button className="journey-primary" onClick={()=>setMode("login")}>Find organisation <Search/></button>
          <div className="found-org"><span>F</span><div><b>Federal Service Learning Directorate</b><small>2,480 active learners · Abuja, Nigeria</small></div><CheckCircle2/></div>
        </>}
      </div>
    </section>
  </main>;
}

const onboardingSteps = [
  { eyebrow:"Welcome to your workspace", title:"Your growth has a new home.", body:"Atlas brings every assignment, course, achievement and certificate into one clear learning journey.", art:"welcome" },
  { eyebrow:"A learning path built around you", title:"What would you like to grow?", body:"Choose a few interests. We’ll use them to make your recommendations more relevant.", art:"interests" },
  { eyebrow:"Make learning fit your rhythm", title:"Choose your weekly goal.", body:"Professional growth works best when it fits real life. You can change this at any time.", art:"goal" },
  { eyebrow:"You’re ready", title:"Meet your first priority.", body:"Your organisation has assigned Using AI at Work from the AI & Emerging Technology pathway. You have nine days to complete it.", art:"ready" },
];

export function OnboardingExperience() {
  const root=useRef<HTMLElement>(null);
  const [step,setStep]=useState(0);
  const [interests,setInterests]=useState(["Artificial intelligence","Data & analytics","Public service"]);
  const [goal,setGoal]=useState(3);
  const current=onboardingSteps[step];
  const toggle=(item:string)=>setInterests(v=>v.includes(item)?v.filter(x=>x!==item):[...v,item]);
  const finish=()=>{localStorage.setItem("atlas-onboarded","true");localStorage.setItem("atlas-interests",JSON.stringify(interests));localStorage.setItem("atlas-goal",String(goal));window.location.href="/learn";};
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      gsap.timeline({defaults:{duration:.55,ease:"power3.out"}})
        .from(".onboard-copy > *",{x:-32,autoAlpha:0,stagger:.06})
        .from(".onboard-art > *",{x:35,scale:.94,autoAlpha:0,stagger:.07},"<.1");
    });
    return()=>mm.revert();
  },{scope:root,dependencies:[step],revertOnUpdate:true});
  return <main ref={root} className="onboarding-page">
    <header><AtlasMark/><span>Step {step+1} of {onboardingSteps.length}</span><button onClick={finish}>Skip setup</button></header>
    <div className="onboard-progress">{onboardingSteps.map((_,i)=><span key={i} className={i<=step?"active":""}/>)}</div>
    <section className="onboard-stage">
      <div className="onboard-copy"><span className="journey-kicker">{current.eyebrow}</span><h1>{current.title}</h1><p>{current.body}</p>
        {step===1&&<div className="interest-grid">{["Artificial intelligence","Data & analytics","Leadership","Cybersecurity","Public service","Personal effectiveness"].map(item=><button key={item} className={interests.includes(item)?"selected":""} onClick={()=>toggle(item)}>{interests.includes(item)&&<Check/>}{item}</button>)}</div>}
        {step===2&&<div className="goal-options">{[2,3,4,5].map(n=><button key={n} className={goal===n?"selected":""} onClick={()=>setGoal(n)}><b>{n}</b><span>learning days<small>per week</small></span></button>)}</div>}
        {step===3&&<div className="first-assignment"><span>✦</span><div><small>X-03.2 · Mandatory · Due 08 August</small><b>Using AI at Work</b><em>4 catalogue lessons · 2h 52m · Certificate</em></div><Target/></div>}
      </div>
      <div className={`onboard-art ${current.art}`}>
        {step===0&&<><div className="welcome-orbit"><span>AO</span></div><article><BookOpen/><b>4 courses</b><small>ready for you</small></article><article><Trophy/><b>Practitioner</b><small>your next level</small></article></>}
        {step===1&&<><div className="interest-constellation">{interests.map((x,i)=><span key={x} style={{"--i":i} as React.CSSProperties}>{x.split(" ")[0]}</span>)}</div><div className="art-center"><Sparkles/></div></>}
        {step===2&&<><div className="goal-ring" style={{"--goal":`${goal*20}%`} as React.CSSProperties}><b>{goal}</b><small>days</small></div><div className="week-dots">{["M","T","W","T","F"].map((d,i)=><span className={i<goal?"active":""} key={i}>{d}</span>)}</div></>}
        {step===3&&<><div className="ready-card"><span>AI</span><small>X-03.2 · Your first course</small><h3>Using AI<br/>at Work</h3><div><i/><b>0%</b></div><em>Begin your journey →</em></div></>}
      </div>
    </section>
    <footer><button disabled={step===0} onClick={()=>setStep(step-1)}><ChevronLeft/> Back</button><button className="journey-primary" onClick={step===3?finish:()=>setStep(step+1)}>{step===3?"Enter my workspace":"Continue"} <ArrowRight/></button></footer>
  </main>;
}

export function CourseExperience({courseId}:{courseId:string}) {
  const root=useRef<HTMLElement>(null);
  const atlas=useAtlasState();
  const course=atlas.courses.find(c=>c.id===courseId)||atlas.courses[0];
  const content=getCurriculum(course);
  const lessonCount=content.modules.reduce((total,module)=>total+module.lessons.length,0);
  const learnerProgress=useLearnerProgress(course,content.modules);
  const finalScore=learnerProgress.ready?Number(localStorage.getItem(`atlas-score-${course.id}`)||0):0;
  const certificateUnlocked=learnerProgress.finalReady&&finalScore>=(course.finalAssessment?.passMark??80);
  const instructorInitials=course.instructor.split(" ").filter(part=>!part.endsWith(".")).map(part=>part[0]).join("").slice(0,2);
  const [open,setOpen]=useState(0);
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      const intro=gsap.timeline({defaults:{duration:.7,ease:"power3.out"}});
      intro.from(".course-hero-copy > *",{y:28,autoAlpha:0,stagger:.06}).from(".course-hero-art",{x:60,autoAlpha:0,scale:.94},"<.15");
      ScrollTrigger.batch(".course-detail > *,.curriculum > article",{start:"top 88%",once:true,onEnter:(batch)=>gsap.fromTo(batch,{y:50,autoAlpha:0},{y:0,autoAlpha:1,duration:.75,stagger:.08,ease:"power3.out"})});
    });
    return()=>mm.revert();
  },{scope:root});
  return <main ref={root} className="course-page">
    <nav className="course-nav"><AtlasMark light/><div><a href="/learn">Home</a><span>/</span><a>My learning</a><span>/</span><b>{course.title}</b></div><button><CircleHelp/> Help</button></nav>
    <section className="course-hero" style={{"--course":course.color,"--accent":course.accent} as React.CSSProperties}>
      <div className="course-hero-copy"><a href="/learn"><ArrowLeft/> Back to my learning</a><span className="course-label">{course.status} · {course.due||"Open enrolment"}</span><h1>{course.title}</h1><p>{content.description}</p>
        <div className="course-facts"><span><Clock3/><b>{course.duration}</b><small>estimated time</small></span><span><BookOpen/><b>{content.modules.length} modules</b><small>{lessonCount} lessons</small></span><span>{course.certificatePolicy?.enabled!==false?<Award/>:<LockKeyhole/>}<b>{course.certificatePolicy?.enabled!==false?"Certificate":"Learning record"}</b><small>{course.certificatePolicy?.enabled!==false?"after all requirements":"on completion"}</small></span></div>
        <a className="journey-primary" href={`/learn/course/${course.id}/lesson/1`}><Play/> {course.progress?"Continue course":"Start course"} <ArrowRight/></a>
      </div>
      <div className="course-hero-art"><span className="giant-art">{course.art}</span><div className="course-ring"><b>{course.progress}%</b><small>complete</small></div><article><Sparkles/><span><small>Skill you’ll build</small><b>{content.skill}</b></span></article></div>
    </section>
    <section className="course-detail">
      <aside><div className="instructor"><span>{instructorInitials}</span><div><small>Your instructor</small><b>{course.instructor}</b><em>{course.category} specialist</em></div></div><div className="requirements"><h3>To complete this course</h3><p><Check/> Finish all {lessonCount} required lessons</p>{course.completionPolicy?.requireKnowledgeChecks!==false&&<p><Check/> Pass {content.modules.reduce((n,m)=>n+m.lessons.filter(l=>l.knowledgeCheck).length,0)} lesson knowledge checks</p>}{course.completionPolicy?.requireModuleQuizzes!==false&&<p><Check/> Pass {content.modules.filter(m=>m.quiz).length} module quizzes</p>}{course.completionPolicy?.requireFinalAssessment!==false&&<p><Check/> Score at least {course.finalAssessment?.passMark??80}% in the final assessment</p>}{course.certificatePolicy?.enabled!==false&&<div className={`course-certificate-lock ${certificateUnlocked?"unlocked":""}`}>{certificateUnlocked?<Award/>:<LockKeyhole/>}<span><b>{certificateUnlocked?"Certificate unlocked":"Certificate locked"}</b><small>{certificateUnlocked?"Your verified credential is ready in Certificates.":"Pass the final course quiz after every lesson and module gate."}</small></span></div>}</div></aside>
      <div className="curriculum"><span className="journey-kicker">Your learning journey</span><h2>{content.modules.length} modules. One practical transformation.</h2>{content.modules.map((m,i)=>{const offset=content.modules.slice(0,i).reduce((n,x)=>n+x.lessons.length,0);const moduleUnlocked=learnerProgress.moduleUnlocked(i);const modulePassed=learnerProgress.modulePassed(i);return <article className={`${open===i?"open":""} ${!moduleUnlocked?"locked":""}`} key={m.code}><button onClick={()=>setOpen(open===i?-1:i)}><span>{modulePassed?<Check/>:moduleUnlocked?i+1:<LockKeyhole/>}</span><div><small>Module {i+1} · {m.duration} · {modulePassed?"Complete":moduleUnlocked?"In progress":"Locked"}</small><b>{m.title}</b></div><ChevronDown/></button>{open===i&&<div className="lesson-list">{m.lessons.map((l,j)=>{const unlocked=learnerProgress.lessonUnlocked(i,j);const complete=learnerProgress.completed.has(offset+j+1)&&learnerProgress.lessonPassed(l);return unlocked?<a key={l.code} href={`/learn/course/${course.id}/lesson/${offset+j+1}`}><span>{complete?<CheckCircle2/>:<Play/>}</span><div><b>{l.title}</b><small>{l.type||"Activity"} · {l.duration||"12 min"}{l.knowledgeCheck?` · ${l.knowledgeCheck.questionsShown} question lesson quiz`:""}</small></div><ArrowRight/></a>:<div className="locked-learning-item" key={l.code}><span><LockKeyhole/></span><div><b>{l.title}</b><small>Complete and pass the previous lesson to unlock</small></div></div>})}{m.quiz&&(learnerProgress.moduleReady(i)?<a className={`module-quiz-link ${modulePassed?"passed":""}`} href={`/learn/course/${course.id}/module/${i+1}/quiz`}><span>{modulePassed?<Check/>:<ShieldCheck/>}</span><div><b>{m.quiz.title}</b><small>{modulePassed?"Passed · ":""}{m.quiz.questionsShown} questions · {m.quiz.passMark}% pass mark</small></div><ArrowRight/></a>:<div className="locked-learning-item module-gate"><span><LockKeyhole/></span><div><b>{m.quiz.title}</b><small>Pass every required lesson quiz in this module first</small></div></div>)}</div>}</article>})}<article className={`final-course-gate ${learnerProgress.finalReady?"ready":"locked"}`}><span>{learnerProgress.finalReady?<ShieldCheck/>:<LockKeyhole/>}</span><div><small>FINAL COURSE GATE</small><h3>{course.finalAssessment?.title||`${course.title} final assessment`}</h3><p>{learnerProgress.finalReady?`${course.finalAssessment?.questionsShown??5} questions · ${course.finalAssessment?.passMark??80}% pass mark · certificate on success`:"Complete every required lesson quiz and module quiz to unlock."}</p></div>{learnerProgress.finalReady?<a href={`/learn/course/${course.id}/assessment`}>Begin final quiz <ArrowRight/></a>:<b>Locked</b>}</article></div>
    </section>
  </main>;
}

export function LessonExperience({courseId,initialLesson}:{courseId:string;initialLesson:number}) {
  const root=useRef<HTMLElement>(null);
  const atlas=useAtlasState();
  const course=atlas.courses.find(c=>c.id===courseId)||atlas.courses[0];
  const modules=getCurriculum(course).modules;
  const allLessons=modules.flatMap((m,mi)=>m.lessons.map((lesson,lessonIndex)=>({...lesson,module:m.title,moduleIndex:mi,lessonIndex}))).map((x,i)=>({...x,number:i+1}));
  const [current,setCurrent]=useState(Math.min(initialLesson,allLessons.length));
  const [playing,setPlaying]=useState(false);
  const [progress,setProgress]=useState(42);
  const [panel,setPanel]=useState<"transcript"|"notes"|"resources">("transcript");
  const [note,setNote]=useState("");
  const [saved,setSaved]=useState(false);
  const [completed,setCompleted]=useState<number[]>(()=>typeof window==="undefined"?[]:JSON.parse(localStorage.getItem(`atlas-complete-${courseId}`)||"[]"));
  const [checkAnswers,setCheckAnswers]=useState<Record<number,number>>({});
  const [checkResult,setCheckResult]=useState<number|null>(null);
  const lesson=allLessons[current-1];
  const learnerProgress=useLearnerProgress(course,modules,completed);
  const lessonCheck=lesson.knowledgeCheck;
  const checkPassed=!lessonCheck||(typeof window!=="undefined"&&localStorage.getItem(`atlas-check-${courseId}-${lesson.code}`)==="passed")||(checkResult??0)>=lessonCheck.passMark;
  useEffect(()=>{if(!playing)return;const id=window.setInterval(()=>setProgress(p=>p>=100?100:p+1),160);return()=>clearInterval(id)},[playing]);
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      gsap.timeline({defaults:{duration:.48,ease:"power3.out"}})
        .from(".video-stage",{y:24,scale:.985,autoAlpha:0})
        .from(".lesson-title > *",{y:18,autoAlpha:0,stagger:.06},"<.18")
        .from(".lesson-panel > *",{y:16,autoAlpha:0},"<.1");
    });
    requestAnimationFrame(()=>ScrollTrigger.refresh());
    return()=>mm.revert();
  },{scope:root,dependencies:[current,panel],revertOnUpdate:true});
  const submitCheck=()=>{if(!lessonCheck)return;const questions=lessonCheck.questions.slice(0,lessonCheck.questionsShown);const score=Math.round(questions.filter((q,i)=>checkAnswers[i]===q.answer).length/questions.length*100);setCheckResult(score);if(score>=lessonCheck.passMark)localStorage.setItem(`atlas-check-${courseId}-${lesson.code}`,"passed")};
  const complete=()=>{
    if(!checkPassed)return;
    const next=[...new Set([...completed,current])];
    const courseProgress=Math.round(next.length/allLessons.length*100);
    setCompleted(next);
    localStorage.setItem(`atlas-complete-${courseId}`,JSON.stringify(next));
    localStorage.setItem(`atlas-progress-${courseId}`,String(courseProgress));
    updateAtlasState(state=>({
      ...state,
      courses:state.courses.map(item=>item.id===courseId?{...item,progress:courseProgress}:item),
      points:state.points+(completed.includes(current)?0:10),
    }));
    const activeModule=modules[lesson.moduleIndex];
    const moduleLessonNumbers=allLessons.filter(item=>item.moduleIndex===lesson.moduleIndex).map(item=>item.number);
    const lastInModule=Math.max(...moduleLessonNumbers)===current;
    if(lastInModule&&activeModule.quiz){
      window.location.assign(`/learn/course/${courseId}/module/${lesson.moduleIndex+1}/quiz`);
      return;
    }
    if(current<allLessons.length){
      setCurrent(current+1);
      setProgress(0);
      setCheckAnswers({});
      setCheckResult(null);
    }else{
      window.location.assign(`/learn/course/${courseId}/assessment`);
    }
  };
  if(learnerProgress.ready&&!learnerProgress.lessonUnlocked(lesson.moduleIndex,lesson.lessonIndex))return <LearningLocked title="This lesson is still locked." body="Complete the previous required lesson and pass its lesson quiz before continuing." courseId={courseId}/>;
  return <main ref={root} className="lesson-page">
    <header><a href={`/learn/course/${courseId}`}><X/></a><div><small>{course.title}</small><b>{lesson.module}</b></div><span>{completed.length} of {allLessons.length} lessons</span><button><CircleHelp/> Help</button></header>
    <div className="lesson-progress"><span style={{width:`${(completed.length/allLessons.length)*100}%`}}/></div>
    <div className="lesson-layout">
      <aside className="lesson-curriculum"><div><b>Course content</b><button><Search/></button></div>{modules.map((m,mi)=>{const offset=modules.slice(0,mi).reduce((n,x)=>n+x.lessons.length,0);return <section className={learnerProgress.moduleUnlocked(mi)?"":"locked"} key={m.code}><small>MODULE {mi+1}</small><h3>{m.title}</h3>{m.lessons.map((l,li)=>{const n=offset+li+1;const unlocked=learnerProgress.lessonUnlocked(mi,li);return <button disabled={!unlocked} key={l.code} className={`${current===n?"active":""} ${!unlocked?"locked":""}`} onClick={()=>{setCurrent(n);setProgress(completed.includes(n)?100:0);setCheckAnswers({});setCheckResult(null)}}><span>{!unlocked?<LockKeyhole/>:completed.includes(n)&&learnerProgress.lessonPassed(l)?<Check/>:n}</span><div><b>{l.title}</b><small>{l.type||"Activity"} · {l.duration||`${8+li*4} min`}{l.knowledgeCheck?" · Lesson quiz":""}</small></div></button>})}{m.quiz&&(learnerProgress.moduleReady(mi)?<a href={`/learn/course/${courseId}/module/${mi+1}/quiz`}><span>{learnerProgress.modulePassed(mi)?<Check/>:<ShieldCheck/>}</span><div><b>Module quiz</b><small>{learnerProgress.modulePassed(mi)?"Passed · ":""}{m.quiz.questionsShown} questions</small></div></a>:<div className="lesson-sidebar-lock"><LockKeyhole/><span><b>Module quiz</b><small>Complete required lessons first</small></span></div>)}</section>})}</aside>
      <section className="lesson-main">
        <div className="video-stage">
          <div className="video-visual" style={{background:`linear-gradient(135deg, ${course.accent}, #18162c)`}}><span className="video-number">{course.code.split(".")[0].replace(/\D/g,"").padStart(2,"0")||"01"}</span><div className="decision-orbit"><i>Context</i><i>Practice</i><i>Evidence</i><strong>{course.art}</strong></div><h2>{lesson.title.split(" ").slice(0,3).join(" ")}<br/><em>{lesson.title.split(" ").slice(3).join(" ")||course.category}.</em></h2></div>
          <div className="video-controls"><button onClick={()=>setPlaying(!playing)}>{playing?<Pause fill="currentColor"/>:<Play fill="currentColor"/>}</button><span>{Math.floor(progress*.08)}:{String(Math.floor(progress*.36)%60).padStart(2,"0")}</span><div><i style={{width:`${progress}%`}}/></div><span>08:42</span><button><Volume2/></button><button><Settings2/></button></div>
        </div>
        <div className="lesson-title"><div><small>Module {lesson.moduleIndex+1} · Lesson {current}</small><h1>{lesson.title}</h1><p>Build practical {course.category.toLowerCase()} judgement through a realistic Nigerian workplace example, guided reflection and a decision you can defend.</p></div><button className={saved?"saved":""} onClick={()=>{setSaved(!saved);localStorage.setItem(`atlas-saved-${courseId}-${current}`,String(!saved))}}><Star fill={saved?"currentColor":"none"}/> {saved?"Saved":"Save"}</button></div>
        <div className="lesson-tabs"><button className={panel==="transcript"?"active":""} onClick={()=>setPanel("transcript")}>Transcript</button><button className={panel==="notes"?"active":""} onClick={()=>setPanel("notes")}>My notes</button><button className={panel==="resources"?"active":""} onClick={()=>setPanel("resources")}>Resources <span>2</span></button></div>
        <div className="lesson-panel">
          {panel==="transcript"&&<div className="transcript"><button><span>00:00</span><p><b>{lesson.title} begins with the situation, not the tool.</b> Start by naming the outcome, the people affected and the rules that define responsible practice.</p></button><button className="active"><span>02:18</span><p><b>Strong professional judgement uses three lenses:</b> What evidence is reliable? What context may be missing? Who is accountable for the result?</p></button><button><span>05:46</span><p>Before acting, document the reasoning, test it against the relevant standard and escalate when the risk or authority exceeds your role.</p></button></div>}
          {panel==="notes"&&<div className="notes-panel"><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Capture an insight from this lesson…"/><button onClick={()=>localStorage.setItem(`atlas-note-${current}`,note)}>Save note</button></div>}
          {panel==="resources"&&<div className="resource-list"><button><FileText/><span><b>{course.category} field checklist</b><small>PDF · 1.2 MB</small></span><ArrowRight/></button><button><FileText/><span><b>{course.title} scenario workbook</b><small>Workbook · 840 KB</small></span><ArrowRight/></button></div>}
        </div>
        {lessonCheck&&<section className={`inline-knowledge-check ${checkResult!==null?(checkPassed?"passed":"retry"):""}`}><header><span><Lightbulb/></span><div><small>END-OF-LESSON CHECK</small><h2>{lessonCheck.title}</h2><p>{lessonCheck.instructions}</p></div>{checkResult!==null&&<strong>{checkResult}%</strong>}</header>{lessonCheck.questions.slice(0,lessonCheck.questionsShown).map((question,qi)=><article key={question.id}><h3>{qi+1}. {question.prompt}</h3><div>{question.options.map((option,oi)=><button className={checkAnswers[qi]===oi?"selected":""} onClick={()=>setCheckAnswers({...checkAnswers,[qi]:oi})} key={option}><span>{String.fromCharCode(65+oi)}</span>{option}{checkAnswers[qi]===oi&&<Check/>}</button>)}</div></article>)}<footer><p>{checkResult===null?`${lessonCheck.passMark}% required to continue.`:checkPassed?"Knowledge check passed. You can complete the lesson.":"Review the feedback and try again."}</p><button onClick={submitCheck} disabled={Object.keys(checkAnswers).length<Math.min(lessonCheck.questionsShown,lessonCheck.questions.length)}>{checkResult===null?"Submit answers":"Try again"} <ArrowRight/></button></footer></section>}
      </section>
    </div>
    <footer className="lesson-footer"><button disabled={current===1} onClick={()=>setCurrent(current-1)}><ChevronLeft/> Previous lesson</button><div><span>{!checkPassed?"Pass the knowledge check to continue":completed.includes(current)?"Lesson complete":lesson.type==="Video"?`Complete when video reaches ${course.completionPolicy?.videoThreshold??80}%`:"Complete the lesson activity"}</span><button className="journey-primary" disabled={(!checkPassed)||(lesson.type==="Video"&&progress<(course.completionPolicy?.videoThreshold??80)&&!completed.includes(current))} onClick={complete}>{completed.includes(current)?"Continue":"Mark complete"} <ArrowRight/></button></div></footer>
  </main>;
}

function LearningLocked({title,body,courseId}:{title:string;body:string;courseId:string}) {
  return <main className="learning-locked-page"><AtlasMark light/><section><span><LockKeyhole/></span><small>PREREQUISITE REQUIRED</small><h1>{title}</h1><p>{body}</p><a className="journey-primary" href={`/learn/course/${courseId}`}>Review course journey <ArrowRight/></a></section></main>;
}

function ScoredCheck({assessment,onFinish}:{assessment:AtlasAssessment;onFinish:(score:number)=>void}) {
  const questions=assessment.questions.slice(0,assessment.questionsShown);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const current=questions[index];
  return <section className="scored-check"><header><span>{assessment.kind}</span><h1>{assessment.title}</h1><p>{assessment.instructions}</p><div><b>{questions.length} questions</b><b>{assessment.passMark}% pass mark</b><b>{assessment.timeLimit} minutes</b></div></header><div className="scored-check-body"><aside>{questions.map((question,i)=><button className={`${i===index?"active":""} ${answers[i]!==undefined?"answered":""}`} key={question.id} onClick={()=>setIndex(i)}>{i+1}</button>)}</aside><article><small>Question {index+1} of {questions.length}</small><h2>{current.prompt}</h2><div>{current.options.map((option,i)=><button className={answers[index]===i?"selected":""} key={option} onClick={()=>setAnswers({...answers,[index]:i})}><span>{String.fromCharCode(65+i)}</span>{option}{answers[index]===i&&<Check/>}</button>)}</div><footer><button disabled={index===0} onClick={()=>setIndex(index-1)}><ChevronLeft/> Previous</button>{index<questions.length-1?<button onClick={()=>setIndex(index+1)}>Next <ArrowRight/></button>:<button disabled={Object.keys(answers).length<questions.length} onClick={()=>onFinish(Math.round(questions.filter((question,i)=>answers[i]===question.answer).length/questions.length*100))}>Submit quiz <Check/></button>}</footer></article></div></section>;
}

export function ModuleQuizExperience({courseId,moduleNumber}:{courseId:string;moduleNumber:number}) {
  const atlas=useAtlasState();
  const course=atlas.courses.find(c=>c.id===courseId)||atlas.courses[0];
  const modules=getCurriculum(course).modules;
  const activeModule=modules[Math.max(0,moduleNumber-1)]||modules[0];
  const learnerProgress=useLearnerProgress(course,modules);
  const assessment=activeModule.quiz??makeAssessment("Module quiz",activeModule.title,activeModule.code);
  const [result,setResult]=useState<number|null>(null);
  const pass=result!==null&&result>=assessment.passMark;
  const finish=(score:number)=>{setResult(score);localStorage.setItem(`atlas-module-quiz-${courseId}-${moduleNumber}`,String(score))};
  if(learnerProgress.ready&&(!learnerProgress.moduleUnlocked(moduleNumber-1)||!learnerProgress.moduleReady(moduleNumber-1)))return <LearningLocked title="The module quiz is not ready yet." body="Complete every required lesson in order and pass each required lesson quiz first." courseId={courseId}/>;
  if(result!==null)return <main className={`module-quiz-result ${pass?"pass":"fail"}`}><AtlasMark/><section><span>{pass?<Award/>:<RotateCcw/>}</span><small>{pass?"MODULE COMPLETE":"TRY ONCE MORE"}</small><h1>{pass?"You’re ready for what comes next.":"A little more practice will get you there."}</h1><p>You scored <b>{result}%</b>. The pass mark for {activeModule.title} is {assessment.passMark}%.</p>{pass?<a className="journey-primary" href={moduleNumber<modules.length?`/learn/course/${courseId}/lesson/${modules.slice(0,moduleNumber).reduce((n,m)=>n+m.lessons.length,0)+1}`:`/learn/course/${courseId}/assessment`}>{moduleNumber<modules.length?"Continue to next module":"Continue to final assessment"} <ArrowRight/></a>:<button className="journey-primary" onClick={()=>setResult(null)}>Try again <RotateCcw/></button>}<a href={`/learn/course/${courseId}`}>Return to course overview</a></section></main>;
  return <main className="module-quiz-page"><nav><AtlasMark light/><a href={`/learn/course/${courseId}`}><X/></a></nav><ScoredCheck assessment={assessment} onFinish={finish}/></main>;
}

const assessmentQuestions = [
  { q:"An AI tool recommends rejecting a citizen’s application. What should you do first?", options:["Accept the output because the model is objective","Review the evidence, policy context and potential missing information","Ask the model to repeat the same answer","Reject every AI recommendation"], answer:1 },
  { q:"Which information should never be entered into an unapproved public AI service?", options:["A public policy title","An anonymised fictional example","Personally identifiable citizen information","A general writing prompt"], answer:2 },
  { q:"What is the best description of responsible human oversight?", options:["A person clicks approve after the AI decides","A qualified person examines evidence and remains accountable","The AI explains its confidence score","A manager owns the software licence"], answer:1 },
  { q:"When should an AI-assisted decision be escalated?", options:["When it is high-impact, uncertain or affects rights","Only when the system stops working","Whenever the output is longer than expected","Never, if the model is modern"], answer:0 },
  { q:"A strong prompt for public-service work should include…", options:["Only a short command","Sensitive records for realism","Context, task, constraints and intended audience","A request to guarantee correctness"], answer:2 },
];

function assessmentFor(course:AtlasCourse) {
  if(course.finalAssessment?.questions.length) return course.finalAssessment.questions.slice(0,course.finalAssessment.questionsShown).map(question=>({q:question.prompt,options:question.options,answer:question.answer}));
  if(course.id==="ai-work") return assessmentQuestions;
  const subject=course.title;
  return [
    {q:`Before applying ${subject.toLowerCase()} in a real workplace situation, what should you establish first?`,options:["The decision, intended outcome and people affected","The most impressive tool available","How to avoid documenting the work","That one method fits every situation"],answer:0},
    {q:`Which action best demonstrates sound practice in ${course.category.toLowerCase()}?`,options:["Act quickly without checking context","Use evidence, follow the relevant rules and record the rationale","Copy the previous decision regardless of circumstances","Choose the option that is easiest to explain"],answer:1},
    {q:"A realistic scenario contains incomplete information. What is the strongest response?",options:["Invent the missing details","Ignore the uncertainty","Identify the gap, seek reliable evidence and state any remaining limits","Delay every decision indefinitely"],answer:2},
    {q:"When should a decision be escalated to a qualified colleague or accountable manager?",options:["When risk, authority or uncertainty exceeds your role","Only after a complaint is made","Whenever the task takes more than ten minutes","Never, because training replaces escalation"],answer:0},
    {q:`What is the best evidence that learning from ${subject} has transferred into practice?`,options:["The learner opened every page","The learner can repeat the course title","The learner applies the method to a relevant task and can explain the result","The learner completes it faster than everyone else"],answer:2},
  ];
}

export function AssessmentExperience({courseId}:{courseId:string}) {
  const root=useRef<HTMLElement>(null);
  const atlas=useAtlasState();
  const course=atlas.courses.find(c=>c.id===courseId)||atlas.courses[0];
  const modules=getCurriculum(course).modules;
  const learnerProgress=useLearnerProgress(course,modules);
  const questions=assessmentFor(course);
  const assessment=course.finalAssessment??makeAssessment("Final assessment",course.title,course.code);
  const passMark=assessment.passMark;
  const [started,setStarted]=useState(false);
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const [flagged,setFlagged]=useState<number[]>([]);
  const [result,setResult]=useState<number|null>(null);
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      const target=result!==null?".result-page > section":!started?".assessment-intro > section":".assessment-layout > section";
      gsap.from(`${target} > *`,{y:28,autoAlpha:0,duration:.58,stagger:.065,ease:"power3.out"});
    });
    return()=>mm.revert();
  },{scope:root,dependencies:[started,index,result],revertOnUpdate:true});
  const submit=()=>{const score=Math.round(questions.filter((q,i)=>answers[i]===q.answer).length/questions.length*100);setResult(score);localStorage.setItem(`atlas-score-${courseId}`,String(score));if(score>=passMark){const certificateId=`VN-ATL-2026-${courseId.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)}`;if(course.certificatePolicy?.enabled!==false)localStorage.setItem(`atlas-certificate-${courseId}`,certificateId);localStorage.setItem(`atlas-progress-${courseId}`,"100");updateAtlasState(state=>({...state,courses:state.courses.map(item=>item.id===courseId?{...item,progress:100}:item),points:state.points+350,credentials:course.certificatePolicy?.enabled===false||state.credentials.some(item=>item.courseId===courseId)?state.credentials:[{id:certificateId,courseId,title:course.title,issued:"31 July 2026",status:"Active"},...state.credentials]}))}};
  if(learnerProgress.ready&&!learnerProgress.finalReady)return <LearningLocked title="The final course quiz is still locked." body="Pass every required lesson quiz and module quiz. The final course quiz will then unlock automatically." courseId={courseId}/>;
  if(result!==null){const certificateId=localStorage.getItem(`atlas-certificate-${courseId}`)||"VN-ATL-2026-08421";const passed=result>=passMark;return <main ref={root} className={`result-page ${passed?"pass":"fail"}`}><AtlasMark/><section><span className="result-icon">{passed?<Award/>:<RotateCcw/>}</span><span className="journey-kicker">{passed?"Assessment passed":"Not quite yet"}</span><h1>{passed?"You proved your capability.":"Review. Return. Rise."}</h1><p>{passed?`You have completed every requirement for ${course.title}. ${course.certificatePolicy?.enabled!==false?"Your certificate and learning record are ready.":"Your learning record is now complete."}`:`You need ${passMark}% to pass. Atlas has highlighted the lessons that will help you prepare for your next attempt.`}</p><div className="result-score"><strong>{result}%</strong><span><b>{passed?"Passed":`Pass mark: ${passMark}%`}</b><small>{questions.filter((q,i)=>answers[i]===q.answer).length} of {questions.length} answers correct</small></span></div><div className="result-actions">{passed?<>{course.certificatePolicy?.enabled!==false&&<a className="journey-primary" href={`/learn/certificate/${certificateId}`}>View my certificate <ArrowRight/></a>}<a href="/learn">Return home</a></>:<><button className="journey-primary" onClick={()=>{setResult(null);setIndex(0);setAnswers({})}}>Try again <RotateCcw/></button><a href={`/learn/course/${courseId}`}>Review course</a></>}</div></section></main>;}
  if(!started)return <main ref={root} className="assessment-intro"><AtlasMark light/><section><div><span className="journey-kicker">Final assessment · {course.code}</span><h1>Show what<br/>you now know.</h1><p>Apply your {course.category.toLowerCase()} judgement to realistic situations from {course.title}.</p><div className="assessment-rules"><span><Clock3/><b>{assessment.timeLimit} minutes</b><small>Timer begins when you start</small></span><span><Target/><b>{passMark}% pass mark</b><small>{Math.ceil(questions.length*passMark/100)} correct answers</small></span><span><RotateCcw/><b>{assessment.attempts} attempts</b><small>Review between attempts</small></span></div><button className="journey-primary" onClick={()=>setStarted(true)}>Begin assessment <ArrowRight/></button></div><div className="assessment-art"><strong>{passMark}</strong><span>%</span><i/><i/><i/></div></section></main>;
  const item=questions[index];
  return <main ref={root} className="assessment-page"><header><a href={`/learn/course/${courseId}`}><X/></a><div><small>Final assessment</small><b>{course.title}</b></div><span><Clock3/> 18:42 remaining</span><button onClick={submit}>Submit assessment</button></header><div className="assessment-progress"><span style={{width:`${((index+1)/questions.length)*100}%`}}/></div><div className="assessment-layout"><aside><small>QUESTION NAVIGATOR</small><div>{questions.map((_,i)=><button key={i} className={`${index===i?"active":""} ${answers[i]!==undefined?"answered":""}`} onClick={()=>setIndex(i)}>{i+1}{flagged.includes(i)&&<i/>}</button>)}</div><p><span/> Answered <span/> Flagged</p></aside><section><span className="journey-kicker">Question {index+1} of {questions.length}</span><h1>{item.q}</h1><p>Select the best answer.</p><div className="answer-options">{item.options.map((o,i)=><button key={o} className={answers[index]===i?"selected":""} onClick={()=>setAnswers({...answers,[index]:i})}><span>{String.fromCharCode(65+i)}</span><b>{o}</b>{answers[index]===i&&<Check/>}</button>)}</div><div className="question-actions"><button className={flagged.includes(index)?"flagged":""} onClick={()=>setFlagged(v=>v.includes(index)?v.filter(x=>x!==index):[...v,index])}><Star/> {flagged.includes(index)?"Flagged for review":"Flag for review"}</button><div><button disabled={index===0} onClick={()=>setIndex(index-1)}><ChevronLeft/> Previous</button>{index<questions.length-1?<button className="journey-primary" onClick={()=>setIndex(index+1)}>Next question <ArrowRight/></button>:<button className="journey-primary" onClick={submit}>Submit assessment <Check/></button>}</div></div></section></div></main>;
}

export function CertificateExperience({certificateId}:{certificateId:string}) {
  const [shared,setShared]=useState(false);
  const atlas=useAtlasState();
  const credential=atlas.credentials.find(item=>item.id===certificateId);
  const encodedCourse=atlas.courses.find(item=>certificateId.includes(item.id.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5)));
  const course=atlas.courses.find(item=>item.id===credential?.courseId)||encodedCourse||atlas.courses.find(item=>item.id==="ai-work")||atlas.courses[0];
  return <main className="certificate-page"><header><AtlasMark/><a href="/learn"><X/></a></header><section><div className="certificate-copy"><span className="journey-kicker"><Sparkles/> Achievement unlocked</span><h1>A new proof<br/>of your growth.</h1><p>Your certificate is verified, recorded and ready to share as part of your professional learning history.</p><div className="certificate-actions"><button className="journey-primary" onClick={()=>window.print()}>Download certificate <FileText/></button><button onClick={()=>{navigator.clipboard?.writeText(`https://verify.atlas.demo/${certificateId}`);setShared(true)}}>Share achievement <ArrowRight/></button></div>{shared&&<p className="share-success"><CheckCircle2/> Verification link copied to your clipboard.</p>}<a href="/learn">Return to my learning</a></div><CertificateDesign certificateId={certificateId} learnerName="Amara Okafor" courseTitle={credential?.title||course.title} issued={credential?.issued||"30 July 2026"} duration={course.duration} score="80%" instructor={course.instructor}/></section></main>;
}
