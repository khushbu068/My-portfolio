export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
  };
  category: 'fullstack' | 'frontend' | 'backend';
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string[];
  color: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'languages';
  level: number;
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
