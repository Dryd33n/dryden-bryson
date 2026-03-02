'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import './InfiniteImageGallery.css';

interface InfiniteScrollGalleryProps {
  imageHrefs: string[];
  direction: "left" | "right";
  imageHeight?: number; // New property for image height
}

const InfiniteImageGallery = ({ imageHrefs, direction, imageHeight = 100 }: InfiniteScrollGalleryProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [imageWidth] = useState(25); // Default width for images
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = container.offsetWidth;
      if (containerWidth) {
        // Calculate the number of images that fit in the container based on image size
        const imagesToDisplay = Math.ceil(containerWidth / imageWidth);
        setImages(Array(imagesToDisplay * 2).fill(imageHrefs).flat()); // Double the list and adjust for full width
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [imageHrefs, imageWidth]);

  return (
    <div className="infinite-scroll-container" ref={containerRef}>
      <div className={direction === "left" ? `scrolling-row-left` : `scrolling-row-right`}>
        <div className='flex flex-row -translate-x-[100vw]'>
          {images.map((href, index) => (
            <Image
              key={index}
              src={href}
              alt={`Image ${index}`}
              width={imageWidth}
              height={imageHeight}
              className="scrolling-image pointer-events-none invert dark:invert-0 drop-shadow-[0_0_5px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.25)]"
              style={{ height: `${imageHeight}px`, width: 'auto' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteImageGallery;
