'use client'

import InfiniteImageGallery from '@/app/components/skills/imagecarousel/InfiniteImageGallery';
import FuzzyText from '@/app/components/typography/FuzzyText/FuzzyText';
import Navbar from '@/app/components/global/Navbar';
import { home, portfolioItems, aboutItems, contactItems } from '@/lib/menuItems';
import React from 'react';

const Page: React.FC = () => {
    const languageImages = ["java.svg", "python.svg", "typescript.svg", "c.svg", "c-sharp.svg", "r.svg","assembly.svg"];
    const socialImages = ["html.svg", "css.svg", "tailwind.svg", "react.svg", "next.svg", "scenebuilder.svg", "pyqt.svg", "javafx.svg", "unity.svg"];
    const backendImages = ["postgresql.svg", "neon.svg", "drizzle.svg", "nodejs.svg", "github.svg"];
    const designImages = ["illustrator.svg", "photoshop.svg", "premiere.svg", "blender.svg", "latex.svg", "vscode.svg", "jetbrains.svg"];

    return (<>
        {/* HEADER */}
        <div className="relative mb-8">
            <div className="absolute top-0 left-6 z-10">
                <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
            </div>
        </div>
        
        <div className="inset-0 flex flex-col items-center justify-center h-full">
            <span className='mt-10 mb-4'>
                <FuzzyText
                  baseIntensity={0.05}
                  hoverIntensity={0.1}
                  enableHover={true}
                  fontSize={"3rem"}
                >
                  SKILLS
                </FuzzyText>
            </span>
        </div>

        <div className='w-[90%] h-[0.5] my-2 bg-white mx-auto opacity-30'></div>
        
        <div className="relative mx-[20vw]">
            {/* Glowing circle */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-r from-white to-transparent opacity-30 blur-3xl"></div>
            </div>
            {/* Image galleries */}
            
            <div className="relative">
                <InfiniteImageGallery direction={"right"} imageHrefs={languageImages} imageHeight={65} />
                <InfiniteImageGallery direction={"left"} imageHrefs={socialImages} imageHeight={65} />
                <InfiniteImageGallery direction={"right"} imageHrefs={backendImages} imageHeight={65} />
                <InfiniteImageGallery direction={"left"} imageHrefs={designImages} imageHeight={65} />
                
            </div>
        </div>
        <div className='w-[90%] h-[0.5] my-2 bg-white mx-auto opacity-30'></div>
    </>);
};

export default Page;