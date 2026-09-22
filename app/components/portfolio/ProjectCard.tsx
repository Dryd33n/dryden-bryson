import { MdArrowOutward } from "react-icons/md";
import TechBadge from './TechBadge';

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
    <div className="flex flex-row gap-4 w-[330px]">
      <div className="w-0.5 h-full bg-neutral-300 dark:bg-neutral-700"></div>
      <div className="pt-1 pb-4 flex flex-col h-full">
        <h1 className="text-2xl mb-10 cursor-default text-neutral-900 dark:text-neutral-100">
          <span className="inline text-red-500 text-xl">/</span>{name}
        </h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {techBadges.map((badge, index) => (
            <TechBadge key={index} label={badge} />
          ))}
        </div>
        
        <div className="w-full cursor-default space-y-2">
          {codeStats.map((stat, index) => (
            <div key={index} className="flex justify-between text-xs tracking-wider">
              <span className="text-neutral-700 dark:text-white/80">{stat.language}</span>
              <span className="text-neutral-500 dark:text-white/60">{stat.percentage}</span>
            </div>
          ))}
        </div>
        
        <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-left rounded-sm border border-neutral-300 px-2 py-1 text-xs uppercase tracking-[0.2em] text-neutral-800 transition-all hover:border-accent hover:text-accent-strong hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full dark:border-white dark:text-white"
            >
              <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
