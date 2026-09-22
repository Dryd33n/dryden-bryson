'use client';

import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const next = resolvedTheme === 'light' ? 'dark' : 'light';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Snapshot the page, apply the new theme synchronously, then crossfade between the two.
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    // The browser skips the animation (e.g. tab hidden) but still applies the theme.
    transition.ready.catch(() => {});
  };

  // Icons are swapped with CSS so the correct one renders before hydration.
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent transition-all duration-300 hover:border-accent hover:shadow-[0_0_10px_rgba(247,104,85,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Toggle light and dark mode"
    >
      <FiSun className="hidden dark:block w-5 h-5 text-neutral-400 group-hover:text-accent transition-colors" />
      <FiMoon className="block dark:hidden w-5 h-5 text-neutral-600 group-hover:text-accent transition-colors" />
    </button>
  );
}
