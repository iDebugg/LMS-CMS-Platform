"use client";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Clock3,
  Download,
  FileQuestion,
  FileText,
  Filter,
  Gauge,
  Globe2,
  GraduationCap,
  Image,
  LayoutDashboard,
  Library,
  ListChecks,
  Mail,
  Menu,
  Megaphone,
  MoreHorizontal,
  Pencil,
  Play,
  Plus,
  Send,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  Upload,
  UserPlus,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { activity, courses, departments, type Course } from "./data";
import {
  createAssignment,
  cataloguePaths,
  markNoticesRead,
  publishCourse,
  saveCourse,
  sendAnnouncement,
  useAtlasState,
  type AtlasCourse,
} from "./atlas-store";
import { CertificateDesign } from "./CertificateDesign";
import { CourseStudio, MediaGallery } from "./CourseStudio";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type View = "landing" | "lms" | "cms";
type Props = { initialView: View };

const IconLogo = () => (
  <span className="logo-mark" aria-hidden="true">
    <span />
    <span />
    <span />
  </span>
);

const Brand = ({ light = false }: { light?: boolean }) => (
  <Link className={`brand ${light ? "brand-light" : ""}`} href="/">
    <IconLogo />
    <span>von newman <b>atlas</b></span>
  </Link>
);

function goTo(view: View) {
  window.location.href = view === "landing" ? "/" : view === "lms" ? "/learn" : "/admin";
}

export function AtlasExperience({ initialView }: Props) {
  if (initialView === "landing") return <Landing />;
  if (initialView === "lms") return <LMS />;
  return <CMS />;
}

function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({
      desktop: "(min-width: 900px)",
      reduce: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };
      if (reduce) {
        gsap.set(".hero-copy > *, .hero-visual, .flow-card, .course-tile, .impact-copy, .impact-dashboard", { clearProps: "all" });
        return;
      }
      const split = SplitText.create(".hero h1", { type: "lines", mask: "lines", aria: "auto" });
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(".eyebrow", { y: 18, autoAlpha: 0, duration: .55 })
        .from(split.lines, { yPercent: 110, rotation: 1.5, duration: .9, stagger: .1 }, "<.08")
        .from(".hero-copy > p, .hero-actions, .hero-proof", { y: 26, autoAlpha: 0, duration: .65, stagger: .1 }, "-=.42")
        .from(".hero-visual", { xPercent: 12, scale: .94, autoAlpha: 0, duration: 1.05 }, "-=.8")
        .from(".float-chip", { y: 24, scale: .85, autoAlpha: 0, duration: .55, stagger: .12 }, "-=.55");

      gsap.to(".float-chip", { y: -10, duration: 2.4, repeat: -1, yoyo: true, stagger: .28, ease: "sine.inOut" });
      gsap.to(".hero-visual img", {
        yPercent: 9,
        scale: 1.035,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
      });

      gsap.timeline({
        scrollTrigger: { trigger: ".ecosystem", start: "top top", end: desktop ? "+=1900" : "bottom bottom", pin: desktop, scrub: 1 }
      }).from(".ecosystem .section-heading", { y: 55, autoAlpha: 0 })
        .from(".flow-card", { y: 110, rotation: 3, autoAlpha: 0, stagger: .22 })
        .from(".flow-arrow", { scale: 0, rotation: -90, autoAlpha: 0, stagger: .12 }, "-=.45")
        .to(".flow-cms", { xPercent: -4, rotation: -1.5 }, "+=.2")
        .to(".flow-learn", { xPercent: 4, rotation: 1.5 }, "<")
        .to(".mini-ui, .org-pills, .completion", { y: -8, scale: 1.025, stagger: .15 });

      const tiles = gsap.utils.toArray<HTMLElement>(".course-tile");
      gsap.from(tiles, {
        y: 90, rotation: (i) => i % 2 ? 3 : -3, autoAlpha: 0, stagger: .12, ease: "power3.out",
        scrollTrigger: { trigger: ".course-showcase", start: "top 68%", end: "center center", scrub: .8 }
      });
      gsap.timeline({ scrollTrigger: { trigger: ".impact", start: "top 70%", end: "center center", scrub: .8 } })
        .from(".impact-copy > *", { x: -60, autoAlpha: 0, stagger: .1 })
        .from(".impact-dashboard", { x: 80, rotation: 7, scale: .92, autoAlpha: 0 }, "<.15")
        .from(".bars > span", { scaleY: .05, transformOrigin: "bottom", stagger: .05 }, "-=.4");
      return () => split.revert();
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root} className="landing">
      <header className="public-nav">
        <Brand />
        <nav className={menu ? "nav-open" : ""}>
          <a href="#platform">Platform</a>
          <a href="#learning">Learning</a>
          <a href="#organisations">For organisations</a>
          <a href="#stories">Why Atlas</a>
        </nav>
        <div className="nav-actions">
          <button className="text-button" onClick={() => window.location.href="/auth"}>Sign in</button>
          <button className="button button-dark" onClick={() => window.location.href="/auth"}>Enter demo <ArrowRight size={16} /></button>
        </div>
        <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> Learning, beautifully connected</span>
            <h1>Build skills that<br /><em>move people forward.</em></h1>
            <p>One joyful platform to create learning, grow talent and turn every achievement into measurable progress.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => window.location.href="/auth"}>Begin the experience <ArrowRight size={17} /></button>
              <button className="button button-white" onClick={() => goTo("cms")}><CirclePlay size={18} /> See how Atlas works</button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>AB</span><span>CO</span><span>NE</span><span>+2k</span></div>
              <p><b>2,480 learners</b><br />growing this week</p>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/atlas-hero.png" alt="African professionals collaborating with learning tools" />
            <div className="float-chip chip-progress"><span className="mini-ring">84%</span><p><b>Pathway progress</b><small>Digital confidence</small></p></div>
            <div className="float-chip chip-badge"><Award size={22} /><p><b>New badge!</b><small>Data Pathfinder</small></p></div>
            <div className="float-chip chip-course"><Play size={16} fill="currentColor" /><p><b>Next lesson</b><small>AI in everyday work</small></p></div>
          </div>
        </section>

        <section className="trust-strip">
          <span>Built for ambitious organisations</span>
          <div><b>FEDERAL SERVICE</b><b>STERLING COAST</b><b>HORIZON ACADEMY</b><b>NEXUS GROUP</b></div>
        </section>

        <section id="platform" className="section ecosystem">
          <div className="section-heading">
            <span className="kicker">One connected ecosystem</span>
            <h2>From a bright idea to<br />real learning impact.</h2>
            <p>Atlas joins the control of a powerful CMS with a learner experience people actually want to return to.</p>
          </div>
          <div className="flow-grid">
            <article className="flow-card flow-cms">
              <span className="flow-number">01</span>
              <div className="flow-icon"><Library /></div>
              <h3>Create & curate</h3>
              <p>Build courses, assessments and pathways from a reusable content library.</p>
              <div className="mini-ui">
                <span className="mini-thumb">AI</span>
                <div><b>AI for Smarter Service</b><small>6 modules · Draft saved</small></div>
                <CheckCircle2 size={19} />
              </div>
            </article>
            <div className="flow-arrow"><ArrowRight /></div>
            <article className="flow-card flow-org">
              <span className="flow-number">02</span>
              <div className="flow-icon"><Users /></div>
              <h3>Shape the experience</h3>
              <p>Choose the right organisation, people, deadlines and access rules.</p>
              <div className="org-pills"><span>Digital Services</span><span>Managers</span><span>2026 Cohort</span></div>
            </article>
            <div className="flow-arrow"><ArrowRight /></div>
            <article className="flow-card flow-learn">
              <span className="flow-number">03</span>
              <div className="flow-icon"><GraduationCap /></div>
              <h3>Learn & grow</h3>
              <p>Give every learner a relevant journey with progress they can see and feel.</p>
              <div className="completion"><span><Check size={16} /> Completed</span><b>+240 pts</b></div>
            </article>
          </div>
        </section>

        <section id="learning" className="section course-showcase">
          <div className="section-heading inline-heading">
            <div><span className="kicker">Learning that feels alive</span><h2>Every course has<br />its own energy.</h2></div>
            <p>Vivid, relevant learning experiences designed around real professional growth—not endless content catalogues.</p>
          </div>
          <div className="showcase-grid">
            {courses.slice(0, 4).map((course, index) => <CourseTile key={course.id} course={course} large={index === 0} />)}
          </div>
        </section>

        <section id="organisations" className="section impact">
          <div className="impact-copy">
            <span className="kicker">Clarity at every level</span>
            <h2>See the learning.<br />See the impact.</h2>
            <p>Turn activity into a clear view of participation, compliance, skills and the places where people need support.</p>
            <ul>
              <li><Check /> Understand workforce progress at a glance</li>
              <li><Check /> Catch overdue or difficult learning early</li>
              <li><Check /> Prove compliance with trusted records</li>
            </ul>
            <button className="button button-dark" onClick={() => goTo("cms")}>Explore organisation insights <ArrowRight size={17} /></button>
          </div>
          <div className="impact-dashboard">
            <div className="impact-top"><span>Learning overview</span><small>Last 30 days <ChevronDown size={14} /></small></div>
            <div className="impact-stats"><div><small>Active learners</small><b>2,480</b><em>↑ 12.4%</em></div><div><small>Completion rate</small><b>84%</b><em>↑ 6.2%</em></div><div><small>Learning hours</small><b>9,418</b><em>↑ 18.1%</em></div></div>
            <div className="chart"><div className="chart-label"><b>Learning activity</b><span>● Completions &nbsp; ● Enrolments</span></div><div className="bars">{[42,58,47,72,66,88,78,94,72,86,98,90].map((v,i)=><span key={i} style={{height:`${v}%`}}><i style={{height:`${Math.max(20,v-28)}%`}} /></span>)}</div></div>
          </div>
        </section>

        <section id="stories" className="section final-cta">
          <span className="spark spark-a">✦</span><span className="spark spark-b">●</span><span className="spark spark-c">✺</span>
          <span className="kicker">Your people are ready</span>
          <h2>Make learning the best part<br />of their working day.</h2>
          <p>Explore the connected Atlas prototype—from content creation to certification.</p>
          <div><button className="button button-white" onClick={() => window.location.href="/auth"}>Open learner experience <ArrowRight size={17} /></button><button className="button button-outline-light" onClick={() => goTo("cms")}>Open CMS</button></div>
        </section>
      </main>
      <footer><Brand light /><p>Learning infrastructure for people and organisations that want to move forward.</p><div><a href="#">Privacy</a><a href="#">Accessibility</a><a href="#">Support</a></div><small>© 2026 Von Newman Atlas</small></footer>
    </div>
  );
}

