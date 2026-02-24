import Image from 'next/image';
import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import { home, aboutItems, contactItems, portfolioItems } from '@/lib/menuItems';
import { FaCodeBranch } from "react-icons/fa6";
import { TbCube3dSphere } from "react-icons/tb";
import { MdSchool } from "react-icons/md";
import PortfolioPixelCard from '../components/portfolio/PortfolioPixelCard';
import SpotimasherModal from '../components/portfolio/projectModals/spotimasher';
import SudokuModal from '../components/portfolio/projectModals/sudoku modal';

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
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><FaCodeBranch className="text-red-500" />SOFTWARE DEVELOPMENT</h1>

        <div className="overflow-x-auto pb-6 -mx-4 px-4 md:-mx-10 md:px-10 lg:-mx-40 lg:px-40">
          <div className="flex flex-row gap-5 w-max">
            <PortfolioPixelCard
              variant="pink"
              cardContent={
                <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-10 text-center">
                  <p className="text-[#e9d5ff] font-semibold tracking-[0.22em] text-[20px] drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
                    SPOTIMASHER
                  </p>
                  <Image
                    src="/spotimasher_logo.webp"
                    alt="Spotimasher Logo"
                    width={741}
                    height={161}
                    className="w-[82%] object-contain drop-shadow-[0_0_45px_rgba(168,85,247,0.9)] opacity-95 saturate-150"
                  />
                  <p className="text-[#c4b5fd] text-sm leading-relaxed drop-shadow-[0_0_10px_rgba(139,92,246,0.45)]">
                    Merge two Spotify playlists into one seamless mix.
                  </p>
                </div>
              }
              modalContent={
                <SpotimasherModal />
              }
            />

            <PortfolioPixelCard
              variant="pink"
              cardContent={
                <div className="absolute inset-0 flex flex-col items-center justify-between px-6 py-10 text-center">
                  <p className="text-[#e9d5ff] font-semibold tracking-[0.22em] text-[20px] drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
                    JAVAFX SUDOKU
                  </p>
                  <Image
                    src="/sudoku.webp"
                    alt="Sudoku Logo"
                    width={741}
                    height={161}
                    className="w-[82%] object-contain drop-shadow-[0_0_45px_rgba(168,85,247,0.3)] opacity-50 saturate-150 p-10"
                  />
                  <p className="text-[#c4b5fd] text-sm leading-relaxed drop-shadow-[0_0_10px_rgba(139,92,246,0.45)]">
                    Classic sudoku game with visualized solving algorithms. 
                  </p>
                </div>
              }
              modalContent={
                <SudokuModal />
              }
            />

            
          </div>
        </div>

        <div className="h-40"></div>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><TbCube3dSphere className="text-red-500" />3D DESIGN</h1>
        <div className="h-40"></div>
        <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><MdSchool className="text-red-500" />SCHOOLWORK</h1>
        <div className="h-40"></div>
      </div>
    </>
  );

}