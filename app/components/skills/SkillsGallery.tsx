'use client'
import { useTheme } from "next-themes";
import InfiniteImageGallery from '@/app/components/skills/imagecarousel/InfiniteImageGallery';

interface SkillsGalleryProps {
    images: string[][];
    alternateDirection: boolean;
    justification?: 'left' | 'center';
}

export default function SkillsGallery({ images, alternateDirection, justification }: SkillsGalleryProps) {
    const { theme } = useTheme();

    return (
        <div className="relative mr-0 md:mr-[20%] opacity-90 select-none">
            {/* Right Solid Bar for clipping */}
            <div className={`absolute w-5 h-full z-20 -right-2 ${theme === "light" ? "bg-[#ffffff]" : "bg-[#0a0a0a]"}`}></div>
            
            {/* Left Glowing Bar */}
            <div className="absolute -left-[3px] top-0 h-full w-[5px] z-20
            bg-[#ff0000]
            shadow-[0_0_12px_#ff0000,0_0_24px_#ff0000,0_0_48px_#ff0000]
            pointer-events-none brightness-150 saturate-200"></div>

            {/* Glowing circle */}
            <div className="absolute inset-0 flex justify-center items-center py-10">
                <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-r from-white to-transparent opacity-30 blur-3xl"></div>
            </div>

            {/* Image galleries */}
            <div className="relative overflow-hidden">
                {images.map((imageArray, index) => {
                    const direction = alternateDirection
                        ? (index % 2 === 0 ? "right" : "left")
                        : "right";
                    
                    return (
                        <InfiniteImageGallery
                            key={index}
                            direction={direction}
                            imageHrefs={imageArray}
                            imageHeight={40}
                        />
                    );
                })}
            </div>
        </div>
    );
}
