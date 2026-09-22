import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/navigation/Navbar';
import { home, aboutItems, contactItems, portfolioItems } from '@/lib/menuItems';
import { FaCodeBranch } from "react-icons/fa6";
import { TbCube3dSphere } from "react-icons/tb";
import { MdSchool } from "react-icons/md";
import ScrollingContainer from '../components/portfolio/ScrollingContainer';
import ProjectCard from '../components/portfolio/ProjectCard';
import ModelCard from '../components/portfolio/ModelCard';
import CourseCard from '../components/portfolio/CourseCard';
import { spotimasher, sudoku, musicMap, portfolio, ludumDare46 } from '@/lib/projectsData';
import { courses } from '@/lib/schoolworkData';

export const metadata = {
  title: "Portfolio",
  description: "Explore the portfolio of Dryden Bryson, showcasing his software development projects, 3D design work, and school assignments. Discover his skills and creativity in various domains.",
};

export default function Portfolio() {
  const softwareProjects = [spotimasher, sudoku, ludumDare46, musicMap, portfolio];

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
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100"><FaCodeBranch className="text-red-500" />SOFTWARE DEVELOPMENT</h1>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured Software Development Projects:</p>

        <ScrollingContainer>
          {softwareProjects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project.name}
              techBadges={project.techBadges}
              codeStats={project.codeStats}
              links={project.links}
            />
          ))}
        </ScrollingContainer>

        <div className="h-40"></div>
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100"><TbCube3dSphere className="text-red-500" />3D DESIGN</h1>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured 3D Models:</p>

        <ScrollingContainer>
          <ModelCard
            name="Seylynn"
            modelPath="/3D Models/Seylynn.glb"
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Polygons", value: "~5K" },
              { label: "Textures", value: "PBR" },
            ]}
            cameraPosition={[0, 1, 5]}
            svgIcon={
              <svg viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="40" />
              </svg>
            }
          />          
        </ScrollingContainer>

        <div className="h-10"></div>
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100"><MdSchool className="text-red-500" />SCHOOLWORK</h1>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured University of Victoria Coursework:</p>

        <ScrollingContainer>
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </ScrollingContainer>

        <div className="h-40"></div>
      </div>
      
    </>
  );
}