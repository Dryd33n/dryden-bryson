import type { CardActionIcon } from '@/app/components/portfolio/ContentCard';

export interface CourseShortcut {
  label: string;
  file: string;
  icon?: CardActionIcon;
}

export interface CourseData {
  slug: string;
  code: string;
  name: string;
  repo: string;
  badges: string[];
  work: string;
  // Files shown in the project viewer: display path -> path in the repo.
  // The first entry opens by default.
  files: Record<string, string>;
  // Main card button; defaults to "Open Project" at the first file.
  primary?: CourseShortcut;
  // Extra card buttons that open the viewer at a specific file.
  shortcuts?: CourseShortcut[];
}

export const githubUrl = (repo: string) => `https://github.com/Dryd33n/${repo}`;

// Numbered PDFs such as Homework_1.pdf ... Homework_5.pdf
const numberedPdfs = (display: string, repoPath: (n: number) => string, count: number) =>
  Object.fromEntries(Array.from({ length: count }, (_, i) => [`${display}-${i + 1}.pdf`, repoPath(i + 1)]));

export const csc305: CourseData = {
  slug: 'csc-305',
  code: 'CSC-305',
  name: 'Computer Graphics',
  repo: 'uvic-csc-305',
  badges: ['WebGL', 'GLSL', 'JavaScript', 'Python', 'NumPy'],
  work: 'WebGL scenes, ray tracer',
  files: {
    'README.md': 'README.md',
    'a1-scene/main.js': 'Assignments/A1/main.js',
    'a1-scene/objects.js': 'Assignments/A1/objects.js',
    'a1-scene/main.html': 'Assignments/A1/main.html',
    'a2-textures/main.js': 'Assignments/A2/main.js',
    'a2-textures/prefabs.js': 'Assignments/A2/prefabs.js',
    'a2-textures/objects.js': 'Assignments/A2/objects.js',
    'a3-raytracer/raytracer.py': 'Assignments/A3/pycharm/raytracer.py',
    'a3-raytracer/raytracer_types.py': 'Assignments/A3/pycharm/raytracer_types.py',
    'a3-raytracer/raytracer_helpers.py': 'Assignments/A3/pycharm/raytracer_helpers.py',
    'a3-raytracer/raytracer_io.py': 'Assignments/A3/pycharm/raytracer_io.py',
  },
};

export const csc226: CourseData = {
  slug: 'csc-226',
  code: 'CSC-226',
  name: 'Algorithms & Data Structures II',
  repo: 'uvic-csc-226',
  badges: ['C', 'Python', 'Matplotlib', 'LaTeX'],
  work: '2 benchmark studies, 9 proof exercises',
  files: {
    'README.md': 'README.md',
    'a1-hash-tables/report.pdf': 'assignments/a1/a1.pdf',
    'a1-hash-tables/linear_probing.c': 'assignments/a1/C implementation/linear_probing.c',
    'a1-hash-tables/chaining.c': 'assignments/a1/C implementation/chaining.c',
    'a1-hash-tables/main.c': 'assignments/a1/C implementation/main.c',
    'a2-shortest-paths/report.pdf': 'assignments/a2/a2.pdf',
    'a2-shortest-paths/dijkstra.c': 'assignments/a2/C-Implementation/dijkstra.c',
    'a2-shortest-paths/floyd_warshall_roy.c': 'assignments/a2/C-Implementation/floyd_warshall_roy.c',
    'a2-shortest-paths/graph_generator.c': 'assignments/a2/C-Implementation/graph_generator.c',
    'a2-shortest-paths/main.c': 'assignments/a2/C-Implementation/main.c',
    ...Object.fromEntries([2, 3, 4, 5, 6, 7, 8, 9, 11].map((n) => [`exercises/exercise-${n}.pdf`, `exercises/exercise${n}.pdf`])),
  },
  shortcuts: [
    { label: 'Hash Table Study', file: 'a1-hash-tables/report.pdf', icon: 'document' },
    { label: 'Shortest Path Study', file: 'a2-shortest-paths/report.pdf', icon: 'document' },
  ],
};

export const seng265: CourseData = {
  slug: 'seng-265',
  code: 'SENG-265',
  name: 'Software Development Methods',
  repo: 'uvic-seng-265',
  badges: ['C', 'Python', 'PyQt6', 'unittest'],
  work: 'Survey tool in C, clinic app in Python',
  files: {
    'README.md': 'README.md',
    'a1-survey/survey.c': 'a1/survey.c',
    'a2-dynamic-survey/processing.c': 'a2/processing.c',
    'a2-dynamic-survey/input_handling.c': 'a2/input_handling.c',
    'a2-dynamic-survey/emalloc.c': 'a2/emalloc.c',
    'a5-clinic/controller.py': 'a5/clinic/controller.py',
    'a5-clinic/patient.py': 'a5/clinic/patient.py',
    'a5-clinic/dao/patient_dao_json.py': 'a5/clinic/dao/patient_dao_json.py',
    'a5-clinic/dao/note_dao_pickle.py': 'a5/clinic/dao/note_dao_pickle.py',
    'a5-clinic/cli/main_menu_cli.py': 'a5/clinic/cli/main_menu_cli.py',
    'a5-clinic/gui/login.py': 'a5/clinic/gui/login.py',
    'a5-clinic/gui/main_window.py': 'a5/clinic/gui/main_window.py',
  },
};

