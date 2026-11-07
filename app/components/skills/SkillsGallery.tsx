'use client'
import { useEffect, useRef } from 'react';
import InfiniteImageGallery from '@/app/components/skills/imagecarousel/InfiniteImageGallery';
import type { SkillGroup } from '@/lib/skills';

interface SkillsGalleryProps {
    groups: SkillGroup[];
    alternateDirection: boolean;
}

const HOVER_PLAYBACK_RATE = 0.25;
const CHIP_GAP = 4;

export default function SkillsGallery({ groups, alternateDirection }: SkillsGalleryProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const chipRef = useRef<HTMLDivElement>(null);
    const pointer = useRef({ x: 0, y: 0 });
    const frame = useRef(0);

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    // updatePlaybackRate changes speed from the current position, where changing animation-duration would make rows jump.
    const setRowSpeed = (rate: number) => {
        galleryRef.current?.getAnimations({ subtree: true }).forEach(animation => animation.updatePlaybackRate(rate));
    };

    // Icons keep drifting under a still mouse, which fires no events, so this checks what's under the pointer each frame.
    const trackIcon = () => {
        frame.current = requestAnimationFrame(trackIcon);
        const wrapper = wrapperRef.current;
        const chip = chipRef.current;
        if (!wrapper || !chip) return;

        const icon = document.elementFromPoint(pointer.current.x, pointer.current.y)?.closest<HTMLElement>('[data-skill]');
        if (!icon) {
            chip.style.visibility = 'hidden';
            return;
        }

        const iconBox = icon.getBoundingClientRect();
        const wrapperBox = wrapper.getBoundingClientRect();
        const x = iconBox.left + iconBox.width / 2 - wrapperBox.left;
        const y = iconBox.top - wrapperBox.top - CHIP_GAP;
        chip.textContent = icon.dataset.skill ?? '';
        chip.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
        chip.style.visibility = 'visible';
    };

    const handlePointerEnter = (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        pointer.current = { x: e.clientX, y: e.clientY };
        setRowSpeed(HOVER_PLAYBACK_RATE);
        cancelAnimationFrame(frame.current);
        trackIcon();
    };

    const handlePointerLeave = () => {
        cancelAnimationFrame(frame.current);
        setRowSpeed(1);
        if (chipRef.current) chipRef.current.style.visibility = 'hidden';
    };

    return (
        <div ref={wrapperRef} className="relative mr-0 md:mr-[40%] opacity-90 select-none">
            {/* Left Glowing Bar */}
            <div className="absolute left-0 top-0 h-full w-[5px] z-20
            bg-[#ff0000]
            shadow-[0_0_12px_#ff0000,0_0_24px_#ff0000,0_0_48px_#ff0000]
            pointer-events-none brightness-150 saturate-200"></div>

            {/* Glowing circle */}
            <div className="absolute inset-0 flex justify-center items-center py-10">
                <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-r from-white to-transparent opacity-30 blur-3xl"></div>
            </div>

            {/* Image galleries: decorative, since the About page lists every skill as text */}
            <div
                ref={galleryRef}
                aria-hidden="true"
                className="infinite-scroll-fade relative overflow-hidden"
                onPointerEnter={handlePointerEnter}
                onPointerMove={(e) => { pointer.current = { x: e.clientX, y: e.clientY }; }}
                onPointerLeave={handlePointerLeave}
            >
                {groups.map((group, index) => {
                    const direction = alternateDirection
                        ? (index % 2 === 0 ? "right" : "left")
                        : "right";

                    return (
                        <InfiniteImageGallery
                            key={group.title}
                            direction={direction}
                            skills={group.skills}
                            imageHeight={40}
                        />
                    );
                })}
            </div>

            {/* Skill name chip. Sits outside the galleries, whose overflow and fade mask would clip it. */}
            <div
                ref={chipRef}
                aria-hidden="true"
                className="absolute left-0 top-0 z-30 rounded-sm border border-accent bg-background px-2 py-1 text-xs whitespace-nowrap text-foreground pointer-events-none"
                style={{ visibility: 'hidden' }}
            ></div>
        </div>
    );
}
