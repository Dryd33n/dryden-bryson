'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import ContentCard, { type CardAction } from './ContentCard';
import { type SchoolProject, githubUrl } from '@/lib/schoolworkData';

// Loaded only when a visitor opens a project.
const ProjectViewer = dynamic(() => import('./ProjectViewer'), { ssr: false });

// Where the viewer is open: undefined = closed, {} = the overview.
type ViewerState = undefined | { file?: string; tab?: 'demo' };

export default function SchoolProjectCard({ project }: { project: SchoolProject }) {
  const [viewer, setViewer] = useState<ViewerState>(undefined);
  const close = useCallback(() => setViewer(undefined), []);

  const actions: CardAction[] = [
    { label: 'Open Project', onClick: () => setViewer({}) },
    ...(project.shortcuts ?? []).map((s) => ({ label: s.label, icon: s.icon, onClick: () => setViewer({ file: s.file, tab: s.tab }) })),
    ...(project.repo ? [{ label: 'View Code', href: githubUrl(project.repo) }] : []),
  ];

  return (
    <>
      <ContentCard
        name={project.title}
        badges={project.badges}
        stats={[
          { label: 'Course', value: project.course },
          { label: 'Highlight', value: project.highlight },
        ]}
        actions={actions}
      />
      {viewer && <ProjectViewer project={project} initialFile={viewer.file} initialTab={viewer.tab} onClose={close} />}
    </>
  );
}