function CourseTile({ course, large = false }: { course: Course; large?: boolean }) {
  return <article className={`course-tile ${large ? "course-tile-large" : ""}`} style={{background:course.color, color:course.accent}}>
    <div className="course-art"><span>{course.art}</span><i /><i /></div>
    <div className="course-tile-content">
      <span className="status-pill" style={{background:`${course.accent}18`}}>{course.status}</span>
      <h3>{course.title}</h3>
      <p>{course.category}</p>
      <div><span><Clock3 size={15} /> {course.duration}</span><span><BookOpen size={15} /> {course.modules} modules</span></div>
    </div>
  </article>;
}

const lmsNav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My learning", icon: BookOpen },
  { label: "Explore", icon: Search },
  { label: "Pathways", icon: Target },
  { label: "Achievements", icon: Trophy },
  { label: "Certificates", icon: Award },
];

function LMS() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("Overview");
  const [notice, setNotice] = useState(false);
  const [profileOpen,setProfileOpen]=useState(false);
  const [globalQuery,setGlobalQuery]=useState("");
  const [completed, setCompleted] = useState(false);
  const atlas = useAtlasState();
  const learnerCourses = atlas.courses.filter(course => course.published);
  const current = learnerCourses.find(course => course.id === "x-03-2") || learnerCourses[0];
  useGSAP(() => {
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      gsap.from(".view-enter > *",{y:28,autoAlpha:0,duration:.6,stagger:.07,ease:"power3.out"});
      ScrollTrigger.batch(".view-enter .scroll-reveal",{
        start:"top 88%",once:true,
        onEnter:(batch)=>gsap.fromTo(batch,{y:48,autoAlpha:0},{y:0,autoAlpha:1,duration:.75,stagger:.09,ease:"power3.out",overwrite:true})
      });
    });
    return()=>mm.revert();
  },{scope:root,dependencies:[active],revertOnUpdate:true});
  return (
    <div ref={root} className="app-shell learner-shell">
      <aside className="app-sidebar learner-sidebar">
        <Brand light />
        <div className="workspace-card"><span className="workspace-logo">F</span><div><small>Workspace</small><b>Federal Service</b></div><ChevronDown size={16} /></div>
        <nav>{lmsNav.map(({label,icon:Icon})=><button key={label} className={active===label?"active":""} onClick={()=>setActive(label)}><Icon size={19}/><span>{label}</span>{label==="My learning"&&<em>4</em>}</button>)}</nav>
        <div className="sidebar-spacer" />
        <div className="weekly-card"><div><Zap size={18}/><b>Weekly goal</b></div><div className="weekly-ring"><strong>3</strong><small>of 4 days</small></div><p>One more learning day to keep your rhythm.</p></div>
        <button className="profile-row" onClick={()=>setProfileOpen(!profileOpen)}><span className="avatar avatar-photo">AO</span><span><b>Amara Okafor</b><small>Policy Analyst</small></span><MoreHorizontal size={18}/></button>
        {profileOpen&&<div className="profile-menu"><button onClick={()=>setActive("Achievements")}><UserRound/> Learning profile</button><button onClick={()=>{localStorage.removeItem("atlas-session");window.location.href="/auth"}}><X/> Sign out</button></div>}
      </aside>
      <main className="app-main">
        <header className="app-topbar">
          <div className="mobile-brand"><Brand /></div>
          <label className="search-box"><Search size={18}/><input aria-label="Search courses" value={globalQuery} onChange={e=>{setGlobalQuery(e.target.value);if(e.target.value)setActive("Explore")}} placeholder="Search courses, skills or pathways" /><kbd>⌘ K</kbd></label>
          <div className="top-actions"><button aria-label="Notifications" onClick={()=>{setNotice(!notice);if(!notice)markNoticesRead()}}><Bell size={20}/>{atlas.notices.some(item=>!item.read)&&<i />}</button><button className="button button-small button-primary" onClick={()=>goTo("cms")}>View CMS</button></div>
          {notice&&<div className="notification-pop"><b>Notifications</b>{atlas.notices.slice(0,5).map(item=><p key={item.id}><strong>{item.title}</strong><br/>{item.message}<small>{item.createdAt}</small></p>)}</div>}
        </header>
        <div className="dashboard-content view-enter">
          <section className="welcome-row">
            <div><span className="today">Wednesday, 30 July</span><h1>Good morning, Amara <span>👋🏾</span></h1><p>Small steps, real growth. Here’s what’s next.</p></div>
            <div className="level-pill"><span><Sparkles size={18}/></span><div><small>Current level</small><b>Practitioner</b></div><strong>2,840 XP</strong></div>
          </section>

          {active === "Overview" ? <>
            <section className="continue-card" style={{background:current.color}}>
              <div className="continue-copy">
                <span className="status-pill mandatory">Mandatory · {current.due}</span>
                <h2>{completed ? "Course complete — beautifully done!" : current.title}</h2>
                <p>{completed ? "Your certificate is ready and your learning record has been updated." : "Module 4 of 6 · Responsible AI in decision-making"}</p>
                <div className="progress-label"><span>{completed ? "Complete" : "Course progress"}</span><b>{completed ? 100 : current.progress}%</b></div>
                <div className="progress"><span style={{width:`${completed ? 100 : current.progress}%`,background:current.accent}} /></div>
                <div className="continue-actions"><button className="button button-dark" onClick={()=>completed?setCompleted(false):window.location.href=`/learn/course/${current.id}/lesson/1`}>{completed ? <><Award size={17}/> View certificate</> : <><Play size={16} fill="currentColor"/> Continue learning</>}</button><small>{completed ? "+350 points earned" : `${current.curriculum[0]?.lessons.length||0} catalogue lessons`}</small></div>
              </div>
              <div className="continue-art" style={{color:current.accent}}><span>{completed ? "✓" : current.art}</span><div className="orbit orbit-a"/><div className="orbit orbit-b"/><b>{completed ? "Certified" : "AI"}</b></div>
            </section>
            <section className="stat-grid">
              <article><span className="stat-icon purple"><BookOpen/></span><div><small>Courses in progress</small><b>4</b><em>2 due this month</em></div></article>
              <article><span className="stat-icon green"><Clock3/></span><div><small>Learning hours</small><b>28.5</b><em>+4.2 this week</em></div></article>
              <article><span className="stat-icon coral"><Award/></span><div><small>Certificates</small><b>{completed ? 7 : 6}</b><em>{completed ? "New certificate!" : "1 renewal due"}</em></div></article>
              <article><span className="stat-icon yellow"><Trophy/></span><div><small>Organisation rank</small><b>#12</b><em>Top 8% this month</em></div></article>
            </section>
            <section className="content-row">
              <div className="main-column">
                <div className="row-heading"><div><h2>Assigned to you</h2><p>Learning selected by your organisation</p></div><button onClick={()=>setActive("My learning")}>View all <ArrowRight size={15}/></button></div>
                <div className="assigned-grid">{learnerCourses.filter(course=>course.status==="Assigned"||course.status==="Mandatory").filter(course=>course.id!==current.id).slice(0,3).map(course=><LearningCard key={course.id} course={course}/>)}</div>
              </div>
              <aside className="right-column">
                <div className="row-heading"><div><h2>Coming up</h2><p>Dates to keep in view</p></div></div>
                <div className="upcoming">
                  <article><span><b>08</b><small>AUG</small></span><div><b>AI for Smarter Public Service</b><small>Mandatory deadline</small></div></article>
                  <article><span className="blue-date"><b>12</b><small>AUG</small></span><div><b>Data clinic: live session</b><small>10:00 · Microsoft Teams</small></div></article>
                  <article><span className="pink-date"><b>22</b><small>AUG</small></span><div><b>Cybersecurity certificate</b><small>Renewal due</small></div></article>
                </div>
              </aside>
            </section>
          </> : <LearnerWorkspace active={active} courses={learnerCourses} globalQuery={globalQuery} />}
        </div>
      </main>
    </div>
  );
}

function LearningCard({ course }: { course: Course }) {
  return <article className="learning-card" tabIndex={0} role="link" onClick={()=>window.location.href=`/learn/course/${course.id}`} onKeyDown={e=>{if(e.key==="Enter")window.location.href=`/learn/course/${course.id}`}}>
    <div className="learning-art" style={{background:course.color,color:course.accent}}><span>{course.art}</span><em>{course.status}</em></div>
    <div className="learning-card-body"><small>{course.category}</small><h3>{course.title}</h3><div className="meta"><span><Clock3 size={14}/>{course.duration}</span><span><BookOpen size={14}/>{course.modules} modules</span></div><div className="card-progress"><span><i style={{width:`${Math.max(course.progress,3)}%`,background:course.accent}} /></span><b>{course.progress ? `${course.progress}%` : "Start"}</b></div></div>
  </article>;
}

