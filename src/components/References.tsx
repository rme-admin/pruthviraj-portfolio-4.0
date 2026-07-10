"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import type { Reference } from "@/types";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";

export default function References({ references }: { references: Reference[] }) {
  return (
    <section id="references" className="py-28 border-t border-[var(--border)] bg-[var(--bg-muted)]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          number="06 — References"
          title="Professional endorsements"
          subtitle="Supervisors and mentors who can speak to my work."
        />

        <div className="grid md:grid-cols-2 gap-4">
          {references.map((ref, i) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Panel className="p-7 h-full">
                <span className="tag tag-accent mb-4">{ref.role}</span>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  {ref.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1 leading-relaxed">{ref.title}</p>

                <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] space-y-2.5">
                  <a
                    href={`mailto:${ref.email}`}
                    className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:accent-text transition-colors"
                  >
                    <Mail size={14} className="shrink-0" />
                    {ref.email}
                  </a>
                  <a
                    href={`tel:${ref.phone}`}
                    className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:accent-text transition-colors"
                  >
                    <Phone size={14} className="shrink-0" />
                    {ref.phone}
                  </a>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
