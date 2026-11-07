'use client'
import { useEffect, useRef, useState } from "react";
import NavButton from "@/app/components/global/navigation/NavButton";
import { MenuItem } from "@/app/components/global/navigation/NavButton";

interface NavbarProps {
  menuItemArrays: MenuItem[][];
  layout?: 'horizontal' | 'vertical';
}

export default function Navbar({ menuItemArrays, layout = 'horizontal' }: NavbarProps) {
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // In CSS, so the first paint already has the right layout. lg matches DESKTOP_MOBILE_BREAKPOINT.
  const containerClass = layout === 'vertical'
    ? 'flex flex-col gap-1.5'
    : 'flex flex-col gap-1.5 lg:flex-row lg:gap-10';

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
