'use client'
import { useState } from "react";
import BlurTextButton from "@/app/components/typography/BlurText/BlurTextButton";
import { MenuItem } from "@/app/components/typography/BlurText/BlurTextButton";

interface NavbarProps {
  menuItemArrays: MenuItem[][];
  layout?: 'horizontal' | 'vertical';
}

export default function Navbar({ menuItemArrays, layout = 'horizontal' }: NavbarProps) {
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);
  const isVertical = layout === 'vertical';
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
