'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-3 rounded-lg border border-neutral-700 bg-transparent transition-all duration-300 hover:border-[#f76855] hover:shadow-[0_0_10px_rgba(247,104,85,0.3)]"
        aria-label="Toggle theme"
      >
        <FiSun className="w-5 h-5 text-neutral-400" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-3 rounded-lg border border-neutral-700 bg-transparent transition-all duration-300 hover:border-[#f76855] hover:shadow-[0_0_10px_rgba(247,104,85,0.3)] group"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-neutral-400 group-hover:text-[#f76855] transition-colors" />
      ) : (
        <FiMoon className="w-5 h-5 text-neutral-600 group-hover:text-[#f76855] transition-colors" />
      )}
    </button>
  );
}
