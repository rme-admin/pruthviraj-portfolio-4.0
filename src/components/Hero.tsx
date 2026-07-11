"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin, FlaskConical } from "lucide-react";
import type { SiteSettings } from "@/types";
import HydrogenAnimation from "./HydrogenAnimation";

interface HeroProps {
  hero: SiteSettings["hero"];
  contact: SiteSettings["contact"];
}

function AnimatedName({ name }: { name: string }) {
  const letters = name.split("");
  const lastCharIndex = letters.reduce(
    (acc, char, i) => (char.trim() ? i : acc),
    letters.length - 1
  );
  const cursorDelay = 0.3 + lastCharIndex * 0.07 + 0.45;

  return (
    <h1
      className="font-display font-extrabold tracking-tight text-[clamp(1.75rem,4.5vw,3.25rem)] leading-none"
      aria-label={name}
    >
      {letters.map((char, i) => {
        const letter = (
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.4,
              delay: 0.3 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block text-[var(--text-primary)]"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );

        if (i === lastCharIndex) {
          return (
            <span key={`${char}-${i}`} className="inline-flex items-baseline gap-[0.15em]">
              {letter}
              <span
                className="inline-block w-[0.6em] h-[5px] relative top-[0.32em] bg-[var(--accent)] cursor-blink-under rounded-full shrink-0"
                style={{ animationDelay: `${cursorDelay}s` }}
                aria-hidden="true"
              />
            </span>
          );
        }

        return (
          <span key={`${char}-${i}`} className="inline-block">
            {letter}
          </span>
        );
      })}
    </h1>
  );
}

export default function Hero({ hero, contact }: HeroProps) {
  const stats = hero.stats?.length ? hero.stats : [
    { val: "5+", label: "Projects" },
    { val: "4+", label: "Years" },
    { val: "2", label: "Domains" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Hydrogen particle network animation */}
      <HydrogenAnimation />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent-glow)] to-transparent opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-mono-label text-xs text-[var(--text-muted)] uppercase tracking-widest">
                {hero.badge}
              </span>
            </div>

            <AnimatedName name={hero.name} />

            <p className="mt-8 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed font-light">
              {hero.tagline}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a href="/docs/resume.pdf" className="btn-ghost">
                <Download size={16} />
                Resume  
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="panel p-6 space-y-6 backdrop-blur-sm bg-[var(--bg-elevated)]/80">
              <div>
                <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  Focus Area
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                  <FlaskConical size={15} className="accent-text shrink-0" />
                  {hero.focusArea || "Materials Science & Clean Energy"}
                </div>
              </div>

              <div className="h-px bg-[var(--border)]" />

              <div>
                <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  Location
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                  <MapPin size={15} className="accent-text shrink-0" />
                  {contact.location}
                </div>
              </div>

              <div className="h-px bg-[var(--border)]" />

              <div>
                <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  Status
                </p>
                <p className="text-sm text-[var(--text-primary)]">
                  {hero.status || "MSc Physics — MIT Manipal"}
                </p>
                {hero.statusNote && (
                  <p className="text-xs text-[var(--accent)] mt-1">{hero.statusNote}</p>
                )}
              </div>

              <div className="h-px bg-[var(--border)]" />

              <div className="grid grid-cols-3 gap-4 pt-1">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-bold text-[var(--text-primary)]">{s.val}</p>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="inline-flex items-center gap-2 mt-16 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
        >
          <span className="font-mono-label text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
