'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface SquareSettings {
  density: number; // multiplies how many cells are lit
  falloff: number; // higher keeps squares closer to the right edge
  fadeStart: number; // fraction of page width where squares begin; the text column ends at about 0.57-0.59
  cell: number; // grid pitch, px
  fill: number; // square size as a fraction of the cell
  maxAlpha: number;
  edgeAlpha: number; // brightness of the leftmost squares relative to the right edge
  minBrightness: number; // how far a square dims at the low point of its twinkle
  speed: number; // twinkle speed multiplier
  accentAmount: number; // fraction of squares in the accent colour
  base: string;
  accent: string;
}

// Tuned separately: the same values read much stronger on white than on black.
const SETTINGS: Record<'dark' | 'light', SquareSettings> = {
  dark: {
    density: 1.25,
    falloff: 1.7,
    fadeStart: 0.55,
    cell: 12,
    fill: 0.57,
    maxAlpha: 0.3,
    edgeAlpha: 0.35,
    minBrightness: 0.14,
    speed: 0.7,
    accentAmount: 0.17,
    base: '#ff0000',
    accent: '#f76855',
  },
  light: {
    density: 1.45,
    falloff: 3.3,
    fadeStart: 0.61,
    cell: 12,
    fill: 0.57,
    maxAlpha: 0.63,
    edgeAlpha: 0.35,
    minBrightness: 0.14,
    speed: 0.95,
    accentAmount: 0.17,
    base: '#ff0000',
    accent: '#e5533f',
  },
};

const FRAME_MS = 1000 / 20; // the twinkle is slow enough that more frames wouldn't show
const SCROLL_PAUSE_MS = 150; // hold still while scrolling so the browser only has to move the finished canvas
const ALPHA_LEVELS = 16; // brightness steps; grouping squares by step avoids changing canvas state per square
const SEED = Math.random() * 1000;

// Stable per-cell random in [0, 1), so the pattern holds across resizes and theme changes.
const cellRandom = (col: number, row: number, salt: number) => {
  const v = Math.sin(col * 127.1 + row * 311.7 + salt * 74.7 + SEED) * 43758.5453;
  return v - Math.floor(v);
};

interface Square {
  x: number;
  y: number;
  colorIndex: number;
  alpha: number;
  phase: number;
  speed: number; // radians per ms
}

/*
  Field of softly twinkling squares, dense at the right edge and thinning out toward
  the text. Fills the height of its nearest positioned parent, so it scrolls with the page,
  and only as much width as the squares need. Decorative, so it's hidden from assistive tech
  and small screens, and holds still for visitors who prefer reduced motion.
*/
export default function BlinkingSquares() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clock = useRef(0); // survives restarts so the twinkle doesn't jump
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'light' ? 'light' : 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const { density, falloff, fadeStart, cell, fill, maxAlpha, edgeAlpha, minBrightness, speed, accentAmount, base, accent } = SETTINGS[theme];
    const size = Math.round(cell * fill);
    let squares: Square[] = [];
    let frame = 0;
    let last = 0;
    let lastScroll = 0;
    const colors = [base, accent];
    const buckets: Square[][] = Array.from({ length: colors.length * ALPHA_LEVELS }, () => []);

    const build = () => {
      const { clientWidth: width, clientHeight: height } = canvas;
      canvas.width = width;
      canvas.height = height;
      const pageWidth = width / (1 - fadeStart);
      const left = pageWidth * fadeStart;

      squares = [];
      for (let col = Math.floor(left / cell); col * cell < pageWidth; col++) {
        const pageX = col * cell + Math.floor((cell - size) / 2);
        const x = Math.round(pageX - left);
        const progress = Math.max(0, (pageX / pageWidth - fadeStart) / (1 - fadeStart));
        const chance = progress ** falloff * density;
        for (let row = 0; row * cell < height; row++) {
          if (cellRandom(col, row, 0) > chance) continue;
          squares.push({
            x,
            y: row * cell + Math.floor((cell - size) / 2),
            colorIndex: cellRandom(col, row, 1) < accentAmount ? 1 : 0,
            alpha: maxAlpha * (edgeAlpha + (1 - edgeAlpha) * progress),
            phase: cellRandom(col, row, 2) * Math.PI * 2,
            speed: ((0.15 + cellRandom(col, row, 3) * 0.35) * Math.PI * 2) / 1000,
          });
        }
      }
    };

    // Redraws the squares in or near the viewport; the rest keep their last state until scrolled to.
    const draw = (everything = false) => {
      const margin = window.innerHeight / 2;
      const top = everything ? 0 : Math.max(0, -canvas.getBoundingClientRect().top - margin);
      const bottom = everything ? canvas.height : top + window.innerHeight + margin * 2;

      // Whole cell rows, so a square on the band's edge is never left half-cleared.
      const clearTop = Math.floor(top / cell) * cell;
      const clearBottom = Math.ceil(bottom / cell) * cell;

      for (const bucket of buckets) bucket.length = 0;
      for (const s of squares) {
        if (s.y < clearTop || s.y >= clearBottom) continue;
        const wave = 0.5 + 0.5 * Math.sin(s.phase + clock.current * s.speed);
        const alpha = s.alpha * (minBrightness + (1 - minBrightness) * wave);
        const level = Math.min(ALPHA_LEVELS - 1, Math.round((alpha / maxAlpha) * (ALPHA_LEVELS - 1)));
        buckets[s.colorIndex * ALPHA_LEVELS + level].push(s);
      }

      ctx.clearRect(0, clearTop, canvas.width, clearBottom - clearTop);
      buckets.forEach((bucket, index) => {
        if (!bucket.length) return;
        ctx.fillStyle = colors[Math.floor(index / ALPHA_LEVELS)];
        ctx.globalAlpha = ((index % ALPHA_LEVELS) / (ALPHA_LEVELS - 1)) * maxAlpha;
        for (const s of bucket) ctx.fillRect(s.x, s.y, size, size);
      });
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (last && time - last < FRAME_MS) return;
      if (time - lastScroll < SCROLL_PAUSE_MS) {
        last = time; // doesn't count as elapsed, so the twinkle resumes where it stopped
        return;
      }
      // Capped so returning to a background tab doesn't jump the twinkle.
      clock.current += Math.min(last ? time - last : 0, 100) * speed;
      last = time;
      draw();
    };

    const start = () => {
      cancelAnimationFrame(frame);
      build();
      if (!canvas.clientWidth) return; // display:none on small screens
      draw(true);
      if (!reducedMotion) frame = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      lastScroll = performance.now();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new ResizeObserver(start);
    observer.observe(canvas);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: `${(1 - SETTINGS[theme].fadeStart) * 100}%` }}
      className="hidden md:block absolute top-0 right-0 h-full -z-50 pointer-events-none"
    />
  );
}
