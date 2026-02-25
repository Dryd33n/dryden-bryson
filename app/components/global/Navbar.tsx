'use client'
import { useEffect, useState } from "react";
import BlurTextButton from "@/app/components/typography/BlurText/BlurTextButton";
import { MenuItem } from "@/app/components/typography/BlurText/BlurTextButton";
import { useScreenWidth } from "@/app/hooks/ScreenWidthProvider";
import { DESKTOP_MOBILE_BREAKPOINT } from "@/lib/breakpoints";

interface NavbarProps {
  menuItemArrays: MenuItem[][];
  layout?: 'horizontal' | 'vertical';
}

export default function Navbar({ menuItemArrays, layout = 'horizontal' }: NavbarProps) {
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);
  const screenWidth = useScreenWidth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (screenWidth > 0) {
      setIsMobile(screenWidth < DESKTOP_MOBILE_BREAKPOINT);
    }
  }, [screenWidth]);

  const isVertical = layout === 'vertical' || isMobile;
  const containerClass = isVertical 
    ? 'flex flex-col gap-3' 
    : 'flex flex-row gap-10';

  return (
    <div className={`${containerClass} select-none`}>
      {menuItemArrays.map((menuItems, index) => (
        <BlurTextButton 
          key={index} 
          menuItems={menuItems}
          isExpanded={expandedMenuIndex === index}
          onExpandedChange={(isExpanded) => setExpandedMenuIndex(isExpanded ? index : null)}
        />
      ))}
    </div>
  );
}
