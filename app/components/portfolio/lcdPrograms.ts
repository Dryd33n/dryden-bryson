/*
  A JavaScript re-creation of the CSC 230 LCD programs (uvic-csc-230), shown on a 16x2 character
  LCD with the keypad shield's buttons. Each program's messages, screen positions and timing are
  taken from its source: timer periods come from its TOP values at 16 MHz / 1024 (or / 8 for the
  C stopwatch). It re-creates the behaviour; it does not emulate the microcontroller.
*/

export const COLS = 16;
export type Button = 'select' | 'left' | 'up' | 'down' | 'right';

class Lcd {
  rows = [' '.repeat(COLS), ' '.repeat(COLS)];
  clear() { this.rows = [' '.repeat(COLS), ' '.repeat(COLS)]; }
  write(row: number, col: number, text: string) {
    const line = this.rows[row].split('');
    for (let i = 0; i < text.length && col + i < COLS; i++) line[col + i] = text[i];
    this.rows[row] = line.join('');
  }
}

export interface Sim {
  lcd: Lcd;
  advance(ms: number): void;
  press?(button: Button): void;
}

// 16 characters of msg starting at offset, wrapping to the start (display_line*_rotated).
const rotated = (msg: string, offset: number) => Array.from({ length: COLS }, (_, i) => msg[(offset + i) % msg.length]).join('');

// Parts A-C: the main loop shows both lines, then line 1, then line 2, one second each (timer3 delay).
const PHASE_MS = 1000;
const PHASE_FLAGS = [0b11, 0b01, 0b10];

function staticLines(): Sim {
  const lcd = new Lcd();
  const [line1, line2] = ['Dryden Bryson', 'CSC 230: Spring'];
  let nextPhase = 0, phase = 0;
  return {
    lcd,
    advance(ms) {
      while (nextPhase <= ms) {
        const flags = PHASE_FLAGS[phase];
        if (phase !== 0) lcd.clear();
        if (flags & 1) lcd.write(0, 0, line1);
        if (flags & 2) lcd.write(1, 0, line2);
        phase = (phase + 1) % 3;
        nextPhase += PHASE_MS;
      }
    },
  };
}

// Parts B and C: a Timer1 compare interrupt scrolls whichever lines the current phase shows.
function scrolling(direction: 'left' | 'right', isrMs: number): Sim {
  const lcd = new Lcd();
  const msgs = ['Dryden Bryson  ', 'CSC 230: Spring 2025  '];
  const offsets = [0, 0];
  let flags = 0, phase = 0, nextPhase = 0, nextIsr = isrMs;
  const draw = (row: number) => lcd.write(row, 0, rotated(msgs[row], offsets[row]));
  return {
    lcd,
    advance(ms) {
      while (Math.min(nextPhase, nextIsr) <= ms) {
        if (nextPhase <= nextIsr) {
          lcd.clear();
          flags = PHASE_FLAGS[phase];
          if (flags & 1) draw(0);
          if (flags & 2) draw(1);
          phase = (phase + 1) % 3;
          nextPhase += PHASE_MS;
        } else {
          for (const row of [0, 1]) {
            if (!(flags & (1 << row))) continue;
            if (direction === 'left') {
              offsets[row] = (offsets[row] + 1) % msgs[row].length;
              draw(row);
            } else {
              draw(row);
              offsets[row] = offsets[row] - 1 < 0 ? msgs[row].length - 1 : offsets[row] - 1;
            }
          }
          nextIsr += isrMs;
        }
      }
    },
  };
}

// Part D: each direction button clears the screen and writes its word at a fixed position.
function buttonMessages(): Sim {
  const lcd = new Lcd();
  const messages: Partial<Record<Button, { text: string; row: number; col: number }>> = {
    left: { text: 'Left', row: 1, col: 0 },
    right: { text: 'Right', row: 1, col: 11 },
    up: { text: 'Up', row: 0, col: 7 },
    down: { text: 'Down', row: 1, col: 6 },
  };
  return {
    lcd,
    advance() {},
    press(button) {
      const m = messages[button];
      if (!m) return;
      lcd.clear();
      lcd.write(m.row, m.col, m.text);
    },
  };
}

// A4: a 1 ms Timer1 interrupt redraws the time on line 1, and on line 2 unless SELECT paused it.
function stopwatch(): Sim {
  const lcd = new Lcd();
  let paused = false, now = 0;
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  const format = (ms: number) => {
    const t = Math.floor(ms);
    return `${pad(Math.floor(t / 3600000))}:${pad(Math.floor(t / 60000) % 60)}:${pad(Math.floor(t / 1000) % 60)}.${pad(t % 1000, 3)}`;
  };
  return {
    lcd,
    advance(ms) {
      now = ms;
      lcd.write(0, 0, format(ms));
      if (!paused) lcd.write(1, 0, format(ms));
    },
    press(button) {
      if (button === 'select') paused = !paused;
      this.advance(now);
    },
  };
}

export interface LcdProgram {
  id: string;
  label: string;
  // Display path of the program's source in the project viewer.
  file: string;
  buttons: Button[];
  description: string;
  create: () => Sim;
}

export const LCD_PROGRAMS: LcdProgram[] = [
  {
    id: 'part-a', label: 'Static lines', file: 'lcd/display_partA.asm', buttons: [],
    description: 'Shows both lines, then each line alone, one second at a time.',
    create: staticLines,
  },
  {
    id: 'part-b', label: 'Scroll left', file: 'lcd/display_partB.asm', buttons: [],
    description: 'A Timer1 interrupt every 0.576 s scrolls the visible lines to the left.',
    create: () => scrolling('left', (9000 / 15625) * 1000),
  },
  {
    id: 'part-c', label: 'Scroll right', file: 'lcd/display_partC.asm', buttons: [],
    description: 'The same cycle, scrolling right on a faster 0.32 s interrupt.',
    create: () => scrolling('right', (5000 / 15625) * 1000),
  },
  {
    id: 'part-d', label: 'Buttons', file: 'lcd/display_partD.asm', buttons: ['up', 'down', 'left', 'right'],
    description: 'Reads the keypad through the ADC and names the direction pressed.',
    create: buttonMessages,
  },
  {
    id: 'stopwatch', label: 'Stopwatch (C)', file: 'stopwatch/main.c', buttons: ['select'],
    description: 'A 1 ms timer drives the clock. SELECT freezes the second line while the first keeps counting.',
    create: stopwatch,
  },
];
