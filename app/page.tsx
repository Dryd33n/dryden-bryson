import HomeLayouts from './components/home/HomeLayouts';
import HomeFooter from './components/home/HomeFooter';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Dryden Bryson | Software Developer in Victoria, BC",
  description: "Software developer and UVic computer science student building systems, developer tools and 3D work. See projects, code and live demos.",
  path: "/",
});

export default function Home() {
  return <div className="relative">
      {/* Both layouts draw the name and tagline on canvases, so the page carries one real heading for crawlers and screen readers. */}
      <h1 className="sr-only">Dryden Bryson, Student &amp; Developer</h1>
      <HomeLayouts />
      <HomeFooter />
  </div>
}
