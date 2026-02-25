interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="border border-white/40 text-white/40 py-1 px-2 text-xs rounded-sm whitespace-nowrap transition-colors hover:border-[#f76855] hover:text-[#f76855] cursor-default">
      {label}
    </span>
  );
}
