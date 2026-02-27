'use client';
import { useRef, useEffect } from 'react';
import { MdArrowOutward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import TechBadge from './TechBadge';

export default function ScrollingProjects() {
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
          {/* SPOTIMASHER */}
          <div className="flex flex-row gap-4 w-[330px]">
            <div className="w-0.5 h-full bg-[#303030]"></div>
            <div className="pt-1 pb-4 flex flex-col h-full">
              <h1 className="text-2xl mb-10 cursor-default"><span className="inline text-red-500 text-xl">/</span>Spotimasher</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <TechBadge label="OAuth 2.0" />
                <TechBadge label="SPOTIFY API" />
                <TechBadge label="HTML / CSS" />
                <TechBadge label="JavaScript" />
              </div>
              <div className="w-full cursor-default space-y-2">
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">Javascript</span>
                  <span className="text-white/60">65.0%</span>
                </div>
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">HTML</span>
                  <span className="text-white/60">18.2%</span>
                </div>
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">CSS</span>
                  <span className="text-white/60">16.8%</span>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
                <a
                  href="https://spotimasher.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                >
                <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> View Live Demo
                </a>
                <a
                  href="https://github.com/Dryd33n/Spotimasher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                >
                <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />  View Code
                </a>
              </div>
            </div>
          </div>

          {/* SUDOKU */}
          <div className="flex flex-row gap-4 w-[330px]">
            <div className="w-0.5 h-full bg-[#303030]"></div>
            <div className="pt-1 pb-4 flex flex-col h-full">
              <h1 className="text-2xl mb-10 cursor-default"><span className="inline text-red-500 text-xl">/</span>Sudoku</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <TechBadge label="Java" />
                <TechBadge label="JavaFX" />
                <TechBadge label="Backtracking" />
                <TechBadge label="OOP" />
              </div>
              <div className="w-full cursor-default space-y-2">
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">Java</span>
                  <span className="text-white/60">82.1%</span>
                </div>
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">CSS</span>
                  <span className="text-white/60">17.9%</span>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
                <a
                  href="https://github.com/Dryd33n/sudoku"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                >
                  <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> View Code
                </a>
              </div>
            </div>
          </div>

          {/* MUSIC MAP */}
          <div className="flex flex-row gap-4 w-[330px]">
            <div className="w-0.5 h-full bg-[#303030]"></div>
            <div className="pt-1 pb-4 flex flex-col h-full">
              <h1 className="text-2xl mb-10 cursor-default"><span className="inline text-red-500 text-xl">/</span>Music-Map</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <TechBadge label="Python" />
                <TechBadge label="Spotify API" />
                <TechBadge label="Pandas" />
                <TechBadge label="Data Viz" />
              </div>
              <div className="w-full cursor-default space-y-2">
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">Python</span>
                  <span className="text-white/60">100%</span>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
                <a
                  href="https://github.com/Dryd33n/spotifyDataView"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                >
                  <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> View Code
                </a>
              </div>
            </div>
          </div>

          {/* PORTFOLIO */}
          <div className="flex flex-row gap-4 w-[330px]">
            <div className="w-0.5 h-full bg-[#303030]"></div>
            <div className="pt-1 pb-4 flex flex-col h-full">
              <h1 className="text-2xl mb-10 cursor-default"><span className="inline text-red-500 text-xl">/</span>Portfolio</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <TechBadge label="Next.js" />
                <TechBadge label="React" />
                <TechBadge label="TypeScript" />
                <TechBadge label="Tailwind CSS" />
                <TechBadge label="Vercel" />
              </div>
              <div className="w-full cursor-default space-y-2">
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">TypeScript</span>
                  <span className="text-white/60">96.4%</span>
                </div>
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">CSS</span>
                  <span className="text-white/60">3.2%</span>
                </div>
                <div className="flex justify-between text-xs tracking-wider">
                  <span className="text-white/80">Javascript</span>
                  <span className="text-white/60">0.4%</span>
                </div>
              </div>
              <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
                <a
                  href="https://github.com/Dryd33n/drydenbryson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                >
                  <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom centered scrollbar with arrows */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onMouseDown={handleLeftMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="text-[#f76855] hover:drop-shadow-[0_0_12px_rgba(247,104,85,0.6)] active:scale-90 transition-all"
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
          className="text-[#f76855] hover:drop-shadow-[0_0_12px_rgba(247,104,85,0.6)] active:scale-90 transition-all"
          aria-label="Scroll right"
        >
          <MdChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
