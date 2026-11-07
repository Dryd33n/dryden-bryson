import type { Metadata } from 'next';
import Link from 'next/link';
import BlinkingSquares from './components/backgrounds/BlinkingSquares';
import PageHeader from './components/global/PageHeader';
import Navbar from './components/global/navigation/Navbar';
import { aboutItems, contactItems, home, portfolioItems } from '@/lib/menuItems';

export const metadata: Metadata = {
  title: 'Page not found',
  description: "This page doesn't exist on dryd3n.ca.",
};

const linkClass = 'text-accent-strong underline underline-offset-4 hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export default function NotFound() {
  return (<div className="relative min-h-screen">
    <BlinkingSquares />

    {/* HEADER */}
    <div className="relative">
      <div className="relative z-10 px-6 pt-6 lg:absolute lg:top-6 lg:left-6 lg:p-0">
        <Navbar menuItemArrays={[home, portfolioItems, aboutItems, contactItems]} layout="horizontal" />
      </div>
      <PageHeader title="404" />
    </div>

    <div className="pb-12 md:pb-30 px-4 md:px-10 lg:px-40">
      <div className="md:mr-[40%]">
        <p className="text-sm md:text-base">
          Hi there, looks like you got lost. <Link href="/" className={linkClass}>Take me home</Link>
        </p>
      </div>
    </div>
  </div>);
}
