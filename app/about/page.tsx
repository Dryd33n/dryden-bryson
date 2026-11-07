import BlinkingSquares from '../components/backgrounds/BlinkingSquares';
import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/navigation/Navbar';
import SkillsGallery from '@/app/components/skills/SkillsGallery';
import { IoMdCode } from "react-icons/io";
import { SiSuperuser } from "react-icons/si";
import { MdOutlineSchool } from "react-icons/md";
import { home, aboutItems, portfolioItems, contactItems } from '@/lib/menuItems';

export const metadata = {
  title: "About",
  description: "Learn more about Dryden Bryson, a computer science student and programmer based in Canada. Explore his bio, skills, and education background.",
};

export default function About() {
    const languageImages = ["icons/java.svg", "icons/python.svg", "icons/typescript.svg", "icons/c.svg", "icons/c-sharp.svg", "icons/r.svg", "icons/assembly.svg"];
    const socialImages = ["icons/html.svg", "icons/css.svg", "icons/tailwind.svg", "icons/react.svg", "icons/next.svg", "icons/scenebuilder.svg", "icons/pyqt.svg", "icons/javafx.svg", "icons/unity.svg"];
    const backendImages = ["icons/postgresql.svg", "icons/neon.svg", "icons/drizzle.svg", "icons/nodejs.svg", "icons/github.svg"];
    const designImages = ["icons/illustrator.svg", "icons/photoshop.svg", "icons/premiere.svg", "icons/blender.svg", "icons/latex.svg", "icons/vscode.svg", "icons/jetbrains.svg"];

    const education: { school: string; credential: string; dates: string; location: string; detail?: string }[] = [
        {
            school: "University of Victoria",
            credential: "BSc, Computer Science",
            dates: "Sept 2023 - June 2027 (expected)",
            location: "Victoria, BC",
            detail: "Software Systems Specialization"
        },
        {
            school: "Handsworth Secondary",
            credential: "Dual Dogwood Diploma",
            dates: "June 2023",
            location: "North Vancouver, BC",
            detail: "Academic awards in District Authority and Information Technology.",
        },
    ];


    return (<div className="relative">
        <BlinkingSquares />

        {/* HEADER */}
        <div className="relative">
            <div className="relative z-10 px-6 pt-6 lg:absolute lg:top-6 lg:left-6 lg:p-0">
                <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
            </div>
            <PageHeader title="ABOUT" />
        </div>
        <div className=' px-4 md:px-10 lg:px-40'>
            {/* BIO */}
            <div className="md:mr-[40%]">
                <section id="bio"></section>
                <h2 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><SiSuperuser  className="text-red-500" />BIO</h2>
                <p className="mt-0 text-sm md:text-base cursor-default">
                    I&#39;m <span className="text-red-600 dark:text-red-500">Dryden Bryson</span>, a computer science student and programmer based in Canada. I like building things that actually work - and work well.
                    <br /><br />
                    My journey started at about 13 years old, with my dad&#39;s hungover friend teaching me to code in C on a raspberry pi in my basement. Why anyone thought that was a good idea is still unclear, but I&#39;m grateful it happened.
                    <br /><br />
                    What started with a &#34;guess the random number&#34; game turned into programming between many levels of software, from assembly to typescript and everything in between. Beyond programming, I explore the world of game design and 3D modeling, the outdoors and cooking.
                </p>
            </div>

            <div className="h-40"></div>

            {/* SKILLS */}
            <section id="skills"></section>
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><IoMdCode className="text-red-500" />SKILLS</h2>
            <p className="mb-4 md:mr-[40%] cursor-default">The languages, frameworks and tools I use to take projects from idea to finished product: front end, back end and design.</p>
            <SkillsGallery 
                images={[languageImages, socialImages, backendImages, designImages]}
                alternateDirection={true}
            />

            <div className="h-40"></div>
            <section id="education"></section>
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><MdOutlineSchool  className="text-red-500" />EDUCATION</h2>
            <div className="flex flex-col gap-10 md:mr-[40%] cursor-default">
                {education.map((entry) => (
                    <div key={entry.school} className="flex flex-row gap-4">
                        <div className="w-0.5 shrink-0 bg-neutral-300 dark:bg-neutral-700"></div>
                        <div className="flex-1 py-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                <h3 className="text-xl md:text-2xl text-neutral-900 dark:text-neutral-100">
                                    <span className="text-accent">/</span>{entry.school}
                                </h3>
                                <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{entry.dates}</div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mt-2 text-sm md:text-base">
                                <div className="text-neutral-800 dark:text-neutral-200">{entry.credential}</div>
                                <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">{entry.location}</div>
                            </div>
                            {entry.detail && (
                                <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">{entry.detail}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-40"></div>
        </div>

    </div>)


}