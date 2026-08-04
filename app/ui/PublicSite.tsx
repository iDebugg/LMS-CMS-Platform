"use client";

import Link from "next/link";
import { ArrowRight, Check, Mail, MapPin, Menu, Phone, ShieldCheck, Sparkles, X } from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";

export type PublicFeature = { title: string; body: string; icon?: ReactNode };
export type PublicPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  accent?: "purple" | "mint" | "blue" | "yellow" | "pink";
  features: PublicFeature[];
  statement?: { title: string; body: string; points: string[] };
  cta?: { title: string; body: string };
};

function Mark() { return <span className="public-mark" aria-hidden="true"><i/><i/><i/></span>; }

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link href="/" className="site-brand"><Mark/><span>Von Newman <b>Atlas</b></span></Link>
    <nav id="public-navigation" className={open ? "open" : ""} aria-label="Primary navigation">
      <Link href="/platform">Platform</Link><Link href="/lms">LMS</Link><Link href="/organisations">Organisations</Link><Link href="/catalogue">Catalogue</Link><Link href="/about">Company</Link>
    </nav>
    <div className="site-header-actions"><Link href="/auth">Sign in</Link><Link className="site-pill" href="/contact">Request a demo <ArrowRight/></Link></div>
    <button className="site-menu" type="button" aria-expanded={open} aria-controls="public-navigation" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
  </header>;
}

export function PublicFooter() {
  return <footer className="site-footer">
    <div className="site-footer-intro"><Link href="/" className="site-brand"><Mark/><span>Von Newman <b>Atlas</b></span></Link><p>Learning infrastructure for Nigerian organisations and the people moving them forward.</p></div>
    <div><b>Product</b><Link href="/platform">Platform</Link><Link href="/lms">Learning experience</Link><Link href="/organisations">For organisations</Link><Link href="/catalogue">Course catalogue</Link></div>
    <div><b>Company</b><Link href="/about">About Von Newman</Link><Link href="/security">Security</Link><Link href="/accessibility">Accessibility</Link><Link href="/support">Support</Link></div>
    <div><b>Contact</b><a href="mailto:info@vonnewmanconsulting.com">info@vonnewmanconsulting.com</a><span>No. 3 Jasmine Road, Ikota<br/>Ikota GRA–Lekki, Lagos, Nigeria</span><Link href="/contact">Request a demo</Link></div>
    <small>© 2026 Von Newman Technology Consultant Limited.</small><nav><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Service</Link></nav>
  </footer>;
}

export function PublicPage({ data, children }: { data: PublicPageData; children?: ReactNode }) {
  return <div className={`public-site accent-${data.accent || "purple"}`}><a className="skip-link" href="#main-content">Skip to main content</a><PublicHeader/><main id="main-content">
    <section className="public-hero"><div><span><Sparkles/> {data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p><div><Link className="site-pill dark" href="/contact">Request a demo <ArrowRight/></Link><Link className="site-text-link" href="/catalogue">Explore the catalogue <ArrowRight/></Link></div></div><aside aria-hidden="true"><i/><i/><strong>Atlas</strong><small>Learning, beautifully connected.</small></aside></section>
    <section className="public-feature-grid">{data.features.map((feature, index) => <article key={feature.title}><span>{feature.icon || String(index + 1).padStart(2, "0")}</span><h2>{feature.title}</h2><p>{feature.body}</p></article>)}</section>
    {data.statement && <section className="public-statement"><div><span>Why it matters</span><h2>{data.statement.title}</h2><p>{data.statement.body}</p></div><ul>{data.statement.points.map(point => <li key={point}><Check/>{point}</li>)}</ul></section>}
    {children}
    <section className="public-final"><span>Von Newman Atlas</span><h2>{data.cta?.title || "Make learning visible, useful and trusted."}</h2><p>{data.cta?.body || "See how Atlas can support your organisation’s learning goals."}</p><Link className="site-pill light" href="/contact">Talk to our team <ArrowRight/></Link></section>
  </main><PublicFooter/></div>;
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return <div className="public-site accent-pink"><a className="skip-link" href="#main-content">Skip to main content</a><PublicHeader/><main id="main-content"><section className="contact-layout"><div><span className="page-kicker">Contact Von Newman</span><h1>Let’s design a better learning experience.</h1><p>Tell us about your organisation, workforce and learning goals. We’ll respond with the right next step for Atlas.</p><div className="contact-details"><a href="mailto:info@vonnewmanconsulting.com"><Mail/><span><b>Email</b>info@vonnewmanconsulting.com</span></a><div><MapPin/><span><b>Visit</b>No. 3 Jasmine Road, Ikota<br/>Ikota GRA–Lekki, Lagos, Nigeria</span></div><div><Phone/><span><b>Response</b>Our team normally responds within two business days.</span></div></div></div>{sent ? <section className="contact-success"><ShieldCheck/><h2>Thank you. Your request is ready for our team.</h2><p>For this prototype the request is confirmed locally. Production will deliver it securely to Von Newman’s enquiry workflow.</p><Link className="site-pill dark" href="/">Return home <ArrowRight/></Link></section> : <form onSubmit={submit}><h2>Request an Atlas demo</h2><p>Fields marked * are required.</p><label>Full name *<input required name="name" autoComplete="name"/></label><label>Work email *<input required type="email" name="email" autoComplete="email"/></label><label>Organisation *<input required name="organisation" autoComplete="organization"/></label><div><label>Organisation type<select name="type"><option>Public-sector organisation</option><option>Private company</option><option>Professional academy</option><option>Non-profit organisation</option><option>Other</option></select></label><label>Workforce size<select name="size"><option>Under 100</option><option>100–499</option><option>500–1,999</option><option>2,000+</option></select></label></div><label>What would you like to achieve? *<textarea required name="message" rows={5}/></label><label className="consent"><input type="checkbox" required/><span>I agree that Von Newman may use these details to respond to this enquiry. See the <Link href="/privacy">Privacy Policy</Link>.</span></label><button className="site-pill dark" type="submit">Send demo request <ArrowRight/></button></form>}</section></main><PublicFooter/></div>;
}
