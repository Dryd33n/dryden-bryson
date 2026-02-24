'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DESKTOP_MOBILE_BREAKPOINT } from "@/lib/breakpoints";
import BlurText from "./BlurText";
import DecryptedText from "../DecryptedText/DecryptedText";
import { useScreenWidth } from "@/app/hooks/ScreenWidthProvider";
import { useColorScheme } from "@/lib/colorScheme";



export interface MenuItem {
    title: string;
    href: string;
}

interface BlurTextButtonProps {
    menuItems: MenuItem[];
}

export default function BlurTextButton({ menuItems }: BlurTextButtonProps) {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [textColor, setTextColor] = useState<string | undefined>(undefined);
    const width = useScreenWidth();
    const { textColors } = useColorScheme();
    const pathname = usePathname();

    if (menuItems.length < 1) {
        throw new Error("menuItems must be at least one item long");
    }

    const mainMenuItem = menuItems[0];
    const subMenuItems = menuItems.slice(1);

    useEffect(() => {
        setTextColor(textColors.body);
    }, [textColors.body]);

    useEffect(() => {
        setHovered(false);
    }, [pathname]);

    useEffect(() => {
        const handlePageShow = () => {
            setHovered(false);
        };

        window.addEventListener("pageshow", handlePageShow);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);


    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {!animationComplete ? (
                <Link href={mainMenuItem.href} className="block">
                    <BlurText
                        text={mainMenuItem.title}
                        delay={20}
                        animateBy="letters"
                        direction="bottom"
                        className={`text-lg`}
                        onAnimationComplete={() => setAnimationComplete(true)}
                    />
                </Link>
            ) : (
                hovered ? (
                    <>
                        <Link
                            href={mainMenuItem.href}
                            className="text-lg text-gradient-1"
                            style={
                                width > DESKTOP_MOBILE_BREAKPOINT
                                    ? {
                                        transform: "scale(1.1)",
                                        transitionProperty: "transform",
                                        transitionDuration: "300ms",
                                        transitionTimingFunction: "ease-out",
                                    }
                                    : {}
                            }
                        >
                            {mainMenuItem.title}
                        </Link>
                        <div className={` ${width >= DESKTOP_MOBILE_BREAKPOINT ? "absolute" : ""} left-0 top-full flex flex-col rounded`}>
                            {subMenuItems.map((item, index) => (
                                <Link key={index} href={item.href} className="whitespace-nowrap">
                                    <DecryptedText
                                        text={item.title}
                                        animateOn="view"
                                        revealDirection="center"
                                        speed={50}
                                        delay={index * 150}
                                    />
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <Link href={mainMenuItem.href} className="text-lg" style={{ color: textColor }}>
                        {mainMenuItem.title}
                    </Link>
                )
            )}
        </div>
    );
}