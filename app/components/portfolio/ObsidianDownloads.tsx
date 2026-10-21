'use client';

import { useEffect, useState } from 'react';

// Per plugin: undefined while loading, null if the count couldn't be fetched.
export type DownloadCounts = Record<string, number | null | undefined>;

// Fetches live download counts for Obsidian community plugins from /api/obsidian-downloads.
export function useObsidianDownloads(pluginIds: string[]): DownloadCounts {
  const [counts, setCounts] = useState<DownloadCounts>({});
  const key = pluginIds.join(',');

  useEffect(() => {
    key.split(',').forEach((id) => {
      fetch(`/api/obsidian-downloads?plugin=${encodeURIComponent(id)}`)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data: { downloads: number }) => setCounts((c) => ({ ...c, [id]: data.downloads })))
        .catch(() => setCounts((c) => ({ ...c, [id]: null })));
    });
  }, [key]);

  return counts;
}

/*
  Live download total for one or more plugins. Waits for every count, then sums the ones
  that loaded; shows a dash only if none did. A pulsing dot marks the value as live.
*/
export default function ObsidianDownloads({ pluginIds, counts }: { pluginIds: string[]; counts: DownloadCounts }) {
  const values = pluginIds.map((id) => counts[id]);
  const loading = values.some((v) => v === undefined);
  const loaded = values.filter((v): v is number => typeof v === 'number');

  if (!loading && loaded.length === 0) return <span>—</span>;

  return (
    <span className="inline-flex items-center gap-1.5" aria-live="polite">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
      </span>
      {loading ? '…' : loaded.reduce((sum, v) => sum + v, 0).toLocaleString()}
    </span>
  );
}
