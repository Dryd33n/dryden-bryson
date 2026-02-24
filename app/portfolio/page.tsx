import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import { home, aboutItems, contactItems, portfolioItems } from '@/lib/menuItems';
import { FaCodeBranch } from "react-icons/fa6";
import { TbCube3dSphere } from "react-icons/tb";
import { MdSchool } from "react-icons/md";

export const metadata = {
  title: "Portfolio",
  description: "Explore the portfolio of Dryden Bryson, showcasing his software development projects, 3D design work, and school assignments. Discover his skills and creativity in various domains.",
};

export default function Portfolio(){

return (<>

{/* HEADER */}
<div className="relative">
  <div className="absolute top-6 left-6 z-10">
    <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
  </div>
  <PageHeader title="PORTFOLIO" />
</div>

<div className=' px-4 md:px-10 lg:px-40'>
  <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><FaCodeBranch  className="text-red-500" />SOFTWARE DEVELOPMENT</h1>
  <div className="h-40"></div>
  <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><TbCube3dSphere  className="text-red-500" />3D DESIGN</h1>
  <div className="h-40"></div>
  <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 cursor-default"><MdSchool  className="text-red-500" />SCHOOLWORK</h1>
  <div className="h-40"></div>
</div>


</>)


}