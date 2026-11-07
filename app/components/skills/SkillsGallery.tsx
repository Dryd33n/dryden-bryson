'use client'
import InfiniteImageGallery from '@/app/components/skills/imagecarousel/InfiniteImageGallery';

interface SkillsGalleryProps {
    images: string[][];
    alternateDirection: boolean;
}

export default function SkillsGallery({ images, alternateDirection }: SkillsGalleryProps) {
    return (
        <div className="relative mr-0 md:mr-[40%] opacity-90 select-none">
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
            <div className="infinite-scroll-fade relative overflow-hidden">
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
