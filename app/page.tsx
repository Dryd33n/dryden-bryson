'use client'

import FuzzyText from "@/src/react-bits/TextAnimations/FuzzyText/FuzzyText";
import Threads from "@/src/react-bits/Backgrounds/Threads/Threads";
import BlurText from "@/src/react-bits/TextAnimations/BlurText/BlurText";
import BlurTextButton from "@/src/react-bits/TextAnimations/BlurText/BlurTextButton";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import TiltedCard from "@/src/react-bits/Components/TiltedCard/TiltedCard";
import { MenuItem } from "@/src/react-bits/TextAnimations/BlurText/BlurTextButton";

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
    title: "├─ MY SKILLS",
    clickFn: () => { console.log("MY SKILLS"); }
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
            <div className="h-[60] w-[60] overflow-hidden">
              <TiltedCard
                imageSrc="github.svg"
              />
            </div>
            <div className="h-[60] w-[60] overflow-hidden">
              <TiltedCard
                imageSrc="linkedin.svg"
              />
            </div>
          </div>

          <div className="w-full h-full absolute inset-0 -z-50 pb-[22vh]">
            <Threads
              amplitude={3}
              distance={0}
              enableMouseInteraction={false}
            />
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