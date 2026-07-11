import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getMediaById } from "@/lib/content";
import Panel from "@/components/Panel";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getMediaById(id);
  if (!item) return { title: "Post Not Found" };
  return { title: `${item.title} | Pruthviraj B` };
}

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getMediaById(id);
  if (!item) notFound();

  // Resolve cover image — new field preferred, legacy src as fallback
  const coverImg = item.coverImage ?? item.src;
  // Resolve body — new content field preferred, legacy description as fallback
  const bodyParagraphs = item.content
    ? item.content.split("\n\n").filter(Boolean)
    : item.description
    ? [item.description]
    : [];

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <Link
          href="/#media"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:accent-text mb-10 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        <Panel hover={false} className="overflow-hidden">
          {/* Cover image */}
          {coverImg && (
            <div className="relative aspect-video w-full">
              <Image
                src={coverImg}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mt-4">
              {item.title}
            </h1>

            <p className="text-[var(--text-secondary)] mt-3 text-lg leading-relaxed">
              {item.summary}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-[var(--text-muted)] mt-6 mb-8 pb-8 border-b border-[var(--border)]">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="accent-text" />
                {item.date}
              </span>
              {item.location && (
                <span className="flex items-center gap-2">
                  <Tag size={14} className="accent-text" />
                  {item.location}
                </span>
              )}
            </div>

            {/* Blog body — paragraphs */}
            <div className="space-y-6 mb-10">
              {bodyParagraphs.map((para, i) => (
                <p key={i} className="text-[var(--text-secondary)] leading-[1.9] text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Legacy highlights (shown if present) */}
            {item.highlights && item.highlights.length > 0 && (
              <>
                <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  Highlights
                </h2>
                <ul className="space-y-3 mb-10">
                  {item.highlights.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="accent-text font-mono-label shrink-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Gallery */}
            {item.gallery && item.gallery.length > 0 && (
              <>
                <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.gallery.map((src, i) => (
                    <div key={i} className="relative aspect-video border border-[var(--border)] overflow-hidden">
                      <Image
                        src={src}
                        alt={`${item.title} photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
