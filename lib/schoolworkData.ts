import type { CardActionIcon } from '@/app/components/portfolio/ContentCard';

// A file shown in the project viewer. A plain string is a path in the project's repo;
// write-up collections spanning several courses give the repo explicitly.
export type ProjectFile = string | { repo: string; path: string };

export interface ProjectSection {
  title: string;
  body: string;
}

export interface SchoolProject {
  slug: string;
  title: string;
  course: string;
  courseName: string;
  repo?: string;
  badges: string[];
  highlight: string;
  summary: string;
  sections: ProjectSection[];
  findings?: string[];
  hero?: { repo: string; path: string; alt: string; width: number; height: number };
  // Viewer files: display path -> file. Code shows under Source, PDFs under Write-ups.
  files: Record<string, ProjectFile>;
  // Extra card buttons that open the viewer at a specific file.
  shortcuts?: { label: string; file: string; icon?: CardActionIcon }[];
}

export const githubUrl = (repo: string) => `https://github.com/Dryd33n/${repo}`;

export const resolveFile = (project: SchoolProject, file: string) => {
  const entry = project.files[file];
  if (entry === undefined) return undefined;
  return typeof entry === 'string' ? { repo: project.repo!, path: entry } : entry;
};

export const isPdf = (file: string) => file.toLowerCase().endsWith('.pdf');

const numbered = (display: string, repo: string, path: (n: number) => string, count: number) =>
  Object.fromEntries(Array.from({ length: count }, (_, i) => [`${display}-${i + 1}.pdf`, { repo, path: path(i + 1) }]));

export const rayTracer: SchoolProject = {
  slug: 'ray-tracer',
  title: 'Ray-Tracer',
  course: 'CSC 305',
  courseName: 'Computer Graphics',
  repo: 'uvic-csc-305',
  badges: ['Python', 'NumPy', 'Ray Tracing'],
  highlight: 'Shadows and recursive reflections',
  summary:
    'A ray tracer written from scratch in Python. It reads a plain-text scene of spheres and lights, casts a ray through every pixel, and shades each hit with the Phong lighting model, including shadows and reflections up to three bounces deep.',
  sections: [
    { title: 'Camera rays', body: 'Generates a ray through each pixel from a configurable image plane, and parses scene files into typed Python dataclasses.' },
    { title: 'Ray–sphere intersection', body: 'Spheres can be moved and scaled. Each ray is transformed into the sphere’s unit space with the inverse transform, and surface normals are corrected with the inverse transpose.' },
    { title: 'Lighting and shadows', body: 'Adds ambient, diffuse and specular light from every light source, and casts shadow rays to check whether anything blocks each light.' },
    { title: 'Reflections', body: 'Reflective surfaces spawn new rays recursively, up to a depth of three.' },
  ],
  files: {
    'raytracer.py': 'Assignments/A3/pycharm/raytracer.py',
    'raytracer_types.py': 'Assignments/A3/pycharm/raytracer_types.py',
    'raytracer_helpers.py': 'Assignments/A3/pycharm/raytracer_helpers.py',
    'raytracer_io.py': 'Assignments/A3/pycharm/raytracer_io.py',
  },
};

export const webglScenes: SchoolProject = {
  slug: 'webgl-scenes',
  title: 'WebGL-Scenes',
  course: 'CSC 305',
  courseName: 'Computer Graphics',
  repo: 'uvic-csc-305',
  badges: ['WebGL', 'GLSL', 'JavaScript'],
  highlight: 'Animated rigs, textures, firelight',
  summary:
    'Two interactive 3D scenes built on raw WebGL, with no 3D engine. The first assembles jointed, animated figures from primitive shapes; the second adds textures, an orbiting camera and a flickering campfire light written as a custom shader.',
  sections: [
    { title: 'Shapes and lighting', body: 'Cubes, cylinders, cones and spheres built from vertex and normal arrays, lit with the Phong model.' },
    { title: 'Hierarchical animation', body: 'A matrix-stack scene graph drives jointed arms, legs and tentacles, animated in real time.' },
    { title: 'Textures and camera', body: 'Five image textures mapped onto scene objects, and a camera that circles a point of interest.' },
    { title: 'Per-pixel lighting', body: 'Lighting moved from the vertex shader to the fragment shader and upgraded to Blinn-Phong, with a campfire acting as a flickering point light.' },
  ],
  files: {
    'scene-1/main.js': 'Assignments/A1/main.js',
    'scene-1/objects.js': 'Assignments/A1/objects.js',
    'scene-1/main.html': 'Assignments/A1/main.html',
    'scene-2/main.js': 'Assignments/A2/main.js',
    'scene-2/prefabs.js': 'Assignments/A2/prefabs.js',
    'scene-2/objects.js': 'Assignments/A2/objects.js',
  },
};

