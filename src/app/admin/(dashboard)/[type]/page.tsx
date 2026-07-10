import ContentEditor from "@/components/admin/ContentEditor";
import type { ContentType } from "@/types";

const TITLES: Record<ContentType, string> = {
  site: "Site Settings",
  projects: "Projects",
  experience: "Experience",
  achievements: "Achievements",
  education: "Education",
  references: "References",
  media: "Media Gallery",
};

export default async function AdminContentPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const contentType = type as ContentType;

  return (
    <ContentEditor
      type={contentType}
      title={TITLES[contentType] || type}
      isSiteSettings={contentType === "site"}
    />
  );
}
