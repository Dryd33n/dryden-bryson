/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSprings, animated, useSpringRef } from "@react-spring/web";
import { DESKTOP_MOBILE_BREAKPOINT } from "@/lib/breakpoints";
import DecryptedText from "@/app/components/typography/DecryptedText/DecryptedText";
import { useScreenWidth } from "@/app/hooks/ScreenWidthProvider";

export interface MenuItem {
    title: string;
    href: string;
}

interface NavButtonProps {
    menuItems: MenuItem[];
    isExpanded?: boolean;
    onExpandedChange?: (isExpanded: boolean) => void;
}

const letterAnimationFrom = { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,10px,0)' };

export default function NavButton({ menuItems, isExpanded = false, onExpandedChange }: NavButtonProps) {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [inView, setInView] = useState(false);
    const onExpandedChangeRef = useRef(onExpandedChange);
    const containerRef = useRef<HTMLDivElement>(null);
    const animatedCount = useRef(0);
    const hasStarted = useRef(false);
    const springRef = useSpringRef();
    const width = useScreenWidth();
    const pathname = usePathname();
    const router = useRouter();

    if (menuItems.length < 1) {
        throw new Error("menuItems must be at least one item long");
    }

    const mainMenuItem = menuItems[0];
    const subMenuItems = menuItems.slice(1);
    const isMobile = width <= DESKTOP_MOBILE_BREAKPOINT;
    const hasSubMenu = subMenuItems.length > 0;
    const letters = mainMenuItem.title.split('');

    const [springs] = useSprings(
        letters.length,
        () => ({
            ref: springRef,
            from: letterAnimationFrom,
        })
    );

    useEffect(() => {
        onExpandedChangeRef.current = onExpandedChange;
    }, [onExpandedChange]);

    useEffect(() => {
        setHovered(false);
        onExpandedChangeRef.current?.(false);
    }, [pathname]);

    useEffect(() => {
        const handlePageShow = () => {
            setHovered(false);
            onExpandedChangeRef.current?.(false);
        };
        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (containerRef.current) observer.unobserve(containerRef.current);
                }
            },
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView || hasStarted.current) return;
        hasStarted.current = true;
        animatedCount.current = 0;
        springRef.start((i: number) => ({
            to: async (next: any) => {
                await next({ filter: 'blur(5px)', opacity: 0.5, transform: 'translate3d(0,-5px,0)' });
                await next({ filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' });
                animatedCount.current += 1;
                if (animatedCount.current === letters.length) {
                    springRef.set({ filter: 'none', transform: 'none', opacity: 1 });
                    setAnimationComplete(true);
                }
            },
            delay: i * 20,
        }));
    }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleMainButtonClick = (e: React.MouseEvent) => {
        if (!isMobile || !hasSubMenu) return;
        e.preventDefault();
        if (!isExpanded) {
            onExpandedChange?.(true);
        } else {
            router.push(mainMenuItem.href);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative cursor-pointer"
            onMouseEnter={() => !isMobile && animationComplete && setHovered(true)}
            onMouseLeave={() => !isMobile && setHovered(false)}
        >
            <Link
                href={mainMenuItem.href}
                onClick={handleMainButtonClick}
                className={[
                    'text-lg transition-transform duration-300 ease-out inline-flex',
                    animationComplete ? '' : 'pointer-events-none',
                    hovered && !isMobile && animationComplete ? 'scale-[1.05] text-gradient-1' : '',
                    isMobile && isExpanded && animationComplete ? 'text-gradient-1' : '',
                ].join(' ')}
                style={{ color: "var(--text-nav)" }}
            >
                {springs.map((props, i) => (
                    <animated.span key={i} style={props}>
                        <span className="inline-block">
                            {letters[i] === ' ' ? '\u00A0' : letters[i]}
                        </span>
                    </animated.span>
                ))}
            </Link>

            {/* Submenu */}
            {hasSubMenu && (isMobile ? isExpanded : hovered && animationComplete) && (
                <div className={isMobile
                    ? 'flex flex-col rounded mt-2'
                    : 'absolute left-0 top-full flex flex-col rounded'
                }>
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
            )}
        </div>
    );
}
