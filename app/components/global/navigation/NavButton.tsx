/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSprings, animated, useSpringRef } from "@react-spring/web";
import { FiChevronDown } from "react-icons/fi";
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

// Titles render letter by letter (or scrambled), so links carry a readable name: "/ABOUT-ME" -> "About me".
const linkLabel = (title: string) => {
    const words = title.replace(/^[/├─\s]+/, '').replace(/-/g, ' ').toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
};

export default function NavButton({ menuItems, isExpanded = false, onExpandedChange }: NavButtonProps) {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [inView, setInView] = useState(false);
    const onExpandedChangeRef = useRef(onExpandedChange);
    const containerRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);
    const subMenuId = useId();
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
    // The chevron animates as one more character, straight after the last letter.
    const animatedItemCount = letters.length + (hasSubMenu ? 1 : 0);
    const isCurrentPage = pathname === mainMenuItem.href;
    const isOpen = hasSubMenu && (isExpanded || (!isMobile && hovered && animationComplete));

    const [springs] = useSprings(
        animatedItemCount,
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
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        springRef.start((i: number) => ({
            to: async (next: any) => {
                if (!reducedMotion) await next({ filter: 'blur(5px)', opacity: 0.5, transform: 'translate3d(0,-5px,0)' });
                await next({ filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)', immediate: reducedMotion });
                animatedCount.current += 1;
                if (animatedCount.current === animatedItemCount) {
                    springRef.set({ filter: 'none', transform: 'none', opacity: 1 });
                    setAnimationComplete(true);
                }
            },
            delay: reducedMotion ? 0 : i * 20,
        }));
    }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

    // Below the breakpoint, the first tap on a parent link opens its menu and the second navigates.
    const handleMainButtonClick = (e: React.MouseEvent) => {
        if (!isMobile || !hasSubMenu) return;
        e.preventDefault();
        if (!isExpanded) {
            onExpandedChange?.(true);
        } else {
            router.push(mainMenuItem.href);
        }
    };

    const closeMenu = () => {
        setHovered(false);
        onExpandedChangeRef.current?.(false);
    };

    // Escape also dismisses a menu opened by hover, wherever focus happens to be.
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            const focusWasInSubMenu = subMenuRef.current?.contains(document.activeElement);
            closeMenu();
            if (focusWasInSubMenu) toggleRef.current?.focus();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Only keyboard focus arriving from outside opens the menu, so Escape returning focus to the toggle doesn't reopen it.
    const handleFocus = (e: React.FocusEvent) => {
        if (!hasSubMenu || containerRef.current?.contains(e.relatedTarget)) return;
        if (e.target.matches(':focus-visible')) onExpandedChange?.(true);
    };

    const handleBlur = (e: React.FocusEvent) => {
        if (hasSubMenu && !containerRef.current?.contains(e.relatedTarget)) onExpandedChange?.(false);
    };

    return (
        <div
            ref={containerRef}
            className="relative cursor-pointer"
            // Pointer events, because touch fires emulated mouse events that would open the menu just before a tap toggled it.
            onPointerEnter={(e) => e.pointerType === 'mouse' && !isMobile && animationComplete && setHovered(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && !isMobile && setHovered(false)}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <div className="inline-flex items-center">
                <Link
                    href={mainMenuItem.href}
                    aria-label={linkLabel(mainMenuItem.title)}
                    aria-current={isCurrentPage ? 'page' : undefined}
                    onClick={handleMainButtonClick}
                    className={[
                        'relative text-lg transition-transform duration-300 ease-out inline-flex',
                        animationComplete ? '' : 'pointer-events-none',
                        hovered && !isMobile && animationComplete ? 'scale-[1.05] text-gradient-1' : '',
                        isExpanded && animationComplete ? 'text-gradient-1' : '',
                        isCurrentPage ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent' : '',
                    ].join(' ')}
                    style={{ color: isCurrentPage ? "var(--accent-strong)" : "var(--text-nav)" }}
                >
                    {springs.slice(0, letters.length).map((props, i) => (
                        <animated.span key={i} style={props}>
                            <span className="inline-block">
                                {letters[i] === ' ' ? '\u00A0' : letters[i]}
                            </span>
                        </animated.span>
                    ))}
                </Link>

                {hasSubMenu && (
                    <button
                        ref={toggleRef}
                        type="button"
                        aria-label={`${linkLabel(mainMenuItem.title)} sections`}
                        aria-expanded={isOpen}
                        aria-controls={isOpen ? subMenuId : undefined}
                        onClick={() => isOpen ? closeMenu() : onExpandedChange?.(true)}
                        className="relative ml-0.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm after:absolute after:-inset-1 hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-accent"
                        style={{ color: "var(--text-nav)" }}
                    >
                        <animated.span style={springs[letters.length]} className="inline-flex">
                            <FiChevronDown aria-hidden="true" className={`motion-safe:transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </animated.span>
                    </button>
                )}
            </div>

            {/* Submenu */}
            {isOpen && (
                <div ref={subMenuRef} id={subMenuId} className={isMobile
                    ? 'flex flex-col rounded mt-2'
                    : 'absolute left-0 top-full flex flex-col rounded'
                }>
                    {subMenuItems.map((item, index) => (
                        <Link key={index} href={item.href} aria-label={linkLabel(item.title)} onClick={closeMenu} className="whitespace-nowrap">
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
