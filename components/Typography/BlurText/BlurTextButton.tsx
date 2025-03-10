'use client'
import { useState } from "react";
import BlurText from "../BlurText/BlurText";
import DecryptedText from "../DecryptedText/DecryptedText";


export interface MenuItem {
    title: string;
    clickFn: () => void;
}

interface BlurTextButtonProps {
    menuItems: MenuItem[];
}

export default function BlurTextButton({ menuItems }: BlurTextButtonProps) {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [hovered, setHovered] = useState(false);

    if (menuItems.length < 1) {
        throw new Error("menuItems must be at least one item long");
    }

    const mainMenuItem = menuItems[0];
    const subMenuItems = menuItems.slice(1);


    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {!animationComplete ? (
                <div onClick={mainMenuItem.clickFn}>
                    <BlurText
                        text={mainMenuItem.title}
                        delay={20}
                        animateBy="letters"
                        direction="bottom"
                        className={`text-lg text-gray-400`}
                        onAnimationComplete={() => setAnimationComplete(true)}

                    />
                </div>
            ) : (
                hovered ? (
                    <>
                        <p onClick={mainMenuItem.clickFn} className="text-lg text-gradient-1" style={{ scale: 1.1, msTransitionProperty: 'scale', transitionDuration: '300ms', msTransitionTimingFunction: "ease-out" }}>{mainMenuItem.title}</p>
                        <div className="absolute left-0 top-full flex flex-col shadow-lg rounded" style={{ width: "50vw" }}>
                            {subMenuItems.map((item, index) => (
                                <div key={index} 
                                onClick={item.clickFn}
                                >
                                    <DecryptedText
                                        text={item.title}
                                        animateOn="view"
                                        revealDirection="center"
                                        speed={50}
                                        delay={index * 150}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-lg text-gray-400">{mainMenuItem.title}</p>
                )
            )}
        </div>
    );
}