'use client'
import { useEffect, useRef, useState } from "react";
import NavButton from "@/app/components/global/navigation/NavButton";
import { MenuItem } from "@/app/components/global/navigation/NavButton";
import { useScreenWidth } from "@/app/hooks/ScreenWidthProvider";
import { DESKTOP_MOBILE_BREAKPOINT } from "@/lib/breakpoints";

interface NavbarProps {
  menuItemArrays: MenuItem[][];
  layout?: 'horizontal' | 'vertical';
}

export default function Navbar({ menuItemArrays, layout = 'horizontal' }: NavbarProps) {
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth > 0 && screenWidth < DESKTOP_MOBILE_BREAKPOINT;

  const isVertical = layout === 'vertical' || isMobile;
  const containerClass = isVertical
    ? 'flex flex-col gap-1.5'
    : 'flex flex-row gap-10';

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setExpandedMenuIndex(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <nav ref={navRef} className={`${containerClass} select-none font-heading`}>
      {menuItemArrays.map((menuItems, index) => (
        <NavButton
          key={index}
          menuItems={menuItems}
          isExpanded={expandedMenuIndex === index}
          onExpandedChange={(isExpanded) => setExpandedMenuIndex((current) => isExpanded ? index : (current === index ? null : current))}
        />
      ))}
    </nav>
  );
}