export const shortestPathBenchmark: SchoolProject = {
  slug: 'shortest-path-benchmark',
  title: 'Shortest-Path-Benchmark',
  course: 'CSC 226',
  courseName: 'Algorithms & Data Structures II',
  repo: 'uvic-csc-226',
  badges: ['C', 'Python', 'Matplotlib'],
  highlight: 'Floyd-Warshall wins past k ≈ 23% of n',
  summary:
    'To find shortest paths from k starting vertices, is it faster to run Dijkstra’s algorithm k times, or Floyd-Warshall-Roy once for every pair? Both were written in C and timed on random graphs of 25 to 500 vertices at four edge densities.',
  sections: [
    { title: 'Implementation', body: 'Dijkstra’s algorithm with a min-heap and adjacency list; Floyd-Warshall-Roy with an adjacency matrix.' },
    { title: 'Test graphs', body: 'Randomly generated at 25%, 50%, 75% and 100% edge density, with k ranging from 1% to 100% of the vertices.' },
    { title: 'Measurement', body: 'High-resolution Windows timers, taking the median of repeated runs, then plotted with Matplotlib.' },
  ],
  findings: [
    'Floyd-Warshall-Roy was faster in most cases, even for fairly small k.',
    'On average it overtakes Dijkstra once k passes about 23% of n, falling to about 16% on larger graphs.',
    'The denser the graph, the earlier the crossover.',
    'Its simple triple loop suits the compiler and cache better than rebuilding a heap for every source.',
  ],
  hero: { repo: 'uvic-csc-226', path: 'assignments/a2/plot_crossover.png', alt: 'Line chart of the k/n ratio at which Floyd-Warshall-Roy becomes faster than Dijkstra, for four graph densities', width: 2668, height: 1767 },
  files: {
    'report.pdf': 'assignments/a2/a2.pdf',
    'dijkstra.c': 'assignments/a2/C-Implementation/dijkstra.c',
    'floyd_warshall_roy.c': 'assignments/a2/C-Implementation/floyd_warshall_roy.c',
    'graph_generator.c': 'assignments/a2/C-Implementation/graph_generator.c',
    'main.c': 'assignments/a2/C-Implementation/main.c',
  },
  shortcuts: [{ label: 'Read Report', file: 'report.pdf', icon: 'document' }],
};

export const hashTableBenchmark: SchoolProject = {
  slug: 'hash-table-benchmark',
  title: 'Hash-Table-Benchmark',
  course: 'CSC 226',
  courseName: 'Algorithms & Data Structures II',
  repo: 'uvic-csc-226',
  badges: ['C', 'Python', 'Matplotlib'],
  highlight: 'Linear probing beats chaining',
  summary:
    'An experiment comparing two ways a hash table can handle collisions: separate chaining and linear probing. Both were written in C and timed across load factors from 0.5 to 0.95 and table sizes from 32 to 16.7 million slots.',
  sections: [
    { title: 'Implementation', body: 'Both tables written in C with the same hash function and a fixed random seed, so every run is reproducible.' },
    { title: 'Workload', body: 'A realistic mix of operations: 50% inserts, 40% searches and 10% deletes.' },
    { title: 'Measurement', body: 'Nanosecond timing with a monotonic clock. Each configuration ran 10 times and the median was kept, then plotted as 3D surfaces and line charts.' },
  ],
  findings: [
    'Linear probing was faster at nearly every load factor and table size.',
    'The gap comes from memory locality: probing reads neighbouring slots in one array, while chaining follows linked-list nodes scattered across memory.',
    'Chaining slows down much more steeply as the table fills up.',
  ],
  hero: { repo: 'uvic-csc-226', path: 'assignments/a1/surface_comparison.png', alt: '3D surface plots of operation time against load factor and table size, for linear probing and chaining', width: 4704, height: 1801 },
  files: {
    'report.pdf': 'assignments/a1/a1.pdf',
    'linear_probing.c': 'assignments/a1/C implementation/linear_probing.c',
    'chaining.c': 'assignments/a1/C implementation/chaining.c',
    'main.c': 'assignments/a1/C implementation/main.c',
  },
  shortcuts: [{ label: 'Read Report', file: 'report.pdf', icon: 'document' }],
};

