"use client";

import { motion } from "framer-motion";
import type { Education as EducationType } from "@/types";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";

export default function Education({ education }: { education: EducationType[] }) {
  return (
    <section id="education" className="py-28 border-t border-[var(--border)] bg-[var(--bg-muted)]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          number="04 — Education"
          title="Academic foundation"
        />

        <div className="grid md:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Panel className="p-7 h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent)]" />
                <span className="font-mono-label text-xs text-[var(--accent)]">{edu.timeline}</span>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mt-3">
                  {edu.degree}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">{edu.institution}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
                  {edu.details}
                </p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
