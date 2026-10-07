'use client';

import { useEffect, useState } from 'react';

/*
  Live download count for an Obsidian community plugin, fetched from
  /api/obsidian-downloads. A pulsing dot marks the value as live.
*/
export default function ObsidianDownloads({ pluginId }: { pluginId: string }) {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`/api/obsidian-downloads?plugin=${encodeURIComponent(pluginId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { downloads: number }) => setDownloads(data.downloads))
      .catch(() => setFailed(true));
  }, [pluginId]);

  if (failed) return <span>—</span>;

  return (
    <span className="inline-flex items-center gap-1.5" aria-live="polite">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-safe:animate-ping"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
      </span>
      {downloads === null ? '…' : downloads.toLocaleString()}
    </span>
  );
}
