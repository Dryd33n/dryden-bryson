export interface Skill {
  name: string;
  icon: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

// Drives both the readable list and the decorative icon rows on the About page.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: '/icons/java.svg' },
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'C', icon: '/icons/c.svg' },
      { name: 'C#', icon: '/icons/c-sharp.svg' },
      { name: 'R', icon: '/icons/r.svg' },
      { name: 'Assembly', icon: '/icons/assembly.svg' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', icon: '/icons/html.svg' },
      { name: 'CSS', icon: '/icons/css.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Next.js', icon: '/icons/next.svg' },
      { name: 'Scene Builder', icon: '/icons/scenebuilder.svg' },
      { name: 'PyQt', icon: '/icons/pyqt.svg' },
      { name: 'JavaFX', icon: '/icons/javafx.svg' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
      { name: 'Neon', icon: '/icons/neon.svg' },
      { name: 'Drizzle', icon: '/icons/drizzle.svg' },
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
    ],
  },
  {
    title: 'Design & Tools',
    skills: [
      { name: 'Illustrator', icon: '/icons/illustrator.svg' },
      { name: 'Photoshop', icon: '/icons/photoshop.svg' },
      { name: 'Premiere Pro', icon: '/icons/premiere.svg' },
      { name: 'Blender', icon: '/icons/blender.svg' },
      { name: 'Unity', icon: '/icons/unity.svg' },
      { name: 'LaTeX', icon: '/icons/latex.svg' },
      { name: 'VS Code', icon: '/icons/vscode.svg' },
      { name: 'JetBrains IDEs', icon: '/icons/jetbrains.svg' },
      { name: 'GitHub', icon: '/icons/github.svg' },
    ],
  },
];
