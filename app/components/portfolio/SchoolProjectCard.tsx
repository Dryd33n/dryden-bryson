'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import ContentCard, { type CardAction } from './ContentCard';
import { type SchoolProject, githubUrl } from '@/lib/schoolworkData';

// Loaded only when a visitor opens a project.
const ProjectViewer = dynamic(() => import('./ProjectViewer'), { ssr: false });

// `undefined` = closed, `null` = open on the overview, a string = open at that file.
type ViewerState = undefined | null | string;

export default function SchoolProjectCard({ project }: { project: SchoolProject }) {
  const [viewer, setViewer] = useState<ViewerState>(undefined);
  const close = useCallback(() => setViewer(undefined), []);

  const actions: CardAction[] = [
    { label: 'Open Project', onClick: () => setViewer(null) },
    ...(project.shortcuts ?? []).map((s) => ({ label: s.label, icon: s.icon, onClick: () => setViewer(s.file) })),
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
      {viewer !== undefined && <ProjectViewer project={project} initialFile={viewer ?? undefined} onClose={close} />}
    </>
  );
}
