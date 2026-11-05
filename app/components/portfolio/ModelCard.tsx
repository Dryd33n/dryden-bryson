'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { MdViewInAr } from "react-icons/md";
import ContentCard from './ContentCard';
import type { EnvironmentSettings } from './3DViewer';

// three.js only loads once a visitor opens the viewer.
const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false });

interface ModelStat {
  label: string;
  value: string;
}

interface ModelCardProps {
  name: string;
  description: string;
  subtitle?: string;
  modelPath: string;
  previewImage?: string;
  techBadges: string[];
  modelStats: ModelStat[];
  cameraDirection?: [number, number, number];
  environment?: EnvironmentSettings;
  focusMaterials?: string[];
}

export default function ModelCard({
  name,
  description,
  subtitle,
  modelPath,
  previewImage,
  techBadges,
  modelStats,
  cameraDirection,
  environment,
  focusMaterials,
}: ModelCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <ContentCard
        name={name}
        description={description}
        badges={techBadges}
        stats={modelStats}
        preview={previewImage ? (
          <button type="button" onClick={() => setIsOpen(true)} aria-label={`Open the ${name} 3D model`} className="group relative w-full h-full cursor-pointer">
            <Image src={previewImage} alt="" fill sizes="330px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ) : (
          <MdViewInAr className="w-20 h-20 text-neutral-400 dark:text-neutral-600" />
        )}
        actions={[{ label: 'View 3D Model', icon: 'model', onClick: () => setIsOpen(true) }]}
      />

      {isOpen && (
        <ModelViewer name={name} subtitle={subtitle} modelPath={modelPath} cameraDirection={cameraDirection} environment={environment} focusMaterials={focusMaterials} onClose={close} />
      )}
    </>
  );
}
