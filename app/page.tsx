'use client'



import FuzzyText from "@/components/Typography/FuzzyText/FuzzyText";
import Threads from "@/components/Backgrounds/Threads/Threads";
import BlurTextButton from "@/components/Typography/BlurText/BlurTextButton";
import TiltedCard from "@/components/Components/TiltedCard/TiltedCard";
import { MenuItem } from "@/components/Typography/BlurText/BlurTextButton";
import LetterGlitch from "@/components/Backgrounds/Threads/letterGlitch";
// import { WavyBackground } from "@/components/Backgrounds/Threads/wavy-background";
// import LetterGlitch from "@/components/Backgrounds/Threads/letterGlitch";

export default function Home() {
  const portfolioItems: MenuItem[] = [{
    title: "/PORTFOLIO",
    clickFn: () => { console.log("PORTFOLIO"); }
  }, {
    title: "├─ CODE",
    clickFn: () => { console.log("CODE"); }
  }, {
    title: "├─ RENDERING",
    clickFn: () => { console.log("RENDERING"); }
  }, {
    title: "├─ SCHOOLWORK",
    clickFn: () => { console.log("SCHOOLWORK"); }
  }
  ];

  const aboutItems: MenuItem[] = [{
    title: "/ABOUT-ME",
    clickFn: () => { console.log("ABOUT-ME"); }
  }, {
    title: "├─ BIO",
    clickFn: () => { console.log("BIO"); }
  }, {
    title: "├─ SKILLS",
    clickFn: () => { window.location.href = "/skills"; }
  }, {
    title: "├─ RESUME",
    clickFn: () => { console.log("RESUME"); }
  }
  ];

  const contactItems: MenuItem[] = [{
    title: "/CONTACT",
    clickFn: () => { console.log("ABOUT-ME"); }
  }, {
    title: "├─ SOCIAL MEDIA",
    clickFn: () => { console.log("BIO"); }
  }, {
    title: "├─ EMAIL FORM",
    clickFn: () => { console.log("RESUME"); }
  }
  ];



  return (
    <>
      <div className="w-screen h-screen p-6">
        <div className="w-full h-full border relative">
          <div className="absolute top-3 left-5 flex flex-row gap-10">
            <BlurTextButton menuItems={portfolioItems} />
            <BlurTextButton menuItems={aboutItems} />
            <BlurTextButton menuItems={contactItems} />

          </div>
            <div className="absolute bottom-0 right-2 flex flex-row gap-2">
            <div className="h-[60] w-[60] overflow-hidden mt-3">
              <a href="https://github.com/Dryd33n" target="_blank" rel="noopener noreferrer">
              <TiltedCard
                imageSrc="github.svg"
              />
              </a>
            </div>
            <div className="h-[60] w-[60] overflow-hidden mt-3">
              <a href="https://www.linkedin.com/in/drydenbryson/" target="_blank" rel="noopener noreferrer">
              <TiltedCard
                imageSrc="linkedin.svg"
              />
              </a>
            </div>
            </div>


          {/* THREADS BACKGROUND */}
          {/* <div className="w-full h-full absolute inset-0 -z-50 my-auto">
            <Threads
              amplitude={3}
              distance={0}
            />

          </div> */}
          {/* GLITCHTEXT BACKGROUND */}
          <div className="w-full h-full absolute inset-0 -z-50 opacity-10">
            {<LetterGlitch
              glitchSpeed={100}
              centerVignette={true}
              outerVignette={true}
              glitchColors={["#ffffff"]}
              smooth={true}
            />}

          </div>
          <div className="inset-0 flex flex-col items-center justify-center h-full">
            <FuzzyText
              baseIntensity={0.05}
              hoverIntensity={0.1}
              enableHover={true}
              fontSize={"5rem"}
            >
              Dryden Bryson
            </FuzzyText>
            <div className="h-3"></div>
            <FuzzyText
              baseIntensity={0.025}
              hoverIntensity={0.05}
              enableHover={true}
              fontSize={"3rem"}
            >
              Student & Developer
            </FuzzyText>
          </div>
        </div>
      </div>
    </>
  );
}