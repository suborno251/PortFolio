export interface Project {
  badge:       string;
  name:        string;
  description: string;
  stack:       string;
  is_wip:      boolean;
}

export interface Skill {
  category:    string;
  tag:         string;
  is_learning: boolean;
}

export interface Experience {
  role:       string;
  company:    string;
  date_range: string;
  is_current: boolean;
  points:     string;
}

export interface Bio {
  paragraph: string;
}

const PROJECTS: Project[] = [
  { badge: 'AI · Full-Stack', name: 'ZEFA AI Image', description: 'Gen-AI fashion model image generation pipeline. Real-time streaming with SSE, AWS S3 asset management, canvas-based watermarking, and a gallery UI with pagination.', stack: 'Node.js, TypeScript, Gemini API, AWS S3, SSE, jQuery', is_wip: false },
  { badge: 'Backend · DevOps', name: 'Camera Dashboard', description: 'Multi-camera live monitoring system with a Dockerised backend and real-time frontend.', stack: 'Node.js, Docker, PostgreSQL, HTML/CSS', is_wip: false },
  { badge: 'Laravel · Frontend', name: 'Barcode Scanner UI', description: 'Product lookup and inventory tool for ZEFA Internationals with barcode input and camera scan.', stack: 'Laravel, PHP, jQuery, Bootstrap', is_wip: false },
  { badge: 'React · Laravel', name: 'CigaretteLens', description: 'A niche review platform for cigarettes — inspired by Letterboxd. Ratings, reviews, want-to-try lists, and brand discovery.', stack: 'Laravel, React, Vite, Tailwind', is_wip: true },
];

const SKILLS: Skill[] = [
  { category: 'Backend',        tag: 'PHP',          is_learning: false },
  { category: 'Backend',        tag: 'Laravel',      is_learning: false },
  { category: 'Backend',        tag: 'Node.js',      is_learning: false },
  { category: 'Backend',        tag: 'Express.js',   is_learning: false },
  { category: 'Backend',        tag: 'TypeScript',   is_learning: false },
  { category: 'Backend',        tag: 'Python',       is_learning: false },
  { category: 'Backend',        tag: 'FastAPI',      is_learning: false },
  { category: 'Frontend',       tag: 'HTML / CSS',   is_learning: false },
  { category: 'Frontend',       tag: 'JavaScript',   is_learning: false },
  { category: 'Frontend',       tag: 'jQuery',       is_learning: false },
  { category: 'Frontend',       tag: 'Angular',      is_learning: false },
  { category: 'Frontend',       tag: 'Bootstrap',    is_learning: false },
  { category: 'Frontend',       tag: 'React',        is_learning: true  },
  { category: 'Tools & DevOps', tag: 'Docker',       is_learning: false },
  { category: 'Tools & DevOps', tag: 'AWS S3',       is_learning: false },
  { category: 'Tools & DevOps', tag: 'Git',          is_learning: false },
  { category: 'Tools & DevOps', tag: 'Linux (Arch)', is_learning: false },
  { category: 'Tools & DevOps', tag: 'Gemini API',   is_learning: false },
];

const EXPERIENCE: Experience[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Zefa International / Remedio',
    date_range: '2024 — Present',
    is_current: true,
    points: '<ul><li>Built an AI image generation pipeline using Gemini API with real-time SSE streaming</li><li>Developed AWS S3-integrated asset management with canvas-based watermarking</li><li>Created barcode scanner and product inventory UI connected to internal APIs</li><li>Maintained and extended Laravel backend services and REST APIs</li><li>Handled Docker deployments and resolved production-critical streaming issues on Render</li></ul>',
  },
  {
    role: 'PHP & Laravel Developer',
    company: 'Freelance / Contract',
    date_range: 'Earlier',
    is_current: false,
    points: '<ul><li>Developed custom web applications in Laravel for various clients</li><li>Built responsive frontends with Bootstrap, jQuery, and vanilla JS</li><li>Managed shared hosting deployments and MySQL database design</li></ul>',
  },
];

const BIO: Bio[] = [
  { paragraph: '<p>I\'m a full-stack developer with a strong foundation in PHP and Laravel, and growing professional experience in Node.js, Express, and Angular. I enjoy the whole stack — designing a database schema in the morning and tweaking a UI animation in the afternoon.</p>' },
  { paragraph: '<p>Most of my recent work lives at the intersection of traditional web development and modern AI integration: building image generation pipelines, real-time streaming APIs, and tools that make complex things feel simple.</p>' },
  { paragraph: '<p>When I\'m not writing code, I\'m probably thinking about the next side project, exploring Linux configurations, or researching something niche on the internet.</p>' },
];

export function usePortfolioData() {
  return {
    projects:   PROJECTS,
    skills:     SKILLS,
    experience: EXPERIENCE,
    bio:        BIO,
    loading:    false,
  };
}