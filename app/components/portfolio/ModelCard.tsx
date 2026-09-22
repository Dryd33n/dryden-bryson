'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MdViewInAr } from "react-icons/md";
import ContentCard from './ContentCard';
import ThreeDViewer from './3DViewer';

interface ModelStat {
  label: string;
  value: string;
}

interface ModelCardProps {
  name: string;
  modelPath: string;
  svgIcon?: React.ReactNode;
  techBadges: string[];
  modelStats: ModelStat[];
  cameraPosition?: [number, number, number];
  referenceImages?: string[];
}

export default function ModelCard({ 
  name, 
  modelPath, 
  svgIcon,
  techBadges, 
  modelStats,
  cameraPosition = [0, 0, 5],
  referenceImages = []
}: ModelCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ContentCard
        name={name}
        badges={techBadges}
        stats={modelStats}
        preview={svgIcon ? (
          <div className="w-20 h-20 text-neutral-700 dark:text-neutral-300">
            {svgIcon}
          </div>
        ) : (
          <MdViewInAr className="w-20 h-20 text-neutral-400 dark:text-neutral-600" />
        )}
        actions={[{ label: 'View 3D Model', icon: 'model', onClick: () => setIsModalOpen(true) }]}
      />

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-[90vw] h-[90vh] max-w-[1400px] bg-neutral-900 rounded-lg shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-red-500 transition-colors bg-black/50 rounded-full p-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Model Title */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 px-4 py-2 rounded-md">
              <h2 className="text-white text-xl font-bold">
                <span className="text-red-500">/</span>{name}
              </h2>
            </div>

            {/* 3D Viewer Frame */}
            <div className="flex-1 p-4 pt-16 overflow-hidden">
              <div className="w-full h-full border-2 border-neutral-700 rounded-lg overflow-hidden bg-neutral-800">
                <ThreeDViewer 
                  modelPath={modelPath}
                  cameraPosition={cameraPosition}
                  backgroundColor="#1a1a1a"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Controls and Reference Images Section */}
            <div className="flex gap-4 p-4 border-t border-neutral-700 bg-neutral-800/50">
              {/* Controls */}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-white text-sm font-semibold mb-2 uppercase tracking-wider">Controls</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-neutral-700 rounded border border-neutral-600">Left Click</kbd>
                    <span>Rotate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-neutral-700 rounded border border-neutral-600">Scroll</kbd>
                    <span>Zoom</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-neutral-700 rounded border border-neutral-600">Right Click</kbd>
                    <span>Pan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-neutral-700 rounded border border-neutral-600">Double Click</kbd>
                    <span>Reset</span>
                  </div>
                </div>
              </div>

              {/* Reference Images (Optional) */}
              {referenceImages.length > 0 && (
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-white text-sm font-semibold mb-2 uppercase tracking-wider">Reference Images</h3>
                  <div className="flex gap-2 overflow-x-auto">
                    {referenceImages.map((imagePath, index) => (
                      <div 
                        key={index}
                        className="flex-shrink-0 w-24 h-24 border border-neutral-600 rounded overflow-hidden bg-neutral-700"
                      >
                        <Image 
                          src={imagePath} 
                          alt={`Reference ${index + 1}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
