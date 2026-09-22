'use client'

import { useState, useEffect } from "react";
import FuzzyText from "@/app/components/typography/FuzzyText/FuzzyText";
import Navbar from "@/app/components/global/navigation/Navbar";
import TiltedCard from "@/app/components/global/TiltedIcon";
import LetterGlitch from "@/app/components/backgrounds/letterGlitch";
import DarkModeToggle from "../global/DarkModeToggle";
import { portfolioItems, aboutItems, contactItems } from "@/lib/menuItems";
import { useColorScheme } from "@/lib/colorScheme";

export default function MobileHomePage() {
  const [mounted, setMounted] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="w-screen h-screen p-2">
        <div className="w-full h-full border relative">
          <div className="absolute top-3 left-3">
            <Navbar menuItemArrays={[portfolioItems, aboutItems, contactItems]} layout="vertical" />
          </div>

          <div className="absolute bottom-2 right-2 flex flex-col gap-2">
            <DarkModeToggle />
            <div className="h-[50] w-[50] overflow-hidden">
              <a href="https://github.com/Dryd33n" target="_blank" rel="noopener noreferrer">
                <TiltedCard imageSrc="icons/github.svg" color="var(--icon)" rotateAmplitude={0} />
              </a>
            </div>
            <div className="h-[50] w-[50] overflow-hidden">
              <a href="https://www.linkedin.com/in/drydenbryson/" target="_blank" rel="noopener noreferrer">
                <TiltedCard imageSrc="icons/linkedin.svg" color="var(--icon)" rotateAmplitude={0} />
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
          {mounted && (
            <div className="w-full h-full absolute inset-0 -z-50 opacity-[12%]">
              <LetterGlitch
                glitchSpeed={50}
                centerVignette={true}
                outerVignette={true}
                glitchColors={colorScheme.glitch.letters}
                vignetteColor={colorScheme.glitch.vignette}
                backgroundColor={colorScheme.glitch.background}
                smooth={true}
              />
            </div>
          )}

          <div className="inset-0 flex flex-col items-center justify-center h-full">
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.1}
              enableHover={true}
              fontSize={"2.5rem"}
              color={colorScheme.title.name}
            >
              Dryden Bryson
            </FuzzyText>
            <div className="h-2"></div>
            <FuzzyText
              baseIntensity={0.00}
              hoverIntensity={0.05}
              enableHover={true}
              fontSize={"1.5rem"}
              color={colorScheme.title.tagline}
            >
              Student & Developer
            </FuzzyText>
          </div>
        </div>
      </div>
    </>
  );
}
