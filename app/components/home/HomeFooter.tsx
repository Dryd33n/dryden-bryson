import Link from "next/link";
import CurrentYear from "./CurrentYear";

// Sits in the gutter below the homepage border, so its height must match the bottom padding of both home layouts.
// The link's enlarged tap area stops at the page edges; going past them would make the homepage scroll.
export default function HomeFooter() {
  return (
    <footer className="absolute bottom-0 right-2 md:right-6 h-6 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
      <span>&copy; <CurrentYear buildYear={new Date().getFullYear()} /> Dryden Bryson</span>
      <span aria-hidden="true">/</span>
      <Link href="/privacy" className="relative after:absolute after:-top-3 after:-left-2 after:-bottom-1 after:-right-2 md:after:-right-6 hover:text-accent-strong transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        Privacy
      </Link>
    </footer>
  );
}
