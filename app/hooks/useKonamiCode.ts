'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const SEQUENCE = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];

// True once the Konami code has been typed; lasts until the page is left or reloaded.
// Typing it also switches to dark mode, once, so the visitor can still switch back.
export function useKonamiCode(): boolean {
  const [entered, setEntered] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    let recent: string[] = [];
    const onKeyDown = (e: KeyboardEvent) => {
      recent = [...recent, e.key.toLowerCase()].slice(-SEQUENCE.length);
      if (recent.join() === SEQUENCE.join()) {
        setEntered(true);
        setTheme('dark');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setTheme]);

  return entered;
}
