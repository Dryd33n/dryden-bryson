// A count fetched live: undefined while loading, null if it couldn't be fetched. A pulsing dot marks it as live.
export default function LiveCount({ value }: { value: number | null | undefined }) {
  if (value === null) return <span>—</span>;

  return (
    <span className="inline-flex items-center gap-1.5" aria-live="polite">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
      </span>
      {value === undefined ? '…' : value.toLocaleString()}
    </span>
  );
}
