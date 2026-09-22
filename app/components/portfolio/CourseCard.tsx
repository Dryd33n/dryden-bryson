import ContentCard from './ContentCard';
import type { CourseData } from '@/lib/schoolworkData';

export default function CourseCard({ code, name, badges, work, links }: CourseData) {
  return (
    <ContentCard
      name={code}
      badges={badges}
      stats={[
        { label: 'Course', value: name },
        { label: 'Work', value: work },
      ]}
      actions={links}
    />
  );
}
