import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
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
  if (!item) return { title: "Gallery Not Found" };
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

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <Link
          href="/#media"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:accent-text mb-10 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to gallery
        </Link>

        <Panel hover={false} className="overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="p-8 md:p-12">
            <span className="tag tag-accent">{item.date}</span>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mt-4">
              {item.title}
            </h1>

            <p className="text-[var(--text-secondary)] mt-3 text-lg">{item.summary}</p>

            <div className="flex flex-wrap gap-6 text-sm text-[var(--text-muted)] mt-6 mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="accent-text" />
                {item.date}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="accent-text" />
                {item.location}
              </span>
            </div>

            <p className="text-[var(--text-secondary)] leading-[1.8] mb-10">
              {item.description}
            </p>

            {item.highlights?.length > 0 && (
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

            {item.gallery && item.gallery.length > 0 && (
              <>
                <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  More Photos
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
