import type { CardActionIcon } from '@/app/components/portfolio/ContentCard';

export interface CourseData {
  code: string;
  name: string;
  badges: string[];
  work: string;
  links: { label: string; href: string; icon?: CardActionIcon }[];
}

const repo = (name: string) => `https://github.com/Dryd33n/${name}`;

export const csc305: CourseData = {
  code: 'CSC-305',
  name: 'Computer Graphics',
  badges: ['WebGL', 'GLSL', 'JavaScript', 'Python', 'NumPy'],
  work: 'WebGL scenes, ray tracer',
  links: [
    { label: 'View Code', href: repo('uvic-csc-305') },
  ],
};

export const csc226: CourseData = {
  code: 'CSC-226',
  name: 'Algorithms & Data Structures II',
  badges: ['C', 'Python', 'Matplotlib', 'LaTeX'],
  work: '2 benchmark studies, 9 proof exercises',
  links: [
    { label: 'Hash Table Study', href: `${repo('uvic-csc-226')}/blob/HEAD/assignments/a1/a1.pdf`, icon: 'document' },
    { label: 'Shortest Path Study', href: `${repo('uvic-csc-226')}/blob/HEAD/assignments/a2/a2.pdf`, icon: 'document' },
    { label: 'View Code', href: repo('uvic-csc-226') },
  ],
};

export const seng265: CourseData = {
  code: 'SENG-265',
  name: 'Software Development Methods',
  badges: ['C', 'Python', 'PyQt6', 'unittest'],
  work: 'Survey tool in C, clinic app in Python',
  links: [
    { label: 'View Code', href: repo('uvic-seng-265') },
  ],
};

export const csc230: CourseData = {
  code: 'CSC-230',
  name: 'Computer Architecture',
  badges: ['AVR Assembly', 'C', 'Microcontrollers'],
  work: 'LCD, timer and interrupt programs',
  links: [
    { label: 'View Code', href: repo('uvic-csc-230') },
  ],
};

export const csc225: CourseData = {
  code: 'CSC-225',
  name: 'Algorithms & Data Structures I',
  badges: ['Java', 'LaTeX', 'Proofs'],
  work: '5 assignments, recursive algorithm design',
  links: [
    { label: 'View Write-ups', href: repo('uvic-csc-225'), icon: 'document' },
  ],
};

export const math202: CourseData = {
  code: 'MATH-202',
  name: 'Multivariable Calculus',
  badges: ['LaTeX', 'ODEs', 'Laplace Transforms'],
  work: '5 homework sets',
  links: [
    { label: 'View Write-ups', href: repo('uvic-math-202'), icon: 'document' },
  ],
};

export const math211: CourseData = {
  code: 'MATH-211',
  name: 'Matrix Algebra',
  badges: ['LaTeX', 'Linear Algebra'],
  work: '5 assignments',
  links: [
    { label: 'View Write-ups', href: repo('uvic-math-211'), icon: 'document' },
  ],
};

export const math122: CourseData = {
  code: 'MATH-122',
  name: 'Logic & Foundations',
  badges: ['LaTeX', 'Logic', 'Set Theory'],
  work: '5 assignments, in-class activities',
  links: [
    { label: 'View Write-ups', href: repo('uvic-math-122'), icon: 'document' },
  ],
};

export const stat260: CourseData = {
  code: 'STAT-260',
  name: 'Probability & Statistics',
  badges: ['LaTeX', 'R', 'Hypothesis Testing'],
  work: '4 assignments',
  links: [
    { label: 'View Write-ups', href: repo('uvic-stat-260'), icon: 'document' },
  ],
};
