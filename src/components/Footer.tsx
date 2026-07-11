import Link from "next/link";
import { Code2, Mail, ArrowUpRight } from "lucide-react";
import LinkedInIcon from "./icons/LinkedInIcon";
import type { SiteSettings } from "@/types";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Footer({ contact }: { contact: SiteSettings["contact"] }) {
  const linkedinUrl = contact.linkedin || "https://www.linkedin.com";

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-display font-bold text-2xl text-[var(--text-primary)]">
              Pruthviraj<span className="accent-text">.</span>
            </p>
            <p className="text-sm text-[var(--text-muted)] mt-3 leading-relaxed max-w-xs">
              Physics researcher &amp; developer building at the intersection of materials science and software.
            </p>
          </div>

          <div>
            <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[var(--text-secondary)] hover:accent-text transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}

            </ul>
          </div>

          <div>
            <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">Connect</p>
            <div className="flex gap-3">
              <a
                href={`mailto:${contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:accent-text transition-all"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:accent-text transition-all"
              >
                <Code2 size={16} />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:accent-text transition-all"
              >
                <LinkedInIcon size={16} />
              </a>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-1 mt-5 text-sm accent-text hover:gap-2 transition-all"
            >
              {contact.email} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="divider-line mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono-label">
            &copy; {new Date().getFullYear()} Pruthviraj B. All rights reserved.
          </p>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:accent-text transition-colors"
          >
            <LinkedInIcon size={18} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
