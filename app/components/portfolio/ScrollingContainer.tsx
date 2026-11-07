'use client';
import { useRef, useEffect, ReactNode } from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ScrollingContainerProps {
  children: ReactNode;
}

const DRAG_THRESHOLD = 5; // px a press must move before it counts as a drag rather than a click
const PAGE_SETTLE_MS = 800; // roughly how long a smooth scroll runs; rapid arrow clicks within it add up

const arrowClass = "p-2 text-accent hover:drop-shadow-[0_0_12px_rgba(247,104,85,0.6)] active:scale-90 transition-all cursor-pointer";

export default function ScrollingContainer({ children }: ScrollingContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pageTarget = useRef<number | null>(null);
  const pageTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Moves exactly one card and lands on a card boundary.
  const page = (direction: -1 | 1) => {
    const el = scrollRef.current;
    const cards = rowRef.current?.children;
    if (!el || !cards || cards.length < 2) return;

    const pitch = (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    const from = pageTarget.current ?? el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    // Next boundary in that direction, even from partway between cards. The 1px allows for fractional scroll positions.
    const index = direction > 0 ? Math.floor((from + 1) / pitch) + 1 : Math.ceil((from - 1) / pitch) - 1;
    const target = Math.min(max, Math.max(0, index * pitch));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    pageTarget.current = target;
    clearTimeout(pageTimer.current);
    pageTimer.current = setTimeout(() => { pageTarget.current = null; }, PAGE_SETTLE_MS);
    el.scrollTo({ left: target, behavior: reducedMotion ? 'auto' : 'smooth' });
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

    // Drag the cards themselves with a mouse. Touch and trackpads already scroll natively.
    let press: { pointerId: number; x: number; scrollLeft: number } | null = null;
    let isPanning = false;
    let suppressClick = false;

    const endPan = () => {
      if (isPanning) suppressClick = true; // the click that ends a drag must not open whatever is under the cursor
      isPanning = false;
      press = null;
      delete el.dataset.panning;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      suppressClick = false;
      pageTarget.current = null;
      press = { pointerId: e.pointerId, x: e.clientX, scrollLeft: el.scrollLeft };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!press) return;
      if (e.buttons === 0) {
        endPan(); // released outside the window
        return;
      }
      const deltaX = e.clientX - press.x;
      if (!isPanning) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD) return;
        isPanning = true;
        el.dataset.panning = '';
        el.setPointerCapture(press.pointerId);
      }
      el.scrollLeft = press.scrollLeft - deltaX;
    };

    const handleClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    };

    // Stops links and images starting a browser drag, which would cancel the pan.
    const handleDragStart = (e: DragEvent) => e.preventDefault();

    updateThumb();
    el.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    thumb.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    track.addEventListener('click', handleTrackClick);
    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', endPan);
    el.addEventListener('pointercancel', endPan);
    el.addEventListener('click', handleClickCapture, true);
    el.addEventListener('dragstart', handleDragStart);

    return () => {
      el.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
      thumb.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      track.removeEventListener('click', handleTrackClick);
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', endPan);
      el.removeEventListener('pointercancel', endPan);
      el.removeEventListener('click', handleClickCapture, true);
      el.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  useEffect(() => () => clearTimeout(pageTimer.current), []);

  return (
    <div className="">
      {/* Hide the native scrollbar. From lg up, cards fade out before the dense BlinkingSquares field: the clip-path stops the fully faded area taking clicks, the right padding lets the last card scroll clear of the fade, and scroll-pr brings keyboard-focused cards into view. Touch screens snap to each card. */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2 -mx-4 px-6 md:-mx-10 md:px-12 lg:-mx-40 lg:pl-44 lg:pr-[42vw] lg:[mask-image:linear-gradient(to_right,black_58%,transparent_76%)] lg:[clip-path:inset(0_24%_0_0)] lg:scroll-pr-[42vw] scroll-pl-6 md:scroll-pl-12 lg:scroll-pl-44 [@media(pointer:coarse)]:snap-x [@media(pointer:coarse)]:snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [@media(pointer:fine)]:select-none [@media(pointer:fine)]:cursor-grab [@media(pointer:fine)]:[&_.cursor-default]:cursor-grab [@media(pointer:fine)]:data-panning:cursor-grabbing"
      >
        <div ref={rowRef} className="flex flex-row gap-6 md:gap-16 lg:gap-30 w-max py-5 [&>*]:snap-start">
          {children}
        </div>
      </div>

      {/* Arrows and custom scrollbar: centered on small screens, in the text column from lg up. The pill can't be dragged by touch, and swiping does its job, so touch screens get only the arrows. */}
      <div className="flex items-center justify-center gap-2 mt-2 lg:mr-[40%]">
        <button type="button" onClick={() => page(-1)} className={`${arrowClass} -ml-2`} aria-label="Previous card">
          <MdChevronLeft size={28} />
        </button>

        {/* The track and thumb are taller than the visible pill, so it's easy to grab with a mouse. */}
        <div ref={trackRef} className="relative h-8 w-[60vw] lg:w-auto lg:flex-1 [@media(pointer:coarse)]:hidden rounded-xs bg-transparent cursor-pointer">
          <div ref={thumbRef} className="group absolute top-0 left-0 h-full transition-all duration-75 cursor-grab active:cursor-grabbing">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-xs border-1 border-[#ff6b3d] transition-all group-hover:bg-accent/20 group-hover:drop-shadow-[0_0_12px_rgba(247,104,85,0.8)] group-active:bg-accent/40 pointer-events-none" />
          </div>
        </div>

        <button type="button" onClick={() => page(1)} className={`${arrowClass} -mr-2`} aria-label="Next card">
          <MdChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
