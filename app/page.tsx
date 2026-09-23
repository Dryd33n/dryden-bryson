import DesktopHomePage from './components/home/DesktopHomePage';
import MobileHomePage from './components/home/MobileHomePage';

export const metadata = {
  title: "Home | Dryden Bryson",
  description: "Welcome to the portfolio of Dryden Bryson, a computer science student and programmer based in Canada. Explore his projects, skills, and get in touch to discuss opportunities.",
};

export default function Home() {
  return <>
      {/* Both layouts draw the name and tagline on canvases, so the page carries one real heading for crawlers and screen readers. */}
      <h1 className="sr-only">Dryden Bryson, Student &amp; Developer</h1>
      <div className="hidden md:block">
        <DesktopHomePage />
      </div>
      <div className="block md:hidden">
        <MobileHomePage />
      </div>
  </>
}