import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
const Facebook = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"/></svg>;
const Instagram = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>;
const Linkedin = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M5.3 8.1H2.1V21h3.2V8.1zM3.7 2A1.86 1.86 0 1 0 3.7 5.7 1.86 1.86 0 0 0 3.7 2zM21.9 13.6c0-3.9-2.1-5.7-4.9-5.7-2.3 0-3.3 1.2-3.8 2.1V8.1H10V21h3.2v-6.4c0-1.7.3-3.4 2.5-3.4s2.2 2 2.2 3.5V21h3.2l.8-7.4z"/></svg>;
const socialLinks = [
  { label: 'Facebook', href: siteConfig.socials.facebook || 'https://www.facebook.com/', Icon: Facebook },
  { label: 'Instagram', href: siteConfig.socials.instagram || 'https://www.instagram.com/', Icon: Instagram },
  { label: 'LinkedIn', href: siteConfig.socials.linkedin || 'https://www.linkedin.com/', Icon: Linkedin }
];
export default function Header(){ const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); useEffect(()=>{const f=()=>setScrolled(scrollY>30);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]); return <header className={`header ${scrolled?'is-scrolled':''}`}><Link to="/" className="brand" aria-label="Graham Sutherland home"><img src="/images/graham-sutherland-logo.png" alt="Graham Sutherland"/></Link><nav className={open?'open':''} aria-label="Primary navigation">{siteConfig.navigation.map(n=><NavLink onClick={()=>setOpen(false)} key={n.to} to={n.to}>{n.label}</NavLink>)}<div className="mobile-social">{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon/></a>)}</div></nav><div className="header-social">{socialLinks.map(({label,href,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon/></a>)}</div><button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open?<X/>:<Menu/>}</button></header> }