function LearnerWorkspace({active,courses:availableCourses,globalQuery}:{active:string;courses:AtlasCourse[];globalQuery:string}) {
  const atlas=useAtlasState();
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState("All");
  const [pathGroup,setPathGroup]=useState("All");
  const [selectedPath,setSelectedPath]=useState("");
  const effectiveQuery=query||globalQuery;
  const visible=availableCourses.filter(c=>(filter==="All"||filter==="In progress"&&c.progress>0&&c.progress<100||filter==="Mandatory"&&c.status==="Mandatory"||filter==="Completed"&&c.progress===100)&&`${c.title} ${c.category} ${c.code}`.toLowerCase().includes(effectiveQuery.toLowerCase()));
  if(active==="My learning"||active==="Explore") return <section className="library-view">
    <div className="library-hero"><span className="kicker">{active==="Explore"?"Organisation catalogue":"Your active plan"}</span><h2>{active}</h2><p>{active==="Explore"?"Search courses, skills and pathways available in the Federal Service workspace.":"Assignments, voluntary learning and completed work in one professional record."}</p></div>
    <div className="content-toolbar scroll-reveal"><label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search your learning"/></label><div>{["All","In progress","Mandatory","Completed"].map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div><button><Filter size={16}/> Filters</button></div>
    <div className="catalogue-summary scroll-reveal"><span><b>{visible.length}</b> learning experiences</span><span><b>{new Set(visible.map(course=>course.collection)).size}</b> catalogue collections</span><span><b>{visible.reduce((sum,course)=>sum+course.modules,0)}</b> structured modules</span></div>
    {visible.length?<div className="library-grid scroll-reveal">{visible.map(c=><LearningCard course={c} key={c.id}/>)}</div>:<EmptyState title="No matching learning" body="Try a different status or search term."/>}
  </section>;
  if(active==="Pathways") {
    const groups=[["All","All"],["Public sector","PUBLIC SECTOR PATHS"],["Private sector","PRIVATE SECTOR PATHS"],["Cross-cutting","CROSS-CUTTING PATHS"]];
    const visiblePaths=cataloguePaths.filter(path=>(pathGroup==="All"||path.section===pathGroup)&&`${path.code} ${path.title} ${path.audience} ${path.courses.map(course=>course.title).join(" ")}`.toLowerCase().includes(query.toLowerCase()));
    const colors=["#dcd5ff","#ffd9e8","#ffe6ad","#d5f7d9","#cceffc","#f2dcff"];
    return <section className="library-view"><div className="library-hero pathway-hero"><span className="kicker">{cataloguePaths.length} official catalogue pathways</span><h2>Atlas pathways</h2><p>Every pathway, course and lesson below is generated directly from the Von Newman Atlas course catalogue.</p></div><div className="content-toolbar pathway-toolbar scroll-reveal"><label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search pathway codes, titles or courses"/></label><div>{groups.map(([label,value])=><button key={value} className={pathGroup===value?"active":""} onClick={()=>setPathGroup(value)}>{label} <b>{value==="All"?cataloguePaths.length:cataloguePaths.filter(path=>path.section===value).length}</b></button>)}</div></div><div className="catalogue-summary scroll-reveal"><span><b>{visiblePaths.length}</b> pathways shown</span><span><b>{visiblePaths.reduce((sum,path)=>sum+path.courses.length,0)}</b> catalogue courses</span><span><b>{visiblePaths.reduce((sum,path)=>sum+path.courses.reduce((count,course)=>count+course.lessons.length,0),0)}</b> authored lessons</span></div><div className="pathway-list scroll-reveal">{visiblePaths.map((path,i)=>{const pathCourses=atlas.courses.filter(course=>course.pathCode===path.code);const completed=pathCourses.filter(course=>course.progress===100).length;const activeCourse=pathCourses.find(course=>course.progress>0&&course.progress<100);const progress=pathCourses.length?Math.round(pathCourses.reduce((sum,course)=>sum+course.progress,0)/pathCourses.length):0;const expanded=selectedPath===path.code;return <article key={path.code} className={expanded?"expanded":""} style={{background:colors[i%colors.length]}} onClick={()=>setSelectedPath(expanded?"":path.code)} tabIndex={0} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();setSelectedPath(expanded?"":path.code)}}}><span>{path.code}</span><div><small>{activeCourse?"IN PROGRESS":path.section}</small><h3>{path.title}</h3><p>{path.audience}</p><p className="pathway-course-preview">{path.courses.map(course=>course.title).join(" · ")}</p><div className="progress"><i style={{width:`${Math.max(progress,2)}%`}}/></div><b>{completed?`${completed} of ${path.courses.length} completed · `:""}{path.courses.length} courses · {path.courses.reduce((sum,course)=>sum+course.lessons.length,0)} lessons</b></div><button className="pathway-toggle" onClick={event=>{event.stopPropagation();setSelectedPath(expanded?"":path.code)}}>{expanded?"Hide courses":"View courses"} <ChevronDown/></button>{expanded&&<section className="pathway-course-list" onClick={event=>event.stopPropagation()}><header><div><small>PATHWAY CURRICULUM</small><h4>{path.title}</h4></div><span>{path.courses.length} courses in recommended order</span></header>{path.courses.map((catalogueCourse,courseIndex)=>{const course=pathCourses.find(item=>item.code===catalogueCourse.code);const courseProgress=course?.progress||0;return <div className="pathway-course-row" style={{display:"grid",gridTemplateColumns:"42px minmax(0,1fr) auto",alignItems:"center",gap:13,minHeight:88,background:"#fff",border:"1px solid #e7e5ee",borderRadius:14,padding:"13px 15px"}} key={catalogueCourse.code}><span>{String(courseIndex+1).padStart(2,"0")}</span><div><small>{catalogueCourse.code}</small><h4>{catalogueCourse.title}</h4><p>{catalogueCourse.lessons.length} lessons · {course?.duration||"Self-paced"}</p>{courseProgress>0&&<div className="course-inline-progress"><i style={{width:`${courseProgress}%`}}/></div>}</div><button className="button button-white" disabled={!course} onClick={()=>course&&window.location.assign(`/learn/course/${course.id}`)}>{courseProgress>0&&courseProgress<100?"Continue":courseProgress===100?"Review":"Start"} <ArrowRight/></button></div>})}</section>}</article>})}</div>{!visiblePaths.length&&<EmptyState title="No matching pathway" body="Try a different catalogue section or search term."/>}</section>;
  }
  if(active==="Achievements") return <section className="library-view"><div className="library-hero achievement-hero"><span className="kicker">Meaningful momentum</span><h2>Achievements</h2><p>Points reward mastery, completion and consistency—not clicks.</p></div><div className="achievement-summary scroll-reveal"><article><Trophy/><b>2,840</b><span>total points</span></article><article><Zap/><b>7 weeks</b><span>learning rhythm</span></article><article><BadgeCheck/><b>12</b><span>badges earned</span></article></div><div className="badge-gallery scroll-reveal">{["Data Pathfinder","First-attempt Mastery","Public Service Builder","Consistency Champion","AI Foundations","Early Finisher"].map((x,i)=><article className={i>3?"locked":""} key={x}><span>{i>3?<ShieldCheck/>:<Award/>}</span><h3>{x}</h3><p>{i>3?"Complete one more qualifying course":"Earned through verified learning activity"}</p></article>)}</div></section>;
  return <section className="library-view"><div className="library-hero certificate-hero"><span className="kicker">Verified learning record</span><h2>Certificates</h2><p>Active, expiring and historical credentials issued through your organisations.</p></div><div className="certificate-list scroll-reveal">{atlas.credentials.map(c=><article key={c.id}><span className="certificate-seal"><Award/></span><div><small>{c.status}</small><h3>{c.title}</h3><p>{c.id} · Issued {c.issued}</p></div><button onClick={()=>window.location.href=`/learn/certificate/${c.id}`}>View credential <ArrowRight/></button>{c.status==="Renewal due"&&<em>Renewal course assigned</em>}</article>)}</div></section>;
}

function EmptyState({title,body}:{title:string;body:string}) {
  return <div className="empty-state"><Search/><h3>{title}</h3><p>{body}</p></div>;
}

const cmsNav = [
  {group:"Workspace", items:[["Dashboard",Gauge],["Library",Library],["Courses",BookOpen],["Pathways",Target],["Media",Image]]},
  {group:"Learning", items:[["Question banks",ShieldCheck],["Assessments",CheckCircle2],["Certificates",Award],["Gamification",Trophy]]},
  {group:"People", items:[["Organisations",Globe2],["Users",Users],["Assignments",Zap],["Announcements",Megaphone],["Reports",BarChart3],["Reviews",ListChecks]]},
];

function CMS() {
  const root=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState("Dashboard");
  const [studioOpen,setStudioOpen]=useState(false);
  const [studioCourse,setStudioCourse]=useState<AtlasCourse|null>(null);
  const [published,setPublished]=useState<AtlasCourse|null>(null);
  const atlas=useAtlasState();
  useGSAP(()=>{
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      gsap.from(".cms-content > *",{y:24,autoAlpha:0,duration:.55,stagger:.06,ease:"power3.out"});
      ScrollTrigger.batch(".cms-content .scroll-reveal",{start:"clamp(top 88%)",once:true,onEnter:(batch)=>gsap.fromTo(batch,{y:46,autoAlpha:0},{y:0,autoAlpha:1,duration:.7,stagger:.08,ease:"power3.out",onComplete:()=>gsap.set(batch,{clearProps:"willChange"})})});
      requestAnimationFrame(()=>ScrollTrigger.refresh());
    });
    return()=>mm.revert();
  },{scope:root,dependencies:[active,published],revertOnUpdate:true});
  return <div ref={root} className="app-shell cms-shell">
    <aside className="app-sidebar cms-sidebar"><Brand light/><button className="create-button" onClick={()=>{setStudioCourse(null);setStudioOpen(true)}}><Plus size={18}/> Create new <ChevronDown size={15}/></button>
      <nav>{cmsNav.map(group=><div key={group.group}><small>{group.group}</small>{group.items.map(([label,Icon])=><button key={label as string} className={!studioOpen&&active===label?"active":""} onClick={()=>{setStudioOpen(false);setActive(label as string)}}><Icon size={18}/><span>{label as string}</span>{label==="Courses"&&<em>{atlas.courses.length}</em>}</button>)}</div>)}</nav>
      <div className="sidebar-spacer"/><button className="nav-settings"><Settings size={18}/> Settings</button><button className="profile-row"><span className="avatar admin-avatar">IK</span><span><b>Ifeoma Kalu</b><small>Platform administrator</small></span><MoreHorizontal size={18}/></button>
    </aside>
    <main className="app-main">
      <header className="app-topbar cms-topbar"><div><small>Federal Service workspace</small><ChevronDown size={14}/></div><label className="search-box"><Search size={18}/><input aria-label="Search CMS" placeholder="Search Atlas CMS" /><kbd>⌘ K</kbd></label><div className="top-actions"><button><Bell size={20}/><i/></button><button className="button button-small button-light" onClick={()=>goTo("lms")}>Preview LMS <ArrowRight size={15}/></button></div></header>
      <div className={`cms-content ${studioOpen?"studio-content":""}`}>
        {studioOpen?<CourseStudio course={studioCourse} onClose={()=>setStudioOpen(false)} onSave={(course)=>{saveCourse(course);setStudioCourse(course)}} onPublish={(course)=>{publishCourse(course);setPublished(course);setStudioCourse(course);setStudioOpen(false);setActive("Courses")}}/>:active==="Dashboard" ? <CMSDashboard onCreate={()=>{setStudioCourse(null);setStudioOpen(true)}} published={published} onNavigate={setActive}/> : <CMSSection active={active} onCreate={()=>{setStudioCourse(null);setStudioOpen(true)}} onEdit={(course)=>{setStudioCourse(course);setStudioOpen(true)}} published={published} catalogue={atlas.courses}/>}
      </div>
    </main>
  </div>;
}

