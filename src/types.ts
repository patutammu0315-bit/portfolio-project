export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface Skill {
  name: string;
  level: number; // percentage (optional visual bar)
  iconName: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  label?: string;
  tagline?: string;
  description: string;
  overview: string;
  problemStatement: string;
  solution: string;
  features: string[];
  featurePills?: string[];
  techStack: string[];
  status: "Active Development" | "Completed / Production Ready" | "AI Innovation Project" | string;
  isFeatured?: boolean;
  workflow?: string[];
  challengesSolved?: string[];
  futureImprovements?: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  tags: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  focus: string;
  skills: string[];
  credentialUrl?: string;
  image: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PinnedProject {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
}
