"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import type { MediaItem } from "@/types";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";

export default function MediaGallery({ media }: { media: MediaItem[] }) {
  return (
    <section id="media" className="py-28 border-t border-[var(--border)] bg-[var(--bg-muted)]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          number="07 — Blog"
          title="Moments & milestones"
          subtitle="Thoughts, stories, and reflections from research and building."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/media/${item.id}`} className="group block h-full">
                <Panel accent className="overflow-hidden h-full flex flex-col">
                  {/* Cover image */}
                  {item.coverImage && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="tag tag-accent mb-2">{item.date}</span>
                        <h3 className="font-display font-semibold text-white leading-snug group-hover:text-[var(--accent)] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag text-[10px] px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-subtle)]">
                      <span className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                        <BookOpen size={12} />
                        Read post
                      </span>
                      <span className="flex items-center gap-1 text-xs accent-text font-medium group-hover:gap-2 transition-all">
                        View <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </Panel>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
