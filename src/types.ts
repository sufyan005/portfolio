export interface Project {
  id: string;
  number: string;
  category: string;
  year?: string;
  title: string;
  technologies: string[];
  status: string;
  statusBadge: string;
  highlight: string;
  summary: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  primaryLink?: {
    label: string;
    url: string;
    host: string;
  };
  image?: string;
  gallery?: {
    title: string;
    description: string;
    url?: string;
    badge?: string;
    role?: string;
  }[];
  architectureHighlights?: {
    title: string;
    description: string;
  }[];
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  skills: string[];
}

export interface EducationMilestone {
  id: string;
  tag: string;
  period: string;
  degree: string;
  institution: string;
  statusLabel: string;
  statusValue: string;
  isHighValue?: boolean;
}

export interface MetricStat {
  value: string;
  label: string;
  highlight?: boolean;
}
