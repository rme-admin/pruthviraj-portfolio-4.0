import { readFile, writeFile } from "fs/promises";
import path from "path";
import type {
  Project,
  Experience,
  Achievement,
  Education,
  Reference,
  MediaItem,
  SiteSettings,
  ContentType,
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "src/data");

const FILE_MAP: Record<ContentType, string> = {
  projects: "projects.json",
  experience: "experience.json",
  achievements: "achievements.json",
  education: "education.json",
  references: "references.json",
  media: "media.json",
  site: "site.json",
};

async function readJson<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}


/**
 * Parses portfolio date strings into a numeric timestamp for sorting.
 * Handles both "MM/YYYY" and plain "YYYY" formats.
 * Returns a value where larger = more recent.
 */
function parseDateToTimestamp(date: string): number {
  if (/^\d{2}\/\d{4}$/.test(date)) {
    // "MM/YYYY"
    const [month, year] = date.split("/").map(Number);
    return year * 100 + month;
  }
  if (/^\d{4}$/.test(date)) {
    // "YYYY" — treat as December so a full-year entry isn't penalised vs a MM/YYYY entry
    return Number(date) * 100 + 12;
  }
  return 0;
}

export async function getProjects(): Promise<Project[]> {
  const projects = await readJson<Project[]>(FILE_MAP.projects);
  return projects.sort(
    (a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date)
  );
}

export async function getExperience(): Promise<Experience[]> {
  return readJson<Experience[]>(FILE_MAP.experience);
}

export async function getAchievements(): Promise<Achievement[]> {
  const achievements = await readJson<Achievement[]>(FILE_MAP.achievements);
  return achievements.sort(
    (a, b) => parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date)
  );
}

export async function getEducation(): Promise<Education[]> {
  return readJson<Education[]>(FILE_MAP.education);
}

export async function getReferences(): Promise<Reference[]> {
  return readJson<Reference[]>(FILE_MAP.references);
}

export async function getMedia(): Promise<MediaItem[]> {
  return readJson<MediaItem[]>(FILE_MAP.media);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return readJson<SiteSettings>(FILE_MAP.site);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}

export async function getAchievementById(id: string): Promise<Achievement | undefined> {
  const achievements = await getAchievements();
  return achievements.find((a) => a.id === id);
}

export async function getMediaById(id: string): Promise<MediaItem | undefined> {
  const media = await getMedia();
  return media.find((m) => m.id === id);
}

export async function getAllMediaIds(): Promise<string[]> {
  const media = await getMedia();
  return media.map((m) => m.id);
}

export async function getAllProjectIds(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.id);
}

export async function getAllAchievementIds(): Promise<string[]> {
  const achievements = await getAchievements();
  return achievements.map((a) => a.id);
}

export async function getContent(type: ContentType) {
  switch (type) {
    case "projects":
      return getProjects();
    case "experience":
      return getExperience();
    case "achievements":
      return getAchievements();
    case "education":
      return getEducation();
    case "references":
      return getReferences();
    case "media":
      return getMedia();
    case "site":
      return getSiteSettings();
  }
}

export async function saveContent(type: ContentType, data: unknown): Promise<void> {
  await writeJson(FILE_MAP[type], data);
}

export function isValidContentType(type: string): type is ContentType {
  return type in FILE_MAP;
}
