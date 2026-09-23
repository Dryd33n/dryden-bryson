'use client';

import { type KeyboardEvent, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { COLS, LCD_PROGRAMS, type Button, type LcdProgram, type Sim } from './lcdPrograms';

// The CSC 230 programs (see lcdPrograms.ts) on a 16x2 LCD with the keypad shield's buttons.

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const useReducedMotion = () => useSyncExternalStore(
  (onChange) => { const mq = window.matchMedia(reducedMotionQuery); mq.addEventListener('change', onChange); return () => mq.removeEventListener('change', onChange); },
  () => window.matchMedia(reducedMotionQuery).matches,
  () => false,
);

// Runs a program in real time and returns the LCD rows, re-rendering only when they change.
function useProgram(program: LcdProgram, running: boolean) {
  const simRef = useRef<Sim | null>(null);
  const startRef = useRef(0);
  const [rows, setRows] = useState<string[]>(['', '']);

  const sync = useCallback(() => {
    const sim = simRef.current!;
    sim.advance(performance.now() - startRef.current);
    setRows((prev) => (prev[0] === sim.lcd.rows[0] && prev[1] === sim.lcd.rows[1] ? prev : [...sim.lcd.rows]));
  }, []);

  const reset = useCallback(() => {
    simRef.current = program.create();
    startRef.current = performance.now();
    sync();
  }, [program, sync]);

  useEffect(() => { reset(); }, [reset]);

  useEffect(() => {
    if (!running) return;
    let frame = requestAnimationFrame(function tick() { sync(); frame = requestAnimationFrame(tick); });
    return () => cancelAnimationFrame(frame);
  }, [running, sync]);

  const press = useCallback((button: Button) => { simRef.current?.press?.(button); sync(); }, [sync]);
  return { rows, press, reset };
}

function Screen({ rows, label }: { rows: string[]; label: string }) {
  return (
    <div className="[container-type:inline-size] w-full">
      <div className="rounded-md bg-[#0f2a6b] p-[3cqw] shadow-[inset_0_0_24px_rgba(0,0,0,0.45)]" role="img" aria-label={`${label}. Line 1: ${rows[0].trim() || 'blank'}. Line 2: ${rows[1].trim() || 'blank'}.`}>
        {rows.map((row, r) => (
          <div key={r} className="grid grid-cols-16 gap-[0.6cqw] [&:not(:first-child)]:mt-[0.9cqw]" aria-hidden="true">
            {Array.from({ length: COLS }, (_, c) => (
              <span
                key={c}
                className="viewer-mono flex aspect-[5/8] items-center justify-center rounded-[0.3cqw] bg-[#1a3f95] text-[4.4cqw] leading-none text-[#e8efff] [text-shadow:0_0_0.6cqw_rgba(200,220,255,0.55)]"
              >
                {(row[c] ?? ' ') === ' ' ? ' ' : row[c]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Overview hero: part B scrolling on its own, still for visitors who prefer reduced motion.
export function LcdPreview() {
  const reduced = useReducedMotion();
  const { rows } = useProgram(LCD_PROGRAMS[1], !reduced);
  return (
    <figure>
      <div className="mx-auto max-w-xl rounded-lg border border-neutral-700 bg-[#0b3d2e] p-4">
        <Screen rows={rows} label="LCD running the scroll-left program" />
      </div>
      <figcaption className="mt-2 text-xs text-neutral-500">A re-creation of the scroll-left program. Try all five programs, with the buttons, in the Demo tab.</figcaption>
    </figure>
  );
}

const BUTTON_LABELS: Record<Button, string> = { select: 'Select', left: 'Left', up: 'Up', down: 'Down', right: 'Right' };
const KEY_TO_BUTTON: Record<string, Button> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', Enter: 'select', ' ': 'select' };

export default function LcdSimulator({ onViewSource }: { onViewSource?: (file: string) => void }) {
  const [programIndex, setProgramIndex] = useState(0);
  const program = LCD_PROGRAMS[programIndex];
  const { rows, press, reset } = useProgram(program, true);
  const [lit, setLit] = useState<Button | null>(null);

  const pressButton = (button: Button) => {
    press(button);
    setLit(button);
    window.setTimeout(() => setLit((b) => (b === button ? null : b)), 150);
  };
  const onKey = (e: KeyboardEvent) => {
    const button = KEY_TO_BUTTON[e.key];
    if (!button || (e.target as HTMLElement).tagName === 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) return;
    e.preventDefault();
    pressButton(button);
  };

  const key = (button: Button) => (
    <button
      type="button"
      onClick={() => pressButton(button)}
      aria-label={BUTTON_LABELS[button]}
      className={`flex h-11 w-11 items-center justify-center rounded-full border text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${lit === button ? 'border-accent bg-neutral-700 text-white' : 'border-neutral-600 bg-neutral-800 text-neutral-300 hover:border-neutral-400'} ${program.buttons.includes(button) ? '' : 'opacity-60'}`}
    >
      {button === 'select' ? 'Sel' : { up: '▲', down: '▼', left: '◀', right: '▶' }[button]}
    </button>
  );

  return (
    <div className="viewer-prose mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 md:px-10">
      <div role="group" aria-label="Choose a program" className="flex flex-wrap gap-2 text-xs">
        {LCD_PROGRAMS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setProgramIndex(i)}
            aria-pressed={i === programIndex}
            className={`rounded-sm border px-2 py-1 uppercase tracking-[0.2em] focus-visible:outline-2 focus-visible:outline-accent ${i === programIndex ? 'border-accent text-accent' : 'border-neutral-600 text-neutral-300 hover:border-white hover:text-white'}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* The board: screen above, keypad below. Arrow keys and Enter work while it has focus. */}
      <div
        className="rounded-lg border border-neutral-700 bg-[#0b3d2e] p-4 md:p-6 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        tabIndex={0}
        onKeyDown={onKey}
        aria-label="LCD keypad board. Use the arrow keys and Enter to press its buttons."
      >
        <Screen rows={rows} label={`LCD running ${program.label}`} />
        <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            {key('select')}
            <button
              type="button"
              onClick={reset}
              className="flex h-11 items-center justify-center rounded-full border border-neutral-600 bg-neutral-800 px-4 text-[10px] uppercase tracking-wider text-neutral-300 hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-3 grid-rows-3 gap-1" aria-label="Direction buttons" role="group">
            <div />{key('up')}<div />
            {key('left')}<div />{key('right')}
            <div />{key('down')}<div />
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="text-neutral-200">{program.description}</div>
        <div className="text-neutral-400">
          {program.buttons.length ? `Uses: ${program.buttons.map((b) => BUTTON_LABELS[b]).join(', ')}.` : 'No buttons: this program runs on timers alone.'}
          {onViewSource && (
            <>
              {' '}
              <button type="button" onClick={() => onViewSource(program.file)} className="underline underline-offset-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent rounded-sm">
                View its source
              </button>
            </>
          )}
        </div>
        <div className="text-xs text-neutral-500">
          A JavaScript re-creation of each program’s behaviour, using the messages, screen positions and timer settings from its source. It doesn’t emulate the microcontroller.
        </div>
      </div>
    </div>
  );
}
