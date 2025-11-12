'use client';

import InfiniteImageGallery from '@/components/Components/InfiniteImageGallery/InfiniteImageGallery';
import FuzzyText from '@/components/Typography/FuzzyText/FuzzyText';
import React from 'react';
import { useScreenWidth } from '../hooks/ScreenWidthProvider';

const Page: React.FC = () => {
    const languageImages = ["java.svg", "python.svg", "typescript.svg", "c.svg", "c-sharp.svg", "r.svg","assembly.svg"];
    const socialImages = ["html.svg", "css.svg", "tailwind.svg", "react.svg", "next.svg", "scenebuilder.svg", "pyqt.svg", "javafx.svg", "unity.svg"];
    const backendImages = ["postgresql.svg", "neon.svg", "drizzle.svg", "nodejs.svg", "github.svg"];
    const designImages = ["illustrator.svg", "photoshop.svg", "premiere.svg", "blender.svg", "latex.svg", "vscode.svg", "jetbrains.svg"];

    const width = useScreenWidth();
    const imageHeight = width**2 / 70000 + 20;

    return (<>
        <div className="inset-0 flex flex-col items-center justify-center h-full">
            <span className='mt-10 mb-12'>
                <FuzzyText
                  baseIntensity={0}
                  hoverIntensity={0.01}
                  enableHover={true}
                  fontSize={"3rem"}
                >
                  SKILLS
                </FuzzyText>
            </span>
        </div>
        {/* <div className='w-[90%] h-[0.5] my-2 bg-white mx-auto opacity-30'></div> */}
        <div className="relative mx-[12vw]">
            {/* Glowing circle */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-r from-white to-transparent opacity-30 blur-3xl"></div>
            </div>
            {/* Image galleries */}
            <div className="relative">
                <InfiniteImageGallery direction={"right"} imageHrefs={languageImages} imageHeight={imageHeight} />
                <InfiniteImageGallery direction={"left"} imageHrefs={socialImages} imageHeight={imageHeight} />
                <InfiniteImageGallery direction={"right"} imageHrefs={backendImages} imageHeight={imageHeight} />
                <InfiniteImageGallery direction={"left"} imageHrefs={designImages} imageHeight={imageHeight} />
            </div>
        </div>
        {/* <div className='w-[90%] h-[0.5] my-2 bg-white mx-auto opacity-30'></div> */}
    </>);
};

export default Page;