'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import BlinkingSquares from './components/backgrounds/BlinkingSquares';
import PageHeader from './components/global/PageHeader';
import Navbar from './components/global/navigation/Navbar';
import { aboutItems, contactItems, home, portfolioItems } from '@/lib/menuItems';

const linkClass = 'text-accent-strong underline underline-offset-4 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (<div className="relative min-h-screen">
    <BlinkingSquares />

    {/* HEADER */}
    <div className="relative">
      <div className="relative z-10 px-6 pt-6 lg:absolute lg:top-6 lg:left-6 lg:p-0">
        <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
      </div>
      <PageHeader title="ERROR" />
    </div>

    <div className="pb-12 md:pb-30 px-4 md:px-10 lg:px-40">
      <div className="md:mr-[40%]">
        <p className="text-sm md:text-base mb-8">Something went wrong loading this page. Try again, or head somewhere else.</p>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <button type="button" onClick={reset} className={`${linkClass} cursor-pointer`}>Try again</button>
          <Link href="/portfolio" className={linkClass}>View my portfolio</Link>
          <Link href="/contact" className={linkClass}>Get in touch</Link>
        </div>
      </div>
    </div>
  </div>);
}