export const clinicManager: SchoolProject = {
  slug: 'clinic-manager',
  title: 'Clinic-Manager',
  course: 'SENG 265',
  courseName: 'Software Development Methods',
  repo: 'uvic-seng-265',
  badges: ['Python', 'PyQt6', 'unittest'],
  highlight: 'Grew from classes to a desktop app',
  summary:
    'A patient and notes system for a medical clinic, built up over three assignments: first as tested Python classes, then with saved data, and finally as a desktop app with a login screen.',
  sections: [
    { title: 'Core model', body: 'Patient, record and note classes supporting create, search, update and delete, covered by unittest tests.' },
    { title: 'Saved data', body: 'Patients stored as JSON and notes with pickle behind data-access classes, with custom exceptions and autosave.' },
    { title: 'Desktop app', body: 'A PyQt6 interface with a login screen, input validation and a custom dark theme, alongside a command-line version.' },
  ],
  files: {
    'controller.py': 'a5/clinic/controller.py',
    'patient.py': 'a5/clinic/patient.py',
    'dao/patient_dao_json.py': 'a5/clinic/dao/patient_dao_json.py',
    'dao/note_dao_pickle.py': 'a5/clinic/dao/note_dao_pickle.py',
    'cli/main_menu_cli.py': 'a5/clinic/cli/main_menu_cli.py',
    'gui/clinic_gui.py': 'a5/clinic/gui/clinic_gui.py',
  },
};

export const avrLcdDisplay: SchoolProject = {
  slug: 'avr-lcd-display',
  title: 'AVR-LCD-Display',
  course: 'CSC 230',
  courseName: 'Computer Architecture',
  repo: 'uvic-csc-230',
  badges: ['AVR Assembly', 'C', 'Microcontrollers'],
  highlight: 'Timers and interrupts in assembly',
  summary:
    'Low-level programs for an AVR microcontroller board. They drive a character LCD, scroll messages across it under timer control and respond to the board’s buttons, then rebuild the same ideas in C as a stopwatch.',
  sections: [
    { title: 'Registers and bits', body: '16-bit addition using two 8-bit registers, two’s complement conversion and bit manipulation, all in assembly.' },
    { title: 'I/O ports', body: 'Driving LEDs through I/O ports, table lookups with pointers, and subroutines with explicit stack use.' },
    { title: 'Scrolling LCD', body: 'Messages scrolled across the LCD, paced by hardware timers and interrupts, and controlled with the buttons.' },
    { title: 'Stopwatch', body: 'A stopwatch on the LCD written in C for the AVR, started and stopped with the buttons.' },
  ],
  files: {
    'registers/sixteen-bit-addition.asm': 'assignments/assignment 1/assignment1/assignment1/sixteen-bit-addition.asm',
    'registers/twos-complement.asm': 'assignments/assignment 1/assignment1/assignment1/twos-complement..asm',
    'io-ports/signalling.asm': 'assignments/assignment 2/assignment 2/a2-signalling.asm',
    'lcd/display_partA.asm': 'assignments/assignment 3/assignment 3/display_partA.asm',
    'lcd/display_partB.asm': 'assignments/assignment 3/assignment 3/display_partB.asm',
    'lcd/display_partC.asm': 'assignments/assignment 3/assignment 3/display_partC.asm',
    'lcd/display_partD.asm': 'assignments/assignment 3/assignment 3/display_partD.asm',
    'stopwatch/main.c': 'assignments/assignment 4/Assignment4/main.c',
  },
};

export const surveyProcessor: SchoolProject = {
  slug: 'survey-processor',
  title: 'Survey-Processor',
  course: 'SENG 265',
  courseName: 'Software Development Methods',
  repo: 'uvic-seng-265',
  badges: ['C', 'Memory Management'],
  highlight: 'Dynamic memory in C',
  summary:
    'A command-line tool in C that analyses student survey responses about computer science. The second version is rebuilt around dynamic memory and adds filtering and scoring.',
  sections: [
    { title: 'Parsing', body: 'Reads responses with fgets and strtok into structs, and reports summary results.' },
    { title: 'Dynamic memory', body: 'Rebuilt around dynamic arrays with malloc, calloc and free, and a checked allocator that stops cleanly if memory runs out.' },
    { title: 'Filters and scoring', body: 'Filters respondents by their answers and scores the results, with the code split into input, processing and output modules.' },
  ],
  files: {
    'v1/survey.c': 'a1/survey.c',
    'v2/processing.c': 'a2/processing.c',
    'v2/input_handling.c': 'a2/input_handling.c',
    'v2/emalloc.c': 'a2/emalloc.c',
  },
};