function CMSDashboard({onCreate,published,onNavigate}:{onCreate:()=>void;published:AtlasCourse|null;onNavigate:(x:string)=>void}) {
  return <><section className="cms-heading"><div><span className="today">Wednesday, 30 July</span><h1>Good morning, Ifeoma</h1><p>Here’s how learning is moving across your ecosystem.</p></div><div><button className="button button-white" onClick={()=>onNavigate("Users")}><Upload size={16}/> Import users</button><button className="button button-primary" onClick={onCreate}><Plus size={17}/> Create course</button></div></section>
    {published&&<div className="success-banner"><CheckCircle2/><div><b>Course published successfully</b><p>“{published.title}” is now available to {published.learners.toLocaleString()} learners.</p></div><button onClick={()=>window.location.href=`/learn/course/${published.id}`}>View in LMS <ArrowRight size={15}/></button></div>}
    <section className="cms-stats"><article><span className="stat-icon purple"><Users/></span><div><small>Active learners</small><b>2,480</b><em>↑ 12.4%</em></div><BarChart3/></article><article><span className="stat-icon green"><CheckCircle2/></span><div><small>Completion rate</small><b>84%</b><em>↑ 6.2%</em></div><BarChart3/></article><article><span className="stat-icon yellow"><ShieldCheck/></span><div><small>Compliance</small><b>91%</b><em>↑ 3.8%</em></div><BarChart3/></article><article><span className="stat-icon coral"><Award/></span><div><small>Certificates issued</small><b>1,284</b><em>+146 this month</em></div><BarChart3/></article></section>
    <section className="cms-grid">
      <article className="panel performance-panel"><div className="panel-heading"><div><h2>Learning performance</h2><p>Enrolments and completions over time</p></div><button>Last 6 months <ChevronDown size={14}/></button></div><div className="large-chart"><div className="y-labels"><span>4k</span><span>3k</span><span>2k</span><span>1k</span><span>0</span></div><div className="line-area"><svg viewBox="0 0 700 210" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6552df" stopOpacity=".28"/><stop offset="1" stopColor="#6552df" stopOpacity="0"/></linearGradient></defs><path d="M0 176 C60 160,70 130,130 142 S220 94,278 110 S360 60,420 82 S510 28,560 48 S650 25,700 12 L700 210 L0 210Z" fill="url(#area)"/><path d="M0 176 C60 160,70 130,130 142 S220 94,278 110 S360 60,420 82 S510 28,560 48 S650 25,700 12" fill="none" stroke="#6552df" strokeWidth="4" strokeLinecap="round"/></svg><div className="x-labels"><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div></div></div></article>
      <article className="panel compliance-panel"><div className="panel-heading"><div><h2>Compliance health</h2><p>Mandatory learning status</p></div><button><MoreHorizontal/></button></div><div className="donut"><div><strong>91%</strong><small>compliant</small></div></div><div className="legend"><span><i className="dot-green"/>Completed <b>2,257</b></span><span><i className="dot-yellow"/>In progress <b>146</b></span><span><i className="dot-pink"/>Overdue <b>77</b></span></div></article>
      <article className="panel departments-panel scroll-reveal"><div className="panel-heading"><div><h2>Department progress</h2><p>Completion rate by team</p></div><button onClick={()=>onNavigate("Reports")}>View report <ArrowRight size={14}/></button></div><div className="department-bars">{departments.map(d=><div key={d.name}><span><b>{d.name}</b><em>{d.value}%</em></span><div><i style={{width:`${d.value}%`,background:d.color}}/></div></div>)}</div></article>
      <article className="panel activity-panel"><div className="panel-heading"><div><h2>Live activity</h2><p>What learners are doing now</p></div><span className="live-pill">● Live</span></div><div className="activity-list">{activity.map(a=><div key={a.name}><span className="avatar">{a.initials}</span><p><b>{a.name}</b> {a.action}<br/><strong>{a.item}</strong></p><small>{a.time}</small></div>)}</div></article>
    </section>
  </>;
}

function CMSSection({active,onCreate,onEdit,published,catalogue}:{active:string;onCreate:()=>void;onEdit:(course:AtlasCourse)=>void;published:AtlasCourse|null;catalogue:AtlasCourse[]}) {
  const isCourses=active==="Courses"||active==="Library";
  const [query,setQuery]=useState("");
  const [status,setStatus]=useState<"All"|"Published"|"Draft">("All");
  const [toast,setToast]=useState("");
  const act=(message:string)=>{setToast(message);window.setTimeout(()=>setToast(""),2200)};
  if(active==="Media") return <MediaGallery onUpload={()=>act("Upload workspace opened — select a source file and accessibility metadata")}/>;
  if(!isCourses) return <>{toast&&<div className="action-toast"><CheckCircle2/>{toast}</div>}<CMSFunctionalSection active={active} notify={act}/></>;
  return <section className="cms-section"><div className="cms-heading"><div><span className="today">Atlas CMS</span><h1>{active}</h1><p>{isCourses?"Create, govern and distribute meaningful learning.":"Manage every part of your organisation’s learning ecosystem."}</p></div><button className="button button-primary" onClick={onCreate}><Plus size={17}/> {isCourses?"Create course":"Add new"}</button></div>
    {toast&&<div className="action-toast"><CheckCircle2/>{toast}</div>}
    <div className="content-toolbar"><label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses or catalogue codes" /></label><div><button className={status==="All"?"active":""} onClick={()=>setStatus("All")}>All courses <b>{catalogue.length}</b></button><button className={status==="Published"?"active":""} onClick={()=>setStatus("Published")}>Published <b>{catalogue.filter(c=>c.published).length}</b></button><button className={status==="Draft"?"active":""} onClick={()=>setStatus("Draft")}>Drafts <b>{catalogue.filter(c=>!c.published).length}</b></button></div><button onClick={()=>act("Course filters ready: organisation, pathway, owner and lifecycle")}><Settings size={16}/> Filters</button></div><div className="course-table scroll-reveal"><div className="table-head"><span>Course</span><span>Status</span><span>Organisations</span><span>Enrolments</span><span>Completion</span><span>Updated</span><span/></div>{catalogue.filter(c=>(status==="All"||status==="Published"&&c.published||status==="Draft"&&!c.published)&&`${c.title} ${c.code} ${c.category}`.toLowerCase().includes(query.toLowerCase())).map(c=><CourseRow key={c.id} course={c} onManage={()=>onEdit(c)}/>)}</div>
  </section>;
}

const records={
  Pathways:[
    {title:"Digital Public Service Professional",meta:"6 courses · Strict sequence",status:"Published",value:"1,204 learners"},
    {title:"Future-Ready Manager",meta:"5 courses · 2 electives",status:"In review",value:"286 learners"},
    {title:"Cyber-Safe Workplace",meta:"4 courses · Annual renewal",status:"Published",value:"2,480 learners"}
  ],
  Media:[
    {title:"Responsible AI: decision framework",meta:"Video · 08:42 · Captions included",status:"Approved",value:"Used in 3 courses"},
    {title:"Citizen journey mapping workbook",meta:"PDF · 1.2 MB · English",status:"Approved",value:"Used in 6 courses"},
    {title:"Data clinic recording — July",meta:"Video · 44:18 · Transcript missing",status:"Needs attention",value:"Used in 1 course"}
  ],
  "Question banks":[
    {title:"Responsible AI foundations",meta:"48 questions · 6 objectives",status:"Approved",value:"18 uses"},
    {title:"Data literacy scenarios",meta:"32 questions · Intermediate",status:"In review",value:"9 uses"},
    {title:"Cybersecurity awareness 2026",meta:"64 questions · Randomised",status:"Approved",value:"31 uses"}
  ]
} as const;

