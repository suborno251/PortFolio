import { useEffect, useState } from 'react';

const BASE = 'https://sd.my-board.org/wp-json/portfolio/v1';

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

export function usePortfolioData() {
  const [projects,   setProjects]   = useState<Project[]>([]);
  const [skills,     setSkills]     = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [bio,        setBio]        = useState<Bio[]>([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    fetch(`${BASE}/options`)
      .then(r => r.json())
      .then(data => {
        setProjects(data.projects     ?? []);
        setSkills(data.skills         ?? []);
        setExperience(data.experience ?? []);
        setBio(data.bio               ?? []);
        setLoading(false);
      });
  }, []);

  return { projects, skills, experience, bio, loading };
}