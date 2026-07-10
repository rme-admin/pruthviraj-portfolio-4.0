"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Achievement } from "@/types";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="py-28 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          number="05 — Recognition"
          title="Achievements & certifications"
        />

        <div className="divide-y divide-[var(--border)] border border-[var(--border)]">
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/achievements/${item.id}`}
                className="group flex items-center gap-6 p-6 hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <span className="font-mono-label text-xs text-[var(--text-muted)] w-16 shrink-0">
                  {item.date}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-[var(--text-primary)] group-hover:accent-text transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.organization}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[var(--text-muted)] group-hover:accent-text shrink-0 transition-colors"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
