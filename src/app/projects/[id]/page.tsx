import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Building2 } from "lucide-react";
import { getProjectById } from "@/lib/content";
import Panel from "@/components/Panel";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} | Pruthviraj B` };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:accent-text mb-10 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <Panel hover={false} className="overflow-hidden">
          {project.coverImage && (
            <div className="relative aspect-video w-full">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="tag tag-accent">{tag}</span>
              ))}
              <span className="tag">{project.category}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
              {project.title}
            </h1>

            <p className="text-[var(--text-secondary)] mt-3 text-lg">{project.summary}</p>

            <div className="flex flex-wrap gap-6 text-sm text-[var(--text-muted)] mt-6 mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="accent-text" />
                {project.date}
              </span>
              <span className="flex items-center gap-2">
                <Building2 size={14} className="accent-text" />
                {project.institution}
              </span>
            </div>

            {project.guidedBy && (
              <p className="text-sm text-[var(--text-muted)] mb-6 border-l-2 border-[var(--accent)] pl-4">
                Guided by: {project.guidedBy}
              </p>
            )}

            <p className="text-[var(--text-secondary)] leading-[1.8] mb-10">
              {project.description}
            </p>

            <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Key Highlights
            </h2>
            <ul className="space-y-3 mb-10">
              {project.highlights.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="accent-text font-mono-label shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <>
                <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  Project Images
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {project.gallery.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-video border border-[var(--border)] overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} image ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.documentUrl && (
              <div className="pt-8 border-t border-[var(--border)]">
                <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  Documentation
                </h2>
                <iframe
                  src={project.documentUrl}
                  className="w-full h-96 border border-[var(--border)]"
                  title="Project documentation"
                />
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
