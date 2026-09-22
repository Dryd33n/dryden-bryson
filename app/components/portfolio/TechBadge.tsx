interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="border border-neutral-300 text-neutral-600 py-1 px-2 text-xs rounded-sm whitespace-nowrap transition-colors hover:border-accent hover:text-accent-strong cursor-default dark:border-white/40 dark:text-white/40">
      {label}
    </span>
  );
}