function CMSFunctionalSection({active,notify}:{active:string;notify:(x:string)=>void}) {
  const [selected,setSelected]=useState(0);
  const [modal,setModal]=useState("");
  const [editor,setEditor]=useState("");
  const heading=<div className="cms-heading"><div><span className="today">Atlas CMS · Federal Service</span><h1>{active}</h1><p>{cmsDescriptions[active]||"Manage this part of the learning ecosystem with auditable, organisation-aware controls."}</p></div><button className="button button-primary" onClick={()=>setModal(active)}><Plus/> {cmsActions[active]||"Add new"}</button></div>;
  if(active==="Pathways") {
    const path=cataloguePaths[selected]||cataloguePaths[0];
    return <section>{heading}<div className="catalogue-admin-summary"><article><b>{cataloguePaths.length}</b><span>learning pathways</span></article><article><b>{cataloguePaths.reduce((sum,item)=>sum+item.courses.length,0)}</b><span>catalogue courses</span></article><article><b>{cataloguePaths.reduce((sum,item)=>sum+item.courses.reduce((count,course)=>count+course.lessons.length,0),0)}</b><span>authored lessons</span></article></div><div className="split-workspace scroll-reveal"><div className="record-list"><div className="record-toolbar"><b>Canonical Atlas catalogue</b><button><Filter/> Filter</button></div>{cataloguePaths.map((item,i)=><button className={selected===i?"selected":""} key={item.code} onClick={()=>setSelected(i)}><span className="record-icon"><Target/></span><span><b>{item.code} · {item.title}</b><small>{item.courses.length} courses · {item.courses.reduce((sum,course)=>sum+course.lessons.length,0)} lessons</small></span><em>Published</em><ChevronRight/></button>)}</div><article className="record-inspector"><span className="today">{path.code} · SELECTED PATHWAY</span><h2>{path.title}</h2><p>{path.audience}</p><div className="path-course-stack">{path.courses.map(course=><button key={course.code} onClick={()=>notify(`${course.code} opened in the course editor`)}><span><b>{course.code} · {course.title}</b><small>{course.lessons.length} lessons</small></span><ChevronRight/></button>)}</div><button className="button button-primary" onClick={()=>notify(`${path.title} opened in the pathway editor`)}><Pencil/> Edit pathway</button></article></div></section>;
  }
  if(active in records) {
    const rows=records[active as keyof typeof records];
    return <section>{heading}<div className="split-workspace scroll-reveal"><div className="record-list"><div className="record-toolbar"><b>{rows.length} active records</b><button onClick={()=>notify(`${active} filters opened`)}><Filter/> Filter</button></div>{rows.map((r,i)=><button className={selected===i?"selected":""} key={r.title} onClick={()=>setSelected(i)}><span className="record-icon">{active==="Media"?<Image/>:<FileQuestion/>}</span><span><b>{r.title}</b><small>{r.meta}</small></span><em>{r.status}</em><ChevronRight/></button>)}</div><article className="record-inspector"><span className="today">SELECTED RECORD</span><h2>{rows[selected].title}</h2><p>{rows[selected].meta}</p><div className="inspector-stats"><span><small>Status</small><b>{rows[selected].status}</b></span><span><small>Reach & usage</small><b>{rows[selected].value}</b></span></div><div className="quality-checks"><h3>Quality and governance</h3><p><CheckCircle2/> Ownership and version history complete</p><p><CheckCircle2/> Organisation permissions configured</p><p><CheckCircle2/> Accessibility metadata checked</p></div><button className="button button-primary" onClick={()=>setEditor(rows[selected].title)}><Pencil/> Open editor</button></article></div>{modal&&(active==="Question banks"?<ContentEditor kind="Question bank" title="" onClose={()=>setModal("")} onSave={()=>{setModal("");notify("Question bank created and added to the review queue")}}/>:<ContentEditor kind="Media" title="" onClose={()=>setModal("")} onSave={()=>{setModal("");notify("Media record saved with accessibility metadata")}}/>)}{editor&&<ContentEditor kind={active==="Question banks"?"Question bank":"Media"} title={editor} onClose={()=>setEditor("")} onSave={()=>{notify(`${editor} saved as a new version`);setEditor("")}}/>}</section>;
  }
  if(active==="Assessments") return <section>{heading}<div className="assessment-board scroll-reveal"><div className="assessment-metric"><small>Active assessments</small><b>38</b><span>5 final examinations</span></div><div className="assessment-metric"><small>Average pass rate</small><b>82%</b><span>↑ 4% this quarter</span></div><div className="assessment-metric"><small>Awaiting manual grading</small><b>14</b><span>Oldest: 18 hours</span></div></div><div className="workflow-board scroll-reveal">{["Draft","Live","Needs attention"].map((col,ci)=><div key={col}><h3>{col} <span>{ci+2}</span></h3>{[
    ["Final assessment: AI for Smarter Service","20 min · 80% pass · 2 attempts"],
    ["Data clinic practical submission","Manual grade · 14 pending"],
    ["Cybersecurity module check","10 questions · 71% pass rate"]
  ].slice(ci,ci+2).map(x=><article key={x[0]}><FileQuestion/><b>{x[0]}</b><small>{x[1]}</small><button onClick={()=>setEditor(x[0])}>Manage <ArrowRight/></button></article>)}</div>)}</div>{(modal||editor)&&<AssessmentEditor title={editor} onClose={()=>{setModal("");setEditor("")}} onSave={()=>{notify(editor?"Assessment changes published":"Assessment created as draft");setModal("");setEditor("")}}/>}</section>;
  if(active==="Certificates"||active==="Gamification") return <section>{heading}<div className="credential-designer scroll-reveal">{active==="Certificates"?<div className="cms-certificate-preview"><CertificateDesign certificateId="VN-ATL-2026-07128" learnerName="Amara Okafor" courseTitle="Frontline Excellence" issued="14 June 2026" duration="2h 52m" score="80%" instructor="Bola Onifade"/></div>:<div className="credential-preview"><Trophy/><span>EXPERIENCE LEVELS</span><h2>Practitioner</h2><p>2,500–4,999 verified learning points</p><div className="mini-badges"><i>AI</i><i>7W</i><i>1st</i></div></div>}<div className="configuration-panel"><span className="today">{active==="Certificates"?"ISSUANCE RULES":"POINT INTEGRITY"}</span><h2>{active==="Certificates"?"Federal Service certificate":"Meaningful progress only"}</h2>{(active==="Certificates"?["All required lessons complete","Final score of 80% or higher","12-month validity and renewal reminder","Public verification enabled"]:["Lesson completion · 10 points","Module pass · 50 points","First-attempt pass · +30 bonus","Repeated actions earn no points"]).map(x=><label key={x}><input type="checkbox" defaultChecked/><span>{x}</span></label>)}<button className="button button-primary" onClick={()=>notify(`${active} rules saved`)}>Save configuration</button></div></div>{modal&&<QuickCreate title={`Create ${active==="Certificates"?"certificate template":"badge"}`} onClose={()=>setModal("")} onSave={()=>{setModal("");notify(`${active==="Certificates"?"Certificate template":"Badge"} saved`)}}/>}</section>;
  if(active==="Organisations"||active==="Users") return <PeopleWorkspace active={active} heading={heading} notify={notify}/>;
  if(active==="Assignments") return <AssignmentWorkspace heading={heading} notify={notify}/>;
  if(active==="Announcements") return <AnnouncementWorkspace heading={heading} notify={notify}/>;
  if(active==="Reports") return <ReportsWorkspace heading={heading} notify={notify}/>;
  return <ReviewWorkspace heading={heading} notify={notify}/>;
}

const cmsDescriptions:Record<string,string>={
  Pathways:"Build ordered programmes with prerequisites, electives and final rewards.",
  Media:"Upload, reuse and govern videos, documents, captions and transcripts.",
  "Question banks":"Create reusable, versioned questions mapped to learning objectives.",
  Assessments:"Configure quizzes, examinations and manually graded submissions.",
  Certificates:"Control verified credentials, validity, renewal and revocation.",
  Gamification:"Reward mastery, consistency and completion with transparent rules.",
  Organisations:"Manage separate workspaces, branding, access and learning policies.",
  Users:"Organise learners by department, role, group and account status.",
  Assignments:"Target learning, deadlines, reminders and recurrence precisely.",
  Announcements:"Send relevant learning communication to the right audience.",
  Reports:"Move from participation data to clear learning and compliance decisions.",
  Reviews:"Govern the Draft → Review → Approval → Publication workflow."
};
const cmsActions:Record<string,string>={
  Pathways:"Create pathway",Media:"Upload media","Question banks":"Add question",Assessments:"Create assessment",
  Certificates:"Create template",Gamification:"Create badge",Organisations:"Add organisation",Users:"Add user",
  Assignments:"Create assignment",Announcements:"New announcement",Reports:"Schedule report",Reviews:"Open review"
};

function PeopleWorkspace({active,heading,notify}:{active:string;heading:React.ReactNode;notify:(x:string)=>void}) {
  const people=[
    ["Amara Okafor","Policy Analyst · Digital Services","Active","4 assigned"],
    ["Chinedu Okafor","Team Lead · Operations","Active","3 assigned"],
    ["Nneka Eze","Finance Officer · Finance","Invited","2 assigned"],
    ["Tunde Adebayo","Security Analyst · IT","Active","5 assigned"]
  ];
  if(active==="Organisations") return <section>{heading}<div className="organisation-grid scroll-reveal">{[
    ["Federal Service Learning Directorate","FSLD-2026","2,480 learners","91% compliance","#dcd5ff"],
    ["Sterling Coast Bank","SCB-LRN","1,126 learners","87% compliance","#cceffc"],
    ["Horizon Academy","HZ-ACADEMY","684 learners","79% compliance","#d5f7d9"]
  ].map((o,i)=><article key={o[0]} style={{"--org-color":o[4]} as React.CSSProperties}><span>{o[0][0]}</span><small>{i===0?"CURRENT WORKSPACE":"CONNECTED ORGANISATION"}</small><h3>{o[0]}</h3><p>{o[1]}</p><div><b>{o[2]}</b><b>{o[3]}</b></div><button onClick={()=>notify(`${o[0]} workspace opened`)}>Manage workspace <ArrowRight/></button></article>)}</div></section>;
  return <section>{heading}<div className="people-toolbar scroll-reveal"><label className="search-box"><Search/><input placeholder="Search users, roles or departments"/></label><button><Upload/> Import CSV</button><button><Filter/> Segments</button></div><div className="people-table scroll-reveal"><div className="people-head"><span>Learner</span><span>Account</span><span>Learning</span><span>Last active</span><span/></div>{people.map((p,i)=><div key={p[0]}><span className="person-cell"><i>{p[0].split(" ").map(x=>x[0]).join("")}</i><span><b>{p[0]}</b><small>{p[1]}</small></span></span><em className={p[2]==="Active"?"active-status":""}>{p[2]}</em><span>{p[3]}</span><span>{i*11+4} min ago</span><button onClick={()=>notify(`${p[0]}'s learning record opened`)}><MoreHorizontal/></button></div>)}</div></section>;
}

