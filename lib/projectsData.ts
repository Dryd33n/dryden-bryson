export interface CodeStat {
  language: string;
  percentage: string;
}

export interface ProjectLink {
  href: string;
  label: string;
}

// One Obsidian community plugin, shown inside the combined plugins card and its modal.
export interface ObsidianPlugin {
  id: string; // community plugin id, used for the live download count
  name: string;
  summary: string;
  version: string;
  platforms: string;
  features: string[];
  techBadges: string[];
  codeStats: CodeStat[];
  links: ProjectLink[];
}

export interface ProjectData {
  name: string;
  description: string;
  techBadges: string[];
  codeStats: CodeStat[];
  links: ProjectLink[];
  // Plugins grouped on one card; it sums their downloads and opens a detail modal.
  obsidianPlugins?: ObsidianPlugin[];
}

export const ephget: ProjectData = {
  name: 'ephget',
  description: 'A simple lightweight ephemeral portable app manager for Windows written in Go.',
  techBadges: ['Go', 'Windows', 'CLI', 'PowerShell'],
  codeStats: [
    { language: 'Go', percentage: '75.4%' },
    { language: 'Python', percentage: '18.6%' },
    { language: 'HTML', percentage: '4.0%' },
    { language: 'PowerShell', percentage: '1.9%' }
  ],
  links: [
    { href: 'https://ephget.dryd3n.ca/', label: 'View Catalog' },
    { href: 'https://github.com/Dryd33n/ephget', label: 'View Code' }
  ]
};

export const qlaudified: ProjectData = {
  name: 'qlaudified',
  description: 'A Claude Code plugin that tracks each fact’s source and caveats.',
  techBadges: ['Python', 'Claude Code', 'Hooks', 'LLM Evaluation'],
  codeStats: [
    { language: 'Python', percentage: '99.8%' },
    { language: 'Shell', percentage: '0.1%' }
  ],
  links: [
    { href: 'https://github.com/Dryd33n/qlaudified/blob/master/eval/README.md#pre-registered-comparison-oct-21-2026', label: 'View Evaluation' },
    { href: 'https://github.com/Dryd33n/qlaudified', label: 'View Code' }
  ]
};

export const obsidianPlugins: ProjectData = {
  name: 'Obsidian-Plugins',
  description: 'Two Obsidian plugins: batch export of notes to PDF, and automatic tagging by folder.',
  techBadges: ['TypeScript', 'Obsidian API', 'esbuild'],
  // Combined across both repos, by GitHub's byte counts.
  codeStats: [
    { language: 'TypeScript', percentage: '79.4%' },
    { language: 'Javascript', percentage: '18.8%' },
    { language: 'CSS', percentage: '1.8%' }
  ],
  links: [],
  obsidianPlugins: [
    {
      id: 'batch-pdf-export',
      name: 'Batch PDF Export',
      summary: 'Export a whole folder of notes to PDF, either one PDF per note or one combined PDF with a table of contents, bookmarks and working links.',
      version: '1.1.0',
      platforms: 'Desktop',
      features: [
        'Renders like Reading view: math, Mermaid, callouts, code, tables and embeds',
        'Combined PDF with a title page and linked table of contents',
        'Drag to choose note order, or sort by name or date',
        'Clean print style, whatever your theme'
      ],
      techBadges: ['TypeScript', 'Obsidian API', 'esbuild', 'PDF'],
      codeStats: [
        { language: 'TypeScript', percentage: '97.1%' },
        { language: 'Javascript', percentage: '2.0%' },
        { language: 'CSS', percentage: '0.8%' }
      ],
      links: [
        { href: 'https://community.obsidian.md/plugins/batch-pdf-export', label: 'View Plugin' },
        { href: 'https://github.com/Dryd33n/obsidian-batch-pdf-export', label: 'View Code' }
      ]
    },
    {
      id: 'tagging-folder',
      name: 'Tagging Folder',
      summary: 'Automatically tag notes based on the folder they live in.',
      version: '1.0.0',
      platforms: 'Desktop & Mobile',
      features: [
        'Right-click a folder to give it a tag',
        'New and moved-in notes are tagged as they arrive',
        'Nested folders stack their tags',
        'Renames and moves keep tagging in sync; the note body is never edited'
      ],
      techBadges: ['TypeScript', 'Obsidian API', 'esbuild'],
      codeStats: [
        { language: 'TypeScript', percentage: '49.8%' },
        { language: 'Javascript', percentage: '49.7%' },
        { language: 'CSS', percentage: '0.6%' }
      ],
      links: [
        { href: 'https://github.com/Dryd33n/obsidian-tagging-folder/releases/latest', label: 'View Release' },
        { href: 'https://github.com/Dryd33n/obsidian-tagging-folder', label: 'View Code' }
      ]
    }
  ]
};

export const d2lScraper: ProjectData = {
  name: 'D2L-Scraper',
  description: 'Archives your D2L Brightspace courses for offline use and builds study packs from them.',
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
  description: 'Blends two Spotify playlists into a new one on your account.',
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
  description: 'This site: a portfolio designed like a filesystem.',
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
  description: 'A Unity game jam entry where you shield a decaying spaceship’s core from debris.',
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
