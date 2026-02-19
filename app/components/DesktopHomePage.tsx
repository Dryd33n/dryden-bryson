import FuzzyText from "@/components/Typography/FuzzyText/FuzzyText";
import BlurTextButton from "@/components/Typography/BlurText/BlurTextButton";
import TiltedCard from "@/components/Components/TiltedCard/TiltedCard";
import LetterGlitch from "@/components/Backgrounds/Threads/letterGlitch";
import DarkModeToggle from "./global/DarkModeToggle";
import { portfolioItems, aboutItems, contactItems } from "@/lib/menuItems";
import { useColorScheme } from "@/lib/colorScheme";

export default function DesktopHomePage() {
  
  const { glitchTextColors, titleColor, iconColor } = useColorScheme();

  



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
            <div className="flex items-end mt-3">
              <DarkModeToggle />
            </div>
            <div className="h-[60] w-[60] overflow-hidden mt-3">
              <a href="https://github.com/Dryd33n" target="_blank" rel="noopener noreferrer">
                <TiltedCard imageSrc="github.svg" color={iconColor} />
              </a>
            </div>
            <div className="h-[60] w-[60] overflow-hidden mt-3">
              <a href="https://www.linkedin.com/in/drydenbryson/" target="_blank" rel="noopener noreferrer">
                <TiltedCard imageSrc="linkedin.svg" color={iconColor} />
              </a>
            </div>
          </div>

          {/* THREADS BACKGROUND */}
          <div className="w-full h-full absolute inset-0 -z-50 my-auto">
            {/* <Threads
              amplitude={3}
              distance={0}
            /> */}
          </div>

          {/* GLITCHTEXT BACKGROUND */}
          <div className="w-full h-full absolute inset-0 -z-50 opacity-[12%]">
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={true}
              glitchColors={glitchTextColors[1]}
              vignetteColor={glitchTextColors[0][0]}
              backgroundColor = {glitchTextColors[0][1]}
              smooth={true}
            />
          </div>

          <div className="inset-0 flex flex-col items-center justify-center h-full">
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.1}
              enableHover={true}
              fontSize={"5rem"}
              color={titleColor[0]}
            >
              Dryden Bryson
            </FuzzyText>
            <div className="h-3"></div>
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.05}
              enableHover={true}
              fontSize={"3rem"}
              color={titleColor[1]}
            >
              Student & Developer
            </FuzzyText>
          </div>
        </div>
      </div>
    </>
  );
}
