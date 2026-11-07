'use client';

import { useEffect, useState } from 'react';
import LiveCount from './LiveCount';

// Live total downloads for a mod.io mod, from /api/modio-downloads.
export default function ModDownloads({ modId }: { modId: number }) {
  const [downloads, setDownloads] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/modio-downloads?mod=${modId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { downloads: number }) => setDownloads(data.downloads))
      .catch(() => setDownloads(null));
  }, [modId]);

  return <LiveCount value={downloads} />;
}
