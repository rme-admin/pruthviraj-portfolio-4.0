"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/types";
import Panel from "./Panel";
import SectionHeading from "./SectionHeading";

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Research", value: "research" },
  { label: "Technical", value: "technical" },
];

const CARDS_PER_PAGE = 6; // 3 rows × 2 columns

export default function Projects({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const [page, setPage] = useState(0);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Featured projects come first; the rest are paginated below
  const featuredProjects = filtered.filter((p) => p.is_featured === "yes");
  const nonFeatured = filtered.filter((p) => p.is_featured !== "yes");

  const totalPages = Math.ceil(nonFeatured.length / CARDS_PER_PAGE);
  const paginatedRest = nonFeatured.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  // Reset page when filter changes
  const handleCategoryChange = (cat: ProjectCategory | "all") => {
    setActiveCategory(cat);
    setPage(0);
  };

  return (
    <section id="projects" className="py-28 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <SectionHeading
            number="03 — Projects"
            title="Selected work"
            subtitle="Research in sustainable energy and full-stack engineering."
          />
          <div className="flex gap-1 shrink-0">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => handleCategoryChange(f.value)}
                className={`px-4 py-2 text-xs font-mono-label uppercase tracking-wider transition-all ${
                  activeCategory === f.value
                    ? "bg-[var(--accent)] text-[#052e16] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Featured projects — full-width cards */}
            {featuredProjects.length > 0 && (
              <div className="flex flex-col gap-4 mb-4">
                {featuredProjects.map((featured) => (
                  <Link key={featured.id} href={`/projects/${featured.id}`} className="block group">
                    <Panel accent className="p-8 md:p-10">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="tag tag-accent">Featured</span>
                        <span className="tag">{featured.category}</span>
                        {featured.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] group-hover:accent-text transition-colors max-w-3xl">
                        {featured.title}
                      </h3>
                      <p className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                        {featured.summary}
                      </p>
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
                        <div>
                          <p className="text-sm text-[var(--text-muted)]">{featured.institution}</p>
                          <p className="font-mono-label text-xs text-[var(--text-muted)] mt-1">{featured.date}</p>
                        </div>
                        <span className="flex items-center gap-1 text-sm accent-text font-medium group-hover:gap-2 transition-all">
                          Read case study <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </Panel>
                  </Link>
                ))}
              </div>
            )}

            {/* Non-featured projects — paginated grid */}
            {paginatedRest.length > 0 && (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    {paginatedRest.map((project) => (
                      <Link key={project.id} href={`/projects/${project.id}`} className="group">
                        <Panel className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-mono-label text-xs text-[var(--text-muted)]">{project.date}</span>
                            <span className="tag">{project.category}</span>
                          </div>
                          <h3 className="font-display font-semibold text-[var(--text-primary)] group-hover:accent-text transition-colors leading-snug">
                            {project.title}
                          </h3>
                          <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed flex-1">
                            {project.summary}
                          </p>
                          <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border-subtle)]">
                            <span className="text-xs text-[var(--text-muted)]">{project.institution}</span>
                            <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:accent-text transition-colors" />
                          </div>
                        </Panel>
                      </Link>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-10">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono-label uppercase tracking-wider border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text-muted)]"
                    >
                      <ChevronLeft size={14} /> Prev
                    </button>
                    <span className="font-mono-label text-xs text-[var(--text-muted)]">
                      {page + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={page === totalPages - 1}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono-label uppercase tracking-wider border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text-muted)]"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </>
            )}

            {filtered.length === 0 && (
              <p className="text-[var(--text-muted)] text-sm text-center py-16">No projects in this category.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
