'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import ContentCard from './ContentCard';
import ObsidianDownloads, { useObsidianDownloads } from './ObsidianDownloads';
import type { ObsidianPlugin, ProjectData } from '@/lib/projectsData';

// Loaded only when a visitor opens the plugins.
const ObsidianPluginsModal = dynamic(() => import('./ObsidianPluginsModal'), { ssr: false });

/*
  One card for several Obsidian plugins: the downloads stat is their combined total, and
  the action opens a modal with each plugin's details. Counts are fetched once and shared.
*/
export default function ObsidianPluginsCard({ project, plugins }: { project: ProjectData; plugins: ObsidianPlugin[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const pluginIds = plugins.map((p) => p.id);
  const counts = useObsidianDownloads(pluginIds);

  return (
    <>
      <ContentCard
        name={project.name}
        description={project.description}
        badges={project.techBadges}
        stats={[
          { label: 'Total Downloads', value: <ObsidianDownloads pluginIds={pluginIds} counts={counts} /> },
          { label: 'Plugins', value: plugins.length },
          ...project.codeStats.map((stat) => ({ label: stat.language, value: stat.percentage })),
        ]}
        actions={[
          { label: 'Open Plugins', onClick: () => setOpen(true) },
          ...project.links.map((link) => ({ label: link.label, href: link.href })),
        ]}
      />
      {open && <ObsidianPluginsModal title={project.name} plugins={plugins} counts={counts} onClose={close} />}
    </>
  );
}
