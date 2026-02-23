'use client'
import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import SkillsGallery from '@/app/components/skills/SkillsGallery';
import { IoMdCode } from "react-icons/io";
import { SiSuperuser } from "react-icons/si";
import { MdOutlineSchool } from "react-icons/md";
import { home, aboutItems, portfolioItems, contactItems } from '@/lib/menuItems';

export default function About() {
    const languageImages = ["java.svg", "python.svg", "typescript.svg", "c.svg", "c-sharp.svg", "r.svg", "assembly.svg"];
    const socialImages = ["html.svg", "css.svg", "tailwind.svg", "react.svg", "next.svg", "scenebuilder.svg", "pyqt.svg", "javafx.svg", "unity.svg"];
    const backendImages = ["postgresql.svg", "neon.svg", "drizzle.svg", "nodejs.svg", "github.svg"];
    const designImages = ["illustrator.svg", "photoshop.svg", "premiere.svg", "blender.svg", "latex.svg", "vscode.svg", "jetbrains.svg"];


    return (<>

        {/* HEADER */}
        <div className="relative">
            <div className="absolute top-6 left-6 z-10">
                <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
            </div>
            <PageHeader title="ABOUT" />
        </div>
        <div className=' px-4 md:px-10 lg:px-40'>
            {/* BIO */}
            <div className="md:mr-[40%]">
                <section id="bio"></section>
                <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><SiSuperuser  className="text-red-500" />BIO</h1>
                <p className="mt-0 text-sm md:text-base cursor-default">
                    I&#39;m <span className="text-red-500">Dryden Bryson</span>, a computer science student and programmer based in Canada. I like building things that actually work - and work well.
                    <br /><br />
                    My journey started at about 13 years old, with my dad&#39;s hungover friend teaching me to code in C on a raspberry pi in my basement. Why anyone thought that was a good idea is still unclear, but I&#39;m grateful it happened.
                    <br /><br />
                    What started with a &#34;guess the random number&#34; game turned into programming between many levels of software, from assembly to typescript and everything in between. Beyond programming, I explore the world of game design and 3D modeling, the outdoors and cooking.
                </p>
            </div>

            <div className="h-40"></div>

            {/* SKILLS */}
            <section id="skills"></section>
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><IoMdCode className="text-red-500" />SKILLS</h1>
            <p className="mb-4 md:mr-[40%]">With many years of experience in programming and software development, I have developed skills ranging from the front end to the back end of software development, design and more. </p>
            <SkillsGallery 
                images={[languageImages, socialImages, backendImages, designImages]}
                alternateDirection={true}
            />

            <div className="h-40"></div>
            <section id="education"></section>
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><MdOutlineSchool  className="text-red-500" />EDUCATION</h1>
            <div className="h-40"></div>
            <div className="h-40"></div>
            <div className="h-40"></div>
        </div>

    </>)


}