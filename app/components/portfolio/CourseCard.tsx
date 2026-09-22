'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import ContentCard from './ContentCard';
import { type CourseData, githubUrl } from '@/lib/schoolworkData';

// Loaded only when a visitor opens a project.
const ProjectViewer = dynamic(() => import('./ProjectViewer'), { ssr: false });

export default function CourseCard({ course }: { course: CourseData }) {
  const [openFile, setOpenFile] = useState<string | null>(null);
  const close = useCallback(() => setOpenFile(null), []);

  const primary = course.primary ?? { label: 'Open Project', file: Object.keys(course.files)[0], icon: 'open' as const };
  const shortcuts = [primary, ...(course.shortcuts ?? [])];

  return (
    <>
      <ContentCard
        name={course.code}
        badges={course.badges}
        stats={[
          { label: 'Course', value: course.name },
          { label: 'Work', value: course.work },
        ]}
        actions={[
          ...shortcuts.map((s) => ({ label: s.label, icon: s.icon, onClick: () => setOpenFile(s.file) })),
          { label: 'View Code', href: githubUrl(course.repo) },
        ]}
      />
      {openFile && <ProjectViewer course={course} initialFile={openFile} onClose={close} />}
    </>
  );
}
