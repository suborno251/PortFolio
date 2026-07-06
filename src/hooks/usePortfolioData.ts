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
  {
    badge: 'AI · Full-Stack',
    name: 'ZEFA AI Image',
    description: 'GenAI microservice built with FastAPI and Google Gemini API, integrated into a Laravel + Amazon S3 ERP system for automated product visualization with real-time SSE streaming and canvas-based watermarking.',
    stack: 'FastAPI, Python, Gemini API, Laravel, AWS S3, Node.js, TypeScript, SSE',
    is_wip: false,
  },
  {
    badge: 'ML · Full-Stack',
    name: 'California Housing Predictor',
    description: 'ML-powered housing price prediction application with a React JS frontend and FastAPI backend, trained on the California Housing dataset using scikit-learn and HuggingFace.',
    stack: 'React JS, FastAPI, HuggingFace, scikit-learn, Python',
    is_wip: false,
  },
  {
    badge: 'Laravel · Frontend',
    name: 'Barcode Scanner UI',
    description: 'Product lookup and inventory tool for ZEFA Internationals with barcode input, API-integrated product search, and a mobile-optimised camera scan interface.',
    stack: 'Laravel, PHP, jQuery, Bootstrap',
    is_wip: false,
  },
  {
    badge: 'React · Laravel',
    name: 'CigaretteLens',
    description: 'A niche review platform for cigarettes — inspired by Letterboxd. Full community feature set: ratings, reviews, want-to-try lists, and brand discovery.',
    stack: 'Laravel, React, Vite, Tailwind',
    is_wip: true,
  },
];

const SKILLS: Skill[] = [
  // Languages
  { category: 'Languages',      tag: 'PHP',           is_learning: false },
  { category: 'Languages',      tag: 'TypeScript',    is_learning: false },
  { category: 'Languages',      tag: 'JavaScript',    is_learning: false },
  { category: 'Languages',      tag: 'Python',        is_learning: false },
  { category: 'Languages',      tag: 'Go',            is_learning: true  },
  // Frameworks
  { category: 'Frameworks',     tag: 'Laravel',       is_learning: false },
  { category: 'Frameworks',     tag: 'Node.js',       is_learning: false },
  { category: 'Frameworks',     tag: 'Express.js',    is_learning: false },
  { category: 'Frameworks',     tag: 'Angular',       is_learning: false },
  { category: 'Frameworks',     tag: 'FastAPI',       is_learning: false },
  { category: 'Frameworks',     tag: 'React',         is_learning: true  },
  // Databases
  { category: 'Databases',      tag: 'MySQL',         is_learning: false },
  { category: 'Databases',      tag: 'PostgreSQL',    is_learning: false },
  { category: 'Databases',      tag: 'MongoDB',       is_learning: false },
  { category: 'Databases',      tag: 'Redis',         is_learning: false },
  // Tools
  { category: 'Tools & DevOps', tag: 'Docker',        is_learning: false },
  { category: 'Tools & DevOps', tag: 'Git',           is_learning: false },
  { category: 'Tools & DevOps', tag: 'AWS S3',        is_learning: false },
  { category: 'Tools & DevOps', tag: 'Postman',       is_learning: false },
  { category: 'Tools & DevOps', tag: 'CI/CD',         is_learning: false },
  { category: 'Tools & DevOps', tag: 'Linux (Arch)',  is_learning: false },
  // Concepts
  { category: 'Concepts',       tag: 'REST API',      is_learning: false },
  { category: 'Concepts',       tag: 'JWT Auth',      is_learning: false },
  { category: 'Concepts',       tag: 'RBAC',          is_learning: false },
  { category: 'Concepts',       tag: 'Async Queues',  is_learning: false },
  { category: 'Concepts',       tag: 'Service Layer', is_learning: false },
];

const EXPERIENCE: Experience[] = [
  {
    role: 'Software Development Engineer',
    company: 'Remedio Technologies, Kolkata',
    date_range: 'Dec 2025 — Present',
    is_current: true,
    points: '<ul><li>Extended a Laravel and Node.js/Angular.js e-commerce platform with shipment dispatching, stock verification, and CRM Webhook integrations, improving lead generation pipeline efficiency.</li><li>Implemented JWT-based user authentication and Role-Based Authorization (RBAC) across multiple REST API services, strengthening application security.</li><li>Optimized Angular and Node.js application load times by up to 70% through front-end performance tuning and elimination of code duplication.</li><li>Built a GenAI microservice using FastAPI and Google Gemini API, integrated into a Laravel + Amazon S3 ERP system for automated product visualization.</li></ul>',
  },
  {
    role: 'Junior Software Development Engineer',
    company: 'Digital Aptech, Kolkata',
    date_range: 'Mar 2024 — Nov 2025',
    is_current: false,
    points: '<ul><li>Developed and maintained RESTful APIs using Laravel for an e-commerce shipping platform, implementing Eloquent ORM relationships, custom middleware, and Form Request validation.</li><li>Applied Service Layer Architecture to separate business logic from controllers, improving code maintainability and scalability.</li><li>Used Laravel Queues and Jobs for asynchronous shipment processing, increasing system throughput and reliability.</li></ul>',
  },
];

const BIO: Bio[] = [
  { paragraph: '<p>Full-Stack Developer with 2+ years of experience in WordPress, Laravel, React JS, Node.js, Express.js, and Angular. Experienced in building and maintaining RESTful APIs, implementing JWT-based authentication, Service Layer Architecture, and Async Queue processing.</p>' },
  { paragraph: '<p>I\'ve built GenAI microservices using FastAPI and Google Gemini API, and enjoy working across the entire stack — from designing a database schema in the morning to tuning frontend performance in the afternoon.</p>' },
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