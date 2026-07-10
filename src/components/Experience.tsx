"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Experience as ExperienceType } from "@/types";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";

function ExperienceItem({ exp, index }: { exp: ExperienceType; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Panel hover={false} className="overflow-hidden">
      <button
        className="w-full text-left p-6 md:p-7 flex gap-6 items-start"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-mono-label text-xs text-[var(--text-muted)] w-8 shrink-0 pt-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display font-semibold text-[var(--text-primary)] text-lg">
                {exp.role}
              </h3>
              <p className="text-[var(--text-muted)] text-sm mt-0.5">{exp.company}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="tag tag-accent">{exp.category}</span>
              <span className="font-mono-label text-xs text-[var(--text-muted)] hidden sm:block">
                {exp.timeline}
              </span>
            </div>
          </div>
          <p className="font-mono-label text-xs text-[var(--text-muted)] mt-2 sm:hidden">
            {exp.timeline}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`text-[var(--text-muted)] shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-7 pb-7 pl-14 md:pl-[4.5rem] border-t border-[var(--border-subtle)]">
              <ul className="space-y-2.5 mt-5 mb-5">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)] leading-relaxed flex gap-3">
                    <span className="accent-text font-mono-label text-xs mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  );
}

export default function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <section id="experience" className="py-28 border-t border-[var(--border)] bg-[var(--bg-muted)]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          number="02 — Experience"
          title="Professional journey"
          subtitle="Click each role to explore responsibilities and technologies."
        />

        <div className="space-y-3">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ExperienceItem exp={exp} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