export const csc230: CourseData = {
  slug: 'csc-230',
  code: 'CSC-230',
  name: 'Computer Architecture',
  repo: 'uvic-csc-230',
  badges: ['AVR Assembly', 'C', 'Microcontrollers'],
  work: 'LCD, timer and interrupt programs',
  files: {
    'README.md': 'README.md',
    'a1-registers/sixteen-bit-addition.asm': 'assignments/assignment 1/assignment1/assignment1/sixteen-bit-addition.asm',
    'a1-registers/reset-rightmost.asm': 'assignments/assignment 1/assignment1/assignment1/reset-rightmost.asm',
    'a1-registers/twos-complement.asm': 'assignments/assignment 1/assignment1/assignment1/twos-complement..asm',
    'a2-io-ports/signalling.asm': 'assignments/assignment 2/assignment 2/a2-signalling.asm',
    'a3-lcd/display_partA.asm': 'assignments/assignment 3/assignment 3/display_partA.asm',
    'a3-lcd/display_partB.asm': 'assignments/assignment 3/assignment 3/display_partB.asm',
    'a3-lcd/display_partC.asm': 'assignments/assignment 3/assignment 3/display_partC.asm',
    'a3-lcd/display_partD.asm': 'assignments/assignment 3/assignment 3/display_partD.asm',
    'a4-stopwatch/main.c': 'assignments/assignment 4/Assignment4/main.c',
  },
};

export const csc225: CourseData = {
  slug: 'csc-225',
  code: 'CSC-225',
  name: 'Algorithms & Data Structures I',
  repo: 'uvic-csc-225',
  badges: ['Java', 'LaTeX', 'Proofs'],
  work: '5 assignments, recursive algorithm design',
  files: {
    'README.md': 'README.md',
    'a1-counting/solution.pdf': 'Assignments/Assignment 1/Assignment1_Solution.pdf',
    'a2-analysis/solution.pdf': 'Assignments/Assignment 2/Assignment2_Solution.pdf',
    'a3-odd-equality/OddEquality.java': 'Assignments/Assignment 3/src/OddEquality.java',
    'a4-sorting/solution.pdf': 'Assignments/Assignment 4/Assignment4.pdf',
    'a5-trees-graphs/solution.pdf': 'Assignments/Assignment 5/Assignment5.pdf',
  },
};

export const math202: CourseData = {
  slug: 'math-202',
  code: 'MATH-202',
  name: 'Multivariable Calculus',
  repo: 'uvic-math-202',
  badges: ['LaTeX', 'ODEs', 'Laplace Transforms'],
  work: '5 homework sets',
  files: {
    'README.md': 'README.md',
    ...numberedPdfs('homework', (n) => `Homework_${n}.pdf`, 5),
  },
  primary: { label: 'Read Write-ups', file: 'homework-1.pdf', icon: 'document' },
};

export const math211: CourseData = {
  slug: 'math-211',
  code: 'MATH-211',
  name: 'Matrix Algebra',
  repo: 'uvic-math-211',
  badges: ['LaTeX', 'Linear Algebra'],
  work: '5 assignments',
  files: {
    'README.md': 'README.md',
    ...numberedPdfs('assignment', (n) => `Assignment${n}.pdf`, 5),
  },
  primary: { label: 'Read Write-ups', file: 'assignment-1.pdf', icon: 'document' },
};

export const math122: CourseData = {
  slug: 'math-122',
  code: 'MATH-122',
  name: 'Logic & Foundations',
  repo: 'uvic-math-122',
  badges: ['LaTeX', 'Logic', 'Set Theory'],
  work: '5 assignments, in-class activities',
  files: {
    'README.md': 'README.md',
    ...numberedPdfs('assignments/assignment', (n) => `Assignments/Assignment${n}.pdf`, 5),
    'in-class/activity-10.pdf': "I.C.A's/ICA10.pdf",
    'in-class/activity-11.pdf': "I.C.A's/ICA11.pdf",
  },
  primary: { label: 'Read Write-ups', file: 'assignments/assignment-1.pdf', icon: 'document' },
};

export const stat260: CourseData = {
  slug: 'stat-260',
  code: 'STAT-260',
  name: 'Probability & Statistics',
  repo: 'uvic-stat-260',
  badges: ['LaTeX', 'R', 'Hypothesis Testing'],
  work: '4 assignments',
  files: {
    'README.md': 'README.md',
    ...numberedPdfs('assignment', (n) => `Assignment ${n}.pdf`, 4),
  },
  primary: { label: 'Read Write-ups', file: 'assignment-1.pdf', icon: 'document' },
};

export const courses = [csc305, csc226, seng265, csc230, csc225, math202, math211, math122, stat260];
