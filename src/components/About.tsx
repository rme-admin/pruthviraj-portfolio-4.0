"use client";

import { motion } from "framer-motion";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";
import type { SiteSettings } from "@/types";

interface AboutProps {
  about: SiteSettings["about"];
}

function SkillsList({ skills }: { skills: string[] }) {
  return (
    <ul className="space-y-2.5">
      {skills.map((skill) => (
        <li
          key={skill}
          className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
        >
          <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
          {skill}
        </li>
      ))}
    </ul>
  );
}

export default function About({ about }: AboutProps) {
  const half = Math.ceil(about.skills.length / 2);
  const col1 = about.skills.slice(0, half);
  const col2 = about.skills.slice(half);

  return (
    <section id="about" className="py-28 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Mobile & tablet — single card, two columns, wraps on very small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:hidden"
        >
          <Panel hover={false} className="p-6 sm:p-8">
            <SectionHeading
              number="01 — About"
              title="Bridging lab research & code"
              subtitle="Experimental materials science meets computational modelling."
              compact
            />

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-8 min-[480px]:gap-10">
              {/* Bio column */}
              <p className="text-[var(--text-secondary)] text-base leading-[1.8] font-light">
                {about.bio}
              </p>

              {/* Skills column — two sub-columns, stacks on very small */}
              <div>
                <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  Technical Arsenal
                </p>
                <div className="grid grid-cols-2 max-[360px]:grid-cols-1 gap-x-6 gap-y-0">
                  <SkillsList skills={col1} />
                  <SkillsList skills={col2} />
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>

        {/* Desktop — split layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              number="01 — About"
              title="Bridging lab research & code"
              subtitle="Experimental materials science meets computational modelling."
            />
          </div>

          <div className="lg:col-span-8 space-y-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--text-secondary)] text-lg leading-[1.8] font-light"
            >
              {about.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-5">
                Technical Arsenal
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[col1, col2].map((col, ci) => (
                  <Panel key={ci} hover={false} className="p-5">
                    <SkillsList skills={col} />
                  </Panel>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
