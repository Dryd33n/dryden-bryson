'use client'

import { useState, useEffect } from 'react';
import { DESKTOP_MOBILE_BREAKPOINT } from '@/lib/breakpoints';
import DesktopHomePage from './components/home/DesktopHomePage';
import MobileHomePage from './components/home/MobileHomePage';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return isDesktop ? <DesktopHomePage /> : <MobileHomePage />;
}