'use client'



import FuzzyText from "@/components/Typography/FuzzyText/FuzzyText";
import BlurTextButton from "@/components/Typography/BlurText/BlurTextButton";
import TiltedCard from "@/components/Components/TiltedCard/TiltedCard";
import { MenuItem } from "@/components/Typography/BlurText/BlurTextButton";
import LetterGlitch from "@/components/Backgrounds/Threads/letterGlitch";

export default function Home() {
  const portfolioItems: MenuItem[] = [{
    title: "/PORTFOLIO",
    clickFn: () => { window.location.href = "/portfolio"; }
  }, {
    title: "├─ CODE",
    clickFn: () => { window.location.href = "/portfolio"; }
  }, {
    title: "├─ RENDERING",
    clickFn: () => { window.location.href = "/portfolio"; }
  }, {
    title: "├─ SCHOOLWORK",
    clickFn: () => { window.location.href = "/portfolio"; }
  }
  ];

  const aboutItems: MenuItem[] = [{
    title: "/ABOUT-ME",
    clickFn: () => { window.location.href = "/about"; }
  }, {
    title: "├─ BIO",
    clickFn: () => { window.location.href = "/about"; }
  }, {
    title: "├─ SKILLS",
    clickFn: () => { window.location.href = "/skills"; }
  }, {
    title: "├─ RESUME",
    clickFn: () => { window.location.href = "/about"; }
  }
  ];

  const contactItems: MenuItem[] = [{
    title: "/CONTACT",
    clickFn: () => { window.location.href = "/contact"; }
  }, {
    title: "├─ SOCIAL MEDIA",
    clickFn: () => { window.location.href = "/contact"; }
  }, {
    title: "├─ EMAIL FORM",
    clickFn: () => { window.location.href = "/contact"; }
  }
  ];



  return (
    <>
      <div className="w-screen h-screen p-6">

        {/* BORDER */}
        <div className="w-full h-full border relative">









          {/* GLITCHTEXT BACKGROUND */}
          <div className="w-full h-full absolute inset-0 -z-50 opacity-[12%]">
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={true}
              glitchColors={["#ffffff", "#f76855", "ffffff", "ffffff", "ffffff", "ffffff"]}
              smooth={true}
            />
          </div>





          {/* CENTER TEXT */}
          <div className="inset-0 flex flex-col items-center justify-center h-full">
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.1}
              enableHover={true}
              fontSize={"5rem"}
              color="#f76855"
            >
              UNDER CONSTRUCTION
            </FuzzyText>
            <div className="h-3"></div>
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.05}
              enableHover={true}
              fontSize={"3rem"}
            >
              COME BACK SOON
            </FuzzyText>
          </div>
        </div>
      </div>
    </>
  );
}