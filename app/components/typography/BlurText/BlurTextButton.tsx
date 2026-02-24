'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    isExpanded?: boolean;
    onExpandedChange?: (isExpanded: boolean) => void;
}

export default function BlurTextButton({ menuItems, isExpanded = false, onExpandedChange }: BlurTextButtonProps) {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [textColor, setTextColor] = useState<string | undefined>(undefined);
    const width = useScreenWidth();
    const { textColors } = useColorScheme();
    const pathname = usePathname();
    const router = useRouter();

    if (menuItems.length < 1) {
        throw new Error("menuItems must be at least one item long");
    }

    const mainMenuItem = menuItems[0];
    const subMenuItems = menuItems.slice(1);
    const isMobile = width <= DESKTOP_MOBILE_BREAKPOINT;
    const hasSubMenu = subMenuItems.length > 0;

    useEffect(() => {
        setTextColor(textColors.body);
    }, [textColors.body]);

    useEffect(() => {
        setHovered(false);
        onExpandedChange?.(false);
    }, [pathname, onExpandedChange]);

    useEffect(() => {
        const handlePageShow = () => {
            setHovered(false);
            onExpandedChange?.(false);
        };

        window.addEventListener("pageshow", handlePageShow);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, [onExpandedChange]);

    const handleMainButtonClick = () => {
        if (!isMobile || !hasSubMenu) {
            router.push(mainMenuItem.href);
            return;
        }

        if (!isExpanded) {
            onExpandedChange?.(true);
        } else {
            router.push(mainMenuItem.href);
        }
    };


    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => !isMobile && setHovered(true)}
            onMouseLeave={() => !isMobile && setHovered(false)}
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
            ) : isMobile ? (
                // Mobile behavior: expand on first click if there's a submenu, navigate on second click
                hasSubMenu ? (
                    isExpanded ? (
                        <>
                            <div
                                onClick={handleMainButtonClick}
                                className="text-lg text-gradient-1"
                            >
                                {mainMenuItem.title}
                            </div>
                            <div className="left-0 top-full flex flex-col rounded mt-2">
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
                        <div
                            onClick={handleMainButtonClick}
                            className="text-lg"
                            style={{ color: textColor }}
                        >
                            {mainMenuItem.title}
                        </div>
                    )
                ) : (
                    // No submenu, just navigate on click
                    <div
                        onClick={handleMainButtonClick}
                        className="text-lg"
                        style={{ color: textColor }}
                    >
                        {mainMenuItem.title}
                    </div>
                )
            ) : (
                // Desktop behavior: hover to reveal submenu
                hovered ? (
                    <>
                        <Link
                            href={mainMenuItem.href}
                            className="text-lg text-gradient-1"
                            style={{
                                transform: "scale(1.1)",
                                transitionProperty: "transform",
                                transitionDuration: "300ms",
                                transitionTimingFunction: "ease-out",
                            }}
                        >
                            {mainMenuItem.title}
                        </Link>
                        <div className="absolute left-0 top-full flex flex-col rounded">
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