function AssignmentWorkspace({heading,notify}:{heading:React.ReactNode;notify:(x:string)=>void}) {
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  const atlas=useAtlasState();
  const [courseId,setCourseId]=useState("x-03-2");
  const [audience,setAudience]=useState("Digital Services department");
  const [access,setAccess]=useState<Course["status"]>("Mandatory");
  const [due,setDue]=useState("2026-08-28");
  const audiences=[
    {name:"Digital Services department",learners:428},
    {name:"Managers role",learners:186},
    {name:"2026 Graduate Trainees",learners:92},
  ];
  const audienceRecord=audiences.find(item=>item.name===audience)||audiences[0];
  const selectedCourse=atlas.courses.find(course=>course.id===courseId)||atlas.courses[0];
  return <section>{heading}<div className="assignment-flow scroll-reveal"><div className="assignment-steps">{["Choose learning","Target audience","Rules & reminders","Review"].map((x,i)=><button className={step===i+1?"active":step>i+1?"done":""} key={x} onClick={()=>setStep(i+1)}><span>{step>i+1?<Check/>:i+1}</span><b>{x}</b></button>)}</div><div className="assignment-canvas">
    {step===1&&<><span className="today">SELECT FROM THE ATLAS CATALOGUE</span><h2>What should people learn?</h2>{atlas.courses.filter(c=>c.published).slice(0,8).map(c=><label className="assignment-option" key={c.id}><input type="radio" name="course" checked={courseId===c.id} onChange={()=>setCourseId(c.id)}/><i style={{background:c.color,color:c.accent}}>{c.art}</i><span><b>{c.title}</b><small>{c.code} · {c.curriculum.reduce((sum,module)=>sum+module.lessons.length,0)} lessons · {c.duration}</small></span></label>)}</>}
    {step===2&&<><span className="today">TARGETING</span><h2>Who should receive it?</h2>{audiences.map(item=><label className="check-option" key={item.name}><input type="radio" name="audience" checked={audience===item.name} onChange={()=>setAudience(item.name)}/><span>{item.name} · {item.learners} learners</span></label>)}<div className="reach-card"><Users/><span><small>Estimated affected users</small><b>{audienceRecord.learners} learners</b></span></div></>}
    {step===3&&<><span className="today">ASSIGNMENT RULES</span><h2>Set the learning conditions.</h2><div className="assignment-fields"><label>Access type<select value={access} onChange={event=>setAccess(event.target.value as Course["status"])}><option>Mandatory</option><option>Assigned</option><option>Recommended</option></select></label><label>Deadline<input type="date" value={due} onChange={event=>setDue(event.target.value)}/></label><label>Reminder schedule<select><option>14, 7, 3 and 1 day before</option><option>7 and 1 day before</option></select></label><label>Renewal<select><option>Repeat annually</option><option>No recurrence</option></select></label></div></>}
    {step===4&&<><span className="today">FINAL REVIEW</span><h2>Ready to assign.</h2><div className="assignment-review"><p><BookOpen/><span><small>Course</small><b>{selectedCourse.code} · {selectedCourse.title}</b></span></p><p><Users/><span><small>Audience</small><b>{audienceRecord.learners} {audience} learners</b></span></p><p><CalendarDays/><span><small>Deadline</small><b>{due?new Date(`${due}T00:00:00`).toLocaleDateString("en-NG",{day:"numeric",month:"long",year:"numeric"}):"Deadline required"} · {access}</b></span></p></div>{done&&<div className="success-banner"><CheckCircle2/><div><b>Assignment is live</b><p>Learner dashboards and notifications have been updated.</p></div></div>}</>}
    <footer><button disabled={step===1} onClick={()=>setStep(step-1)}>Back</button><button className="button button-primary" disabled={done||(step===3&&!due)||(step===4&&!due)} onClick={()=>step<4?setStep(step+1):(()=>{createAssignment({id:`asg-${Date.now()}`,courseId,audience,access,due,learners:audienceRecord.learners,createdAt:new Date().toISOString()});setDone(true);notify(`Assignment delivered to ${audienceRecord.learners} learners`)})()}>{done?"Assignment live":step===4?"Confirm assignment":"Continue"} <ArrowRight/></button></footer>
  </div></div></section>;
}

function AnnouncementWorkspace({heading,notify}:{heading:React.ReactNode;notify:(x:string)=>void}) {
  const [sent,setSent]=useState(false);
  const [audience,setAudience]=useState("Entire Federal Service workspace");
  const [title,setTitle]=useState("August learning priorities");
  const [message,setMessage]=useState("Complete your mandatory AI and cybersecurity learning before the published deadlines. Your progress is saved automatically.");
  return <section>{heading}<div className="announcement-composer scroll-reveal"><div><label>Audience<select value={audience} onChange={e=>setAudience(e.target.value)}><option>Entire Federal Service workspace</option><option>Digital Services department</option><option>New Managers cohort</option></select></label><label>Announcement title<input value={title} onChange={e=>setTitle(e.target.value)}/></label><label>Message<textarea value={message} onChange={e=>setMessage(e.target.value)}/></label><div className="composer-actions"><button className="button button-white" onClick={()=>notify("Announcement saved as draft")}>Save draft</button><button className="button button-primary" onClick={()=>{sendAnnouncement({title,message,audience});setSent(true);notify("Announcement sent and learner notifications updated")}}><Send/> Send announcement</button></div></div><aside><span className="today">LIVE PREVIEW</span><div className="announcement-preview"><Megaphone/><small>Federal Service Learning Directorate · Now</small><h3>{title}</h3><p>{message}</p>{sent&&<b><Check/> Delivered</b>}</div></aside></div></section>;
}

function ReportsWorkspace({heading,notify}:{heading:React.ReactNode;notify:(x:string)=>void}) {
  const [report,setReport]=useState("Compliance");
  return <section>{heading}<div className="report-tabs">{["Compliance","Engagement","Assessments","Certificates"].map(x=><button key={x} className={report===x?"active":""} onClick={()=>setReport(x)}>{x}</button>)}</div><div className="report-hero scroll-reveal"><div><span className="today">{report.toUpperCase()} REPORT</span><h2>{report==="Compliance"?"91% of mandatory learning is current":report==="Engagement"?"2,480 learners were active this month":report==="Assessments"?"82% average first-attempt pass rate":"146 credentials issued this month"}</h2><p>Federal Service workspace · 1 July–30 July 2026</p><button className="button button-white" onClick={()=>notify(`${report} report exported as CSV`)}><Download/> Export report</button></div><div className="report-ring"><strong>{report==="Compliance"?"91%":report==="Engagement"?"84%":report==="Assessments"?"82%":"146"}</strong><small>{report==="Certificates"?"issued":"current"}</small></div></div><div className="report-grid scroll-reveal"><article><h3>Department comparison</h3>{departments.map(d=><p key={d.name}><span>{d.name}</span><i><b style={{width:`${d.value}%`,background:d.color}}/></i><em>{d.value}%</em></p>)}</article><article><h3>Needs attention</h3><div className="risk-item"><span>77</span><p><b>Overdue learners</b><small>Highest concentration: People & Culture</small></p></div><div className="risk-item"><span>14</span><p><b>Certificates expiring</b><small>Within the next 30 days</small></p></div><div className="risk-item"><span>3</span><p><b>Difficult assessments</b><small>Pass rate below 70%</small></p></div></article></div></section>;
}

function ReviewWorkspace({heading,notify}:{heading:React.ReactNode;notify:(x:string)=>void}) {
  const [status,setStatus]=useState("In review");
  return <section>{heading}<div className="review-layout scroll-reveal"><div className="review-queue"><h3>Review queue <span>3</span></h3>{["AI for Procurement Teams","Future-Ready Manager pathway","Data Literacy final examination"].map((x,i)=><button key={x}><span>{i+1}</span><span><b>{x}</b><small>{i===0?"Submitted by David Mensah · 2h ago":"Content review · Yesterday"}</small></span><ChevronRight/></button>)}</div><article className="review-detail"><span className="today">{status.toUpperCase()}</span><h2>AI for Procurement Teams</h2><p>Version 1.0 · 5 modules · 18 lessons · Federal Service and Sterling Coast</p><div className="review-checklist">{["Learning objectives align with lessons","Assessment coverage is sufficient","Captions and transcripts are present","Certificate and access rules are valid"].map(x=><label key={x}><input type="checkbox" defaultChecked/><span>{x}</span></label>)}</div><label className="review-note">Reviewer note<textarea placeholder="Add structured feedback for the author…"/></label><div><button className="button button-white" onClick={()=>{setStatus("Changes requested");notify("Changes requested from the author")}}>Request changes</button><button className="button button-primary" onClick={()=>{setStatus("Approved");notify("Course approved for publication")}}><Check/> Approve course</button></div></article></div></section>;
}

function ContentEditor({kind,title,onClose,onSave}:{kind:"Question bank"|"Media";title:string;onClose:()=>void;onSave:()=>void}) {
  const [name,setName]=useState(title|| (kind==="Question bank"?"New catalogue knowledge bank":"New learning resource"));
  const [status,setStatus]=useState(title?"Approved":"Draft");
  const [questions,setQuestions]=useState([
    {prompt:"Which action best demonstrates responsible use of AI in a public-service decision?",objective:"Apply professional judgement",type:"Scenario · Single choice"},
    {prompt:"What should you do before sharing citizen data with an AI tool?",objective:"Protect citizen information",type:"Multiple choice"},
    {prompt:"Which evidence belongs in an AI-assisted recommendation record?",objective:"Create an audit trail",type:"Scenario · Single choice"},
  ]);
  const [selected,setSelected]=useState(0);
  const updateQuestion=(value:string)=>setQuestions(current=>current.map((q,i)=>i===selected?{...q,prompt:value}:q));
  return createPortal(<div className="modal-backdrop authoring-backdrop"><div className="content-editor-modal">
    <header><div><span className="modal-icon">{kind==="Question bank"?<FileQuestion/>:<Image/>}</span><div><small>{title?"Editing existing record":"Create governed content"}</small><b>{kind} editor</b></div></div><button onClick={onClose}><X/></button></header>
    <div className="editor-topbar"><label>Title<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Status<select value={status} onChange={e=>setStatus(e.target.value)}><option>Draft</option><option>In review</option><option>Approved</option></select></label><label>Organisation<select><option>Federal Service</option><option>All organisations</option></select></label></div>
    {kind==="Question bank"?<div className="question-workbench"><aside><div><b>{questions.length} questions</b><button onClick={()=>{setQuestions(current=>[...current,{prompt:"Untitled question",objective:"Select objective",type:"Single choice"}]);setSelected(questions.length)}}><Plus/> Add</button></div>{questions.map((q,i)=><button className={selected===i?"active":""} key={i} onClick={()=>setSelected(i)}><span>{i+1}</span><span><b>{q.prompt}</b><small>{q.objective}</small></span></button>)}</aside><main><span className="today">QUESTION {selected+1} · VERSION 1.0</span><label>Question prompt<textarea value={questions[selected]?.prompt||""} onChange={e=>updateQuestion(e.target.value)}/></label><div className="editor-grid"><label>Question type<select value={questions[selected]?.type} onChange={e=>setQuestions(current=>current.map((q,i)=>i===selected?{...q,type:e.target.value}:q))}><option>Scenario · Single choice</option><option>Multiple choice</option><option>True or false</option><option>Written response</option></select></label><label>Learning objective<select><option>{questions[selected]?.objective}</option><option>Apply professional judgement</option><option>Protect citizen information</option><option>Create an audit trail</option></select></label></div><h3>Answer options</h3>{["Escalate and record the evidence before deciding","Accept the generated answer without review","Remove the evidence from the decision record"].map((option,i)=><label className="answer-option" key={option}><input type="radio" name="correct" defaultChecked={i===0}/><input defaultValue={option}/></label>)}<button className="danger-link" onClick={()=>{setQuestions(current=>current.filter((_,i)=>i!==selected));setSelected(0)}}><Trash2/> Delete question</button></main></div>:<div className="media-editor"><div className="upload-zone"><Upload/><b>Replace or upload source file</b><p>Video, audio, PDF, SCORM or image · up to 2 GB</p><button className="button button-white">Choose file</button></div><div className="editor-grid"><label>Resource type<select><option>Video</option><option>Document</option><option>SCORM package</option></select></label><label>Language<select><option>English (Nigeria)</option><option>French</option><option>Hausa</option></select></label><label>Transcript<textarea defaultValue="A reviewed transcript is attached to this learning resource."/></label><label>Alternative text<textarea defaultValue="Facilitator explaining a decision framework on screen."/></label></div></div>}
    <footer><button className="button button-white" onClick={onClose}>Cancel</button><span>Autosaved just now</span><button className="button button-primary" disabled={!name.trim()||!questions.length} onClick={onSave}>{status==="Approved"?"Save new version":"Save draft"}</button></footer>
  </div></div>,document.body);
}

