import ContentCard from './ContentCard';
import type { CodeStat, ProjectLink } from '@/lib/projectsData';

interface ProjectCardProps {
  name: string;
  description: string;
  techBadges: string[];
  codeStats: CodeStat[];
  links: ProjectLink[];
}

export default function ProjectCard({ name, description, techBadges, codeStats, links }: ProjectCardProps) {
  return (
    <ContentCard
      name={name}
      description={description}
      badges={techBadges}
      stats={codeStats.map((stat) => ({ label: stat.language, value: stat.percentage }))}
      actions={links.map((link) => ({ label: link.label, href: link.href }))}
    />
  );
}
