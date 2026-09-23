import { ReactNode } from 'react';
import { MdArrowOutward, MdViewInAr, MdPlayArrow, MdOutlineFolderOpen, MdOutlineDescription } from "react-icons/md";
import TechBadge from './TechBadge';

export interface CardStat {
  label: string;
  value: string;
}

// Each action icon carries its own hover motion.
const actionIcons = {
  external: { Icon: MdArrowOutward, hover: 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' },
  model: { Icon: MdViewInAr, hover: 'group-hover:scale-110' },
  play: { Icon: MdPlayArrow, hover: 'group-hover:scale-110' },
  open: { Icon: MdOutlineFolderOpen, hover: 'group-hover:scale-110' },
  document: { Icon: MdOutlineDescription, hover: 'group-hover:scale-110' },
} as const;

export type CardActionIcon = keyof typeof actionIcons;

// An action either links out (opens in a new tab) or runs a handler, e.g. opening a viewer.
export type CardAction = { label: string; icon?: CardActionIcon } & (
  | { href: string }
  | { onClick: () => void }
);

interface ContentCardProps {
  name: string;
  badges: string[];
  stats?: CardStat[];
  preview?: ReactNode;
  actions?: CardAction[];
}

const actionClass = "group flex items-center rounded-sm border border-neutral-300 px-2 py-1 text-xs uppercase tracking-[0.2em] text-neutral-800 transition-all hover:border-accent hover:text-accent-strong hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer w-full dark:border-white dark:text-white";

/*
  Shared shell for every card in the portfolio: a left rule, a /title, tech badges,
  an optional preview, label/value stats and full-width action buttons.
  ProjectCard, ModelCard and course cards are thin wrappers around it.
*/
export default function ContentCard({ name, badges, stats = [], preview, actions = [] }: ContentCardProps) {
  return (
    <div className="flex flex-row gap-4 w-[330px]">
      <div className="w-0.5 h-full bg-neutral-300 dark:bg-neutral-700"></div>
      <div className="pt-1 pb-4 flex flex-col h-full flex-1 min-w-0">
        <h3 className={`text-2xl cursor-default break-words text-neutral-900 dark:text-neutral-100 ${preview ? 'mb-6' : 'mb-10'}`}>
          <span className="inline text-red-500 text-xl">/</span>{name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge) => (
            <TechBadge key={badge} label={badge} />
          ))}
        </div>

        {preview && (
          <div className="w-full h-32 flex items-center justify-center mb-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
            {preview}
          </div>
        )}

        {stats.length > 0 && (
          <div className="w-full cursor-default space-y-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex justify-between gap-4 text-xs tracking-wider">
                <span className="text-neutral-700 dark:text-white/80">{stat.label}</span>
                <span className="text-right text-neutral-500 dark:text-white/60">{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {actions.length > 0 && (
          <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
            {actions.map((action) => {
              // Links default to the outward arrow; in-page actions default to the folder.
              const { Icon, hover } = actionIcons[action.icon ?? ('href' in action ? 'external' : 'open')];
              const content = (
                <>
                  <Icon className={`inline mr-2 shrink-0 transition-transform ${hover}`} /> {action.label}
                </>
              );
              return 'href' in action ? (
                <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" className={actionClass}>
                  {content}
                </a>
              ) : (
                <button key={action.label} type="button" onClick={action.onClick} className={actionClass}>
                  {content}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
