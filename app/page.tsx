import HomeLayouts from './components/home/HomeLayouts';
import HomeFooter from './components/home/HomeFooter';

export const metadata = {
  title: "Home | Dryden Bryson",
  description: "Welcome to the portfolio of Dryden Bryson, a computer science student and programmer based in Canada. Explore his projects, skills, and get in touch to discuss opportunities.",
};

export default function Home() {
  return <div className="relative">
      {/* Both layouts draw the name and tagline on canvases, so the page carries one real heading for crawlers and screen readers. */}
      <h1 className="sr-only">Dryden Bryson, Student &amp; Developer</h1>
      <HomeLayouts />
      <HomeFooter />
  </div>
}
