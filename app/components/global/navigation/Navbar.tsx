'use client'
import { useState } from "react";
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
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth > 0 && screenWidth < DESKTOP_MOBILE_BREAKPOINT;

  const isVertical = layout === 'vertical' || isMobile;
  const containerClass = isVertical
    ? 'flex flex-col gap-3'
    : 'flex flex-row gap-10';

  return (
    <nav className={`${containerClass} select-none`}>
      {menuItemArrays.map((menuItems, index) => (
        <NavButton
          key={index}
          menuItems={menuItems}
          isExpanded={expandedMenuIndex === index}
          onExpandedChange={(isExpanded) => setExpandedMenuIndex(isExpanded ? index : null)}
        />
      ))}
    </nav>
  );
}
