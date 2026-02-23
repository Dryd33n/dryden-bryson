'use client'
import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import InfiniteImageGallery from '@/app/components/skills/imagecarousel/InfiniteImageGallery';
import { IoMdCode } from "react-icons/io";
import { useTheme } from "next-themes";
import { home, portfolioItems, contactItems } from '@/lib/menuItems';

export default function Contact() {
    const { theme } = useTheme();
    const languageImages = ["java.svg", "python.svg", "typescript.svg", "c.svg", "c-sharp.svg", "r.svg", "assembly.svg"];
    const socialImages = ["html.svg", "css.svg", "tailwind.svg", "react.svg", "next.svg", "scenebuilder.svg", "pyqt.svg", "javafx.svg", "unity.svg"];
    const backendImages = ["postgresql.svg", "neon.svg", "drizzle.svg", "nodejs.svg", "github.svg"];
    const designImages = ["illustrator.svg", "photoshop.svg", "premiere.svg", "blender.svg", "latex.svg", "vscode.svg", "jetbrains.svg"];


    return (<>

        {/* HEADER */}
        <div className="relative">
            <div className="absolute top-6 left-6 z-10">
                <Navbar menuItemArrays={[home, portfolioItems, contactItems]} layout="horizontal" />
            </div>
            <PageHeader title="ABOUT" />
        </div>
        <div className=' px-4 md:px-10 lg:px-40'>
            <div className="md:mr-[40%]">
                <p className="mt-0 text-sm md:text-base">
                    I&#39;m <span className="text-red-500">Dryden Bryson</span>, a computer science student and programmer based in Canada. I like building things that actually work - and work well.
                    <br /><br />
                    My journey started at about 13 years old, with my dad's hungover friend teaching me to code in C on a raspberry pi in my basement. Why anyone thought that was a good idea is still unclear, but I&#39;m grateful it happened.
                    <br /><br />
                    What started with a &#34;guess the random number&#34; game turned into programming between many levels of software, from assembly to typescript and everything in between. Beyond programming, I explore the world of game design and 3D modeling, the outdoors and cooking.
                </p>
            </div>

            <div className="h-40"></div>


            <h1 className="text-4xl font-bold mb-8 flex items-center gap-2"><IoMdCode className="text-red-500" />SKILLS</h1>
            <div className="relative mr-0 md:mr-[20%] opacity-90">
                <div className={`absolute w-5 h-full z-20 -right-2 ${theme === "light" ? "bg-[#ffffff]" : "bg-[#0a0a0a]"}`}></div>
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
                    

                    <InfiniteImageGallery direction={"right"} imageHrefs={languageImages} imageHeight={40} />
                    <InfiniteImageGallery direction={"left"} imageHrefs={socialImages} imageHeight={40} />
                    <InfiniteImageGallery direction={"right"} imageHrefs={backendImages} imageHeight={40} />
                    <InfiniteImageGallery direction={"left"} imageHrefs={designImages} imageHeight={40} />

                </div>
            </div>

            <div className="h-40"></div>
        </div>

    </>)


}