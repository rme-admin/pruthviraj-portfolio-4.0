import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Building2 } from "lucide-react";
import { getAchievementById } from "@/lib/content";
import Panel from "@/components/Panel";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const achievement = await getAchievementById(id);
  if (!achievement) return { title: "Achievement Not Found" };
  return { title: `${achievement.title} | Pruthviraj B` };
}

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const achievement = await getAchievementById(id);
  if (!achievement) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <Link
          href="/#achievements"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:accent-text mb-10 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to achievements
        </Link>

        <Panel hover={false} className="overflow-hidden">
          {achievement.coverImage && (
            <div className="relative aspect-video w-full">
              <Image
                src={achievement.coverImage}
                alt={achievement.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
              {achievement.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-[var(--text-muted)] mt-5 mb-8">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="accent-text" />
                {achievement.date}
              </span>
              <span className="flex items-center gap-2">
                <Building2 size={14} className="accent-text" />
                {achievement.organization}
              </span>
            </div>

            <p className="text-[var(--text-secondary)] leading-[1.8] mb-10">
              {achievement.description}
            </p>

            <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Highlights
            </h2>
            <ul className="space-y-3 mb-8">
              {achievement.highlights.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="accent-text font-mono-label shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>

            {achievement.documentUrl && (
              <div className="pt-8 border-t border-[var(--border)]">
                <h2 className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
                  Certificate
                </h2>
                <iframe
                  src={achievement.documentUrl}
                  className="w-full h-96 border border-[var(--border)]"
                  title="Achievement document"
                />
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
