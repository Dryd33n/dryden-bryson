'use client'



import FuzzyText from "@/components/Typography/FuzzyText/FuzzyText";
import Threads from "@/components/Backgrounds/Threads/Threads";
import BlurTextButton from "@/components/Typography/BlurText/BlurTextButton";
import TiltedCard from "@/components/Components/TiltedCard/TiltedCard";
import { MenuItem } from "@/components/Typography/BlurText/BlurTextButton";
import { useScreenWidth } from "./hooks/ScreenWidthProvider";
import { useRouter } from 'next/navigation';
//import { div } from "framer-motion/client";
// import { WavyBackground } from "@/components/Backgrounds/Threads/wavy-background";
import LetterGlitch from "@/components/Backgrounds/Threads/letterGlitch";

export default function Home() {
  const width = useScreenWidth(); // screen width
  const router = useRouter();

  const portfolioItems: MenuItem[] = [{
    title: "/PORTFOLIO",
    clickFn: () => { router.push('/portfolio'); }
  }, {
    title: "├─ CODE",
    clickFn: () => { router.push('/portfolio?tab=code'); }
  }, {
    title: "├─ RENDERING",
    clickFn: () => { router.push('/portfolio?tab=rendering'); }
  }, {
    title: "├─ SCHOOLWORK",
    clickFn: () => { router.push('/portfolio?tab=schoolwork'); }
  }
  ];

  const aboutItems: MenuItem[] = [{
    title: "/ABOUT-ME",
    clickFn: () => { router.push('/about'); }
  }, {
    title: "├─ BIO",
    clickFn: () => { router.push('/about#bio'); }
  }, {
    title: "├─ SKILLS",
    clickFn: () => { router.push('/skills'); }
  }, {
    title: "├─ RESUME",
    clickFn: () => { router.push('/resume'); }
  }
  ];

  const contactItems: MenuItem[] = [{
    title: "/CONTACT",
    clickFn: () => { router.push('/contact'); }
  }, {
    title: "├─ SOCIAL MEDIA",
    clickFn: () => { router.push('/contact#social'); }
  }, {
    title: "├─ EMAIL FORM",
    clickFn: () => { router.push('/contact#email'); }
  }
  ];



  return (
    <>
      <div className="w-screen h-screen p-6">
        <div className="w-full h-full border relative">

          {width >= 712 ? <div className="absolute top-3 left-5 flex flex-row gap-10">
            <BlurTextButton menuItems={portfolioItems} />
            <BlurTextButton menuItems={aboutItems} />
            <BlurTextButton menuItems={contactItems} />
          </div> : <div className="mx-5">
            <BlurTextButton menuItems={portfolioItems} />
            <BlurTextButton menuItems={aboutItems} />
            <BlurTextButton menuItems={contactItems} />
            </div>}

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
          <div className="w-full h-full absolute inset-0 -z-150 my-auto">
            {/* <Threads
              amplitude={3}
              distance={0}
            /> */}

          </div>
          {/* GLITCHTEXT BACKGROUND */}
          <div className="w-full h-full absolute inset-0 -z-50 opacity-10">
            <LetterGlitch
              glitchSpeed={100}
              centerVignette={true}
              outerVignette={true}
              glitchColors={["#ffffff"]}
              smooth={true}
            />

          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center h-full -z-100">
            <div>
              {width >= 712 ?
                <FuzzyText
                  baseIntensity={0}
                  hoverIntensity={0.01}
                  enableHover={true}
                  fontSize={"5rem"}
                >
                  Dryden Bryson
                </FuzzyText>
                :
                <div>
                  <FuzzyText
                    baseIntensity={0}
                    hoverIntensity={0.01}
                    enableHover={true}
                    fontSize={"5rem"}
                  >
                    Dryden
                  </FuzzyText>
                  <div className="h-3"></div>
                  <FuzzyText
                    baseIntensity={0}
                    hoverIntensity={0.01}
                    enableHover={true}
                    fontSize={"5rem"}
                  >
                    Bryson
                  </FuzzyText>
                </div>

              }
            </div>


            <div className="h-3"></div>


            <div className="w=full">
              {width >= 712 ?
                <FuzzyText
                  baseIntensity={0}
                  hoverIntensity={0.01}
                  enableHover={true}
                  fontSize={"3rem"}
                >
                  Student & Developer
                </FuzzyText>
                :
                <div className="flex flex-col items-center">
                  <FuzzyText
                    baseIntensity={0}
                    hoverIntensity={0.01}
                    enableHover={true}
                    fontSize={"3rem"}
                  >
                    Student
                  </FuzzyText>
                  <div className="h-3"></div>
                  <FuzzyText
                    baseIntensity={0}
                    hoverIntensity={0.01}
                    enableHover={true}
                    fontSize={"3rem"}
                  >
                    &
                  </FuzzyText>
                  <div className="h-3"></div>
                  <FuzzyText
                    baseIntensity={0}
                    hoverIntensity={0.01}
                    enableHover={true}
                    fontSize={"3rem"}
                  >
                    Developer
                  </FuzzyText>
                </div>

              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}