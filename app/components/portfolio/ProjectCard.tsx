import ContentCard from './ContentCard';
import ObsidianDownloads from './ObsidianDownloads';

interface CodeStat {
  language: string;
  percentage: string;
}

interface Link {
  href: string;
  label: string;
}

interface ProjectCardProps {
  name: string;
  techBadges: string[];
  codeStats: CodeStat[];
  links: Link[];
  obsidianPluginId?: string;
}

export default function ProjectCard({ name, techBadges, codeStats, links, obsidianPluginId }: ProjectCardProps) {
  const stats = codeStats.map((stat) => ({ label: stat.language, value: stat.percentage }));

  return (
    <ContentCard
      name={name}
      badges={techBadges}
      stats={obsidianPluginId
        ? [{ label: 'Obsidian Downloads', value: <ObsidianDownloads pluginId={obsidianPluginId} /> }, ...stats]
        : stats}
      actions={links.map((link) => ({ label: link.label, href: link.href }))}
    />
  );
}
