export interface ProjectData {
  name: string;
  techBadges: string[];
  codeStats: { language: string; percentage: string }[];
  links: { href: string; label: string }[];
  // Obsidian community plugin id; the card shows its live download count.
  obsidianPluginId?: string;
}

export const batchPdfExport: ProjectData = {
  name: 'Batch-PDF-Export',
  techBadges: ['TypeScript', 'Obsidian API', 'esbuild', 'PDF'],
  codeStats: [
    { language: 'TypeScript', percentage: '97.1%' },
    { language: 'Javascript', percentage: '2.0%' },
    { language: 'CSS', percentage: '0.8%' }
  ],
  links: [
    { href: 'https://community.obsidian.md/plugins/batch-pdf-export', label: 'View Plugin' },
    { href: 'https://github.com/Dryd33n/obsidian-batch-pdf-export', label: 'View Code' }
  ],
  obsidianPluginId: 'batch-pdf-export'
};

export const d2lScraper: ProjectData = {
  name: 'D2L-Scraper',
  techBadges: ['Python', 'Playwright', 'httpx', 'REST API', 'CLI'],
  codeStats: [
    { language: 'Python', percentage: '100%' }
  ],
  links: [
    { href: 'https://github.com/Dryd33n/d2l-scraper', label: 'View Code' }
  ]
};

export const spotimasher: ProjectData = {
  name: 'Spotimasher',
  techBadges: ['OAuth 2.0', 'SPOTIFY API', 'HTML / CSS', 'JavaScript'],
  codeStats: [
    { language: 'Javascript', percentage: '65.0%' },
    { language: 'HTML', percentage: '18.2%' },
    { language: 'CSS', percentage: '16.8%' }
  ],
  links: [
    { href: 'https://spotimasher.web.app', label: 'View Live Demo' },
    { href: 'https://github.com/Dryd33n/Spotimasher', label: 'View Code' }
  ]
};

export const portfolio: ProjectData = {
  name: 'Portfolio',
  techBadges: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  codeStats: [
    { language: 'TypeScript', percentage: '96.4%' },
    { language: 'CSS', percentage: '3.2%' },
    { language: 'Javascript', percentage: '0.4%' }
  ],
  links: [
    { href: 'https://github.com/Dryd33n/dryden-bryson', label: 'View Code' }
  ]
};

export const ludumDare46: ProjectData = {
  name: 'Ludum-Dare-46',
  techBadges: ['Unity', 'C#', '3D Modelling', 'Game Jam'],
  codeStats: [
    { language: 'C#', percentage: '100%' }
  ],
  links: [
    { href: 'https://drydenexe.itch.io/protectorsofthecore', label: 'Play Game' },
    { href: 'https://ldjam.com/events/ludum-dare/46/protectors-of-the-core', label: 'View Results' },
    { href: 'https://github.com/Dryd33n/Ludum-Dare-46', label: 'View Code' }
  ]
};
