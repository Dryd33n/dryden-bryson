'use client'
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { DESKTOP_MOBILE_BREAKPOINT } from "@/lib/breakpoints";
import DecryptedText from "@/app/components/typography/DecryptedText/DecryptedText";

export interface MenuItem {
    title: string;
    href: string;
}

interface NavButtonProps {
    menuItems: MenuItem[];
    isExpanded?: boolean;
    onExpandedChange?: (isExpanded: boolean) => void;
}

const LETTER_STAGGER_MS = 20;

// Survives moving between pages and resets on a full page load, so the nav only animates in on the load itself.
let hasAnimatedIn = false;

// Sub-menu names: "├─ SOFTWARE" -> "Software", "/ABOUT-ME" -> "About me".
const linkLabel = (title: string) => {
    const words = title.replace(/^[/├─\s]+/, '').replace(/-/g, ' ').toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
};

// Same width as Tailwind's lg, which sets the nav's layout. Read at the moment of use so it never affects rendering.
const isNarrowScreen = () => window.innerWidth < DESKTOP_MOBILE_BREAKPOINT;

const animateInProps = (index: number) => ({
    className: 'nav-letter-in',
    style: { animationDelay: `${index * LETTER_STAGGER_MS}ms` },
});

export default function NavButton({ menuItems, isExpanded = false, onExpandedChange }: NavButtonProps) {
    // Kept in state so this nav finishes its animation after the flag above flips.
    const [animateIn] = useState(() => !hasAnimatedIn);
    const [animationComplete, setAnimationComplete] = useState(!animateIn);
    const [hovered, setHovered] = useState(false);
    const onExpandedChangeRef = useRef(onExpandedChange);
    const containerRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);
    const subMenuId = useId();
    const pathname = usePathname();
    const router = useRouter();

    if (menuItems.length < 1) {
        throw new Error("menuItems must be at least one item long");
    }

    const mainMenuItem = menuItems[0];
    const subMenuItems = menuItems.slice(1);
    const hasSubMenu = subMenuItems.length > 0;
    const letters = mainMenuItem.title.split('');
    const isCurrentPage = pathname === mainMenuItem.href;
    const isOpen = hasSubMenu && (isExpanded || hovered);

    useEffect(() => {
        hasAnimatedIn = true;
    }, []);

    // The hover gradient has to wait: background-clip: text can't reach letters that are mid-animation (LESSONS.md #2).
    // This also covers an animation that ended before hydration, or never ran under reduced motion.
    useEffect(() => {
        if (!animateIn) return;
        let mounted = true;
        const animations = containerRef.current?.getAnimations({ subtree: true }) ?? [];
        Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
            if (mounted) setAnimationComplete(true);
        });
        return () => { mounted = false; };
    }, [animateIn]);

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

    // Below the breakpoint, the first tap on a parent link opens its menu and the second navigates.
    const handleMainButtonClick = (e: React.MouseEvent) => {
        if (!hasSubMenu || !isNarrowScreen()) return;
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
            onPointerEnter={(e) => e.pointerType === 'mouse' && !isNarrowScreen() && setHovered(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(false)}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <div className="inline-flex items-center">
                <Link
                    href={mainMenuItem.href}
                    aria-current={isCurrentPage ? 'page' : undefined}
                    onClick={handleMainButtonClick}
                    className={[
                        'relative text-lg transition-transform duration-300 ease-out inline-flex',
                        hovered && animationComplete ? 'scale-[1.05]' : '',
                        isCurrentPage ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent' : '',
                    ].join(' ')}
                    style={{ color: isCurrentPage ? "var(--accent-strong)" : "var(--text-nav)" }}
                >
                    <span className="sr-only">{mainMenuItem.title}</span>
                    {/* The gradient goes here, not on the link: background-clip: text also paints sr-only text, which would double the word. */}
                    <span aria-hidden="true" className={`inline-flex ${(hovered || isExpanded) && animationComplete ? 'text-gradient-1' : ''}`}>
                        {letters.map((letter, i) => {
                            const animation = animateIn ? animateInProps(i) : undefined;
                            return (
                                <span
                                    key={i}
                                    data-letter={letter === ' ' ? ' ' : letter}
                                    className={`nav-letter ${animation?.className ?? ''}`}
                                    style={animation?.style}
                                />
                            );
                        })}
                    </span>
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
                        {/* Animates as one more character, straight after the last letter. */}
                        <span className={`inline-flex ${animateIn ? animateInProps(letters.length).className : ''}`} style={animateIn ? animateInProps(letters.length).style : undefined}>
                            <FiChevronDown aria-hidden="true" className={`motion-safe:transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </span>
                    </button>
                )}
            </div>

            {/* Submenu */}
            {isOpen && (
                <div ref={subMenuRef} id={subMenuId} className="flex flex-col rounded mt-2 lg:mt-0 lg:absolute lg:left-0 lg:top-full">
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