export const oddlyEqualArrays: SchoolProject = {
  slug: 'oddly-equal-arrays',
  title: 'Oddly-Equal-Arrays',
  course: 'CSC 225',
  courseName: 'Algorithms & Data Structures I',
  repo: 'uvic-csc-225',
  badges: ['Java', 'Recursion', 'Hashing'],
  highlight: 'Sub-quadratic: O(n^1.58)',
  summary:
    'A recursive algorithm that decides whether two arrays are “oddly equal”: equal outright, or, when their length is even, equal after splitting both in half and matching the halves in one of three ways. The challenge was to beat quadratic time; this solution runs in O(n^1.58).',
  sections: [
    { title: 'Hashed half-trees', body: 'Each array is split in half repeatedly into a tree, with every node storing a hash of its slice. Building both trees takes O(n log n).' },
    { title: 'Three-way recursion', body: 'Comparing the trees makes at most three recursive calls on halves, so T(n) = 3T(n/2) + O(1), which solves to O(n^log₂3) ≈ O(n^1.58).' },
    { title: 'Result', body: 'The hardest target in the assignment was any O(n^(2−ε)) algorithm; this one meets it.' },
  ],
  files: {
    'OddEquality.java': 'Assignments/Assignment 3/src/OddEquality.java',
  },
};

export const latexWriteups: SchoolProject = {
  slug: 'latex-write-ups',
  title: 'LaTeX-Write-ups',
  course: '6 courses',
  courseName: 'Mathematics, statistics and algorithms',
  badges: ['LaTeX', 'Proofs', 'Statistics'],
  highlight: 'Typeset proofs and problem sets',
  summary:
    'Assignments from my math and theory courses, all typeset in LaTeX: logic and proof, linear algebra, multivariable calculus and differential equations, probability and statistics, and algorithm analysis.',
  sections: [
    { title: 'MATH 122: Logic & Foundations', body: 'Truth tables, proof techniques, set theory, number theory, counting and recursion.' },
    { title: 'MATH 211: Matrix Algebra', body: 'Linear systems, vector spaces, linear transformations, eigenvalues and determinants.' },
    { title: 'MATH 202: Multivariable Calculus', body: 'Vector geometry, partial derivatives, first- and second-order ODEs, and Laplace transforms.' },
    { title: 'STAT 260: Probability & Statistics', body: 'Distributions, the central limit theorem, confidence intervals and hypothesis tests, with R.' },
    { title: 'CSC 225 and CSC 226: Algorithms', body: 'Counting, complexity and correctness proofs, trees and graphs, dynamic programming and network flows.' },
  ],
  files: {
    ...numbered('math-122/assignment', 'uvic-math-122', (n) => `Assignments/Assignment${n}.pdf`, 5),
    ...numbered('math-211/assignment', 'uvic-math-211', (n) => `Assignment${n}.pdf`, 5),
    ...numbered('math-202/homework', 'uvic-math-202', (n) => `Homework_${n}.pdf`, 5),
    ...numbered('stat-260/assignment', 'uvic-stat-260', (n) => `Assignment ${n}.pdf`, 4),
    'csc-225/assignment-1.pdf': { repo: 'uvic-csc-225', path: 'Assignments/Assignment 1/Assignment1_Solution.pdf' },
    'csc-225/assignment-2.pdf': { repo: 'uvic-csc-225', path: 'Assignments/Assignment 2/Assignment2_Solution.pdf' },
    'csc-225/assignment-4.pdf': { repo: 'uvic-csc-225', path: 'Assignments/Assignment 4/Assignment4.pdf' },
    'csc-225/assignment-5.pdf': { repo: 'uvic-csc-225', path: 'Assignments/Assignment 5/Assignment5.pdf' },
    ...Object.fromEntries([2, 3, 4, 5, 6, 7, 8, 9, 11].map((n) => [`csc-226/exercise-${n}.pdf`, { repo: 'uvic-csc-226', path: `exercises/exercise${n}.pdf` }])),
  },
};

export const schoolProjects = [
  rayTracer, webglScenes, shortestPathBenchmark, hashTableBenchmark, clinicManager,
  avrLcdDisplay, surveyProcessor, oddlyEqualArrays, latexWriteups,
];
