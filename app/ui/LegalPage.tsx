"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, FileCheck2, Mail, MapPin, Scale, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type LegalSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

type LegalPageProps = {
  kind: "Privacy Policy" | "Terms of Service";
  title: string;
  intro: string;
  summary: string;
  sections: LegalSection[];
};

const Logo = () => <span className="legal-logo" aria-hidden="true"><i/><i/><i/></span>;

export function LegalPage({ kind, title, intro, summary, sections }: LegalPageProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".legal-hero-copy > *", {
        y: 24,
        autoAlpha: 0,
        duration: .7,
        stagger: .08,
        ease: "power3.out",
      });
      ScrollTrigger.batch(".legal-section", {
        start: "clamp(top 88%)",
        once: true,
        onEnter: batch => gsap.fromTo(batch, { y: 28, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: .65,
          stagger: .07,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }),
      });
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, { scope: root });

  const otherHref = kind === "Privacy Policy" ? "/terms" : "/privacy";
  const otherLabel = kind === "Privacy Policy" ? "Terms of Service" : "Privacy Policy";

  return <main className="legal-page" ref={root}>
    <header className="legal-nav">
      <Link href="/" className="legal-brand"><Logo/><span>Von Newman <b>Atlas</b></span></Link>
      <nav aria-label="Legal navigation"><Link href="/">Home</Link><Link href="/contact">Contact</Link><Link href={otherHref}>{otherLabel}</Link><Link className="legal-nav-cta" href="/auth">Sign in <ArrowRight/></Link></nav>
    </header>

    <section className="legal-hero">
      <div className="legal-hero-orb" aria-hidden="true"><ShieldCheck/></div>
      <div className="legal-hero-copy">
        <Link href="/" className="legal-back"><ArrowLeft/> Back to Atlas</Link>
        <span className="legal-kicker">{kind} · Nigeria</span>
        <h1>{title}</h1>
        <p>{intro}</p>
        <div className="legal-meta"><span><FileCheck2/> Effective 4 August 2026</span><span><Scale/> Governed by Nigerian law</span></div>
      </div>
    </section>

    <section className="legal-snapshot" aria-label="Policy summary">
      <div><ShieldCheck/><span><b>Nigeria-only edition</b><small>Written for Atlas services offered in Nigeria.</small></span></div>
      <p>{summary}</p>
      <a href="mailto:info@vonnewmanconsulting.com"><Mail/> Ask a question</a>
    </section>

    <div className="legal-layout">
      <aside className="legal-toc">
        <span>On this page</span>
        <nav>{sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><i>{String(index + 1).padStart(2, "0")}</i>{section.title}</a>)}</nav>
      </aside>

      <article className="legal-document">
        {sections.map((section, index) => <section className="legal-section" id={section.id} key={section.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h2>{section.title}</h2>
          <div>{section.body}</div>
        </section>)}

        <section className="legal-contact legal-section" id="contact">
          <span>Contact</span><h2>Talk to Von Newman</h2>
          <p>Questions, formal notices and privacy requests can be sent to our team using the details below.</p>
          <div className="legal-contact-grid">
            <div><Building2/><span><b>Von Newman Technology Consultant Limited</b><small>Operator of the Atlas platform</small></span></div>
            <div><MapPin/><span><b>No. 3 Jasmine Road, Ikota</b><small>Ikota GRA–Lekki, Lagos, Nigeria</small></span></div>
            <a href="mailto:info@vonnewmanconsulting.com"><Mail/><span><b>info@vonnewmanconsulting.com</b><small>Email our legal and privacy team</small></span></a>
          </div>
        </section>
      </article>
    </div>

    <footer className="legal-footer"><div><Logo/><span>Von Newman <b>Atlas</b></span></div><p>Learning infrastructure for people and organisations that want to move forward.</p><nav><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/security">Security</Link><Link href="/accessibility">Accessibility</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav><small>© 2026 Von Newman Technology Consultant Limited.</small></footer>
  </main>;
}
