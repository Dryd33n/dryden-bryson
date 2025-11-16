'use client';

import InfiniteImageGallery from '@/components/Components/InfiniteImageGallery/InfiniteImageGallery';
import FuzzyText from '@/components/Typography/FuzzyText/FuzzyText';
import React from 'react';
import { useScreenWidth } from '../hooks/ScreenWidthProvider';
import LetterGlitch from '@/components/Backgrounds/Threads/letterGlitch';
import MagicBento from '@/components/Components/MagicBento';

const Page: React.FC = () => {
    const languageImages = ["java.svg", "python.svg", "typescript.svg", "c.svg", "c-sharp.svg", "r.svg", "assembly.svg"];
    const socialImages = ["html.svg", "css.svg", "tailwind.svg", "react.svg", "next.svg", "scenebuilder.svg", "pyqt.svg", "javafx.svg", "unity.svg"];
    const backendImages = ["postgresql.svg", "neon.svg", "drizzle.svg", "nodejs.svg", "github.svg"];
    const designImages = ["illustrator.svg", "photoshop.svg", "premiere.svg", "blender.svg", "latex.svg", "vscode.svg", "jetbrains.svg"];

    const width = useScreenWidth();
    const imageHeight = width ** 2 / 70000 + 20;

    return (<>


        <div className='w-full bg-[#0a0a0a] pb-12'>
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
        </div>

        <div className="w-screen h-fit p-6">
            <div className="w-full h-full border relative">
                <div className="w-full h-full inset-0 -z-50 ">
                    <div className='opacity-10 w-full h-full absolute'>
                        <LetterGlitch
                            glitchSpeed={100}
                            centerVignette={true}
                            outerVignette={true}
                            glitchColors={["#ffffff"]}
                            smooth={true}
                        />
                    </div>

                    <div className='z-20 w-full h-full'>
                        <MagicBento
                            textAutoHide={false}
                            enableStars={false}
                            enableSpotlight={false}
                            enableBorderGlow={true}
                            enableTilt={false}
                            enableMagnetism={false}
                            clickEffect={true}
                            spotlightRadius={300}
                            particleCount={0}
                            glowColor="132, 132, 132"
                        />
                    </div>

                    



                </div>
            </div>
        </div>
    </>);
};

export default Page;