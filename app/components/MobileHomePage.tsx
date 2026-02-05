import FuzzyText from "@/components/Typography/FuzzyText/FuzzyText";
import BlurTextButton from "@/components/Typography/BlurText/BlurTextButton";
import TiltedCard from "@/components/Components/TiltedCard/TiltedCard";
import LetterGlitch from "@/components/Backgrounds/Threads/letterGlitch";
import { portfolioItems, aboutItems, contactItems } from "@/lib/menuItems";

export default function MobileHomePage() {
  return (
    <>
      <div className="w-screen h-screen p-2">
        <div className="w-full h-full border relative">
          <div className="absolute top-3 left-3 flex flex-col gap-3">
            <BlurTextButton menuItems={portfolioItems} />
            <BlurTextButton menuItems={aboutItems} />
            <BlurTextButton menuItems={contactItems} />
          </div>

          <div className="absolute bottom-2 right-2 flex flex-col gap-2">
            <div className="h-[50] w-[50] overflow-hidden">
              <a href="https://github.com/Dryd33n" target="_blank" rel="noopener noreferrer">
                <TiltedCard imageSrc="github.svg" rotateAmplitude={1.3} />
              </a>
            </div>
            <div className="h-[50] w-[50] overflow-hidden">
              <a href="https://www.linkedin.com/in/drydenbryson/" target="_blank" rel="noopener noreferrer">
                <TiltedCard imageSrc="linkedin.svg" rotateAmplitude={1.3} />
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
              glitchColors={["#ffffff", "#f76855", "ffffff", "ffffff", "ffffff", "ffffff"]}
              smooth={true}
            />
          </div>

          <div className="inset-0 flex flex-col items-center justify-center h-full">
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.1}
              enableHover={true}
              fontSize={"2.5rem"}
              color="#f76855"
            >
              Dryden Bryson
            </FuzzyText>
            <div className="h-2"></div>
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.05}
              enableHover={true}
              fontSize={"1.5rem"}
            >
              Student & Developer
            </FuzzyText>
          </div>
        </div>
      </div>
    </>
  );
}
