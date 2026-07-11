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

function CategoryLabel({ label }: { label: string }) {
  return (
    <p className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--accent)] mb-4">
      {label}
    </p>
  );
}

export default function About({ about }: AboutProps) {
  const researchSkills = about.skills.research;
  const technicalSkills = about.skills.technical;

  return (
    <section id="about" className="py-28 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Mobile & tablet — single card */}
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

              {/* Skills column — two categories */}
              <div className="space-y-6">
                <div>
                  <CategoryLabel label="Research Skills" />
                  <SkillsList skills={researchSkills} />
                </div>
                <div>
                  <CategoryLabel label="Technical Skills" />
                  <SkillsList skills={technicalSkills} />
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
              className="grid sm:grid-cols-2 gap-3"
            >
              <Panel hover={false} className="p-5">
                <CategoryLabel label="Research Skills" />
                <SkillsList skills={researchSkills} />
              </Panel>
              <Panel hover={false} className="p-5">
                <CategoryLabel label="Technical Skills" />
                <SkillsList skills={technicalSkills} />
              </Panel>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
