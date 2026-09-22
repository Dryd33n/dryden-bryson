'use client';
import { useRef, useEffect, ReactNode } from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ScrollingContainerProps {
  children: ReactNode;
}

export default function ScrollingContainer({ children }: ScrollingContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction === 'left' ? -100 : 100;
    }
  };

  const handleLeftMouseDown = () => {
    scroll('left');
    scrollIntervalRef.current = setInterval(() => scroll('left'), 100);
  };

  const handleRightMouseDown = () => {
    scroll('right');
    scrollIntervalRef.current = setInterval(() => scroll('right'), 100);
  };

  const handleMouseUp = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!el || !thumb || !track) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const updateThumb = () => {
      const ratio = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      const trackWidth = track.offsetWidth;
      const thumbWidth = Math.max((el.clientWidth / el.scrollWidth) * trackWidth, 40);
      thumb.style.width = `${thumbWidth}px`;
      thumb.style.transform = `translateX(${ratio * (trackWidth - thumbWidth)}px)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
      document.body.style.userSelect = 'none';
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const trackWidth = track.offsetWidth;
      const thumbWidth = parseFloat(thumb.style.width);
      const scrollableWidth = el.scrollWidth - el.clientWidth;
      const scrollRatio = scrollableWidth / (trackWidth - thumbWidth);
      
      el.scrollLeft = startScrollLeft + (deltaX * scrollRatio);
      
      // Manually update thumb position during drag
      const ratio = el.scrollLeft / scrollableWidth;
      thumb.style.transform = `translateX(${ratio * (trackWidth - thumbWidth)}px)`;
      
      e.preventDefault();
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = '';
      }
    };

    const handleTrackClick = (e: MouseEvent) => {
      if (e.target !== track) return;
      
      const trackRect = track.getBoundingClientRect();
      const clickX = e.clientX - trackRect.left;
      const trackWidth = track.offsetWidth;
      const thumbWidth = parseFloat(thumb.style.width);
      const scrollableWidth = el.scrollWidth - el.clientWidth;
      
      const ratio = (clickX - thumbWidth / 2) / (trackWidth - thumbWidth);
      el.scrollLeft = ratio * scrollableWidth;
    };

    updateThumb();
    el.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    thumb.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    track.addEventListener('click', handleTrackClick);

    return () => {
      el.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
      thumb.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      track.removeEventListener('click', handleTrackClick);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="">
      {/* Hide the native scrollbar */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2 -mx-4 px-6 md:-mx-10 md:px-12 lg:-mx-40 lg:px-44 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex flex-row gap-30 w-max py-5">
          {children}
        </div>
      </div>

      {/* Custom centered scrollbar with arrows */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onMouseDown={handleLeftMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="text-accent hover:drop-shadow-[0_0_12px_rgba(247,104,85,0.6)] active:scale-90 transition-all"
          aria-label="Scroll left"
        >
          <MdChevronLeft size={24} />
        </button>
        
        <div ref={trackRef} className="relative h-3 w-[60vw] rounded-xs bg-transparent cursor-pointer">
          <div
            ref={thumbRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r rounded-xs border-1 border-[#ff6b3d] transition-all duration-75 cursor-grab active:cursor-grabbing hover:drop-shadow-[0_0_12px_rgba(247,104,85,0.8)]"
          />
        </div>
        
        <button
          onMouseDown={handleRightMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="text-accent hover:drop-shadow-[0_0_12px_rgba(247,104,85,0.6)] active:scale-90 transition-all"
          aria-label="Scroll right"
        >
          <MdChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