function AssessmentEditor({title,onClose,onSave}:{title:string;onClose:()=>void;onSave:()=>void}) {
  const [name,setName]=useState(title||"New catalogue assessment");
  const [type,setType]=useState("Knowledge check");
  const [passMark,setPassMark]=useState(80);
  const [attempts,setAttempts]=useState(2);
  const [randomise,setRandomise]=useState(true);
  const [step,setStep]=useState(1);
  return createPortal(<div className="modal-backdrop authoring-backdrop"><div className="quick-modal assessment-editor-modal"><header><div><span className="modal-icon"><ShieldCheck/></span><div><small>Assessment workflow · Step {step} of 3</small><h2>{title?"Manage assessment":"Create assessment"}</h2></div></div><button onClick={onClose}><X/></button></header><div className="mini-stepper">{["Setup","Question source","Delivery"].map((label,i)=><button className={step===i+1?"active":step>i+1?"done":""} onClick={()=>setStep(i+1)} key={label}><span>{step>i+1?<Check/>:i+1}</span>{label}</button>)}</div><div className="assessment-editor-body">
    {step===1&&<div className="form-grid"><label className="wide">Assessment title<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Type<select value={type} onChange={e=>setType(e.target.value)}><option>Knowledge check</option><option>Final examination</option><option>Practical submission</option></select></label><label>Linked course<select><option>AI for Smarter Public Service</option><option>Data Literacy Essentials</option><option>Cybersecurity Starts With You</option></select></label></div>}
    {step===2&&<><h3>Build from a governed question bank</h3><label className="source-card"><input type="radio" defaultChecked/><FileQuestion/><span><b>Responsible AI foundations</b><small>48 approved questions · 6 objectives</small></span></label><label className="source-card"><input type="radio"/><FileQuestion/><span><b>Data literacy scenarios</b><small>32 questions · Intermediate</small></span></label><label>Questions presented<input type="number" min="1" defaultValue="10"/></label></>}
    {step===3&&<div className="assessment-settings"><label>Pass mark<input type="number" value={passMark} onChange={e=>setPassMark(+e.target.value)}/></label><label>Attempts<input type="number" value={attempts} onChange={e=>setAttempts(+e.target.value)}/></label><label>Time limit<select><option>20 minutes</option><option>30 minutes</option><option>No limit</option></select></label><button className="toggle-row interactive-toggle" onClick={()=>setRandomise(v=>!v)}><div><b>Randomise questions</b><small>Each learner receives a different valid sequence</small></div><i className={`switch ${randomise?"on":""}`}/></button></div>}
  </div><footer><button className="button button-white" onClick={step===1?onClose:()=>setStep(step-1)}>{step===1?"Cancel":"Back"}</button><button className="button button-primary" disabled={!name.trim()} onClick={step===3?onSave:()=>setStep(step+1)}>{step===3?"Save assessment":"Continue"} <ArrowRight/></button></footer></div></div>,document.body);
}

function QuickCreate({title,onClose,onSave}:{title:string;onClose:()=>void;onSave:()=>void}) {
  return <div className="modal-backdrop"><div className="quick-modal"><header><div><span className="modal-icon"><Plus/></span><h2>{title}</h2></div><button onClick={onClose}><X/></button></header><div><label>Title<input autoFocus placeholder={`Enter ${title.toLowerCase()} title`}/></label><label>Description<textarea placeholder="Add clear purpose and ownership details"/></label><label>Organisation access<select><option>Federal Service workspace</option><option>All organisations</option><option>Selected organisations</option></select></label></div><footer><button className="button button-white" onClick={onClose}>Cancel</button><button className="button button-primary" onClick={onSave}>Save draft</button></footer></div></div>;
}

function CourseRow({course,custom,onManage}:{course?:AtlasCourse;custom?:boolean;onManage?:()=>void}) {
  const c=course||{title:"Service Design for Everyone",category:"Public Service",color:"#d5f7d9",accent:"#238d4c",art:"✺",status:"Available",progress:0,duration:"3h",modules:5,id:"new"};
  return <div className="table-row clickable-course-row" onClick={onManage} role="button" tabIndex={0} onKeyDown={event=>{if(event.key==="Enter")onManage?.()}}><span className="table-course"><i style={{background:c.color,color:c.accent}}>{c.art}</i><span><b>{c.title}</b><small>{course?.code||"PUB-03.3"} · {c.category} · {c.modules} modules</small></span></span><span><em className={`publish-status ${course?.published||custom?"fresh":""}`}>● {course?.published||custom?"Published":"Draft"}</em></span><span>{course?.organisation||"Federal Service"}</span><span>{course?.learners.toLocaleString()||"428"}</span><span><b>{c.progress ? `${c.progress}%` : "—"}</b></span><span>Today</span><button aria-label={`Manage ${c.title}`} onClick={event=>{event.stopPropagation();onManage?.()}}><MoreHorizontal size={17}/></button></div>;
}

function LegacyCourseModal({onClose,onPublish}:{onClose:()=>void;onPublish:(course:AtlasCourse)=>void}) {
  const [step,setStep]=useState(1);
  const [courseId]=useState(()=>`catalogue-${Date.now()}`);
  const [title,setTitle]=useState("Service Design for Everyone");
  const [description,setDescription]=useState("Learn a practical, human-centred approach to designing better public services.");
  const [category,setCategory]=useState("Public Service");
  const [difficulty,setDifficulty]=useState<AtlasCourse["level"]>("Foundation");
  const steps=["Basics","Curriculum","Assessment","Access","Publish"];
  const course:AtlasCourse={id:courseId,code:`CUSTOM-${courseId.slice(-4)}`,title,description,category,level:difficulty,collection:"Public sector",color:"#d5f7d9",accent:"#238d4c",progress:0,duration:"1h 37m",modules:2,status:"Available",art:"✺",instructor:"David Mensah",organisation:"Federal Service",published:true,learners:428,pathCode:"PUB-08",pathTitle:"Digital Government & E-Governance",audience:"L2 · Public servants designing and delivering digital services",curriculum:[
    {code:"CUSTOM-1",title:"Seeing services through human eyes",lessons:[{code:"CUSTOM-1.1",title:"Services are lived experiences"},{code:"CUSTOM-1.2",title:"Researching citizen needs"},{code:"CUSTOM-1.3",title:"Define the service outcome"}]},
    {code:"CUSTOM-2",title:"Mapping the citizen experience",lessons:[{code:"CUSTOM-2.1",title:"Map moments that matter"},{code:"CUSTOM-2.2",title:"Find service failure points"},{code:"CUSTOM-2.3",title:"Prototype a better journey"},{code:"CUSTOM-2.4",title:"Measure the improvement"}]},
  ],lifecycle:"Published",updatedAt:"2026-07-30"};
  return <div className="modal-backdrop"><div className="course-modal">
    <header><div><span className="modal-icon"><BookOpen/></span><div><small>New course</small><b>{title}</b></div></div><button onClick={onClose}><X/></button></header>
    <div className="stepper">{steps.map((s,i)=><button key={s} className={step===i+1?"active":step>i+1?"done":""} onClick={()=>setStep(i+1)}><span>{step>i+1?<Check size={14}/>:i+1}</span>{s}</button>)}</div>
    <div className="modal-body">
      {step===1&&<><span className="kicker">Course details</span><h2>Give your course a clear identity.</h2><div className="form-grid"><label className="wide">Course title<input value={title} onChange={e=>setTitle(e.target.value)}/></label><label className="wide">Short description<textarea value={description} onChange={e=>setDescription(e.target.value)}/></label><label>Primary category<select value={category} onChange={e=>setCategory(e.target.value)}><option>Public Service</option><option>Leadership</option><option>Customer Experience</option><option>Data & Analytics</option></select></label><label>Difficulty<select value={difficulty} onChange={e=>setDifficulty(e.target.value as AtlasCourse["level"])}><option>Foundation</option><option>Intermediate</option><option>Advanced</option></select></label></div></>}
      {step===2&&<><span className="kicker">Curriculum builder</span><h2>Shape the learning journey.</h2><div className="module-builder"><article><span>1</span><div><b>Seeing services through human eyes</b><small>3 lessons · 42 min</small></div><MoreHorizontal/></article><article><span>2</span><div><b>Mapping the citizen experience</b><small>4 lessons · 55 min</small></div><MoreHorizontal/></article><button><Plus/> Add module</button></div></>}
      {step===3&&<><span className="kicker">Assessment</span><h2>Check for real understanding.</h2><div className="assessment-card"><ShieldCheck/><div><b>Final knowledge check</b><p>10 questions · 80% pass mark · 2 attempts</p></div><button>Edit</button></div><div className="toggle-row"><div><b>Require a final assessment</b><small>Learners must pass before completing the course</small></div><i className="switch on"/></div></>}
      {step===4&&<><span className="kicker">Organisation access</span><h2>Put it in the right hands.</h2><div className="access-box"><label><input type="checkbox" defaultChecked/><span className="workspace-logo">F</span><span><b>Federal Service</b><small>2,480 learners</small></span></label><div className="access-options"><span><b>Audience</b><small>Digital Services department</small></span><span><b>Access type</b><small>Available</small></span><span><b>Estimated reach</b><small>428 learners</small></span></div></div></>}
      {step===5&&<div className="publish-ready"><span><CheckCircle2/></span><h2>Ready to meet your learners.</h2><p>Atlas checked the course structure, completion rules and organisation access. Everything looks good.</p><div><span><b>5 modules</b><small>Course structure</small></span><span><b>80%</b><small>Pass mark</small></span><span><b>428</b><small>Learners</small></span></div></div>}
    </div>
    <footer><button className="button button-white" onClick={step===1?onClose:()=>setStep(step-1)}>{step===1?"Save as draft":"Back"}</button><button className="button button-primary" onClick={step===5?()=>onPublish(course):()=>setStep(step+1)}>{step===5?"Publish course":"Continue"} <ArrowRight size={16}/></button></footer>
  </div></div>;
}

