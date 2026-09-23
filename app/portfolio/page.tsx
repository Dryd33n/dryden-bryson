import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/navigation/Navbar';
import { home, aboutItems, contactItems, portfolioItems } from '@/lib/menuItems';
import { FaCodeBranch } from "react-icons/fa6";
import { TbCube3dSphere } from "react-icons/tb";
import { MdSchool } from "react-icons/md";
import ScrollingContainer from '../components/portfolio/ScrollingContainer';
import ProjectCard from '../components/portfolio/ProjectCard';
import ModelCard from '../components/portfolio/ModelCard';
import SchoolProjectCard from '../components/portfolio/SchoolProjectCard';
import { spotimasher, sudoku, musicMap, portfolio, ludumDare46 } from '@/lib/projectsData';
import { schoolProjects } from '@/lib/schoolworkData';

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
        <h2 className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100"><FaCodeBranch className="text-red-500" />SOFTWARE DEVELOPMENT</h2>
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
        <h2 className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100"><TbCube3dSphere className="text-red-500" />3D DESIGN</h2>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured 3D Models:</p>

        <ScrollingContainer>
          <ModelCard
            name="Seylynn"
            modelPath="/3D Models/Seylynn.glb"
            subtitle="Seylynn Bowl skatepark"
            cameraDirection={[1, 2, 1]}
            focusMaterials={["Bowl", "Grass", "Seylynn_Sign", "Seylynn_Sign_Shiny"]}
            environment={{ file: "/3D Models/hdri/misty_pines.hdr" }}
            previewImage="/3D Models/seylynn-preview.webp"
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Triangles", value: "35K" },
              { label: "Textures", value: "4K PBR" },
            ]}
          />
          <ModelCard
            name="Griffin-Bowl"
            modelPath="/3D Models/GriffinBowl.glb"
            environment={{ file: "/3D Models/hdri/skate_park.hdr" }}
            subtitle="Griffin Bowl skatepark"
            previewImage="/3D Models/griffinbowl-preview.webp"
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Triangles", value: "17K" },
              { label: "Textures", value: "4K PBR" },
            ]}
          />
          <ModelCard
            name="Backyard-Pool"
            modelPath="/3D Models/BackyardPool.glb"
            environment={{ file: "/3D Models/hdri/tiergarten.hdr", intensity: 1.3 }}
            subtitle="Backyard pool skatepark"
            previewImage="/3D Models/backyardpool-preview.webp"
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Triangles", value: "117K" },
              { label: "Textures", value: "4K PBR" },
            ]}
          />
          <ModelCard
            name="VX1000"
            modelPath="/3D Models/VX1000.glb"
            environment={{ file: "/3D Models/hdri/studio_small_08.hdr" }}
            subtitle="Sony VX1000 camcorder"
            previewImage="/3D Models/vx1000-preview.webp"
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Triangles", value: "17K" },
              { label: "Textures", value: "1K PBR" },
            ]}
          />
        </ScrollingContainer>

        <div className="h-10"></div>
        <h2 className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100"><MdSchool className="text-red-500" />SCHOOLWORK</h2>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured Projects from University of Victoria Courses:</p>

        <ScrollingContainer>
          {schoolProjects.map((project) => (
            <SchoolProjectCard key={project.slug} project={project} />
          ))}
        </ScrollingContainer>

        <div className="h-40"></div>
      </div>
      
    </>
  );
}