import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import { home, aboutItems, contactItems, portfolioItems } from '@/lib/menuItems';
import { FaCodeBranch } from "react-icons/fa6";
import { TbCube3dSphere } from "react-icons/tb";
import { MdArrowOutward, MdSchool } from "react-icons/md";
import TechBadge from '../components/portfolio/TechBadge';

export const metadata = {
  title: "Portfolio",
  description: "Explore the portfolio of Dryden Bryson, showcasing his software development projects, 3D design work, and school assignments. Discover his skills and creativity in various domains.",
};

export default function Portfolio() {
  return (
    <>
      {/* HEADER */}
      <div className="relative">
        <div className="absolute top-6 left-6 z-10">
          <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
        </div>
        <PageHeader title="PORTFOLIO" />
      </div>

      <div className='px-4 md:px-10 lg:px-40'>
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default"><FaCodeBranch className="text-red-500" />SOFTWARE DEVELOPMENT</h1>
        <p className="mb-4">Featured Software Development Projects:</p>

        <div className="overflow-x-auto pb-6 -mx-4 px-4 md:-mx-10 md:px-10 lg:-mx-40 lg:px-40">
          <div className="flex flex-row gap-30 w-max py-5">
            <div className="flex flex-row gap-4 w-[330px]">
              <div className="w-0.5 h-full bg-[#303030]"></div>
              <div className="pt-1 pb-4 flex flex-col h-full">
                <h1 className="text-2xl mb-10"><span className="inline text-red-500 text-xl">/</span>Spotimasher</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <TechBadge label="OAuth 2.0" />
                  <TechBadge label="SPOTIFY API" />
                  <TechBadge label="HTML / CSS" />
                  <TechBadge label="JavaScript" />
                </div>
                <div className="w-full cursor-default space-y-2">
                  <div className="flex justify-between text-xs tracking-wider">
                    <span className="text-white/80">Javascript</span>
                    <span className="text-white/60">65.0%</span>
                  </div>
                  <div className="flex justify-between text-xs tracking-wider">
                    <span className="text-white/80">HTML</span>
                    <span className="text-white/60">18.2%</span>
                  </div>
                  <div className="flex justify-between text-xs tracking-wider">
                    <span className="text-white/80">CSS</span>
                    <span className="text-white/60">16.8%</span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
                  <a
                    href="https://spotimasher.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                  >
                  <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> View Live Demo
                  </a>
                  <a
                    href="https://github.com/Dryd33n/Spotimasher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                  >
                  <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />  View Code 
                  </a>
                </div>
              </div>

            </div>

            <div className="flex flex-row gap-4 w-[330px]">
              <div className="w-0.5 h-full bg-[#303030]"></div>
              <div className="pt-1 pb-4 flex flex-col h-full">
                <h1 className="text-2xl mb-10"><span className="inline text-red-500 text-xl">/</span>Sudoku</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <TechBadge label="Java" />
                  <TechBadge label="JavaFX" />
                  <TechBadge label="Backtracking" />
                  <TechBadge label="OOP" />
                </div>
                <div className="w-full cursor-default space-y-2">
                  <div className="flex justify-between text-xs tracking-wider">
                    <span className="text-white/80">Java</span>
                    <span className="text-white/60">82.1%</span>
                  </div>
                  <div className="flex justify-between text-xs tracking-wider">
                    <span className="text-white/80">CSS</span>
                    <span className="text-white/60">17.9%</span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
                  <a
                    href="https://github.com/Dryd33n/sudoku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                  >
                    <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> View Code
                  </a>
                </div>
              </div>

            </div>

            <div className="flex flex-row gap-4 w-[330px]">
              <div className="w-0.5 h-full bg-[#303030]"></div>
              <div className="pt-1 pb-4 flex flex-col h-full">
                <h1 className="text-2xl mb-10"><span className="inline text-red-500 text-xl">/</span>Music-Map</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <TechBadge label="Python" />
                  <TechBadge label="Spotify API" />
                  <TechBadge label="Pandas" />
                  <TechBadge label="Data Viz" />
                </div>
                <div className="w-full cursor-default space-y-2">
                  <div className="flex justify-between text-xs tracking-wider">
                    <span className="text-white/80">Python</span>
                    <span className="text-white/60">100%</span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start gap-3 mt-auto pt-10">
                  <a
                    href="https://github.com/Dryd33n/spotifyDataView"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-left rounded-sm border border-white px-2 py-1 text-xs uppercase tracking-[0.2em] text-white transition-all hover:border-[#f76855] hover:text-[#f76855] hover:shadow-[0_0_12px_rgba(247,104,85,0.3)] cursor-pointer w-full"
                  >
                    <MdArrowOutward className="inline mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> View Code
                  </a>
                </div>
              </div>

            </div>

            

          </div>
        </div>

        <div className="h-10"></div>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><TbCube3dSphere className="text-red-500" />3D DESIGN</h1>
        <div className="h-40"></div>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><MdSchool className="text-red-500" />SCHOOLWORK</h1>
        <div className="h-40"></div>
      </div>
    </>
  );

}