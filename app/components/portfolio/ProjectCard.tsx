import ContentCard from './ContentCard';

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
}

export default function ProjectCard({ name, techBadges, codeStats, links }: ProjectCardProps) {
  return (
    <ContentCard
      name={name}
      badges={techBadges}
      stats={codeStats.map((stat) => ({ label: stat.language, value: stat.percentage }))}
      actions={links.map((link) => ({ label: link.label, href: link.href }))}
    />
  );
}
