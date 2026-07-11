export type ProjectCategory = "research" | "technical";

export type ProjectTag =
  | "Published"
  | "Thesis"
  | "Internship"
  | "Personal Project"
  | "Award";

export interface Project {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  tags: ProjectTag[];
  institution: string;
  date: string;
  guidedBy?: string;
  description: string;
  highlights: string[];
  technologies: string[];
  coverImage?: string;
  gallery?: string[];
  documentUrl?: string;
  is_featured?: "yes" | "no";
}

export type EmploymentCategory =
  | "Full-Time"
  | "Part-Time"
  | "Internship"
  | "Freelancing"
  | "Fellowship";

export interface Experience {
  id: string;
  role: string;
  company: string;
  timeline: string;
  category: EmploymentCategory;
  description: string[];
  technologies: string[];
}

export interface Achievement {
  id: string;
  title: string;
  summary: string;
  date: string;
  organization: string;
  description: string;
  highlights: string[];
  coverImage?: string;
  documentUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  timeline: string;
  grade?: string;
  details: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  role: string;
  email: string;
  phone: string;
}

export interface MediaItem {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  coverImage?: string;
  gallery?: string[];
  // legacy fields kept for backwards compat
  src?: string;
  caption?: string;
  alt?: string;
  location?: string;
  highlights?: string[];
  description?: string;
}

export interface HeroStat {
  val: string;
  label: string;
}

export interface SiteSettings {
  hero: {
    name: string;
    tagline: string;
    badge: string;
    focusArea: string;
    status: string;
    statusNote: string;
    stats: HeroStat[];
  };
  about: {
    bio: string;
    skills: {
      research: string[];
      technical: string[];
    };
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
}

export type ContentType =
  | "projects"
  | "experience"
  | "achievements"
  | "education"
  | "references"
  | "media"
  | "site";

export type ContentItem =
  | Project
  | Experience
  | Achievement
  | Education
  | Reference
  | MediaItem;

export const CONTENT_TYPES: ContentType[] = [
  "site",
  "projects",
  "experience",
  "achievements",
  "education",
  "references",
  "media",
];
