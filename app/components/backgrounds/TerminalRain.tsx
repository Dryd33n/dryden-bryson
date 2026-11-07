'use client';

import { useEffect, useRef } from 'react';

const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF';
const FRAME_MS = 1000 / 30;
const BASE_SPEED = 10; // rows per second

// Drawn back to front: a smaller, slower, dimmer layer gives the rain some depth.
const LAYERS = [
  { size: 12, density: 0.6, trail: 10, speed: 0.55, alpha: 0.35, glowing: false },
  { size: 18, density: 0.85, trail: 16, speed: 1, alpha: 1, glowing: true },
];
const GLOW_GLYPHS = 4; // only the brightest glyphs of a stream glow; blurring every glyph is expensive

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

interface Stream {
  x: number;
  head: number; // row of the leading glyph; negative while waiting above the screen
  speed: number; // rows per second
  glyphs: string[];
  layer: (typeof LAYERS)[number];
}

/*
  Falling streams of glyphs, each with a bright leading glyph and a fading trail. Fills its
  parent. Decorative, so it's hidden from assistive tech, and shows a still frame for
  visitors who prefer reduced motion.
*/
export default function TerminalRain({ trailColor, headColor, glow }: { trailColor: string; headColor: string; glow: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let streams: Stream[] = [];
    let frame = 0;
    let last = 0;

    const build = () => {
      const { clientWidth: width, clientHeight: height } = canvas;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';
      ctx.shadowColor = trailColor;

      streams = [];
      for (const layer of LAYERS) {
        const columns = Math.ceil(width / layer.size);
        const rows = Math.ceil(height / layer.size);
        for (let col = 0; col < columns; col++) {
          if (Math.random() > layer.density) continue;
          streams.push({
            x: col * layer.size + layer.size / 2,
            head: Math.random() * (rows + layer.trail) - layer.trail, // starts mid-fall so the screen fills at once
            speed: BASE_SPEED * layer.speed * (0.5 + Math.random()),
            glyphs: Array.from({ length: rows }, randomGlyph),
            layer,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      let font = '';
      for (const s of streams) {
        const { size, trail, alpha, glowing } = s.layer;
        const nextFont = `${size}px monospace`;
        if (nextFont !== font) ctx.font = font = nextFont;

        const headRow = Math.floor(s.head);
        for (let i = 0; i < trail; i++) {
          const row = headRow - i;
          if (row < 0 || row >= s.glyphs.length) continue;
          const isHead = i === 0;
          ctx.fillStyle = isHead ? headColor : trailColor;
          ctx.globalAlpha = alpha * (1 - i / trail) ** 1.5;
          ctx.shadowBlur = glowing && i < GLOW_GLYPHS ? glow : 0;
          ctx.fillText(s.glyphs[row], s.x, row * size);
        }
      }
    };

    const advance = (seconds: number) => {
      for (const s of streams) {
        s.head += s.speed * seconds;
        s.glyphs[Math.floor(Math.random() * s.glyphs.length)] = randomGlyph();
        if (s.head - s.layer.trail > s.glyphs.length) s.head = -Math.random() * s.glyphs.length * 0.25;
      }
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (last && time - last < FRAME_MS) return;
      // Capped so returning to a background tab doesn't jump the streams.
      advance(Math.min(last ? time - last : 0, 100) / 1000);
      last = time;
      draw();
    };

    const start = () => {
      cancelAnimationFrame(frame);
      build();
      if (!canvas.clientWidth) return; // the layout not in use is display:none
      draw();
      if (!reducedMotion) frame = requestAnimationFrame(loop);
    };

    const observer = new ResizeObserver(start);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [trailColor, headColor, glow]);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full block" />
      {/* Dims the rain behind the name and tagline so they stay readable. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--background)_15%,transparent_70%)]" aria-hidden="true"></div>
    </>
  );
}
