'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import type { Skill } from '@/lib/skills';
import './InfiniteImageGallery.css';

interface InfiniteScrollGalleryProps {
  skills: Skill[];
  direction: "left" | "right";
  imageHeight?: number; // New property for image height
}

// Narrowest an icon and its margins can be; used to make sure one half of a row always fills the container.
const MIN_IMAGE_SPACE = 55;
const SECONDS_PER_IMAGE = 5;

const InfiniteImageGallery = ({ skills, direction, imageHeight = 100 }: InfiniteScrollGalleryProps) => {
  const [sets, setSets] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = container.offsetWidth;
      if (containerWidth) {
        setSets(Math.ceil(containerWidth / (skills.length * MIN_IMAGE_SPACE)));
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [skills]);

  // Two identical halves: the row moves by exactly one half, so the loop is seamless.
  const half: Skill[] = Array(sets).fill(skills).flat();
  const images = [...half, ...half];

  return (
    <div className="infinite-scroll-container" ref={containerRef}>
      <div
        className={direction === "left" ? `scrolling-row-left` : `scrolling-row-right`}
        style={{ animationDuration: `${half.length * SECONDS_PER_IMAGE}s` }}
      >
        {images.map((skill, index) => (
          <Image
            key={index}
            src={skill.icon}
            alt=""
            data-skill={skill.name}
            draggable={false}
            width={25}
            height={imageHeight}
            className="scrolling-image invert dark:invert-0 drop-shadow-[0_0_5px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.25)]"
            style={{ height: `${imageHeight}px`, width: 'auto' }}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteImageGallery;
