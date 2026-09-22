export interface ProjectData {
  name: string;
  techBadges: string[];
  codeStats: { language: string; percentage: string }[];
  links: { href: string; label: string }[];
}

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

export const sudoku: ProjectData = {
  name: 'Sudoku',
  techBadges: ['Java', 'JavaFX', 'Backtracking', 'OOP'],
  codeStats: [
    { language: 'Java', percentage: '82.1%' },
    { language: 'CSS', percentage: '17.9%' }
  ],
  links: [
    { href: 'https://github.com/Dryd33n/sudoku', label: 'View Code' }
  ]
};

export const musicMap: ProjectData = {
  name: 'Music-Map',
  techBadges: ['Python', 'Spotify API', 'Pandas', 'Numpy'],
  codeStats: [
    { language: 'Python', percentage: '100%' }
  ],
  links: [
    { href: 'https://github.com/Dryd33n/spotifyDataView', label: 'View Code' }
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
