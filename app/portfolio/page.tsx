import BlinkingSquares from '../components/backgrounds/BlinkingSquares';
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
import ObsidianPluginsCard from '../components/portfolio/ObsidianPluginsCard';
import { ephget, qlaudified, obsidianPlugins, d2lScraper, spotimasher, portfolio, ludumDare46 } from '@/lib/projectsData';
import { schoolProjects } from '@/lib/schoolworkData';
import { griffinBowlMod, seylynnBowlMod, thePoolMod } from '@/lib/modio';

export const metadata = {
  title: "Portfolio",
  description: "Explore the portfolio of Dryden Bryson, showcasing his software development projects, 3D design work, and school assignments. Discover his skills and creativity in various domains.",
};

export default function Portfolio() {
  const softwareProjects = [ephget, qlaudified, obsidianPlugins, d2lScraper, portfolio, spotimasher, ludumDare46];

  return (
    <div className="relative">
      <BlinkingSquares showFrom="lg" />

      {/* HEADER */}
      <div className="relative">
        <div className="relative z-10 px-6 pt-6 lg:absolute lg:top-6 lg:left-6 lg:p-0">
          <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
        </div>
        <PageHeader title="PORTFOLIO" />
      </div>

      <div className='px-4 md:px-10 lg:px-40'>
        <h2 id="software" className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100 scroll-mt-8"><FaCodeBranch className="text-red-500" />SOFTWARE DEVELOPMENT</h2>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured Software Development Projects:</p>

        <ScrollingContainer>
          {softwareProjects.map((project) => project.obsidianPlugins ? (
            <ObsidianPluginsCard key={project.name} project={project} plugins={project.obsidianPlugins} />
          ) : (
            <ProjectCard
              key={project.name}
              name={project.name}
              description={project.description}
              techBadges={project.techBadges}
              codeStats={project.codeStats}
              links={project.links}
            />
          ))}
        </ScrollingContainer>

        <div className="h-40"></div>
        <h2 id="schoolwork" className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100 scroll-mt-8"><MdSchool className="text-red-500" />SCHOOLWORK</h2>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured Projects from University of Victoria Courses:</p>

        <ScrollingContainer>
          {schoolProjects.map((project) => (
            <SchoolProjectCard key={project.slug} project={project} />
          ))}
        </ScrollingContainer>

        <div className="h-40"></div>
        <h2 id="rendering" className="text-4xl font-bold mb-2 flex items-center gap-2 cursor-default text-neutral-900 dark:text-neutral-100 scroll-mt-8"><TbCube3dSphere className="text-red-500" />3D DESIGN</h2>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">Featured 3D Models:</p>

        <ScrollingContainer>
          <ModelCard
            name="Seylynn"
            description="A 3D model of the Seylynn Bowl skatepark, textured with 4K PBR materials."
            modelPath="/3D Models/Seylynn.glb"
            subtitle="Seylynn Bowl skatepark"
            cameraDirection={[1, 2, 1]}
            focusMaterials={["Bowl", "Grass", "Seylynn_Sign", "Seylynn_Sign_Shiny"]}
            environment={{ file: "/3D Models/hdri/misty_pines.hdr" }}
            previewImage="/3D Models/seylynn-preview.webp"
            mod={seylynnBowlMod}
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Triangles", value: "35K" },
              { label: "Textures", value: "4K PBR" },
            ]}
          />
          <ModelCard
            name="Backyard-Pool"
            description="A 3D model of a backyard pool skatepark, textured with 4K PBR materials."
            modelPath="/3D Models/BackyardPool.glb"
            environment={{ file: "/3D Models/hdri/tiergarten.hdr", intensity: 1.3 }}
            subtitle="Backyard pool skatepark"
            previewImage="/3D Models/backyardpool-preview.webp"
            mod={thePoolMod}
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Triangles", value: "117K" },
              { label: "Textures", value: "4K PBR" },
            ]}
          />
          <ModelCard
            name="Griffin-Bowl"
            description="A 3D model of the Griffin Bowl skatepark, textured with 4K PBR materials."
            modelPath="/3D Models/GriffinBowl.glb"
            environment={{ file: "/3D Models/hdri/skate_park.hdr" }}
            subtitle="Griffin Bowl skatepark"
            previewImage="/3D Models/griffinbowl-preview.webp"
            mod={griffinBowlMod}
            techBadges={["Blender", "Substance Painter"]}
            modelStats={[
              { label: "Format", value: "GLB" },
              { label: "Triangles", value: "17K" },
              { label: "Textures", value: "4K PBR" },
            ]}
          />
          <ModelCard
            name="VX1000"
            description="A 3D model of the Sony VX1000, the camcorder behind countless skate videos."
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

        <div className="h-40"></div>
      </div>
      
    </div>
  );
}