function CourseModal({onClose,onSaveDraft,onPublish}:{onClose:()=>void;onSaveDraft:(course:AtlasCourse)=>void;onPublish:(course:AtlasCourse)=>void}) {
  const [step,setStep]=useState(1);
  const [courseId]=useState(()=>`catalogue-${Date.now()}`);
  const [title,setTitle]=useState("Service Design for Everyone");
  const [description,setDescription]=useState("Learn a practical, human-centred approach to designing better public services.");
  const [category,setCategory]=useState("Public Service");
  const [difficulty,setDifficulty]=useState<AtlasCourse["level"]>("Foundation");
  const [modules,setModules]=useState([
    {code:"CUSTOM-1",title:"Seeing services through human eyes",lessons:[{code:"CUSTOM-1.1",title:"Services are lived experiences"},{code:"CUSTOM-1.2",title:"Researching citizen needs"},{code:"CUSTOM-1.3",title:"Define the service outcome"}]},
    {code:"CUSTOM-2",title:"Mapping the citizen experience",lessons:[{code:"CUSTOM-2.1",title:"Map moments that matter"},{code:"CUSTOM-2.2",title:"Prototype a better journey"}]},
  ]);
  const [assessment,setAssessment]=useState({required:true,questions:10,passMark:80,attempts:2});
  const [editingAssessment,setEditingAssessment]=useState(false);
  const [audience,setAudience]=useState("Digital Services department");
  const [access,setAccess]=useState("Available");
  const [organisation,setOrganisation]=useState(true);
  const [error,setError]=useState("");
  const steps=["Basics","Curriculum","Assessment","Access","Publish"];
  const lessonCount=modules.reduce((sum,module)=>sum+module.lessons.length,0);
  const reach=audience==="Entire Federal Service"?2480:audience==="New managers cohort"?164:428;
  const makeCourse=(published:boolean):AtlasCourse=>({id:courseId,code:`CUSTOM-${courseId.slice(-4)}`,title,description,category,level:difficulty,collection:"Public sector",color:"#d5f7d9",accent:"#238d4c",progress:0,duration:`${Math.max(1,Math.round(lessonCount*.22))}h`,modules:modules.length,status:access as AtlasCourse["status"],art:"✺",instructor:"David Mensah",organisation:"Federal Service",published,learners:reach,pathCode:"PUB-08",pathTitle:"Digital Government & E-Governance",audience,curriculum:modules,lifecycle:published?"Published":"Draft",updatedAt:new Date().toISOString().slice(0,10)});
  const next=()=>{if(step===1&&(!title.trim()||!description.trim()))return setError("Add a title and a useful description before continuing.");if(step===2&&(!modules.length||!lessonCount))return setError("Add at least one module and one lesson.");if(step===4&&!organisation)return setError("Select at least one organisation.");setError("");setStep(Math.min(5,step+1))};
  const addModule=()=>setModules(current=>[...current,{code:`CUSTOM-${current.length+1}`,title:`New module ${current.length+1}`,lessons:[]}]);
  const updateModule=(index:number,value:string)=>setModules(current=>current.map((item,i)=>i===index?{...item,title:value}:item));
  const addLesson=(index:number)=>setModules(current=>current.map((item,i)=>i===index?{...item,lessons:[...item.lessons,{code:`${item.code}.${item.lessons.length+1}`,title:`New lesson ${item.lessons.length+1}`}]}:item));
  const updateLesson=(mi:number,li:number,value:string)=>setModules(current=>current.map((item,i)=>i===mi?{...item,lessons:item.lessons.map((lesson,j)=>j===li?{...lesson,title:value}:lesson)}:item));
  return <div className="modal-backdrop"><div className="course-modal enhanced-course-modal">
    <header><div><span className="modal-icon"><BookOpen/></span><div><small>{step===5?"Publication review":"Guided course builder"}</small><b>{title||"Untitled course"}</b></div></div><button aria-label="Close builder" onClick={onClose}><X/></button></header>
    <div className="stepper">{steps.map((label,index)=><button key={label} className={step===index+1?"active":step>index+1?"done":""} onClick={()=>setStep(index+1)}><span>{step>index+1?<Check size={14}/>:index+1}</span>{label}</button>)}</div>
    <div className="modal-body">
      {error&&<div className="builder-error">{error}</div>}
      {step===1&&<><span className="kicker">Course details</span><h2>Give your course a clear identity.</h2><p className="builder-help">These details become the catalogue card, learner overview and search metadata.</p><div className="form-grid"><label className="wide">Course title<input value={title} onChange={e=>setTitle(e.target.value)}/></label><label className="wide">Short description<textarea value={description} onChange={e=>setDescription(e.target.value)}/></label><label>Primary category<select value={category} onChange={e=>setCategory(e.target.value)}><option>Public Service</option><option>Leadership</option><option>Customer Experience</option><option>Data & Analytics</option><option>AI & Emerging Technology</option></select></label><label>Difficulty<select value={difficulty} onChange={e=>setDifficulty(e.target.value as AtlasCourse["level"])}><option>Foundation</option><option>Intermediate</option><option>Advanced</option></select></label></div></>}
      {step===2&&<><span className="kicker">Curriculum builder</span><h2>Shape the learning journey.</h2><p className="builder-help">{modules.length} modules · {lessonCount} lessons. Edit titles inline and build the sequence learners will follow.</p><div className="module-builder live-builder">{modules.map((module,mi)=><article key={module.code}><span>{mi+1}</span><div><input aria-label={`Module ${mi+1} title`} value={module.title} onChange={e=>updateModule(mi,e.target.value)}/><small>{module.lessons.length} lessons</small><div className="lesson-editor">{module.lessons.map((lesson,li)=><label key={lesson.code}><em>{li+1}</em><input value={lesson.title} onChange={e=>updateLesson(mi,li,e.target.value)}/><button aria-label="Remove lesson" onClick={()=>setModules(current=>current.map((item,i)=>i===mi?{...item,lessons:item.lessons.filter((_,j)=>j!==li)}:item))}><X size={14}/></button></label>)}<button onClick={()=>addLesson(mi)}><Plus size={15}/> Add lesson</button></div></div><button aria-label="Remove module" onClick={()=>setModules(current=>current.filter((_,i)=>i!==mi))}><Trash2 size={17}/></button></article>)}<button onClick={addModule}><Plus/> Add module</button></div></>}
      {step===3&&<><span className="kicker">Assessment</span><h2>Check for real understanding.</h2><div className="assessment-card"><ShieldCheck/><div><b>Final knowledge check</b><p>{assessment.questions} questions · {assessment.passMark}% pass mark · {assessment.attempts} attempts</p></div><button onClick={()=>setEditingAssessment(value=>!value)}>{editingAssessment?"Done":"Edit"}</button></div>{editingAssessment&&<div className="assessment-settings"><label>Questions<input type="number" min="1" value={assessment.questions} onChange={e=>setAssessment({...assessment,questions:+e.target.value})}/></label><label>Pass mark<input type="number" min="1" max="100" value={assessment.passMark} onChange={e=>setAssessment({...assessment,passMark:+e.target.value})}/></label><label>Attempts<input type="number" min="1" value={assessment.attempts} onChange={e=>setAssessment({...assessment,attempts:+e.target.value})}/></label><label>Question source<select><option>Responsible AI foundations</option><option>Data literacy scenarios</option><option>Create a new question bank</option></select></label></div>}<button className="toggle-row interactive-toggle" onClick={()=>setAssessment({...assessment,required:!assessment.required})}><div><b>Require a final assessment</b><small>Learners must pass before completing the course</small></div><i className={`switch ${assessment.required?"on":""}`}/></button></>}
      {step===4&&<><span className="kicker">Organisation access</span><h2>Put it in the right hands.</h2><div className="access-box"><label><input type="checkbox" checked={organisation} onChange={e=>setOrganisation(e.target.checked)}/><span className="workspace-logo">F</span><span><b>Federal Service</b><small>2,480 learners</small></span></label><div className="access-options"><label><b>Audience</b><select value={audience} onChange={e=>setAudience(e.target.value)}><option>Digital Services department</option><option>New managers cohort</option><option>Entire Federal Service</option></select></label><label><b>Access type</b><select value={access} onChange={e=>setAccess(e.target.value)}><option>Available</option><option>Assigned</option><option>Mandatory</option></select></label><span><b>Estimated reach</b><small>{reach.toLocaleString()} learners</small></span></div></div></>}
      {step===5&&<div className="publish-ready"><span><CheckCircle2/></span><h2>Ready to meet your learners.</h2><p>Atlas checked the structure, assessment rules and organisation access. Publishing adds this course to the LMS catalogue immediately.</p><div><span><b>{modules.length} modules</b><small>{lessonCount} lessons</small></span><span><b>{assessment.required?`${assessment.passMark}%`:"Optional"}</b><small>Assessment rule</small></span><span><b>{reach.toLocaleString()}</b><small>Learner reach</small></span></div></div>}
    </div>
    <footer><div><button className="button button-white" onClick={()=>onSaveDraft(makeCourse(false))}>Save draft</button>{step>1&&<button className="button builder-back" onClick={()=>setStep(step-1)}>Back</button>}</div><button className="button button-primary" onClick={step===5?()=>onPublish(makeCourse(true)):next}>{step===5?"Publish course":"Continue"} <ArrowRight size={16}/></button></footer>
  </div></div>;
}
