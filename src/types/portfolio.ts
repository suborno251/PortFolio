export interface Project {
  meta: string;
  name: string;
  description: string;
  tags: string[];
  sourceUrl?: string;
  liveUrl?: string;
  visualType?: 'whistle' | 'debate' | 'predictor' | 'factoryiq' | 'verbatim';
  image?: string;
  previewUrl?: string;
  badgeText?: string;
  highlights?: string[];
}

export interface CoreSkill {
  name: string;
  pct: number;
  subtitle: string;
}

export interface SkillCategory {
  title: string;
  count: number;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  isCurrent?: boolean;
  points: string[];
  tags: string[];
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface PortfolioData {
  email: string;
  stats: StatItem[];
  coreSkills: CoreSkill[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: ExperienceItem[];
  bio: string[];
}
